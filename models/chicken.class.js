class chicken extends movableObject{

    height = 100;
    width = 90;

    IMG_WALKING = [
        '../img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]


    constructor() {
        super().loadImage('../img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMG_WALKING);
        this.speed = this.speed + Math.random() * 0.5;
        this.x = 400 + Math.random() * 200;
        this.y = 340
        this.animate();
        this.moveLeft();
        console.log(this.speed);
    }

    animate() {

        setInterval (() => {
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
            this.img = this.classImages[path];
            this.currentImage++;
        }, 1000/10)
    }
}