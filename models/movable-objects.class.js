class movableObject extends DrawableObject {
    x = 120;
    y = 350;
    img;
    classImages = {};
    currentImage = 0;
    width = 100;
    height = 100;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;

    constructor() {
    super();
    }

    applyGravity() {
        if (this.dead) return;
        
        setInterval(()=> {
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

    loadImages(arr) {
       arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.classImages[path] = img;
       });
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    animate(images) {
        setInterval(()=>{
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.classImages[path];
            this.currentImage++;
        }, 1000/10)
        
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

    bottleColideEnemy(tb) {
        world.level.enemies.forEach((e)=> {
            return tb.x + tb.width > e.x + e.offset.left &&
            tb.y + tb.height > e.y + e.offset.top &&
            tb.x < e.x + e.width - e.offset.right &&
            tb.y < e.y + e.height - e.offset.bottom;
        })
    }
    

    
}