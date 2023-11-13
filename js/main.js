// Players try to be the first to reach a certain score by rolling a number and drawing cards. each player takes turns
// summoning a card then the first one to reach 0 wins.


//getting the API
let deckID = '';
const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckID = data.deck_id;
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

let generatedNumber;
let playerTurn;
document.querySelector('#randomNumBtn').addEventListener('click',generateNumber)
const generateBtn = document.querySelector('#randomNumBtn');
const player1 = document.querySelector('#player1Btn');
const player2 = document.querySelector('#player2Btn');
player1.disabled = true;
player2.disabled = true;
player2.style.background = 'black';
player1.style.background = 'black'

let buttonClicked = false;

function generateNumber(){

  generateBtn.disabled = true;
  generateBtn.innerText = 'Generated!'
  generateBtn.style.background = 'black'
  generatedNumber = Math.round(Math.random() * 100)
  document.querySelector('#numberContainer').innerText = generatedNumber;
  buttonClicked = true;
  let turn = whosTurn();
  alert('First turn is randomized')
  if(turn === 0){
    player1.disabled = false;
    player1.style.background = 'red'
    alert('Player 1 goes first')
  }else {
    player2.disabled = false;
    player2.style.background = 'red'
    alert('Player 2 goes first')
  }
}
document.querySelector('#player1Btn').addEventListener('click', () => {
  
  if(buttonClicked){
    drawCardPlayer1();
    player2.disabled = false;
    player1.disabled = true;
    player2.style.background = 'red';
    player1.style.background = 'black';
  }else {
    alert('Generate Number first!')
  }


});
document.querySelector('#player2Btn').addEventListener('click', () => {

  if(buttonClicked){
    drawCardPlayer2();
    player1.disabled = false;
    player2.disabled = true
    player2.style.background = 'black';
    player1.style.background = 'red';
  }else {
    alert('Generate Number First!')
  }

});

function drawCardPlayer1(){

fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('#player1Img').src = data.cards[0].image
    let retCardNum = Number(cardNumber(data.cards[0].value))
    pigGameMath(retCardNum);
    playerTurn = 1;
    if(generatedNumber === 0){

      alert(`Player : ${playerTurn} is the Winner!`)
      document.querySelector('h1').innerText = `Player : ${playerTurn} is the Winner!`
      player1.disabled = true;
      player2.disabled = true;
      document.querySelector('h5').innerText = 'Please refresh the page!'
      player2.style.background = 'black';
      player1.style.background = 'black';
   }
   })
  .catch(err => {
      console.log(`error ${err}`)
   });
}
  
function drawCardPlayer2(){
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
       console.log(data)
       document.querySelector('#player2Img').src = data.cards[0].image
       let retCardNum = Number(cardNumber(data.cards[0].value))
       pigGameMath(retCardNum);
       playerTurn = 2;
       if(generatedNumber === 0){

          alert(`Player : ${playerTurn} is the Winner!`)
          document.querySelector('h1').innerText = `Player : ${playerTurn} is the Winner!`
          player1.disabled = true;
          player2.disabled = true;
          document.querySelector('h5').innerText = 'Please refresh the page!'
       }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function whosTurn(){
  
  let num = Math.round(Math.random() * 1);
  return num;
}

function pigGameMath(num){

  if(generatedNumber === 1 && num === 14){
    generatedNumber = 0
  }else if(generatedNumber - num < 0){
    return
  }else {
    generatedNumber = generatedNumber - num;
  }

  document.querySelector('#numberContainer').innerText = generatedNumber;
}

function cardNumber(card){

  if(card === 'JACK'){
    return 11;
  }else if(card === 'QUEEN'){
    return 12;
  }else if(card === 'KING'){
    return 13;
  }else if(card === 'ACE'){
    return 14;
  }else{
    return card;
  }

}
