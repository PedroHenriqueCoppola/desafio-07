import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";

export function runMode() {
    state.isRunning = document.documentElement.classList.toggle("running");

    timer.countDown();

    sounds.buttonPressAudio.play();
}

export function stopMode() {
    state.isRunning = false;
    document.documentElement.classList.remove("running");

    sounds.buttonPressAudio.play();
}

export async function plusMode() {
    timer.moreMinutes();
}

export function minusMode() {
    timer.lessMinutes();
}

export function set() {
    el.minutes.setAttribute("contenteditable", true);
    el.minutes.focus();
}

let activeButton = null;
let activeAudio = null;

export function toggleButton(buttonElement, audioElement) {
    if (activeButton === buttonElement) {
        buttonElement.classList.remove("musicon");
        activeButton = null;
        audioElement.pause();
        audioElement.currentTime = 0;
    } else {
        if (activeButton) {
            activeButton.classList.remove("musicon");
            activeButton = null;
            activeAudio.pause();
            activeAudio.currentTime = 0;
        }

        buttonElement.classList.add("musicon");
        activeButton = buttonElement;
        audioElement.play();
        activeAudio = audioElement;
    }
}

export function treeMusic() {
    toggleButton(el.tree, sounds.forestAudio);
}

export function rainMusic() {
    toggleButton(el.rain, sounds.rainAudio);
}

export function shopMusic() {
    toggleButton(el.shop, sounds.coffeeAudio);
}

export function fireMusic() {
    toggleButton(el.fire, sounds.fireAudio);
}
