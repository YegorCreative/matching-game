var numberSeries = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var gameBoxBack = [];
var nodes = [];
var gameFlipper = [];
var number1;
var number2;

var cardsFlipped = 0;
/* The cards that are flipped in this moment. They can be 0, 1, 2.
** This is not the number of total cards flipped, neither the number of matches.
*/

var eventTarget1;
var eventTarget2;
var isCicleStarted = "false";
var numberOfMatches = 0;

function setEventListeners () {
  gameFlipper = document.querySelectorAll(".game__flipper");
  for (var i = 0; i < gameFlipper.length; i++) {
    var node = gameFlipper[i];
    node.addEventListener("click", flipperLogic, false);
  }
}

function flipperLogic (event) {
  if (numberOfMatches < 8) {
    if (cardsFlipped == 0 && isCicleStarted == "false") {
      isCicleStarted = "true";
      flip(event);
      cardsFlipped ++;
      number1 = event.target.nextElementSibling.classList[1];
      eventTarget1 = event.target;

    } else if (cardsFlipped == 1 && isCicleStarted == "true") {
      flip(event);
      cardsFlipped ++;
      number2 = event.target.nextElementSibling.classList[1];
      eventTarget2 = event.target;
      if (number1 != number2) {
        unflip(eventTarget1, eventTarget2);
      } else {
        cardsFlipped = 0;
        isCicleStarted = "false";
        numberOfMatches ++;
        if (numberOfMatches >= 8) {
          winningScreen();
        }
      }
    }
  }
}

function flip (evt) {
  evt.target.parentNode.setAttribute("class", "game__flipper flip");
}

function unflip (node1, node2) {
  setTimeout(function() {
    node1.parentNode.setAttribute("class", "game__flipper");
    node2.parentNode.setAttribute("class", "game__flipper");
    cardsFlipped = 0;
    isCicleStarted = "false";
  }, 1000);

}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function setSeries (nodes, numberSeries) {
  nodes = [];
  gameBoxBack = document.querySelectorAll(".game__box-back");
  for (let i = 0; i < gameBoxBack.length; i++) {
    var node = gameBoxBack[i];
    nodes.push(node);
  }
  for (let j = 0; j < nodes.length; j++) {
    for (let z = 0; z < j+1; z++) {
      nodes[j].setAttribute("class", "game__box-back " +numberSeries[z]);
    }
  }
}

function setPictures () {
  for (let i = 0; i < gameBoxBack.length; i++) {
    var num = gameBoxBack[i].classList[1];
    if (num == 1) {
      gameBoxBack[i].style.backgroundImage = "url(img/ivysaur.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 2) {
      gameBoxBack[i].style.backgroundImage = "url(img/pikachu.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 3) {
      gameBoxBack[i].style.backgroundImage = "url(img/krabby.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 4) {
      gameBoxBack[i].style.backgroundImage = "url(img/pidgeon.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 5) {
      gameBoxBack[i].style.backgroundImage = "url(img/vaporeon.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 6) {
      gameBoxBack[i].style.backgroundImage = "url(img/dugtrio.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 7) {
      gameBoxBack[i].style.backgroundImage = "url(img/jigglypuff.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    } else if (num == 8) {
      gameBoxBack[i].style.backgroundImage = "url(img/squirtle.png)";
      gameBoxBack[i].style.backgroundSize = "120px 120px";
    }
  }
}

function winningScreen () {
  var newMain = clearScreen();
  var newDiv = document.createElement("div")
  newDiv.setAttribute("class", "button__container");
  newMain.appendChild(newDiv);
  var btn = document.createElement("button");
  var text = document.createTextNode("Play again");
  btn.appendChild(text);
  newDiv.appendChild(btn);
  btn.addEventListener("click", startGame, false);
}

function createGameDiv () {
  const main = document.querySelector("main");
  const newGameDiv = document.createElement("div");
  main.appendChild(newGameDiv);
  newGameDiv.setAttribute("class", "game");
}

function createFlipperContainerDiv () {
  for (let i = 0; i < 16; i++) {
    var gameDiv = document.querySelector(".game")
    var newFlipperContainerDiv = document.createElement("div");
    gameDiv.appendChild(newFlipperContainerDiv);
    newFlipperContainerDiv.setAttribute("class", "game__flipper-container");
  }
}

function createFlipperDiv () {
  gameFlipperContainers = document.querySelectorAll(".game__flipper-container");
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    var newFlipperDiv = document.createElement("div");
    newFlipperDiv.setAttribute("class", "game__flipper")
    gameFlipperContainers[i].appendChild(newFlipperDiv);
  }
}

function createBoxes () {
  gameFlipperContainers = document.querySelectorAll(".game__flipper");
  for (let i = 0; i < gameFlipperContainers.length; i++) {
    var newBoxFront = document.createElement("div");
    newBoxFront.setAttribute("class", "game__box-front")
    var newBoxBack = document.createElement("div");
    newBoxBack.setAttribute("class", "game__box-back")
    gameFlipperContainers[i].appendChild(newBoxFront);
    gameFlipperContainers[i].appendChild(newBoxBack);
  }
}

function clearScreen () {
  document.querySelector("main").remove();
  var newMain = document.createElement("main");
  document.querySelector("body").appendChild(newMain);
  return newMain;
}

function createGameStruct () {
  clearScreen();
  createGameDiv();
  createFlipperContainerDiv();
  createFlipperDiv();
  createBoxes();
}

function startGame () {
  createGameStruct();
  shuffle(numberSeries);
  setSeries(nodes, numberSeries);
  setPictures();
  setEventListeners();
}
winningScreen();
startGame();
