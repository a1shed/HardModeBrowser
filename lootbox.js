const IMAGES = {
  nothing: "https://play-lh.googleusercontent.com/asu4A288X1gkq44pFHdxn6KRuAgB16m_E_V5WmV3qZ-vBl6wUtRLX2wDK5dq4qEzv7hO",
  tilt: "https://c.tadst.com/gfx/1200x675/axial-tilt.png?1",
  explode: "https://upload.wikimedia.org/wikipedia/commons/7/79/Operation_Upshot-Knothole_-_Badger_001.jpg"
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link) {
    e.preventDefault();
    openLootbox(link.href);
  }
});

function openLootbox(url) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2147483647;
    color: white;
    font-family: sans-serif;
  `;

  const title = document.createElement("h1");
  title.innerText = "Lootbox Roll";
  overlay.appendChild(title);

  const boxContainer = document.createElement("div");
  boxContainer.style.cssText = `
    display: flex;
    overflow: hidden;
    width: 600px;
    height: 200px;
    border: 5px solid white;
    margin: 20px;
    position: relative;
  `;

  const outcomes = [
    { type: "link", img: url },
    { type: "nothing", img: IMAGES.nothing },
    { type: "tilt", img: IMAGES.tilt },
    { type: "explode", img: IMAGES.explode }
  ];

  for (let i = 0; i < 20; i++) {
    const pick = outcomes[Math.floor(Math.random() * outcomes.length)];
    const img = document.createElement("img");
    img.src = pick.img;
    img.style.cssText = `width: 200px; height: 200px; object-fit: cover; margin-right: 10px;`;
    img.dataset.type = pick.type;
    boxContainer.appendChild(img);
  }

  overlay.appendChild(boxContainer);

  const rollBtn = document.createElement("button");
  rollBtn.innerText = "ROLL";
  rollBtn.style.cssText = `
    padding: 10px 20px;
    font-size: 20px;
    background: red;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  `;
  overlay.appendChild(rollBtn);

  document.body.appendChild(overlay);

  rollBtn.addEventListener("click", () => {
    boxContainer.scrollTo({
      left: boxContainer.scrollWidth,
      behavior: "smooth"
    });

    setTimeout(() => {
      const roll = Math.random();
      if (roll < 0.3) {
        window.location.href = url;
      } else if (roll < 0.8) {
        overlay.remove();
      } else if (roll < 0.95) {
        document.body.style.transform = "rotate(10deg)";
        setTimeout(() => {
          document.body.style.transform = "";
          overlay.remove();
        }, 2000);
      } else {
        document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%'>💥 BOOM 💥 Page Exploded</h1>";
      }
    }, 2000);
  });
}
