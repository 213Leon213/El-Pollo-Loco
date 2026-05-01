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

    constructor() {
    super();
    }

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

    isInAir(){
        return this.y < 120;
    }

    

    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    

    moveLeft() {
    this.leftMovementInterval = setInterval( () => {
            if (this.on) {
            this.x -= this.speed;
            }
        }, 1000 / 60)
    }

    stopMoveLeft() {
        clearInterval(this.leftMovementInterval);
        this.leftMovementInterval = null;
    }



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

    stopAnimation() {
        clearInterval(this.animation);
        this.animation = null;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    collidesWithItems(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    }

    
    

    
}