
//stores sequence of flashes
let pattern = [];
//stores user input sequnece
let playerPattern = [];
//controls the speed of the game
let gameSpeed;
//speed of button flashes
let btnSpeed;
//index of pattern array
let index;
//stored the round of the game
let level;
//determines whether player can proceed
let good;
//indicates if computer sequence or user input is running
let processControl;
//indicates if user can press buttons
let enableButtons = false;
// indicates if user has input an incorrect sequence
let incorrect;
//variable for setInterval
let intervalId;
//W3schools JS cookies - cookie to store highscore
document.cookie = 0;

//passing elements
const gameLevel = document.querySelector("#current");
const greenBtn = document.querySelector("#greenButton");
const redBtn = document.querySelector("#redButton");
const blueBtn = document.querySelector("#blueButton");
const yellowBtn = document.querySelector("#yellowButton");
const startButton = document.querySelector("#start");

// event listener for startButton - when clicked begins game calling game() function after 1 second
startButton.addEventListener('click', (event) => {
    enableButtons= true;
    document.getElementById('onOff').style.backgroundColor = "green";
    //https://www.w3schools.com/js/js_timing.asp
    setTimeout(game, 1000);
});
//game function empties arrays, sets level to 1 (first level) and
//gets random number from randomGenerator() and passes it to gameTurn
//pattern stores sequence
//gamespeed is defined by level
function game() {
    incorrect = false;
    pattern = [];
    playerPattern = [];
    index = 0;
    intervalId = 0;
    level = 1;
    gameLevel.innerHTML = level;
    good = true;
    for (var i = 0; i < 20; i++) {
      pattern.push(randomGenerator());
    }
    processControl = true;
    if(level > 5)
    {
      gameSpeed = 1000;
    }
    else if(level > 9){
      gameSpeed = 800;
    }
    else if(level >13){
      gameSpeed = 600;
    }
    else{
      gameSpeed = 500;
    }
    btnSpeed = gameSpeed/4;
    intervalId = setInterval(gameTurn, gameSpeed);
}

//stops user from enetering input
//if the array is the same size as the level(level), reset buttons and enable input
//if processControl is true flashFunction is called to execute button flashes according to pattern array
function gameTurn() {

  //enableButtons Idea from https://www.youtube.com/watch?v=n_ec3eowFLQ
  enableButtons = false;

  if (index == level) {
    clearInterval(intervalId);
    processControl = false;
    resetBtns();
    enableButtons = true;
  }
//
  if (processControl) {
    resetBtns();
    setTimeout(() => {
      flashFunction(pattern[index])
      index++;
    }, btnSpeed);
  }
}
//flashfunction takes in the index of the pattern array and flashes the corresponding button
function flashFunction(num){
  if(num===1){
    greenBtn.style.backgroundColor = "lime";
  }
  else if (num===2) {
    redBtn.style.backgroundColor = "crimson";
  }
  else if(num===3){
    blueBtn.style.backgroundColor = "deepskyblue";
  }
  else{
    yellowBtn.style.backgroundColor = "gold";
  }
}
//restores buttons to original backgroundColor
function resetBtns() {
  greenBtn.style.backgroundColor = "green";
  redBtn.style.backgroundColor = "red";
  blueBtn.style.backgroundColor = "blue";
  yellowBtn.style.backgroundColor = "yellow";
}
//flashes all buttons at the same time for use when incorrect sequnece is inputted
function flashColors() {
  greenBtn.style.backgroundColor = "lime";
  redBtn.style.backgroundColor = "crimson";
  yellowBtn.style.backgroundColor = "gold";
  blueBtn.style.backgroundColor = "deepskyblue";
}
//Idea for addEventListeners for input buttons - https://www.youtube.com/watch?v=n_ec3eowFLQ
//event listeners add button click to playerPattern array and call comparePatterns function
//also flash for 300 miliseconds
greenBtn.addEventListener('click', (event) => {
  if (enableButtons) {
    playerPattern.push(1);
    comparePatterns();
    flashFunction(1);
    if(!incorrect) {
      setTimeout(() => {
        resetBtns();
      }, 300);
    }
  }
})

redBtn.addEventListener('click', (event) => {
  if (enableButtons) {
    playerPattern.push(2);
    comparePatterns();
    flashFunction(2)
    if(!incorrect) {
      setTimeout(() => {
        resetBtns();
      }, 300);
    }
  }
})

blueBtn.addEventListener('click', (event) => {
  if (enableButtons) {
    playerPattern.push(3);
    comparePatterns();
    flashFunction(3);
    if(!incorrect) {
      setTimeout(() => {
        resetBtns();
      }, 300);
    }
  }
})

yellowBtn.addEventListener('click', (event) => {
  if (enableButtons) {
    playerPattern.push(4);
    comparePatterns();
    flashFunction(4);
    if(!incorrect) {
      setTimeout(() => {
        resetBtns();
      }, 300);
    }
  }
})
//if the input array isn't the same size as the pattern array the game is over
//cookie is used in this function to store score if it is higher than previous
//if wrong sequence is inputted, loseGame function is called
function comparePatterns() {
  if (pattern[playerPattern.length - 1] !== playerPattern[playerPattern.length - 1])
    good = false;
  if (good == false) {
    //W3Schools - JS cookies - https://www.w3schools.com/js/js_cookies.asp
    if(document.cookie < level){
        document.cookie = level;
    }
    wrongAnswer();
    playerPattern = [];
    gameLevel.innerHTML = level;
    var collapseTimer = 0;
    document.getElementById('onOff').style.backgroundColor="red";
    setTimeout(() => {
      gameLevel.innerHTML = level;
      resetBtns();
      processControl = true;
      index = 0;
      playerPattern = [];
      good = true;
      loseGame();
      }, 2000);
  }
//if correct sequence is inputted, level is incremented, player input array is emptied and
//process control is given back to computer for next pattern and gameTurn is called to repeat method
  if (level == playerPattern.length && good && !incorrect) {
    level++;
    playerPattern = [];
    processControl = true;
    index = 0;
    gameLevel.innerHTML = level;
    intervalId = setInterval(gameTurn, gameSpeed);
  }

}
//Game over function sets incorrect to true, stops user from inputting, and turns onOff light red and updates highscore
function loseGame() {
  gameLevel.innerHTML = level;
  enableButtons = false;
  incorrect = true;
  document.getElementById('onOff').style.backgroundColor="red";
  document.getElementById('highscore').innerHTML = document.cookie;
}
//Function to flash five times on game over
//tried to use iterative method to avoid hardcoding but wouldn't work with asynchronous execution of loops
function wrongAnswer(){
  setTimeout(flashColors,0);
  setTimeout(resetBtns, 300);
  setTimeout(flashColors,600);
  setTimeout(resetBtns, 900);
  setTimeout(flashColors,1200);
  setTimeout(resetBtns, 1500);
  setTimeout(flashColors,1800);
  setTimeout(resetBtns, 2100);
  setTimeout(flashColors,2400);
  setTimeout(resetBtns, 2700);
}
//generates random number to be put in pattern array
function randomGenerator(){
  return Math.floor(Math.random() * 4) + 1
}
