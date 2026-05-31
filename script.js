let canvas;
let img = new Image();
let world;
let keyboard = new Keyboard();
let menu;
let win;
let gameOver;
let mute;
let muteImg;
let controls;
let mobile;
let menuImg;
let gameOverImg;
let gameWonImg;
let controlsImg;
let topContainer;
let gameContainer;


function init() {
    canvas = document.getElementById('canvas');
    menu = document.getElementById('start-screen');
    menuImg = document.getElementById('start-screen-img');
    gameOverImg = document.getElementById('game-over-img');
    gameWonImg = document.getElementById('game-won-img');
    controlsImg = document.getElementById('controls-img');
    controls = document.getElementById('control-explanation');
    win = document.getElementById('game-won');
    gameOver = document.getElementById('game-over-screen');
    mute = document.getElementById('muteGame');
    mobile = document.getElementById('mobile-controls');
    topContainer = document.getElementById('top-icon-container');
    gameContainer = document.getElementById('game-container');
    applyMuteState();
    
}


function startGame() {
    buttonClickSound.play();
    menu.classList.add("hidden");
    controls.classList.add("hidden");
    music.play();
    createLevel();
    world = new World(canvas, keyboard);
    checkDeviceMode();
}

function retry() {
    world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
    world.destroyWorld();
    createLevel();
    world = new World(canvas, keyboard);
    gameOver.classList.add("hidden")
    win.classList.add("hidden");
    menu.classList.add("hidden");
    winningSound.pause();
    losingSound.pause();
    checkDeviceMode();
    music.play();
}

function checkControls() {
    mobile.classList.add('hidden');
    menu.classList.add('hidden');
    controls.classList.remove('hidden');
}

function backToMenu() {
    mobile.classList.add('hidden');
    world?.ctx?.clearRect(0, 0, world.canvas.width, world.canvas.height);
    world?.destroyWorld();
    gameOver.classList.add("hidden")
    win.classList.add("hidden");
    music.pause();
    winningSound.pause();
    losingSound.pause();
    controls.classList.add('hidden');
    menu.classList.remove("hidden");
}

document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 68:
            keyboard.D = true;
            break;
        case 65:
            keyboard.A = true;
            break;
        case 69:
            keyboard.E = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 39:
            keyboard.RIGHT = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 87:
            keyboard.W = true;
            break;
    
        default:
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 68:
            keyboard.D = false;
            break;
        case 65:
            keyboard.A = false;
            break;
        case 69:
            keyboard.E = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 39:
            keyboard.RIGHT = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 87:
            keyboard.W = false;
            break;
    
        default:
            break;
    }
});


function toggleFullscreen() {
    canvas.classList.toggle("fullscreen-mode");
    menu.classList.toggle("fullscreen-mode");
    gameOver.classList.toggle("fullscreen-mode");
    win.classList.toggle("fullscreen-mode");
    controls.classList.toggle("fullscreen-mode");
    gameContainer.classList.toggle("fullscreen-mode");
    giveImgFullscreen();
    makeMobileBtnResp();
}

function giveImgFullscreen() {
    menuImg.classList.toggle("fullscreen-mode");
    gameOverImg.classList.toggle("fullscreen-mode");
    gameWonImg.classList.toggle("fullscreen-mode");
    controlsImg.classList.toggle("fullscreen-mode");
}