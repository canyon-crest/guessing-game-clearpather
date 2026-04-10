let answer = 0;
let guessCount = 0;
let totalWins = 0; 
let scores = [];
let times = [];
let range = 0;
let wrongGuesses = 0;
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const guess = document.getElementById("guess");

playBtn.addEventListener("click", play); 
guessBtn.addEventListener("click", makeGuess); 
giveUpBtn.addEventListener("click", giveUp);

let playerName = prompt("Enter your name: ");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
msg.textContent = "Welcome, " + playerName + "! Please select a difficulty level and click Play to start.";

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaySuffix(day) {
    let dayMod100 = day % 100;
    if (dayMod100 >= 11 && dayMod100 <= 13) {
        return day + "th";
    }
    if (day % 10 === 1) {
        return day + "st";
    }
    if (day % 10 === 2) {
        return day + "nd";
    }
    if (day % 10 === 3) {
        return day + "rd";
    }
    return day + "th";
}

function time() {
    let date = new Date();
    let monthName = months[date.getMonth()];
    let dayNum = date.getDate();
    let day = getDaySuffix(dayNum);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    return monthName + " " + day + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}

function updateDateDisplay() {
    document.getElementById("date").textContent = time();
}

updateDateDisplay();
setInterval(updateDateDisplay, 1000);

function play(){
    wrongGuesses = 0;
    let levels = document.getElementsByName("level");
    for(let i = 0; i < levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    msg.textContent = playerName + ", guess a number 1-" + range;
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    guessBtn.disabled = false; 
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
    times.push(new Date());
}

function makeGuess(){
    document.getElementById("Scream").play();
    let guessVal = parseInt(guess.value);
    if(isNaN(guessVal)){
        msg.textContent = "Please enter a valid number"; 
        return;
    }
    guessCount++;
    if(guessVal == answer){
        msg.textContent = "Correct, " + playerName + "! It took " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
    }
    else if(guessVal < answer){
        wrongGuesses++;
        msg.textContent = "Too low, try again.";
        if (range!==3){
            shake(wrongGuesses);
        }
        let distance = Math.abs(guessVal - answer);
       
        if (distance <= 2) {
            msg.textContent += " You're hot!";
        } else if (distance <= 5) {
            msg.textContent += " You're warm.";
        } else {
            msg.textContent += " You're cold.";
        }
    }
    else{
        msg.textContent = "Too high, try again.";
        wrongGuesses++;
        if (range!==3){
            shake(wrongGuesses);
        }
        let distance = Math.abs(guessVal - answer);
        if (distance <= 2) {
            msg.textContent += " You're hot!";
        } else if (distance <= 5) {
            msg.textContent += " You're warm.";
        } else {
            msg.textContent += " You're cold.";
        }
    }
}

function updateScore(score){
    times[times.length - 1] = new Date() - times.at(-1);  
    let ft = document.getElementById("fastest");
    ft.textContent = "Fastest Game: " + (Math.min(...times) / 1000).toFixed(2);
    let avt = document.getElementById("avgTime");
    avt.textContent = "Average Time: " + (times.reduce((sum, e) => sum + e, 0) / times.length / 1000).toFixed(2);
    totalWins++;
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum / scores.length).toFixed(0);

    scores.sort(function(a, b){ return a - b; });

    let lb = document.getElementsByName("leaderboard"); 
    for(let i = 0; i < 3; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        } else {
            lb[i].textContent = "--";
        }
    }
}

function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    let levels = document.getElementsByName("level"); 
    for(let i = 0; i < levels.length; i++){
        levels[i].disabled = false;
    }
}

function giveUp(){
    msg.textContent = "The correct answer was " + answer + ".";
    updateScore(range);
    resetGame();
    document.getElementById("disappointmentSound").play();
}
function shake(intensity) {
    document.body.classList.add("shake");
    setTimeout(function() {
        document.body.classList.remove("shake");
    }, 500);
}