const BACKSPACE = 'Backspace';
const SPACE = 'Space';
const A_KEY = 'KeyA';
const Z_KEY = 'KeyZ';
const ONE_DIGIT = 'Digit1';
const ONE_SECOND_MS = 1000;
const TEN_SECONDS = 10;
const ONE_MINUTE_SEC = 60;
const TURTLE_SPEED = 20;
const OCTOPUS_SPEED = 40;
const TWO_HUNDRED = 200;

const wordArrayLength = words.length;
const primaryWord = document.getElementById('primary-word');
const secondWord = document.getElementById('secondary-word-1');
const thirdWord = document.getElementById('secondary-word-2');
const fourthWord = document.getElementById('secondary-word-3');
const timerElement = document.getElementById('seconds');
const scoreElement = document.getElementById('score');
const wordsCounter = document.getElementById('words-counter');
const startGame = document.getElementById('start-game');
const resultsContainer = document.getElementById('results');
const gameResults = document.getElementById('game-result');
const previousWord = [];
let stopTimer = 0;
let score = 0;
let prwIndex = 0;
let charIndex = 0;
let oneMinuteTimer = 60;
let finalString = "";
let validWord = true;
let firstWordIndex = randomWord();
let secondWordIndex = randomWord();
let thirdWordIndex = randomWord();
let fourthWordIndex = randomWord();

window.addEventListener('keydown', (event) => {
    if (event.code === ONE_DIGIT) {
        setTimeout(() => {
            startGame.style.display = 'none';
            wordsCounter.style.display = 'block';
        }, ONE_SECOND_MS);
        stopTimer = setInterval(timerCountdown, ONE_SECOND_MS);
        window.addEventListener('keydown', checkWord);
    }
}, {once : true});

function timerCountdown() {
    --oneMinuteTimer;
    if (oneMinuteTimer === 0) {
        finalResult(); 
    } else {
        updateTimer(oneMinuteTimer);
    }
}

function updateTimer(time) {
    if (time < TEN_SECONDS) {
        timerElement.innerText = '0' + time;
    } else { 
        timerElement.innerText = time;
    }
}

function finalResult() {
    oneMinuteTimer = ONE_MINUTE_SEC;
    wordsCounter.style.display = 'none';
    resultsContainer.style.display = 'block';
    removeEvents();
    clearInterval(stopTimer);
    showSpeedLevel(score);
}

function removeEvents() {
    window.removeEventListener('keydown', deleteChar);
    window.removeEventListener('keydown', checkWord);
    window.removeEventListener('keydown', nextWord);
}

function showSpeedLevel(wordsPerMinute) {
    if (wordsPerMinute <= TURTLE_SPEED) {
        gameResults.innerText = 'Well..You type with the speed of ' + 
                                score + 'WPM! You are a TURTLE!';
    } else if (wordsPerMinute <= OCTOPUS_SPEED) {
        gameResults.innerText = 'Well..You type with the speed of ' + 
                                score + 'WPM! You are an OCTOPUS!';
    } else {
        gameResults.innerText = 'Well..You type with the speed of ' + 
                                score + 'WPM! You are a CHEETAH!';
    }
}

function randomWord() {
    return Math.floor(Math.random() * TWO_HUNDRED);
}

function generateWords() {
    primaryWord.innerText = `${words[firstWordIndex]}`;
    secondWord.innerText = `${words[secondWordIndex]}`;
    thirdWord.innerText = `${words[thirdWordIndex]}`;
    fourthWord.innerText = `${words[fourthWordIndex]}`;
}

generateWords();

function updateWords() {
    firstWordIndex = secondWordIndex;
    secondWordIndex = thirdWordIndex;
    thirdWordIndex = fourthWordIndex;
    fourthWordIndex = randomWord();
    if (fourthWordIndex === thirdWordIndex) {
        fourthWordIndex = randomWord();
    }
    generateWords();
}

function checkWord(event) {
    const currentWord = words[firstWordIndex];
    const wordLength = currentWord.length;
    if (event.code >= A_KEY && event.code <= Z_KEY) {
        changeLetters(event, currentWord, wordLength);
    }
}

function changeLetters(event, word, length) {
    previousWord[prwIndex] = finalString;
    if (event.key === word[charIndex] && charIndex <= length - 1)  {
        finalString = finalString + `<span class="correct">${event.key}</span>`;
        updateWord(word);
    } else if (event.key != word[charIndex] && charIndex <= length - 1) {
        finalString = finalString + `<span class="wrong">${word[charIndex]}</span>`;
        validWord = false;
        updateWord(word);
    } 
    ++prwIndex;
}

window.addEventListener('keydown', deleteChar);

function deleteChar(event) {
    const word = words[firstWordIndex];
    if (event.code === BACKSPACE && charIndex > 0) {
        primaryWord.innerHTML = previousWord[prwIndex - 1] + word.slice(charIndex - 1);
        finalString = previousWord[prwIndex - 1];
        validWord = true;
        --prwIndex;
        --charIndex;
    }
}

function updateWord(word) {
    primaryWord.innerHTML = finalString + word.slice(charIndex + 1);
    ++charIndex;
}

window.addEventListener('keydown', nextWord);

function updateScore(validWord, wordLength) {
    if (validWord === true && wordLength === charIndex) {
        ++score;
        scoreElement.innerText = score;
    }
}

function nextWord(event) {
    const wordLength = words[firstWordIndex].length;
    if (event.code === SPACE) {
        updateScore(validWord, wordLength);
        validWord = true;
        charIndex = 0;
        prwIndex = 0;
        finalString = "";
        updateWords();
    }
}

function playAgain() {
    location.reload();
}