// super cool questions with set answers
var questions = [{
    
    title: "What are the three core Programing languages that build websites?",
    choices: ["Klingon, French and Morse code", "English, Parseltongue and Pig latin", "HTML, CSS and JavaScript", "HTML, COW and SCRATH" ],
    answer: "HTML, CSS and JavaScript"
},
{
    title: "What do you call a group of Lizards?",
    choices: ["List", "Orchestra", "Army", "Lounge"],
    answer: "Lounge"
},
{
    title: "What is the Largest spider in the world?(by weight)",
    choices: ["Brown recluse", "Goliath birdeater", "Daddy Long Legs", "Shelob"],
    answer: "Goliath birdeater"
},
{
    title: "Seatlle Washington hit a record high temperature of 108⁰ F in what year?",
    choices: ["2020", "2021", "2017", "c115,000"],
    answer: "2021"
},
{
    title: "What is Arizona's State Tie?",
    choices: ["Neck-tie", "Bow-tie", "Bolo-tie", "Rattlesnake"],
    answer: "Bolo-tie"
}
]

//score and timer set
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer = null;



//starts the countdown timer once user clicks the 'start' button
function start() {
    

    // timer function

timeLeft = 60;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //if time reaches 0 end game function
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

// dynamic script
var quizContent = `
<h2>Game over!</h2>
<h3> WOW you got ` + score +  ` /5!</h3>

<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}


//LOCAL Storage function TODO: deaal with last
//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// retrieve from local storage
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="ClearScore()">CLEAR</button><button onclick="resetGame()">Play Again</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}


function ClearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;


// start screen after you've already played
var quizContent = `
<h1>So it's time to retake the Super Cool Quiz!</h1>
<h3>Want to play more?</h3>
<h3>Want to be on the Leaderboard?<h3>
<button onclick="start()">PlayHARDERthisTime</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

// incorrect answers deduct 10s
//  incorect answers 0 points
function incorrect() {
timeLeft -= 10; 
next();
// console.log(incorrect)
}

// if correct +1 point
// if correct no time change

function correct() {
score += 1;
next();
// console.log(correct)
}

//Bridge to next question
function next() {
currentQuestion++;




// I kept getting my score by the index value so it was always 1 short
// so I just added it to the end of game still bugged if you get 0 correct 
// ^^^^lol I had an unwanted space at the start of a string!!

if (currentQuestion > questions.length -1 ) {
    
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
// dynamic button loop


for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
