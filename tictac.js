let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let messgRef = document.getElementById("message");


let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
   
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {element.innerText =""; element.disabled = false});
    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
      messgRef.innerHTML = "\u{1F680}; <br> 'X' Wins";
    } else {
      messgRef.innerHTML = "\u{1F680}; <br> 'O' Wins";
    }
};


const drawFunction = () => {
    disableButtons();
    messgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};


newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});


restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const makeBotMove = () => {
    let availableMoves = [];
    for (let i = 0; i < 9; i++) {
        if (btnRef[i].innerText === "") {
            availableMoves.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    btnRef[availableMoves[randomIndex]].innerText = "O";
    btnRef[availableMoves[randomIndex]].disabled = true;
    xTurn = true;
    count++;
    winChecker();
    if (count == 9) {
        drawFunction();
    }
};

const winChecker = () => {
    
    for (let i of winningPattern) {
      let [element1, element2, element3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
      ];
     
      if (element1 != "" && (element2 != "") & (element3 != "")) {
        if (element1 == element2 && element2 == element3) {
          winFunction(element1);
        }
      }
    }
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
      if (xTurn) {
        xTurn = false;
        element.innerText = "X";
        element.disabled = true;
        count += 1;
      if (count == 9) {
        drawFunction();
      }
      
      winChecker();
      if(!xTurn){
        makeBotMove();
      }
    }
});
});
  
window.onload = enableButtons;