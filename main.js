import words from './data.json';
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const restartButton = document.querySelector('.restart')
const fullScreenPage = document.querySelector('.fullscreen');
const fullScreenElement = document.documentElement;
const timer = document.querySelector('.timer')
let minutes = 25;
let seconds = 0
let interval;



function startTimer(){
    interval = setInterval(updatedTimer,1000);
    startButton.disabled = true;
}

function updatedTimer(){
    seconds--;
    if(seconds < 0){
        seconds = 59;
        minutes--;

    }
    let minutesString = minutes.toString().padStart(2, '0');
    let secondsString = seconds.toString().padStart(2, '0');
    timer.innerText = `${minutesString}:${secondsString}`;
    if(minutes === 0 && seconds ===0){
        clearInterval(interval)
    }
}

function pauseTimer(){
    clearInterval(interval)
    startButton.disabled = false;
}

function resetTimer(){
    clearInterval(interval);
    minutes = 25;
    seconds = 0;
    timer.innerText = '25:00';
    startButton.disabled = false;
}

function toggleFullScreen(){
    if(!document.fullscreenElement){
        fullScreenElement.requestFullscreen();
    }
    else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
          }
    }
}

fetch('data.json')
  .then(response => response.json())
  .then(data=>{
    nextData(data)
  })
  .catch(error => console.error(error));

function nextData(data){
    const wordElement = document.querySelector('.word');
    const randomIndex = Math.floor(Math.random()*data.motivation.length)
    wordElement.innerHTML = `"${data.motivation[randomIndex]}"`
}


startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',pauseTimer);
restartButton.addEventListener('click',resetTimer);
fullScreenPage.addEventListener('click',toggleFullScreen);