/** @type {HTMLCanvasElement} The game canvas element. */
let canvas;

/** @type {HTMLImageElement} Global image object. */
let img = new Image();

/** @type {World} The current game world. */
let world;

/** @type {Keyboard} Handles keyboard input states. */
let keyboard = new Keyboard();

/** @type {HTMLElement} The start menu screen. */
let menu;

/** @type {HTMLElement} The win screen. */
let win;

/** @type {HTMLElement} The game over screen. */
let gameOver;

/** @type {HTMLElement} The mute button. */
let mute;

/** @type {HTMLImageElement} The mute icon image. */
let muteImg;

/** @type {HTMLElement} The controls explanation screen. */
let controls;

/** @type {HTMLElement} The mobile controls container. */
let mobile;

/** @type {HTMLImageElement} The start menu image. */
let menuImg;

/** @type {HTMLImageElement} The game over image. */
let gameOverImg;

/** @type {HTMLImageElement} The game won image. */
let gameWonImg;

/** @type {HTMLImageElement} The controls screen image. */
let controlsImg;

/** @type {HTMLElement} The top icon button container. */
let topContainer;

/** @type {HTMLElement} The game container. */
let gameContainer;

/**
 * Initializes all important DOM elements and applies the saved mute state.
 */
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

/**
 * Starts the game and creates a new world.
 */
function startGame() {
    buttonClickSound.play();
    menu.classList.add("hidden");
    controls.classList.add("hidden");
    music.play();
    createLevel();
    world = new World(canvas, keyboard);
    checkDeviceMode();
}

/**
 * Restarts the game after win or lose.
 */
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

/**
 * Shows the controls explanation screen.
 */
function checkControls() {
    mobile.classList.add('hidden');
    menu.classList.add('hidden');
    controls.classList.remove('hidden');
}

/**
 * Returns to the main menu and stops the current game.
 */
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

/**
 * Handles keydown events and updates keyboard states.
 * 
 * @param {KeyboardEvent} event - The keydown event.
 */
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

/**
 * Handles keyup events and resets keyboard states.
 * 
 * @param {KeyboardEvent} event - The keyup event.
 */
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

/**
 * Toggles fullscreen mode for the canvas,
 * screens and game container.
 */
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

/**
 * Toggles fullscreen classes for screen images.
 */
function giveImgFullscreen() {
    menuImg.classList.toggle("fullscreen-mode");
    gameOverImg.classList.toggle("fullscreen-mode");
    gameWonImg.classList.toggle("fullscreen-mode");
    controlsImg.classList.toggle("fullscreen-mode");
}