/* ===== Lightbox Functionality ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const images = document.querySelectorAll(".lightbox-img img");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Extract service from URL
const params = new URLSearchParams(window.location.search);
const selectedService = params.get("service");

/* ===== Booking Prefill Functionality ===== */
function getQueryParams() {
  const params = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach(pair => {
      const [key, value] = pair.split("=");
      if(key) params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, " "));
    });
  return params;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = getQueryParams();

  const serviceField = document.getElementById("service");
  const priceField = document.getElementById("price");
  const callOutFee = 200;

  if(serviceField && params.service) {
    serviceField.value = params.service;
    // Set price based on data (hardcoded as placeholder)
    let priceMap = {
      "Gents Manicure and Pedicure": 499,
      "Deep Tissue Massage": 699,
      "Aromatherapy Massage": 550,
      "Cupping Massage": 750
    };
    const basePrice = priceMap[params.service] || 0;
    priceField.value = `R${basePrice}.00 + Call-Out Fee R${callOutFee}.00 = Total R${basePrice+callOutFee}.00`;
  }

  let priceMap = {
  "Gents Manicure and Pedicure": 499,
  "Deep Tissue Massage": 699,
  "Aromatherapy Massage": 550,
  "Cupping Massage": 750
};

let callOutFee = 200;

// Fill form automatically if service was clicked
if (selectedService && priceMap[selectedService]) {
  document.getElementById("service").value = selectedService;
  document.getElementById("price").value = "R" + priceMap[selectedService] + ".00";

  let total = priceMap[selectedService] + callOutFee;
  document.getElementById("total").value = "R" + total + ".00";
}

  // WhatsApp Booking
  const whatsappBtn = document.getElementById("whatsapp-btn");
  if(whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value || "[Name]";
      const phone = document.getElementById("phone").value || "[Phone]";
      const address = document.getElementById("address").value || "[Address]";
      const date = document.getElementById("date").value || "[Date]";
      const time = document.getElementById("time").value || "[Time]";
      const service = serviceField.value || "[Service]";
      const message = `Hello, I would like to book *${service}* for ${date} at ${time}. My name is ${name}, phone ${phone}, address: ${address}.`;
      const whatsappUrl = `https://wa.me/0697507959?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });
  }
});

