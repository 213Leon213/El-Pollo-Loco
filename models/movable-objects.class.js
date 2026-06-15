/**
 * Represents a movable game object.
 */
class movableObject extends DrawableObject {
    x = 120;
    y = 350;
    currentImage = 0;
    width = 100;
    height = 100;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;

    mOIntervals = [
        this.gravityInterval,
        this.leftMovementInterval,
        this.animation
    ]

    /**
     * Creates a new movable object.
     */
    constructor() {
    super();
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        if (this.dead) return;
        
    this.gravityInterval = setInterval(()=> {
            if (this.speedY > 0 || this.isInAir()) {
            this.prevY = this.y;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    /**
     * Checks if the object is in the air.
     * 
     * @returns {boolean} True if the object is in the air.
     */
    isInAir(){
        return this.y < 120;
    }

    /**
     * Loads a single image.
     * 
     * @param {string} path - The image path.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
    this.leftMovementInterval = setInterval( () => {
            if (this.on) {
            this.x -= this.speed;
            }
        }, 1000 / 60)
    }

    /**
     * Stops the left movement.
     */
    stopMoveLeft() {
        clearInterval(this.leftMovementInterval);
        this.leftMovementInterval = null;
    }

    /**
     * Animates the object with the given images.
     * 
     * @param {string[]} images - The image paths used for the animation.
     */
    animate(images) {
        if (this.animation) return;
        
        this.animation = setInterval(()=>{
            if (this.dead) {this.stopAnimation()}
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.classImages[path];
            this.currentImage++;
            
            
        }, 1000/10)
    }

    /**
     * Stops the current animation.
     */
    stopAnimation() {
        clearInterval(this.animation);
        this.animation = null;
    }

    /**
     * Checks if this object collides with another movable object.
     * 
     * @param {movableObject} mo - The object to check collision with.
     * @returns {boolean} True if both objects collide.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if this object collides with a collectible item.
     * 
     * @param {Objects} mo - The item to check collision with.
     * @returns {boolean} True if this object collides with the item.
     */
    collidesWithItems(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    }
}