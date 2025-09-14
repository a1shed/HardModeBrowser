let chaosActive = false;
let chaosTimer;
let fakeCursor;
let sensitivityScale = 1;

function startChaos() {
  if (chaosActive) return;
  chaosActive = true;

  const mutation = Math.floor(Math.random() * 3);

  if (mutation === 0) {
    document.body.style.cursor = "none";
  } else if (mutation === 1) {
    fakeCursor = document.createElement("div");
    fakeCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: red;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483647;
    `;
    document.body.appendChild(fakeCursor);
    document.addEventListener("mousemove", followMouseOffset);
  } else if (mutation === 2) {
    sensitivityScale = Math.random() < 0.5 ? 0.5 : 2;
    document.addEventListener("mousemove", distortMovement, true);
  }

  chaosTimer = setTimeout(stopChaos, 15000);
}

function stopChaos() {
  document.body.style.cursor = "";
  if (fakeCursor) {
    fakeCursor.remove();
    fakeCursor = null;
    document.removeEventListener("mousemove", followMouseOffset);
  }
  if (sensitivityScale !== 1) {
    sensitivityScale = 1;
    document.removeEventListener("mousemove", distortMovement, true);
  }
  chaosActive = false;
  scheduleNextChaos();
}

function followMouseOffset(e) {
  if (fakeCursor) {
    fakeCursor.style.left = e.clientX - 30 + "px";
    fakeCursor.style.top = e.clientY + "px";
  }
}

function distortMovement(e) {
  if (sensitivityScale !== 1) {
    e.stopImmediatePropagation();
    const simulated = new MouseEvent(e.type, {
      clientX: window.lastX + (e.movementX * sensitivityScale),
      clientY: window.lastY + (e.movementY * sensitivityScale),
      bubbles: true,
      cancelable: true,
      view: window
    });
    window.lastX = simulated.clientX;
    window.lastY = simulated.clientY;
    e.target.dispatchEvent(simulated);
  } else {
    window.lastX = e.clientX;
    window.lastY = e.clientY;
  }
}

function scheduleNextChaos() {
  const delay = (Math.random() * 30 + 30) * 1000;
  setTimeout(startChaos, delay);
}

scheduleNextChaos();
