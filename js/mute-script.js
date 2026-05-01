document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
    }
});


function muteAllSounds() {
    muteImg.src = "/img/img/icons/mute.png";
    localStorage.setItem("mute", "true");
    muteSoundsRight();
}

function unmuteAllSounds() {
    localStorage.setItem("mute", "false");
    muteImg.src = "/img/img/icons/unmute.png";
    unmuteSoundsRight();
}

function checkIfMuted() {
    return localStorage.getItem("mute") === "true";
}

function setIcon() {
    muteImg = document.getElementById('muteImg');
    muted = "/img/img/icons/mute.png";
    unmuted = "/img/img/icons/unmute.png";
    if (checkIfMuted()) {
        muteImg.src = muted;
    } else {
        muteImg.src = unmuted;
    }
}

function muteOrUnmute() {
    mute.blur();
    if (checkIfMuted()) {
        unmuteAllSounds();
    } else {
        muteAllSounds();
    }
    
}

function muteSoundsRight() {
    sounds.forEach(s => {
        s.dataset.prevVolume = s.volume;
        s.volume = 0;
    })
}

function unmuteSoundsRight() {
    sounds.forEach(s => {
        s.volume = s.dataset.prevVolume || 1;
    });
}

function applyMuteState() {
    if (checkIfMuted()) {
        muteSoundsRight();
    } else {
        unmuteSoundsRight();
    }

    setIcon();
}