let imgSrc = [
  { 
    pairId: 0,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-a.png?v=1596020454798",
  }, 
  { 
    pairId: 1,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-a.PNG?v=1596020457628",
  },
  { 
    pairId: 2,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-9.png?v=1596020745882",
  },
   { 
    pairId: 3,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fspades-a.PNG?v=1596020468854",
  }, 
];


let imgPairs = doubleContent(imgSrc);
let shuffledImgs = shuffle(imgPairs);

let imgsGrid = document.getElementById("images-grid");

shuffledImgs.forEach((img) => {
  let imgDiv = createImgDiv(img);
  imgsGrid.appendChild(imgDiv);
})

function createImgDiv(img) {
  let container = document.createElement("div");
  container.setAttribute("data-pair", img.pairId);
  container.style.backgroundImage = img.src;
  container.classList.add("cell");
  return container;
}

function doubleContent(arr) {
  return arr.concat(arr);
}

function shuffle(array) {
  let newArray = Array.from(array);
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
}
