// -------------------- Dynamic Service Rendering --------------------
async function loadServices() {
  const response = await fetch('services.json'); // your JSON file
  const services = await response.json();

  const serviceGrid = document.getElementById('service-grid');

  services.forEach(service => {
    // Create URL to detailed service page
    const serviceURL = `service.html?id=${service.id}`;

    // Generate a short snippet for card display (max 100 chars)
    const snippet = service.description.length > 100 ? service.description.slice(0, 100) + '...' : service.description;

    // Create the service card HTML
    const cardHTML = `
      <article class="product-card">
        <a href="${serviceURL}">
          <img src="${service.image}" alt="${service.title}">
          <h3>${service.title}</h3>
          <p class="price">£${service.price}</p>
          <p class="description-snippet">${snippet}</p>
        </a>
      </article>
    `;

    // Inject card into grid
    serviceGrid.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// Load services on page load
document.addEventListener('DOMContentLoaded', loadServices);
