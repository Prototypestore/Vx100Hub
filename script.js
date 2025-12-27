// -------------------- Dynamic Service Rendering --------------------
async function loadServices() {
  try {
    const response = await fetch('services.json');
    const services = await response.json();

    const serviceGrid = document.getElementById('service-grid'); // fixed ID
    const trendingGrid = document.getElementById('trending-grid'); // optional, keep if needed

    services.forEach(service => {
      // Build URL to product.html
      const serviceURL = `product.html?id=${service.id}`;

      // Price display
      const displayPrice = service.basic.price.toFixed(2);

      // Service card HTML
      const cardHTML = `
        <article class="product-card" style="cursor:pointer">
          <img src="${service.image}" alt="${service.title}">
          <h3>${service.title}</h3>
          <p class="price">£${displayPrice}</p>
        </article>
      `;

      // Insert card into main grid
      serviceGrid.insertAdjacentHTML('beforeend', cardHTML);
      serviceGrid.lastElementChild.addEventListener('click', () => {
        window.location.href = serviceURL;
      });

      // Optional trending grid
      if (service.trending && trendingGrid) {
        trendingGrid.insertAdjacentHTML('beforeend', cardHTML);
        trendingGrid.lastElementChild.addEventListener('click', () => {
          window.location.href = serviceURL;
        });
      }
    });
  } catch (err) {
    console.error("Failed to load services.json", err);
  }
}

// Load services on page load
document.addEventListener('DOMContentLoaded', loadServices);
