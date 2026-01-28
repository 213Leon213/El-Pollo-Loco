let canvas;
let img = new Image();
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    img.src = '../img/img/9_intro_outro_screens/start/startscreen_1.png';
    console.log('my character is', world.character)
}

function startGame() {
    
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