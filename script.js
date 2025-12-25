// -------------------- Dynamic Product Rendering --------------------
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    const products = await response.json();

    const shopGrid = document.getElementById('product-grid');
    const trendingGrid = document.getElementById('trending-grid');

    products.forEach(product => {
      // Skip out-of-stock variants
      const inStockVariants = product.variants.filter(v => v.stock > 0);
      if (!inStockVariants.length) return;

      // Pick best variant (trending or first in stock)
      const bestVariant = inStockVariants.find(v => v.trending) || inStockVariants[0];

      // Calculate promotion price
      let displayPrice = bestVariant.price;
      const now = new Date();
      if (product.promotions && product.promotions.length > 0) {
        product.promotions.forEach(promo => {
          const start = new Date(promo.start);
          const end = new Date(promo.end);
          if (promo.type === "sale" && now >= start && now <= end) {
            displayPrice = (bestVariant.price * (1 - promo.discount)).toFixed(2);
          }
        });
      }

      // Build URL to product.html
      const productURL = `product.html?id=${product.id}&color=${encodeURIComponent(bestVariant.color)}&size=${encodeURIComponent(bestVariant.size)}`;

      // Product card HTML exactly like your product.html expects
      const cardHTML = `
        <article class="product-card" style="cursor:pointer">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p class="price">£${displayPrice}</p>
        </article>
      `;

      // Insert card into shop grid
      shopGrid.insertAdjacentHTML('beforeend', cardHTML);
      shopGrid.lastElementChild.addEventListener('click', () => {
        window.location.href = productURL;
      });

      // Insert into trending grid if flagged
      if (product.trending) {
        trendingGrid.insertAdjacentHTML('beforeend', cardHTML);
        trendingGrid.lastElementChild.addEventListener('click', () => {
          window.location.href = productURL;
        });
      }
    });
  } catch (err) {
    console.error("Failed to load products.json", err);
  }
}

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);
