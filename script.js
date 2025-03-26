const wordArrayLength = words.length;
const primaryWord = document.getElementById('primary-word');
const secondWord = document.getElementById('secondary-word-1');
const thirdWord = document.getElementById('secondary-word-2');
const fourthWord = document.getElementById('secondary-word-3');
let charIndex = 0;
let index = 0;
let finalString = "";

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
    changeLetters(event, currentWord, wordLength);
}

function changeLetters(event, word, length) {
    if (event.key === word[charIndex] && charIndex <= length - 1)  {
        finalString = finalString + `<span class="green">${event.key}</span>`;
        updateWord(word);
    } else if (event.key != word[charIndex] && charIndex <= length - 1) {
        finalString = finalString + `<span class="red">${word[charIndex]}</span>`;
        updateWord(word);
    } else {
        nextWord();
    }
}

function updateWord(word) {
    primaryWord.innerHTML = finalString + word.slice(charIndex + 1);
    ++charIndex;
}

function nextWord() {
    charIndex = 0;
    finalString = "";
    ++index;
    updateWords();
}