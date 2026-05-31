let mobileControlsActive = false;

window.addEventListener("resize", checkDeviceMode);
window.addEventListener("orientationchange", checkDeviceMode);
window.addEventListener("load", checkDeviceMode);

function isMobileLandscape() {
    return window.matchMedia("(orientation: landscape)").matches &&
           window.matchMedia("(pointer: coarse)").matches;
}

function checkDeviceMode() {
    mobileControlsActive = isMobileLandscape();

    if (mobileControlsActive) {
        showTouchButtons();
    } else {
        hideTouchButtons();
    }
}

function showTouchButtons() {
    if (
    gameOver.classList.contains("hidden") &&
    controls.classList.contains("hidden") &&
    win.classList.contains("hidden") &&
    menu.classList.contains("hidden")
    ) {
    document.getElementById("mobile-controls").classList.remove("hidden");
    }
}

function hideTouchButtons() {
    document.getElementById("mobile-controls").classList.add("hidden");
}

leftBtn.addEventListener("touchstart", () => keyboard.LEFT = true);
leftBtn.addEventListener("touchend", () => keyboard.LEFT = false);

rightBtn.addEventListener("touchstart", () => keyboard.RIGHT = true);
rightBtn.addEventListener("touchend", () => keyboard.RIGHT = false);

jumpBtn.addEventListener("touchstart", () => keyboard.SPACE = true);
jumpBtn.addEventListener("touchend", () => keyboard.SPACE = false);

throwBtn.addEventListener("touchstart", () => keyboard.E = true);
throwBtn.addEventListener("touchend", () => keyboard.E = false);


document.getElementById("mobile-controls").addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

function makeMobileBtnResp() {
    document.getElementById('leftBtn').classList.toggle('fullscreen-mobile');
    document.getElementById('rightBtn').classList.toggle('fullscreen-mobile');
    document.getElementById('jumpBtn').classList.toggle('fullscreen-mobile');
    document.getElementById('throwBtn').classList.toggle('fullscreen-mobile');
    document.getElementById('playButton').classList.toggle('fullscreen-mobile');
    document.getElementById('controlsButton').classList.toggle('fullscreen-mobile');
    document.getElementById('gameOverRetryButton').classList.toggle('fullscreen-mobile');
    document.getElementById('gameOverBackbutton').classList.toggle('fullscreen-mobile');
    document.getElementById('gameWinRetryButton').classList.toggle('fullscreen-mobile');
    document.getElementById('gameWinBackbutton').classList.toggle('fullscreen-mobile');
    document.getElementById('controlsPlayButton').classList.toggle('fullscreen-mobile');
    document.getElementById('controlsBackButton').classList.toggle('fullscreen-mobile');
}