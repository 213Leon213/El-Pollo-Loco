class ThrowBottle extends movableObject {

    img;
    thrown = false;
    splashes = false;
    speed = 40;
    acceleration = 4.5;

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

    constructor(x, y) {
        super().loadImage('../img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMG_THROW);
        this.loadImages(this.IMG_SPLASH);
        this.x = x;
        this.y = y;
        if (!this.splashes) {this.animate(this.IMG_THROW)} else {this.splashAnimation(this.IMG_SPLASH)};
    }

    

    splashAnimation() {
        
    }




}