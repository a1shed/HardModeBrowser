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
