/**
 * Prevents the browser from scrolling when the space key is pressed.
 */
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
    }
});

/**
 * Mutes all game sounds and saves the mute state.
 */
function muteAllSounds() {
    muteImg.src = "/img/img/icons/mute.png";
    localStorage.setItem("mute", "true");
    muteSoundsRight();
}

/**
 * Unmutes all game sounds and saves the unmute state.
 */
function unmuteAllSounds() {
    localStorage.setItem("mute", "false");
    muteImg.src = "/img/img/icons/unmute.png";
    unmuteSoundsRight();
}

/**
 * Checks if the game is currently muted.
 * 
 * @returns {boolean} True if the game is muted.
 */
function checkIfMuted() {
    return localStorage.getItem("mute") === "true";
}

/**
 * Updates the mute icon depending on the current mute state.
 */
function setIcon() {
    muteImg = document.getElementById("muteImg");

    const muted = "/img/img/icons/mute.png";
    const unmuted = "/img/img/icons/unmute.png";

    if (checkIfMuted()) {
        muteImg.src = muted;
    } else {
        muteImg.src = unmuted;
    }
}

/**
 * Toggles between muted and unmuted sound state.
 */
function muteOrUnmute() {
    mute.blur();

    if (checkIfMuted()) {
        unmuteAllSounds();
    } else {
        muteAllSounds();
    }
}

/**
 * Sets all sounds to volume 0 and saves their previous volume.
 */
function muteSoundsRight() {
    sounds.forEach((sound) => {
        sound.dataset.prevVolume = sound.volume;
        sound.volume = 0;
    });
}

/**
 * Restores all sounds to their previous volume.
 */
function unmuteSoundsRight() {
    sounds.forEach((sound) => {
        sound.volume = sound.dataset.prevVolume || 1;
    });
}

/**
 * Applies the saved mute state when the game starts.
 */
function applyMuteState() {
    if (checkIfMuted()) {
        muteSoundsRight();
    } else {
        unmuteSoundsRight();
    }

    setIcon();
}