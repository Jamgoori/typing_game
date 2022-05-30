const GAME_TIME = 5;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordinput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
    buttonChange('loading...')
    getWords();
wordinput.addEventListener('input',checkMatch)
}

//게임실행
function run() {
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordinput.focus();
    scoreDisplay.innerText= 0;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중')
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange("게임시작")
        clearInterval(checkInterval)
    }   
}

//단어 불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    // 성공 핸들링
    response.data.forEach((word)=>{
        if(word.length<10){
            words.push(word);
        }
    })
    buttonChange('게임시작');
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
}

// 단어일치 체크
function checkMatch(){
    if(wordinput.value===wordDisplay.innerText){
        wordinput.value = "";
        if(!isPlaying){
            return;
        }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random()*words.length);
    wordDisplay.innerText = words[randomIndex]
   }
}

// setInterval(countDown,1000);
buttonChange('게임시작')



function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

