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
    src: "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-9.PNG?v=1596020736324",
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

const players = {
  "victor" : {
    score: 20,
  },
  "alex": {
    score: 30,
  }
}

let imgDivArray = createGridContentArray(imgSrc);
let playBtn = document.getElementById("play");
let chooseUserDiv = document.querySelector(".choose-username");
let imgsGrid = document.getElementById("images-grid");


imgDivArray.forEach(container => {
  container.addEventListener("click", () => {
    if(isFlipped(container)) {
        container.classList.remove("flipped-cell");
    }
  });
});

playBtn.addEventListener("click", () => {
  
  
  
  shuffle(imgDivArray);
  imgsGrid.innerHTML = "";
  imgDivArray.forEach((img) => {
    imgsGrid.appendChild(img);
  });
  
  chooseUserDiv.classList.add("hide");
  imgsGrid.classList.remove("hide");
  
  setTimeout(()=>{  
    flipCards(imgDivArray);
  }, 3000);
  
});






/* ------------ FUNCTIONS -----------------*/

function isFlipped(card) {
  return card.classList.contains("flipped-cell");
}

function flipCards(cards) {
  cards.forEach(card => card.classList.add("flipped-cell"));
}

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
  array.sort(() => Math.random() - 0.5);
}
