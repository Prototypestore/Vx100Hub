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
    const titleEl = document.querySelector(".product-title");
    const priceEl = document.querySelector(".product-price");
    const imageEl = document.querySelector(".product-image img");
    const detailsList = document.getElementById("product-details");

    titleEl.textContent = service.title;
    imageEl.src = service.image;
    imageEl.alt = service.title;

    // ====== FUNCTION TO UPDATE DETAILS & PRICE BASED ON PACKAGE ======
    function updatePackage(packageName) {
      let pkgDetails = [];
      let pkgPrice = service.price;

      if (packageName === "basic" && service.basic) {
        pkgDetails = service.basic;
      } else if (packageName === "pro" && service.pro) {
        pkgDetails = service.pro;
      } else if (packageName === "premium" && service.premium) {
        pkgDetails = service.premium;
      }

      detailsList.innerHTML = "";
      pkgDetails.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `• ${item}`;
        detailsList.appendChild(li);
      });

      // Optionally adjust price if you want different prices per tier
      // For now, we'll keep the main service price
      priceEl.textContent = `£${pkgPrice.toFixed(2)}`;
    }

    // ====== INITIAL LOAD (basic by default) ======
    updatePackage("basic");

    // ====== PACKAGES OPTIONS ======
    const packageFieldset = document.querySelector(".package-fieldset");
    packageFieldset.innerHTML = "<legend>Choose a Package</legend>";

    ["basic", "pro", "premium"].forEach(tier => {
      const label = document.createElement("label");
      label.classList.add("package-card"); // keep card styling
      label.innerHTML = `
        <input type="radio" name="package" value="${tier}" ${tier === "basic" ? "checked" : ""}>
        ${tier.charAt(0).toUpperCase() + tier.slice(1)}
      `;
      packageFieldset.appendChild(label);

      // ====== LISTEN FOR CHECK ======
      label.querySelector("input").addEventListener("change", () => {
        updatePackage(tier);
      });
    });

    // ====== ADD TO CART ======
    const addToCartBtn = document.querySelector(".btn-add-to-cart");
    addToCartBtn.addEventListener("click", e => {
      e.preventDefault();
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const selectedPackage = document.querySelector('input[name="package"]:checked');
      if (!selectedPackage) return alert("Please select a package.");

      const itemKey = service.id + "-" + selectedPackage.value;

      const existingIndex = cart.findIndex(item => item.id === itemKey);

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          id: itemKey,
          name: `${service.title} (${selectedPackage.value})`,
          price: service.price, // use main service price
          quantity: 1,
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
