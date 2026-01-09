// -------------------- Dynamic Service Rendering --------------------
async function loadServices() {
  try {
    const response = await fetch('services.json');
    const services = await response.json();

    const serviceGrid = document.getElementById('service-grid');
    const trendingGrid = document.getElementById('trending-grid');

    if (!serviceGrid) {
      console.error("service-grid not found");
      return;
    }

    services.forEach(service => {
      const serviceURL = `product.html?id=${service.id}`;

      const displayPrice = service?.basic?.price != null
        ? Number(service.basic.price).toFixed(2)
        : "—";

      const cardHTML = `
        <article class="product-card" style="cursor:pointer">
          <img src="${service.image}" alt="${service.title}">
          <h3>${service.title}</h3>
          <p class="price">R${displayPrice}</p>
        </article>
      `;

      serviceGrid.insertAdjacentHTML('beforeend', cardHTML);
      serviceGrid.lastElementChild.addEventListener('click', () => {
        window.location.href = serviceURL;
      });

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

// 🔥 THIS IS THE LINE YOU WERE MISSING
document.addEventListener("DOMContentLoaded", loadServices);
