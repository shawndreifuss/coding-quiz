var question = document.getElementById("questions");
var welcomePage = document.getElementById("start-container");
var containerScore = document.getElementById("score")
var formInitials = document.getElementById("initials-form")
var formEl = document.getElementById("form-container")
var containerScores = document.getElementById("score-container")
var viewHighScore = document.getElementById("view-highscores")
var listHighScore = document.getElementById("high-score-list")
var correct = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")



var questionEl = document.getElementById("question")
var answerBtns = document.getElementById("answerBtns")
var timer = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timer.innerText = 0;


var highScores = [];


var arrayQuestions
var questionIndex = 0

var startBtn = document.querySelector("#start-game");
var goBack = document.querySelector("#go-back")
var btnClear = document.querySelector("#clear-scores")





var questions = [
  { q: 'Arrays in Javascript can be used to store __________.', 
    a: '4. all of the above', 
    choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
  },
  { q: 'Commonly used data types DO not include', 
    a: '3. alerts', 
    choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
  },
  { q: 'String values must be enclodsed within _____ when being assigned to variables', 
    a: '4. parenthesis', 
    choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. parenthesis'}]
  },
  { q: 'A very useful tool used during development and debugging for printing content to the debugger is:?', 
    a: '4. console.log', 
    choices: [{choice: '1. JavaScript'}, {choice: '2. terminal'}, {choice: '3. for loops'}, {choice: '4. console.log'}]
  },
  ];






var startGame = function() {
 
  welcomePage.classList.add('hide');
  welcomePage.classList.remove('show');
  question.classList.remove('hide');
  question.classList.add('show');
  
  arrayQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}
var setTime = function () {
  timeleft = 30;

var timcheck = setInterval(function() {
  timer.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timcheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timer.innerText = 0
      clearInterval(timcheck)
  }

  }, 1000)
}
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayQuestions[questionIndex])
}

var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      answerBtns.appendChild(answerbutton)
      };
    };

var resetAnswers = function() {
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild)
  };
};


var answerCorrect = function() {
  if (correct.className = "hide") {
      correct.classList.remove("hide")
      correct.classList.add("banner")
      wrong.classList.remove("banner")
      wrong.classList.add("hide")
      }
  }  

var answerWrong = function() {
  if (wrong.className = "hide") {
      wrong.classList.remove("hide")
      wrong.classList.add("banner")
      correct.classList.remove("banner")
      correct.classList.add("hide")
  }
}







 
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayQuestions[questionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 10
      }

      else {
        answerWrong()
        score = score - 5;
        timeleft = timeleft - 5;
    };

  
    questionIndex++
      if  (arrayQuestions.length > questionIndex + 1) {
          setQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  
var showScore = function () {
    question.classList.add("hide");
    formEl.classList.remove("hide");
    formEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  containerScore.appendChild(scoreDisplay);
}       


var createScore = function(event) { 
  event.preventDefault() 
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

formInitials.reset();

var HighScore = {
initials: initials,
score: score
} 


highScores.push(HighScore);
highScores.sort((a, b) => {return b.score-a.score});


while (listHighScore.firstChild) {
 listHighScore.removeChild(listHighScore.firstChild)
}

for (var i = 0; i < highScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "high-score";
highscoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
listHighScore.appendChild(highscoreEl);
}

saveScore();
displayScores();

}

var saveScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(highScores))
      
}


var loadHighScore = function () {
  var loadScores = localStorage.getItem("HighScores")
      if (!loadScores) {
      return false;
  }

  loadScores = JSON.parse(loadScores);
  loadScores.sort((a, b) => {return b.score-a.score})


  for (var i = 0; i < loadScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerText = loadScores[i].initials + " - " + loadScores[i].score;
      listHighScore.appendChild(highscoreEl);

      highScores.push(loadScores[i]);
      
  }
}  


var displayScores = function() {

    containerScores.classList.remove("hide");
    containerScores.classList.add("show");
  gameover = "true"

  if (formEl.className = "show") {
    formEl.classList.remove("show");
    formEl.classList.add("hide");
      }
  if (welcomePage.className = "show") {
    welcomePage.classList.remove("show");
    welcomePage.classList.add("hide");
      }
      
  if (question.className = "show") {
    question.classList.remove("show");
    question.classList.add("hide");
      }

  if (correct.className = "show") {
      correct.classList.remove("show");
      correct.classList.add("hide");
  }

  if (wrong.className = "show") {
      wrong.classList.remove("show");
      wrong.classList.add("hide");
      }
  
}
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScore.firstChild) {
      listHighScore.removeChild(listHighScore.firstChild);
  }

  localStorage.clear(HighScores);

} 

loadHighScore()
  
var renderStartPage = function () {
    containerScores.classList.add("hide")
    containerScores.classList.remove("show")
    welcomePage.classList.remove("hide")
    welcomePage.classList.add("show")
    containerScore.removeChild(containerScore.lastChild)
    questionIndex = 0
    gameover = ""
    timer.textContent = 0 
    score = 0
  
    if (correct.className = "show") {
        correct.classList.remove("show");
        correct.classList.add("hide")
    }
    if (wrong.className = "show") {
        wrong.classList.remove("show");
        wrong.classList.add("hide");
    }
  }

  startBtn.addEventListener("click", startGame)
  formInitials.addEventListener("submit", createScore)
  viewHighScore.addEventListener("click", displayScores)
  goBack.addEventListener("click", renderStartPage)
  btnClear.addEventListener("click", clearScores)
