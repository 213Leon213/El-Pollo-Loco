
/**
 * Indicates whether mobile touch controls are active.
 * @type {boolean}
 */
let mobileControlsActive = false;

window.addEventListener("resize", checkDeviceMode);
window.addEventListener("orientationchange", checkDeviceMode);
window.addEventListener("load", checkDeviceMode);

/**
 * Checks if the current device is a mobile device
 * in landscape orientation.
 * 
 * @returns {boolean} True if mobile landscape mode is active.
 */
function isMobileLandscape() {
    return window.matchMedia("(orientation: landscape)").matches &&
           window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Enables or disables mobile controls
 * depending on the current device mode.
 */
function checkDeviceMode() {
    mobileControlsActive = isMobileLandscape();

    if (mobileControlsActive) {
        showTouchButtons();
    } else {
        hideTouchButtons();
    }
}

/**
 * Displays mobile touch buttons if no
 * menu or game over screen is visible.
 */
function showTouchButtons() {
    if (
        gameOver.classList.contains("hidden") &&
        controls.classList.contains("hidden") &&
        win.classList.contains("hidden") &&
        menu.classList.contains("hidden")
    ) {
        document.getElementById("mobile-controls")
            .classList.remove("hidden");
    }
}

/**
 * Hides the mobile touch controls.
 */
function hideTouchButtons() {
    document.getElementById("mobile-controls")
        .classList.add("hidden");
}

/**
 * Enables left movement while touching the left button.
 */
leftBtn.addEventListener("touchstart", () => keyboard.LEFT = true);

/**
 * Stops left movement when touch ends.
 */
leftBtn.addEventListener("touchend", () => keyboard.LEFT = false);

/**
 * Enables right movement while touching the right button.
 */
rightBtn.addEventListener("touchstart", () => keyboard.RIGHT = true);

/**
 * Stops right movement when touch ends.
 */
rightBtn.addEventListener("touchend", () => keyboard.RIGHT = false);

/**
 * Enables jumping while touching the jump button.
 */
jumpBtn.addEventListener("touchstart", () => keyboard.SPACE = true);

/**
 * Stops jumping when touch ends.
 */
jumpBtn.addEventListener("touchend", () => keyboard.SPACE = false);

/**
 * Enables bottle throwing while touching the throw button.
 */
throwBtn.addEventListener("touchstart", () => keyboard.E = true);

/**
 * Stops bottle throwing when touch ends.
 */
throwBtn.addEventListener("touchend", () => keyboard.E = false);

/**
 * Prevents the mobile browser context menu
 * from opening on long press.
 */
document.getElementById("mobile-controls")
    .addEventListener("contextmenu", (e) => {
        e.preventDefault();
});

/**
 * Toggles responsive fullscreen classes
 * for mobile buttons and menu buttons.
 */
function makeMobileBtnResp() {
    document.getElementById('leftBtn')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('rightBtn')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('jumpBtn')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('throwBtn')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('playButton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('controlsButton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('gameOverRetryButton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('gameOverBackbutton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('gameWinRetryButton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('gameWinBackbutton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('controlsPlayButton')
        .classList.toggle('fullscreen-mobile');

    document.getElementById('controlsBackButton')
        .classList.toggle('fullscreen-mobile');
}

