const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const workMinutesInput = document.getElementById('workMinutesInput');
const breakMinutesInput = document.getElementById('breakMinutesInput');

let timer=0;
let timeLeft=0;
let isBreak = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return;
    isBreak = false;
    timeLeft = parseInt(workMinutesInput.value) * 60;
    updateDisplay();
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            alert('Work session complete! Time for a break.');
            startBreak();
        }
    }, 1000);
}

function startBreak() {
    isBreak = true;
    timeLeft = parseInt(breakMinutesInput.value) * 60;
    updateDisplay();
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            alert('Break time is over! Back to work.');
            // Optionally, you can restart work timer here
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = parseInt(workMinutesInput.value) * 60;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
updateDisplay();
