class Endboss extends movableObject{

    height = 500;
    width = 300;
    

    Images_WALKING = [
        "../img/img/4_enemie_boss_chicken/1_walk/G1.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G2.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G3.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    constructor() {
        super().loadImage(this.Images_WALKING[0]);
        this.loadImages(this.Images_WALKING);
        this.speed = this.speed + Math.random() * 0.5;
        this.x = 720 * 7;
        this.y = -45;
        this.animate(this.Images_WALKING);
    }
}