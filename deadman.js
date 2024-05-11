// =====CREATE VARIBLE TO QUERY ELEMENTS IN DOM======//
const keyboardEl = document.querySelector('.keyboard');
console.log(keyboardEl)


// ==== STEP 2 CREATE FETCH RANDOM WORD FUNCTION ====//
const fetchRandomWord = () => {
  
}












// ====== STEP 1 CREATE DYNAMIC KEYBOARD USING STRING-CHARACTER ====//
for(let b = 97; b<= 122; b++) {
  const button = document.createElement('button');
  button.textContent = String.fromCharCode(b);
  keyboardEl.appendChild(button);
  button.addEventListener('click',(e) => initiateGame(e.target, String.fromCharCode(b)));
}