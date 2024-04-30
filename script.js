const keyEl = document.querySelector('.keyboard');
const displayEl = document.querySelector('.display-word');
const playerLivesEl = document.querySelector('.lives b');
const deadmanEl = document.querySelector('.image-content img');
const modalEl = document.querySelector('.modal-container');
const resetEl = modalEl.querySelector('button');

let currentWord, correctLetter = [], wrongGuessLetter = 0;
const lives = 6;


// ==== STEP 5 CREATE A RESET FUNCTION TO PLAY AGAIN ====//
const resetGame = () => {
  correctLetter = [];
  wrongGuessLetter = 0;
  deadmanEl.src = './images/hangman-0.svg';
  playerLivesEl.innerText = `${wrongGuessLetter} / ${lives}`;
  displayEl.innerHTML = currentWord.split('').map(() => `<li class='letter'></li>`).join('');
  keyEl.querySelectorAll('button').forEach(button => button.disabled = false);
  modalEl.classList.remove('show');  
}
// ===== STEP 2: CREATE RANDOM WORD FUNCTION =======//
const getRandomWord = () => {
  const { word, hint } = listWords[Math.floor(Math.random() * listWords.length)];
  currentWord = word;
  document.querySelector('.hint b').innerText = hint;
  displayEl.innerHTML = word.split('').map(() => `<li class='letter'></li>`).join('');
  // console.log(word)
  resetGame();
};
// ==== STEP 4: CREATE GAME OVER FUNCTION =====//
const gameOver = (isVictory) => {
  const modalText = isVictory ? 'You got it right:' : 'The correct word was:';
  modalEl.querySelector('img').src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
  modalEl.querySelector('h3').innerText = isVictory ? 'Victory earned!' : 'Brainless loser!';
  modalEl.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
  setTimeout(() => {
    modalEl.classList.add('show');
  },1000)
}
// ==== STEP 3: INITIATE GAME FUNCTION =====//
const initiateGame = (button, clickedLetter) => {
  if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, i) => {
      if(clickedLetter === letter) {
        correctLetter.push(letter)
        displayEl.querySelectorAll('li')[i].innerText = letter;
        displayEl.querySelectorAll('li')[i].classList.add('guessed');
      }
    })
  }else {
    wrongGuessLetter += 1;
    deadmanEl.src = `./images/hangman-${wrongGuessLetter}.svg`;
    playerLivesEl.innerText = `${wrongGuessLetter} / ${lives}`
    // console.log(clickedLetter, 'wrong guessed')
  }
  button.disabled = true;
  if(wrongGuessLetter === lives) return gameOver(false);
  if(currentWord.length === correctLetter.length) return gameOver(true);
}

// ===== STEP 1: CREATE ON SCREEN KEYBOARD ======//
for(let b = 97; b<= 122; b++) {
  const button = document.createElement('button')
  button.innerText = String.fromCharCode(b)
  keyEl.appendChild(button)
  button.addEventListener('click',(e) => initiateGame(e.target, String.fromCharCode(b)));
  // console.log(String.fromCharCode(b))
}

getRandomWord();
resetEl.addEventListener('click', getRandomWord);