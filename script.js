let imgSrc = [
  { 
    pairId: 0,
    src: "patata",
  }, 
  { 
    pairId: 1,
    src: "patata",
  },
  { 
    pairId: 2,
    src: "patata",
  }, 
];

let imgPairs = doubleContent(imgSrc);
let shuffledImgs = shuffle(imgPairs);




function createImgDiv(img) {
  let container = document.createElement("div");
  container.setAttribute("data-pair", img.pairId);
  container.style.backgroundImage = img.src;
  
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
