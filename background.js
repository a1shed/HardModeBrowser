chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('jumpscareAlarm', { periodInMinutes: 3 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'jumpscareAlarm') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: showJumpscare
        });
      }
    });
  }
});

function showJumpscare() {
  if (document.getElementById('jumpscare-img')) return;

  
  const images = [
    "https://media.istockphoto.com/id/1198706343/photo/one-mango-with-leaves-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=z3lUncC5mQqODryM7snyF-RDg0QJeOj4WkGAQQSmH1U=",
    "https://www.kroger.com/product/images/xlarge/front/0001300000218",
    "https://i.kym-cdn.com/entries/icons/facebook/000/053/895/67-kid.jpg"
  ];
  const randomImg = images[Math.floor(Math.random() * images.length)];

  const overlay = document.createElement('div');
  overlay.id = 'jumpscare-img';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: white;
    z-index: 2147483647;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const img = document.createElement('img');
  img.src = randomImg;
  img.style.cssText = `
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  `;

  overlay.appendChild(img);
  document.body.appendChild(overlay);


  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }


  setTimeout(() => {
    overlay.remove();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, 2500);
}



