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
        setInterval(()=> {
            if (this.speedY > 0 || this.isInAir()) {
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
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
    }
    
}