// main.js
const noBtn = document.getElementById("noBtn");
const placeholder = document.querySelector(".no-placeholder");
const siBtn = document.getElementById("siBtn");

const miModal = new bootstrap.Modal(document.getElementById("miModal"));

siBtn.addEventListener("click", () => {
  miModal.show(); // abre el modal
});


// Sitúa el botón NO sobre el placeholder (inicialmente)
function placeNoOverPlaceholder() {
  const rect = placeholder.getBoundingClientRect();
  // left/top en fixed usan coordenadas del viewport -> usamos rect
  noBtn.style.left = `${rect.left}px`;
  noBtn.style.top = `${rect.top}px`;
  // ajustamos tamaño para coincidir con placeholder
  noBtn.style.width = `${rect.width}px`;
  noBtn.style.height = `${rect.height}px`;
}

// mover NO a una posición aleatoria dentro del viewport (sin salirse)
function moveNo() {
  const margin = 10; // margen para que no quede pegado al borde
  const maxX = window.innerWidth - noBtn.offsetWidth - margin;
  const maxY = window.innerHeight - noBtn.offsetHeight - margin;

  // evitamos que caiga encima del boton SI
  const siRect = siBtn.getBoundingClientRect();
  const siCenterX = siRect.left + siRect.width / 2;
  const siCenterY = siRect.top + siRect.height / 2;
  const minDistance = 160; // px distancia mínima desde el centro del NO al SI

  let x, y, tries = 0;
  do {
    x = Math.random() * maxX + margin;
    y = Math.random() * maxY + margin;

    const centerX = x + noBtn.offsetWidth / 2;
    const centerY = y + noBtn.offsetHeight / 2;
    const dx = centerX - siCenterX;
    const dy = centerY - siCenterY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    tries++;
   
  } while (dist < minDistance && tries < 20);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}


noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNo();
});


noBtn.addEventListener("mouseenter", () => {
  moveNo();
});


window.addEventListener("load", placeNoOverPlaceholder);
window.addEventListener("resize", placeNoOverPlaceholder);






