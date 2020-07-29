let imgSrc = [
  { 
    pairId: 0,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-a.png?v=1596020454798",
  }, 
  { 
    pairId: 1,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-9.png?v=1596020745882",
  },
  { 
    pairId: 2,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-3.PNG?v=1596020832177",
  },
   { 
    pairId: 3,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-a.PNG?v=1596020457628",
  }, 
  { 
    pairId: 4,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fhearts-6.PNG?v=1596020597172",
  },
  { 
    pairId: 5,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-9.PNG?v=1596020736324https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-3.PNG?v=1596020832177",
  },
  { 
    pairId: 6,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fspades-3.PNG?v=1596020840901",
  },
  { 
    pairId: 7,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-6.png?v=1596020595265",
  },
  { 
    pairId: 8,
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-3.png?v=1596020829948",
  },
];

let imgDivArray = createGridContentArray(imgSrc);

imgDivArray.forEach(container => {
  container.addEventListener("click", () => {
    if (container.)
    container.classList.toggle("flipped-cell");
  });
});

let shuffledImgs = shuffle(imgDivArray);

let imgsGrid = document.getElementById("images-grid");
shuffledImgs.forEach((img) => {
  imgsGrid.appendChild(img);
});

/* ------------ FUNCTIONS -----------------*/

function createGridContentArray(imgs) {
  let doubled = doubleContent(imgSrc);
  return doubled.map(img => createImgDiv(img));
} 

function createImgDiv(img) {
  let container = document.createElement("div");
  container.setAttribute("data-pair", img.pairId);
  container.style.backgroundImage = `url(${img.src})`;
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
