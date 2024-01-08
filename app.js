var timer = null
var targetTime = 5 * 60 * 1000
var previousTime
var remainingTime = targetTime
var solved = 0

document.querySelector('.timer-container').addEventListener('click', ()=> {
  if(timer){
    clearInterval(timer)
    if(remainingTime > 0){
      solved++
      document.getElementById('solved').innerText = solved
      styleTimer()
    }
    setTimeout(startNewTimer, 500)
  }
  startTimer()
})

function startTimer(){
  if(timer) return
  previousTime = new Date().getTime()
  timer = setInterval(updateTimer, 50)
}
function startNewTimer(){
  if(!timer) return
  remainingTime = targetTime
  clearInterval(timer)
  timer = null
  startTimer()
}
function updateTimer(){
  var currentTime = new Date().getTime()
  var elapsedTime = currentTime - previousTime
  remainingTime -= elapsedTime
  previousTime = currentTime

  styleTimer(remainingTime)
  document.getElementById('timer').innerText = formatTime(Math.abs(remainingTime))
}
function stopTimer(){
  if(!timer) return
  clearInterval(timer)
  timer = null
}
function formatTime(remainingTime) {
    let hours = Math.floor(remainingTime / 3600000);
    let minutes = Math.floor((remainingTime % 3600000) / 60000);
    let seconds = Math.floor((remainingTime % 60000) / 1000);
    let milliseconds = Math.floor((remainingTime % 1000) / 100);
  
    // Pad with '0' if necessary
    const pad = (num) => (num < 10 ? `0${num}` : num);
    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    } else if (minutes > 0 || seconds >= 10) {
      return `${minutes}:${pad(seconds)}`;
    } else {
      return `${seconds}.${milliseconds}`;
    }
}

function styleTimer(remainingTime){
  var timerContainer = document.querySelector('.timer-container')
  if(!remainingTime){
    timerContainer.classList.remove('time-low', 'time-over')
    timerContainer.classList.add('solved')
    return
  }
  if(remainingTime < 0){
    timerContainer.classList.remove('solved', 'time-low')
    timerContainer.classList.add('time-over')
  }
  else if(remainingTime < 10 * 1000){
    timerContainer.classList.remove('solved', 'time-over')
    timerContainer.classList.add('time-low')
  }
  else{
    timerContainer.classList.remove('solved', 'time-low', 'time-over')
  }
}

document.getElementById('settings').addEventListener('click', () => {
  stopTimer()
  document.querySelector('dialog').open = true
})
document.querySelector('dialog').addEventListener('submit', (event) => {
  var form = event.target
  var minutes = form[0].value
  var seconds = form[1].value
  remainingTime = targetTime = minutes * 60 * 1000 + seconds * 1000
  document.getElementById('timer').innerText = formatTime(targetTime)
})
document.getElementById('pause').addEventListener('click', stopTimer)
document.getElementById('pass').addEventListener('click', startNewTimer)