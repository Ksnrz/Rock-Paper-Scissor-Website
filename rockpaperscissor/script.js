let rockBtn = document.getElementById("rock");
let paperBtn = document.getElementById("paper");
let scissorBtn = document.getElementById("scissor");
let computerOutput = "";

// JSON.parse() Convert JSON syntax to Object
// If there is no existing score data in localStorage, initialize the score object with default values
let score = JSON.parse(localStorage.getItem("saveScore")) || {
  win: 0,
  draw: 0,
  lose: 0,
};

/*
if (!score) {
    score = {
        win: 0,
        draw: 0,
        lose: 0
    };
}
*/

function startGame(input) {
  userChoice = input;
  randomOp();
  checkAndPrint();
  showScore();
  checkReset();
}

function randomOp() {
  const random = Math.floor(Math.random() * 3);
  if (random === 0) {
    computerOutput = "Rock";
  } else if (random === 1) {
    computerOutput = "Paper";
  } else {
    computerOutput = "Scissor";
  }
  return computerOutput;
}

function checkAndPrint() {
  let title = document.querySelector(".title");
  let showUser = document.querySelector(".showUser");
  let showResult = document.querySelector(".showResult");
  let showImg = document.querySelector(".imgShow");

  showImg.style.display = "initial";
  title.style.display = "none";
  if (
    (computerOutput === "Rock" && userChoice === "Paper") ||
    (computerOutput === "Paper" && userChoice === "Scissor") ||
    (computerOutput === "Scissor" && userChoice === "Rock")
  ) {
    showResult.textContent = `You Win!`;
    // Edit the code in showUser to show image of user and computer
    showUser.innerHTML = `You <img class="move-icon" src="png/${userChoice}.png"> <img class="move-icon" src="png/${computerOutput}.png">Computer`;
    score.win += 1;
    showImg.innerHTML = `<img src="/js/rockpaperscissor/png/nahiwin.jpg" class="image" />`;
  } else if (
    (computerOutput === "Rock" && userChoice === "Rock") ||
    (computerOutput === "Paper" && userChoice === "Paper") ||
    (computerOutput === "Scissor" && userChoice === "Scissor")
  ) {
    showResult.textContent = `Draw!`;
    // Edit the code in showUser to show image of user and computer
    showUser.innerHTML = `You <img class="move-icon" src="png/${userChoice}.png"> <img class="move-icon" src="png/${computerOutput}.png">Computer`;
    score.draw += 1;
    showImg.innerHTML = `<img src="/js/rockpaperscissor/png/nahidraw.jpg" class="image" />`;
  } else {
    showResult.textContent = `You Lose!`;
    // Edit the code in showUser to show image of user and computer
    showUser.innerHTML = `You <img class="move-icon" src="png/${userChoice}.png"> <img class="move-icon" src="png/${computerOutput}.png">Computer`;
    score.lose += 1;
    showImg.innerHTML = `<img src="/js/rockpaperscissor/png/nahilose.png" class="image" />`;
    // showImg.style.color = 'transparent';
  }
  localStorage.setItem("saveScore", JSON.stringify(score)); // localStorage can only use string so JSON.stringify convert other type to string
}

function resetScore() {
  score.win = 0;
  score.lose = 0;
  score.draw = 0;
  localStorage.removeItem("saveScore"); // remove saveScore
  showScore();
}

function showScore() {
  let saveScore = document.querySelector(".score");
  saveScore.textContent = `Wins: ${score.win}, Losses: ${score.lose}, Draw: ${score.draw}`;
}

function checkReset() {
  let showResetButton = document.getElementById("reset");
  if (score.win || score.lose || score.draw >= 1) {
    showResetButton.style.display = "inline-block";
  }
}

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const move = randomOp();
      startGame(move);
    }, 1500);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
  }
};
