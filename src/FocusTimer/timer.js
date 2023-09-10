import state from "./state.js";
import * as el from "./elements.js";
import { stopMode } from "./actions.js";
import { kitchenTimer } from "./sounds.js";

export function countDown() {
    clearTimeout(state.countdownId);

    if (!state.isRunning) {
        return;
    }

    let minutes = Number(el.minutes.textContent);
    let seconds = Number(el.seconds.textContent);

    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }

    if (minutes < 0) {
        stopMode();
        updateDisplay();
        kitchenTimer.play();
        return;
    }

    updateDisplay(minutes, seconds);

    state.countdownId = setTimeout(() => {
        countDown();
    }, 1000);
}

export function updateDisplay(minutes, seconds) {
    minutes = minutes ?? state.minutes;
    seconds = seconds ?? state.seconds;

    el.minutes.textContent = String(minutes).padStart(2, "0");
    el.seconds.textContent = String(seconds).padStart(2, "0");
}

export function moreMinutes() {
    let currentMinutes = Number(el.minutes.textContent);
    currentMinutes += 5;

    if (currentMinutes > 59) {
        currentMinutes = 59;
    }

    el.minutes.textContent = String(currentMinutes).padStart(2, "0");
}

export function lessMinutes() {
    let currentMinutes = Number(el.minutes.textContent);
    currentMinutes -= 5;

    if (currentMinutes < 0) {
        currentMinutes = 0;
    }

    el.minutes.textContent = String(currentMinutes).padStart(2, "0");
}
