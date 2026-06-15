/**
 * Represents a small chicken enemy.
 */
class Smallchicken extends movableObject{

    height = 100;
    width = 90;
    damage = 10;
    on = true;
    
    IMG_WALKING = [
        '../img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMG_DEAD = [
        '../img/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new small chicken enemy.
     */
    constructor() {
        super().loadImage('../img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMG_WALKING);
        this.speed = this.speed + Math.random() * 0.7;
        this.x = 720 + Math.random() * 1000;
        this.y = 340;
        this.animate(this.IMG_WALKING);
        this.moveLeft(this);
    }

    offset = {
        top: 10,
        bottom: 10,
        right: 5,
        left: 5
    }

    /**
     * Plays the death animation and removes the small chicken from the level.
     * 
     * @param {World} world - The current game world.
     */
    chickenDiesAnimation(world) {
       chickenDiesSound.play();
       this.deadInterval = setInterval(() => {
           this.img.src = "../img/img/3_enemies_chicken/chicken_small/2_dead/dead.png";
       },100)
       setTimeout(() => {
            clearInterval(this.deadInterval);
            this.deadInterval = null;
            world.level.enemies = world.level.enemies.filter(e => e !== this);
       },2000);
    }
        
    /**
     * Handles the small chicken getting hit by a bottle.
     * 
     * @param {ThrowBottle} bottle - The bottle that hit the small chicken.
     * @param {World} world - The current game world.
     */
    chickenGOTHIT(bottle, world) {
        bottle.splashes = true;
        this.on = false;
        this.chickenDiesAnimation(world);
    }

    
    
}