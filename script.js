// -------------------- Dynamic Product Rendering --------------------
async function loadProducts() {
  const response = await fetch('products.json');
  const products = await response.json();

  const shopGrid = document.getElementById('product-grid');
  const trendingGrid = document.getElementById('trending-grid');

  products.forEach(product => {
    // Skip out-of-stock products
    const inStockVariants = product.variants.filter(v => v.stock > 0);
    if (!inStockVariants.length) return;

    // Pick best variant
    let bestVariant = inStockVariants.find(v => v.trending) || inStockVariants[0];

    // Calculate display price (promotion)
    let displayPrice = bestVariant.price;
    const now = new Date();
    if (product.promotions && product.promotions.length) {
      product.promotions.forEach(promo => {
        const start = new Date(promo.start);
        const end = new Date(promo.end);
        if (promo.type === "sale" && now >= start && now <= end) {
          displayPrice = (bestVariant.price * (1 - promo.discount)).toFixed(2);
        }
      });
    }

    // Create card (no <a>)
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">£${displayPrice}</p>
    `;

    // Make entire card clickable
    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}&color=${encodeURIComponent(bestVariant.color)}&size=${encodeURIComponent(bestVariant.size)}`;
    });

    // Inject into grids
    shopGrid.appendChild(card);
    if (product.trending) trendingGrid.appendChild(card.cloneNode(true));
  });
}

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);
