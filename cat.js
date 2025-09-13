const CAT_IMG = "https://pethelpful.com/.image/w_3840,q_auto:good,c_fill,ar_4:3/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg";
const HUNGRY_CAT_IMG = "https://img.freepik.com/free-photo/view-adorable-cat-eating-its-food_52683-137884.jpg?semt=ais_hybrid&w=740&q=80";
const CATFOOD_IMG = "https://fussiecat.com/wp-content/uploads/2023/01/chicken-1024x711.png";

let cat, food, hungryTimer, feedTimer;


function spawnCat() {
  if (document.getElementById("cat-pet")) return;

  cat = document.createElement("img");
  cat.id = "cat-pet";
  cat.src = CAT_IMG;
  cat.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 150px;
    height: auto;
    z-index: 2147483647;
    cursor: pointer;
    transition: transform 0.2s;
  `;
  document.body.appendChild(cat);


  setInterval(makeCatHungry, 30000);
}


function makeCatHungry() {
  if (!cat) return;
  cat.src = HUNGRY_CAT_IMG;


  spawnFood();


  clearTimeout(hungryTimer);
  hungryTimer = setTimeout(() => {
    if (cat && cat.src === HUNGRY_CAT_IMG) {
      document.body.innerHTML = "<h1 style='color:red; font-size:50px; text-align:center; margin-top:20%'>You didn't feed the cat 😾</h1>";
    }
  }, 10000);
}


function spawnFood() {
  if (document.getElementById("cat-food")) return;

  food = document.createElement("img");
  food.id = "cat-food";
  food.src = CATFOOD_IMG;
  food.style.cssText = `
    position: fixed;
    top: ${Math.random() * 80 + 10}%;
    left: ${Math.random() * 80 + 10}%;
    width: 100px;
    height: auto;
    z-index: 2147483647;
    cursor: pointer;
  `;
  document.body.appendChild(food);

  food.addEventListener("click", feedCat);
}


function feedCat() {
  if (!food || !cat) return;

  food.remove();
  food = null;
  cat.src = CAT_IMG;

  clearTimeout(hungryTimer);
}


spawnCat();
