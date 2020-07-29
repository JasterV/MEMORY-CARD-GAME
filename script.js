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

let startTime;

let playBtn = document.getElementById("play");
let chooseUserDiv = document.querySelector(".choose-username");
let imgsGrid = document.getElementById("images-grid");
let congratsDiv = document.querySelector(".congrats-container");

let imgDivArray = createGridContentArray(imgSrc);
let discoveredCards = [];
let currentUser = "";


imgDivArray.forEach(targetCard => {
  targetCard.addEventListener("click", () => {
    if(isFlipped(targetCard)) {
        targetCard.classList.remove("flipped-cell");
        
        if(discoveredCards.length % 2 == 0) {
          discoveredCards.push(targetCard);
        }else {
          let lastCard = discoveredCards[discoveredCards.length - 1];
          if(areEqualCards(targetCard, lastCard)) {
            discoveredCards.push(targetCard);
            
            if(isGameEnd(discoveredCards, imgDivArray)) {
              finishGame(currentUser);
            }
            
          } else {
            discoveredCards.pop();
            
            setTimeout(() => {
              lastCard.classList.add("flipped-cell");
              targetCard.classList.add("flipped-cell");
            }, 500);
            
          }
        }
    }
  });
});

playBtn.addEventListener("click", () => {
  
  let username = document.getElementById("username").value;
  if(isValidUsername(username)) {
    currentUser = username;
    startTime = Date.now();
    
    shuffle(imgDivArray);
    
    imgsGrid.innerHTML = "";
    imgDivArray.forEach((img) => {
      imgsGrid.appendChild(img);
    });

    chooseUserDiv.classList.add("hide");
    imgsGrid.classList.remove("hide");

    setTimeout(()=> {  
      flipCards(imgDivArray);
    }, 3000);
  }
});


/* ------------ FUNCTIONS -----------------*/

function isGameEnd(discoveredCards, cards) {
  return discoveredCards.length === cards.length;
}


function finishGame(username){
  let finalTimeSpan = document.getElementById("user-seconds");
  let totalSeconds =  (Date.now() - startTime) / 1000;
  finalTimeSpan.textContent = `${totalSeconds} seconds`;
  
  imgsGrid.classList.add("hide");
  congratsDiv.classList.remove("hide");
}
  
function areEqualCards(card1, card2) {
  return card1.getAttribute("data-pair") === card2.getAttribute("data-pair");
}

function isValidUsername(name) {
  return name !== undefined && name.trim() !== ""; 
}

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
