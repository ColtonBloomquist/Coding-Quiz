var timeLeft = 75;
var questionIndex = 0;
var score = 0;
var mostRecentAnswer;

var highScores = [];

var questions = [
  {
    question: "Commonly used data types Do Not include:",
    answer: "alerts",
    options: ["strings", "booleans", "alerts", "numbers"],
  },
  {
    question:
      "The condition in an if / else statement is enclosed with ______:",
    answer: "parenthesis",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    answer: "all of the above",
    options: [
      "numbers to strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
  },

  {
    question:
      "String values must be enclosed within _____ when being assigned to variables:",
    answer: "quotes",
    options: ["commas", "curly brackets", "quotes", "paranthesis"],
  },

  {
    question:
      "A very  useful tool used during development and debugging for printing content to the debugger is:",
    answer: "console.log",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
  },
];

var createQuestion = function (questionData) {
  //Variable for Question
  console.log(questionData);
  var question = document.createElement("h1");
  var questionText = document.createTextNode(questionData.question);
  question.style.textAlign = "center";
  question.className = "body";
  question.appendChild(questionText);
  //section.appendChild(question);
  //Variable for list of answers
  var optionsElementList = document.createElement("div");
  optionsElementList.className = "btn-grid";
  questionData.options.forEach((element) => {
    console.log(element);
    var buttonEl = document.createElement("button");
    buttonEl.className = "option-btn general-btn";
    buttonEl.textContent = element;
    buttonEl.addEventListener("click", () =>
      optionSelectedHandler(questionData.answer, element)
    );
    optionsElementList.appendChild(buttonEl);
  });
  var mostRecentAnswerElement = document.createElement("div");
  mostRecentAnswerElement.textContent = mostRecentAnswer;
  question.appendChild(optionsElementList);
  question.appendChild(mostRecentAnswerElement);
  return question;
};

var optionSelectedHandler = function (answer, selectedOption) {
  console.log(
    "Selected Option:",
    selectedOption,
    " Correct Answer: ",
    answer,
    "Is it wrong:",
    answer !== selectedOption
  );

  if (answer !== selectedOption) {
    answeredIncorrectly();

    mostRecentAnswer = "Wrong!";
  }
  if (answer === selectedOption) {
    mostRecentAnswer = "Correct!";
  }
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    nextQuestion();
  } else {
    endQuiz();
  }
};

var nextQuestion = function () {
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  mainContent.appendChild(createQuestion(questions[questionIndex]));
  console.log("next question called");
};

var startQuizHandler = function startQuiz() {
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  mainContent.appendChild(createQuestion(questions[questionIndex]));
  countdown();
};

var timerEl = document.getElementById("timer");
var timeInterval;

function countdown() {
  score = timeLeft;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    console.log(timeLeft);
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      endQuiz();
    }
  }, 1000);
}

var allDone = function () {
  var allDoneContainer = document.createElement("div");
  var allDoneBanner = document.createElement("h1");
  allDoneBanner.textContent = "All done!";
  var allDoneScoreLabel = document.createElement("div");
  allDoneScoreLabel.textContent = "Your final score is: " + timeLeft;
  var allDoneInitials = document.createElement("span");
  allDoneInitials.textContent = "Enter initials";
  var allDoneInput = document.createElement("input");
  allDoneInput.id = "initial-input";
  var allDoneButton = document.createElement("button");
  allDoneButton.textContent = "submit";
  allDoneButton.addEventListener("click", goToHighScore);
  allDoneInitials.append(allDoneInput, allDoneButton);
  allDoneContainer.append(allDoneBanner, allDoneScoreLabel, allDoneInitials);
  return allDoneContainer;
};

var createHighScore = function () {
  var highScore = document.createElement("h1");
  highScore.textContent = "High Scores";
  var displayHighScore = document.createElement("div");
  displayHighScore.className = "high-score-container";
  highScores.forEach((element) => {
    var initialsLabel = document.createElement("span");
    initialsLabel.textContent = element.initials + " - " + element.score;
    displayHighScore.appendChild(initialsLabel);
  });
  var clearHighscoresButton = document.createElement("button");
  clearHighscoresButton.textContent = "Clear highscores";
  clearHighscoresButton.onclick = clearHighScores;
  var returnButton = document.createElement("button");
  returnButton.textContent = "Go Back";
  returnButton.onclick = function () {
    console.log("return clicked");
    window.parent.location = "index.html";
  };

  highScore.appendChild(displayHighScore);
  highScore.appendChild(returnButton);
  highScore.appendChild(clearHighscoresButton);
  return highScore;
};

var clearHighScores = function () {
  highScores = [];
  saveHighScoreData();

  viewHighScores();
};
var viewHighScores = function () {
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  console.log("viweing high scores");
  mainContent.appendChild(createHighScore());
};
var saveHighScore = function () {
  //get input and get initials from input
  //save high score
  var inputElement = document.getElementById("initial-input");
  var newHighScore = {
    initials: inputElement.value,
    score: timeLeft,
  };
  highScores.push(newHighScore);
  saveHighScoreData();
};

var loadHighScoreData = function () {
  highScores = JSON.parse(localStorage.getItem("highscores") || "[]");
};

var saveHighScoreData = function () {
  localStorage.setItem("highscores", JSON.stringify(highScores));
};

var goToHighScore = function () {
  saveHighScore();
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  mainContent.appendChild(createHighScore());
};

function endQuiz() {
  timerEl.textContent = timeLeft;
  clearInterval(timeInterval);
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  mainContent.appendChild(allDone());
  // mainContent.appendChild(createHighScore());
  console.log(mainContent);
}

function answeredIncorrectly() {
  timeLeft -= 10;
  console.log("answered incorectly");
}

//answeredIncorrectly();
var startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startQuizHandler);
loadHighScoreData();
var viewHighScoresElement = document.getElementById("high-scores");

viewHighScoresElement.addEventListener("click", viewHighScores);
