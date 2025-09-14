let scrollReverse = false;

setInterval(() => {
  const mutation = Math.random();
  if (mutation < 0.33) {
    document.body.style.cursor = "none";
    setTimeout(() => document.body.style.cursor = "", 15000);
  } else if (mutation < 0.66) {
    document.body.style.cursor = "url('https://cur.cursors-4u.net/cursors/cur-2/cur116.cur'), auto";
    setTimeout(() => document.body.style.cursor = "", 15000);
  } else {
    scrollReverse = !scrollReverse;
    setTimeout(() => scrollReverse = false, 15000);
  }
}, Math.random() * 30000 + 30000);

window.addEventListener("wheel", e => {
  if (scrollReverse) {
    window.scrollBy(0, -e.deltaY);
    e.preventDefault();
  }
}, { passive: false });

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showLootbox(link.href);
  });
});

function showLootbox(url) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed; top:0; left:0; width:100vw; height:100vh;
    background: rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center;
  `;

  const box = document.createElement("div");
  box.style.cssText = `
    position: relative; width: 700px; height: 200px; background: #111; overflow: hidden;
    border: 4px solid gold; border-radius: 10px;
  `;

  const line = document.createElement("div");
  line.style.cssText = `
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 4px; height: 100%; background: red; z-index: 10;
  `;

  const reel = document.createElement("div");
  reel.style.cssText = `
    display: flex; position: absolute; top: 0; left: 0; height: 100%; transition: transform 3s cubic-bezier(.17,.67,.83,.67);
  `;

  const rewards = [
    { type: "nothing", img: "https://play-lh.googleusercontent.com/asu4A288X1gkq44pFHdxn6KRuAgB16m_E_V5WmV3qZ-vBl6wUtRLX2wDK5dq4qEzv7hO" },
    { type: "link", img: url },
    { type: "tilt", img: "https://c.tadst.com/gfx/1200x675/axial-tilt.png?1" },
    { type: "explode", img: "https://upload.wikimedia.org/wikipedia/commons/7/79/Operation_Upshot-Knothole_-_Badger_001.jpg" }
  ];

  const pool = [];
  for (let i = 0; i < 20; i++) {
    const r = Math.random() * 100;
    if (r < 30) pool.push(rewards[1]);
    else if (r < 80) pool.push(rewards[0]);
    else if (r < 95) pool.push(rewards[2]);
    else pool.push(rewards[3]);
  }

  pool.forEach(item => {
    const el = document.createElement("div");
    el.style.cssText = "flex: 0 0 140px; height: 100%; display:flex; justify-content:center; align-items:center; margin:0 5px; background:#222; border-radius:8px;";
    const img = document.createElement("img");
    img.src = item.img;
    img.style.cssText = "max-width:100%; max-height:100%; object-fit:contain;";
    el.appendChild(img);
    el.dataset.type = item.type;
    reel.appendChild(el);
  });

  const rollBtn = document.createElement("button");
  rollBtn.textContent = "ROLL";
  rollBtn.style.cssText = `
    position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%);
    padding: 10px 20px; background: gold; border: none; font-size: 18px; font-weight: bold; cursor: pointer;
  `;

  box.appendChild(reel);
  box.appendChild(line);
  overlay.appendChild(box);
  overlay.appendChild(rollBtn);
  document.body.appendChild(overlay);

  rollBtn.addEventListener("click", () => {
    const stopIndex = Math.floor(Math.random() * pool.length);
    const offset = -(stopIndex * 150 - 350); 
    reel.style.transform = `translateX(${offset}px)`;
    setTimeout(() => {
      const landed = pool[stopIndex];
      overlay.remove();
      if (landed.type === "link") {
        window.location.href = url;
      } else if (landed.type === "tilt") {
        document.body.style.transform = "rotate(10deg)";
        setTimeout(() => document.body.style.transform = "", 2000);
      } else if (landed.type === "explode") {
        document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%'>💥 BOOM 💥 Page Destroyed</h1>";
      }
    }, 3200);
  });
}
