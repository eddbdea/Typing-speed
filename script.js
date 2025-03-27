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
const stopTimer = 0;
const backSpace = 'Backspace';
const space = 'Space';
const aKey = 'KeyA';
const zKey = 'KeyZ';
const oneDigit = 'Digit1';
const ONE_SECOND_MS = 1000;
const TEN_SECONDS = 10;
const ONE_MINUTE_SEC = 60;
const TURTLE_SPEED = 20;
const OCTOPUS_SPEED = 40;
let score = 0;
let prwIndex = 0;
let index = 0;
let charIndex = 0;
let oneMinuteTimer = 60;
let finalString = "";
let validWord = true;

window.addEventListener('keydown', (event) => {
    if (event.code === oneDigit) {
        setTimeout(() => {
            startGame.style.display = 'none';
            wordsCounter.style.display = 'block';
            stopTimer = setInterval(timerCountdown, ONE_SECOND_MS);
        }, ONE_SECOND_MS);
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
    clearInterval(stopTimer);
    window.removeEventListener('keydown', checkWord, deleteChar, nextWord);
    showSpeedLevel(score);
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

function updateWords() {
    primaryWord.innerText = `${words[index]}`;
    secondWord.innerText = `${words[index + 1]}`;
    thirdWord.innerText = `${words[index + 2]}`;
    fourthWord.innerText = `${words[index + 3]}`;
}

updateWords();

window.addEventListener('keydown', checkWord);

function checkWord(event) {
    const currentWord = words[index];
    const wordLength = currentWord.length;
    if (event.code >= aKey && event.code <= zKey) {
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
    } else {
        nextWord();
    }
    ++prwIndex;
}

window.addEventListener('keydown', deleteChar);

function deleteChar(event) {
    const word = words[index];
    if (event.code === backSpace && charIndex > 0) {
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
    const wordLength = words[index].length;
    if (event.code === space) {
        updateScore(validWord, wordLength);
        validWord = true;
        charIndex = 0;
        prwIndex = 0;
        finalString = "";
        ++index;
        updateWords();
    }
}

function playAgain() {
    location.reload();
}