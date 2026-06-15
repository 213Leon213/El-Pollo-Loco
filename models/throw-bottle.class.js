/**
 * Represents a throwable bottle object.
 */
class ThrowBottle extends movableObject {

    img;
    thrown = false;
    splashes = false;
    speed = 40;
    speedY = 18;
    acceleration = 4.5;
    damage = 150;

    IMG_THROW = [
        '../img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMG_SPLASH = [
        '../img/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    ]

    intervals = [
        this.throwInterval,
        this.state,
        this.fadeInterval
    ]

    /**
     * Creates a new throwable bottle.
     * 
     * @param {number} x - The start x position.
     * @param {number} y - The start y position.
     * @param {boolean} otherDirection - Indicates if the bottle should fly left.
     * @param {World} world - The current game world.
     */
    constructor(x, y, otherDirection, world) {
        super().loadImage('../img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMG_THROW);
        this.loadImages(this.IMG_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.world = world;
        this.alpha = 1;
        this.decideAnimation();
    }

    /**
     * Starts throwing the bottle.
     */
    throwB() {
        this.thrown = true;

        this.throwInterval = setInterval(() => {
            if (this.splashes) return this.stopThrow();

            this.moveBottle();
            this.checkBottleHit();
        }, 1000 / 25);
    }

    /**
     * Moves the bottle through the air.
     */
    moveBottle() {
        this.otherDirection ? this.x -= this.speed : this.x += this.speed;

        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    /**
     * Checks if the bottle hits an enemy or the ground.
     */
    checkBottleHit() {
        let hitEnemy = this.getHitEnemy(this.world.level.enemies);
        if (hitEnemy instanceof Endboss) {
            hitEnemy.endbossGOTHIT(this);
            this.stopThrow();
        }
        if (hitEnemy instanceof Chicken || hitEnemy instanceof Smallchicken) {
            hitEnemy.chickenGOTHIT(this, this.world);
            this.stopThrow();
        }
        if (this.y >= 350 || hitEnemy) {
            this.y = 350;
            this.splashes = true;
            this.stopThrow();
        }
    }

    /**
     * Stops the throw movement interval.
     */
    stopThrow() {
        clearInterval(this.throwInterval);
        this.throwInterval = null;
    }

    /**
     * Plays the splash animation.
     */
    splashAnimation() {
        if (this.splashIndex === undefined) {
            this.splashIndex = 0;
        }
        if (this.splashIndex < this.IMG_SPLASH.length) {

            this.img = this.classImages[this.IMG_SPLASH[this.splashIndex]];
            this.splashIndex++;
            if (this.splashIndex >= this.IMG_SPLASH.length) {this.fadeOut()}
        }
    }

    /**
     * Plays the bottle rotation animation.
     * 
     * @param {string[]} images - The images used for the throw animation.
     */
    throwAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.classImages[path];
        this.currentImage++;
    }

    /**
     * Decides whether the bottle should show throw or splash animation.
     */
    decideAnimation() {
        this.state = setInterval(() => {
            if (!this.splashes) {this.throwAnimation(this.IMG_THROW)}
            else {
            this.splashAnimation();
            };
        }, 1000 / 25);
    }

    /**
     * Fades the bottle out after the splash animation.
     */
    fadeOut() {
    this.fadeInterval = setInterval(() => {

        this.alpha -= 0.05;

        if (this.alpha <= 0) {
            clearInterval(this.fadeInterval);
            this.alpha = 0;
            this.remove = true;
        }

    }, 100);
}

    /**
     * Checks if the bottle collides with an enemy.
     * 
     * @param {movableObject} e - The enemy to check collision with.
     * @returns {boolean} True if the bottle collides with the enemy.
     */
bottleColideEnemy(e) {
    return  this.x + this.width > e.x + e.offset.left &&
        this.y + this.height > e.y + e.offset.top &&
        this.x < e.x + e.width - e.offset.right &&
        this.y < e.y + e.height - e.offset.bottom;
    
}

    /**
     * Returns the enemy hit by the bottle.
     * 
     * @param {movableObject[]} enemies - The enemies to check.
     * @returns {movableObject|undefined} The hit enemy or undefined.
     */
getHitEnemy(enemies) {
    return enemies.find(e => this.bottleColideEnemy(e));
}

}