let canvas;
let img = new Image();
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    img.src = '../img/img/9_intro_outro_screens/start/startscreen_1.png';
    console.log('my character is', world.character)
}

function startGame() {
    
}