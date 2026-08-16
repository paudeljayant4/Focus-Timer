let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let isBreak = false;

let sessions = 0;
let totalMinutes = 0;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const breakBtn = document.getElementById("breakBtn");

const sessionsDisplay = document.getElementById("sessions");
const minutesDisplay = document.getElementById("minutes");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timerId = setInterval(() => {
        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            isRunning = false;

            if (!isBreak) {
                sessions++;
                totalMinutes += 25;

                sessionsDisplay.textContent = sessions;
                minutesDisplay.textContent = totalMinutes;

                alert("Great job! Focus session completed.");
                startBreak();
            } else {
                alert("Break finished! Ready to focus again?");
                startFocus();
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;

    if (isBreak) {
        timeLeft = 5 * 60;
    } else {
        timeLeft = 25 * 60;
    }

    updateDisplay();
}

function startBreak() {
    clearInterval(timerId);

    isBreak = true;
    isRunning = false;
    timeLeft = 5 * 60;

    modeDisplay.textContent = "Break Time";
    breakBtn.textContent = "Back to Focus";

    updateDisplay();
}

function startFocus() {
    clearInterval(timerId);

    isBreak = false;
    isRunning = false;
    timeLeft = 25 * 60;

    modeDisplay.textContent = "Focus Session";
    breakBtn.textContent = "Start 5-Minute Break";

    updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

breakBtn.addEventListener("click", () => {
    if (isBreak) {
        startFocus();
    } else {
        startBreak();
    }
});

updateDisplay();
