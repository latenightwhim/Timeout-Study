const MINUTE = 60 * 1000
const SECOND = 1000
const DEFAULT_TIME = 2 * MINUTE + 30 * SECOND

const SUCCESS = "color: var(--white); background-color: var(--green);"
const FAIL = "color: var(--black); background-color: var(--red);"

var timerId = null
var inputTime = DEFAULT_TIME
var previousTimestamp
var remainingTime = DEFAULT_TIME

const main = document.querySelector('main')
const timer = document.getElementById('timer')
const resetBtn = document.getElementById('reset')
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const expandBtn = document.getElementById('expand')
const compressBtn = document.getElementById('compress')
const settingsBtn = document.getElementById('settings')

function renderTimer(time)
{
    var minutes = String(Math.floor(Math.abs(time) / MINUTE))
    var seconds = String(Math.floor((Math.abs(time) % MINUTE) / SECOND)).padStart(2, '0')
    timer.innerText = `${minutes}:${seconds}`
}

function resetTimer()
{
    remainingTime = inputTime
    renderTimer(remainingTime)

    main.style = 
    `
        color: var(--black);
        background-color: var(--gray);
    `
}

function startTimer()
{
    if(timerId) return
    
    startBtn.hidden = true
    stopBtn.hidden = false
    settingsBtn.hidden = true

    previousTimestamp = document.timeline.currentTime
    timerId = requestAnimationFrame(updateTimer)
}
function startNewTimer()
{
    cancelAnimationFrame(timerId)
    main.style = remainingTime > 0 ? SUCCESS : FAIL
    setTimeout(() => {
        timerId = null
        resetTimer()
        startTimer()
    }, 750)
}

function updateTimer(timestamp)
{
    timerId = requestAnimationFrame(updateTimer)
    var elapsedTime = timestamp - previousTimestamp
    remainingTime -= elapsedTime;
    renderTimer(remainingTime)
    previousTimestamp = timestamp
}

function stopTimer()
{
    if(!timerId) return
    
    startBtn.hidden = false
    stopBtn.hidden = true
    settingsBtn.hidden = false

    cancelAnimationFrame(timerId)
    timerId = null
}

main.addEventListener('click', () => {
    if(!timerId){
        resetTimer()
        startTimer()
        return
    }
    startNewTimer()     
})
resetBtn.addEventListener('click', () => {
    resetTimer()
})
startBtn.addEventListener('click', () => {
    startTimer()
})
stopBtn.addEventListener('click', () => {
    stopTimer()
})
expandBtn.addEventListener('click', () => {
    expandBtn.hidden = true
    compressBtn.hidden = false
    document.documentElement.requestFullscreen();
})
compressBtn.addEventListener('click', () => {
    expandBtn.hidden = false
    compressBtn.hidden = true
    document.exitFullscreen();
})

settingsBtn.addEventListener('click', () => {
    // temporary implementation
    inputTime = Number(prompt("Adjust time (in seconds)", inputTime / SECOND)) * SECOND
    if(!inputTime) inputTime = DEFAULT_TIME
    resetTimer()
    console.log(inputTime)
})
