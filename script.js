let imgSrc = [
  {
    pairId: 0,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-a.svg?v=1596056821579"
  },
  {
    pairId: 1,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-9.svg?v=1596057152201"
  },
  {
    pairId: 2,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-3.svg?v=1596056909900"
  },
  {
    pairId: 3,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fhearts-a.svg?v=1596057450138"
  },
  {
    pairId: 4,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fhearts-9.svg?v=1596057343693"
  },
  {
    pairId: 5,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-9.svg?v=1596057557539"
  },
  {
    pairId: 7,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-6.svg?v=1596057225851"
  },
  {
    pairId: 8,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-3.svg?v=1596057401996"
  }
];

let playBtn = document.getElementById("play");
let chooseUserDiv = document.querySelector(".choose-username");
let imgsGrid = document.getElementById("images-grid");
let congratsDiv = document.querySelector(".congrats-container");
let playAgainBtn = document.getElementById("play-again-btn");

let imgDivArray = createGridContentArray(imgSrc);
let discoveredCards = [];
let currentUser = "";
let startTime;
let scoresController = scoreBarController("user-scores");

imgDivArray.forEach(targetCard => {
  targetCard.addEventListener("click", () => {
    if (isFlipped(targetCard)) {
      targetCard.classList.remove("flipped-cell");

      if (discoveredCards.length % 2 == 0) {
        discoveredCards.push(targetCard);
      } else {
        let lastCard = discoveredCards[discoveredCards.length - 1];
        if (areEqualCards(targetCard, lastCard)) {
          discoveredCards.push(targetCard);

          if (isGameEnd(discoveredCards, imgDivArray)) {
            setTimeout(() => {
              finishGame(currentUser);
            }, 300);
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
  if (isValidUsername(username)) {
    currentUser = username;
    startTime = Date.now();

    scoresController.createPlayingUser(username);

    shuffle(imgDivArray);

    imgsGrid.innerHTML = "";
    imgDivArray.forEach(img => {
      imgsGrid.appendChild(img);
    });

    chooseUserDiv.classList.add("hide");
    imgsGrid.classList.remove("hide");

    setTimeout(() => {
      flipCards(imgDivArray);
    }, 3000);
  }
});

playAgainBtn.addEventListener("click", () => {
  currentUser = "";
  discoveredCards = [];
  congratsDiv.classList.add("hide");
  chooseUserDiv.classList.remove("hide");
  document.getElementById("username").value = "";
});

/*--------------------------------------------------*/
/*-------------------- OBJECTS ---------------------*/
/*--------------------------------------------------*/

function scoreBarController(barId) {
  let scoresBar = document.getElementById(barId);

  return {
    getUser(username) {
      return document.querySelector(`[data-username=${username}]`);
    },

    hasUser(username) {
      let userContainer = this.getUser(username);
      return userContainer !== null;
    },

    createPlayingUser(username) {
      if (this.hasUser(username)) {
        let userContainer = this.getUser(username);
        userContainer.remove();
        userContainer.lastElementChild.textContent = "Currently playing...";
        scoresBar.insertAdjacentElement("afterbegin", userContainer);
      } else {
        let userContainer = createUserScoreDiv(username);
        if (scoresBar.childElementCount == 5) {
          scoresBar.lastElementChild.remove();
        }
        scoresBar.insertAdjacentElement("afterbegin", userContainer);
      }
    },

    setUserTime(username, seconds) {
      if (this.hasUser(username)) {
        let userContainer = this.getUser(username);
        userContainer.lastElementChild.textContent = `${seconds} seconds`;
      }
    }
  };
}

function createUserScoreDiv(username) {
  let container = document.createElement("div");
  container.setAttribute("data-username", username);
  container.innerHTML = `<h2>${username}</h2> <p>Currently playing...</p>`;
  return container;
}

/*--------------------------------------------------*/
/*----------------- USEFULL FUNCTIONS --------------*/
/*--------------------------------------------------*/

function isGameEnd(discoveredCards, cards) {
  return discoveredCards.length === cards.length;
}

function finishGame(username) {
  let finalTimeSpan = document.getElementById("user-seconds");
  let totalSeconds = (Date.now() - startTime) / 1000;
  finalTimeSpan.textContent = `${totalSeconds} seconds`;

  scoresController.setUserTime(username, totalSeconds);

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

// Placeholder fade
var usernameInput = document.getElementById("username");
var placeholder = document.getElementById("placeholder");

usernameInput.addEventListener("focusin", () => {
  if (usernameInput.value == "") {
    placeholder.style.opacity = "0";
  }
});

usernameInput.addEventListener("focusout", () => {
  if (usernameInput.value == "") {
    placeholder.style.opacity = "1";
  }
});
