// ====== GET SERVICE INFO FROM URL ======
const params = new URLSearchParams(window.location.search);
const serviceId = params.get("id") || "1";

// ====== FETCH SERVICE DATA ======
fetch("services.json")
  .then(res => res.json())
  .then(services => {
    const service = services.find(s => s.id === serviceId);

    if (!service) {
      document.querySelector(".product-title").textContent = "Service Not Found";
      document.querySelector(".product-price").textContent = "-";
      document.querySelector(".product-image img").src = "";
      document.getElementById("product-details").innerHTML = "<li>Service does not exist.</li>";
      document.getElementById("returns").textContent = "";
      document.querySelector(".btn-add-to-cart").disabled = true;
      return;
    }

    // ====== FILL PAGE CONTENT ======
    document.querySelector(".product-title").textContent = service.title;
    document.querySelector(".product-price").textContent = `£${service.price.toFixed(2)}`;
    document.querySelector(".product-image img").src = service.image;
    document.querySelector(".product-image img").alt = service.title;

    // ====== BULLET POINT DESCRIPTION ======
    const detailsList = document.getElementById("product-details");
    detailsList.innerHTML = "";
    service.details.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `• ${item}`;
      detailsList.appendChild(li);
    });

    // ====== PACKAGES OPTIONS ======
    const packageFieldset = document.querySelector(".package-fieldset");
    packageFieldset.innerHTML = "<legend>Choose a Package</legend>"; // reset
    if(service.packages && service.packages.length > 0) {
      service.packages.forEach(pkg => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="package" value="${pkg.name}"> ${pkg.name} - £${pkg.price}`;
        packageFieldset.appendChild(label);
      });
    } else {
      packageFieldset.innerHTML += "<p>No packages available</p>";
    }

      // ====== ADD TO CART ======
    const addToCartBtn = document.querySelector(".btn-add-to-cart");
    addToCartBtn.addEventListener("click", e => {
      e.preventDefault();
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const selectedPackage = document.querySelector('input[name="package"]:checked');
      if (!selectedPackage) return alert("Please select a package.");

      const itemKey = service.id + "-" + selectedPackage.value;
      const existingIndex = cart.findIndex(item => item.id === itemKey);

      const pkgPrice = service.packages.find(p => p.name === selectedPackage.value).price;

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += parseInt(qtyInput.value);
      } else {
        cart.push({
          id: itemKey,
          name: `${service.title} (${selectedPackage.value})`,
          price: pkgPrice,
          quantity: parseInt(qtyInput.value),
          image: service.image
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    });

    // ====== ACCORDION ======
    document.getElementById("btn-re").addEventListener("click", () => {
      document.getElementById("returns").classList.toggle("show");
    });

  })
  .catch(err => console.error("Failed to load services.json", err));

// ====== REDIRECT TO CONTACT PAGE ======
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('package-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop form submitting normally
    window.location.href = 'contact.html';
  });
});
