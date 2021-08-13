var section = document.section;

var createQuestion = function (taskDataObj) {
  //Variable for Question
  var question = document.createElement("H1");
  var questionText = document.createTextNode("This is the first question");
  question.style.textAlign = "center";
  question.className = "body";
  question.appendChild(questionText);
  mainContent.appendChild(question);
  //Variable for list of answers
  var answersEl = document.createElement("li");
  answersEl.className = "answersLi";
};

var startQuizHandler = function startQuiz() {
  var mainContent = document.getElementsByClassName("main-content")[0];
  mainContent.innerHTML = mainContent;
  //mainContent.appendChild(createQuestion());
  console.log(mainContent);
  countdown();
};

var timerEl = document.getElementById("timer");

function countdown() {
  var timeLeft = 75;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }
  }, 1000);
}

var startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startQuizHandler);
