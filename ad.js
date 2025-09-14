const ADS = [
  "https://www.youtube.com/embed/fGy-x3H-nxU?autoplay=1",
  "https://www.youtube.com/embed/bdnH9c2U3q4?autoplay=1"
];

let lastAdTime = 0;
let adActive = false;

function blockTyping(e) {
  if (!adActive && Date.now() - lastAdTime > 60000) {
    e.preventDefault();
    showAd();
  }
}

function showAd() {
  adActive = true;
  lastAdTime = Date.now();

  const overlay = document.createElement("div");
  overlay.id = "ad-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2147483647;
    flex-direction: column;
    color: white;
    font-family: sans-serif;
  `;

  const iframe = document.createElement("iframe");
  iframe.src = ADS[Math.floor(Math.random() * ADS.length)];
  iframe.width = "800";
  iframe.height = "450";
  iframe.allow = "autoplay; encrypted-media";
  iframe.style.border = "none";

  const message = document.createElement("p");
  message.innerText = "Please watch this quick ad to continue typing...";
  message.style.marginBottom = "10px";

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Close Ad";
  closeBtn.disabled = true;
  closeBtn.style.cssText = `
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    background: #ff4444;
    color: white;
    cursor: not-allowed;
  `;

  overlay.appendChild(message);
  overlay.appendChild(iframe);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  setTimeout(() => {
    closeBtn.disabled = false;
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => {
      overlay.remove();
      adActive = false;
    });
  }, 30000);
}

document.addEventListener("keydown", blockTyping, true);
document.addEventListener("input", blockTyping, true);
