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

    // ====== FUNCTION TO UPDATE DETAILS AND PRICE BASED ON PACKAGE ======
    function updatePackage(packageName) {
      const pkg = service[packageName]; // basic, pro, or premium
      if (!pkg) return;

      // Update details list
      detailsList.innerHTML = "";
      pkg.details.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `• ${item}`;
  detailsList.appendChild(li);
});

      // Update price dynamically
      priceEl.textContent = `£${pkg.price.toFixed(2)}`;
    }

    // ====== INITIAL LOAD (basic by default) ======
    updatePackage("basic");

    // ====== PACKAGE OPTIONS ======
    const packageFieldset = document.querySelector(".package-row");

    ["basic", "pro", "premium"].forEach(tier => {
      const label = document.createElement("label");
      label.classList.add("package-card");
      label.innerHTML = `
        <input type="radio" name="package" value="${tier}" ${tier === "basic" ? "checked" : ""}>
        ${tier.charAt(0).toUpperCase() + tier.slice(1)}
      `;
      packageFieldset.appendChild(label);

      // Update package details & price when changed
      label.querySelector("input").addEventListener("change", () => {
        updatePackage(tier);
      });
    });

    // ====== ADD TO CART & REDIRECT ======
    const addToCartBtn = document.querySelector(".btn-add-to-cart");
    addToCartBtn.addEventListener("click", e => {
      e.preventDefault();

      const selectedPackage = document.querySelector('input[name="package"]:checked');
      if (!selectedPackage) return alert("Please select a package.");

      const pkg = service[selectedPackage.value]; // get tier-specific info

      // Add to cart
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemKey = service.id + "-" + selectedPackage.value;
      const existingIndex = cart.findIndex(item => item.id === itemKey);

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          id: itemKey,
          name: `${service.title} (${selectedPackage.value})`,
          price: pkg.price,       // ✅ use tier-specific price
          quantity: 1,
          image: service.image
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      // Redirect to contact page with service & tier
      const serviceName = encodeURIComponent(service.title);
      const tier = encodeURIComponent(selectedPackage.value);
      window.location.href = `contact.html?service=${serviceName}&tier=${tier}`;
    });

    // ====== ACCORDION ======
    const accordionBtn = document.getElementById("btn-re");
    if (accordionBtn) {
      accordionBtn.addEventListener("click", () => {
        document.getElementById("returns").classList.toggle("show");
      });
    }

  })
  .catch(err => console.error("Failed to load services.json", err));
