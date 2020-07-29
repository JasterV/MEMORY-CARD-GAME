let imgSrc = [
  { 
    pairId: 0,
    src: "patata",
  }, 
  { 
    pairId: 0,
    src: "patata",
  }, 
  { 
    pairId: 1,
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
  { 
    pairId: 2,
    src: "patata",
  }, 
];


let shuffledImgs = 


function createImgDiv(img) {
  let container = document.createElement("div");
}

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function shuffle(a) {
    var j, x, i;
  
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
  
    return a;
}

function takeRandomPos () {
  let coordX = Math.floor(Math.random() * (4) + 1);
  let coordY = Math.floor(Math.random() * (4) + 1);
  retunr
}