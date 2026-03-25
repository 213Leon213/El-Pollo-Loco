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

    throwB() {
        this.thrown = true;
        this.throwInterval = setInterval(() => {
            if (this.splashes) {
                clearInterval(this.throwInterval);
                return;
            }
            if (this.otherDirection) {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            let hitEnemy = this.getHitEnemy(this.world.level.enemies);
            if (hitEnemy instanceof Endboss) {
                this.splashes = true;
                hitEnemy.endbossGOTHIT(this);
                clearInterval(this.throwInterval);
            }
            if (this.y >= 350 && hitEnemy) {
                this.y = 350;
                this.splashes = true;
                clearInterval(this.throwInterval);
            }
        }, 1000 / 25);
    }

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

    throwAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.classImages[path];
        this.currentImage++;
    }

    decideAnimation() {
        this.state = setInterval(() => {
            if (!this.splashes) {this.throwAnimation(this.IMG_THROW)}
            else {
            this.splashAnimation();
            };
        }, 1000 / 25);
    }

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

bottleColideEnemy(e) {
    return  this.x + this.width > e.x + e.offset.left &&
        this.y + this.height > e.y + e.offset.top &&
        this.x < e.x + e.width - e.offset.right &&
        this.y < e.y + e.height - e.offset.bottom;
    
}


getHitEnemy(enemies) {
    return enemies.find(e => this.bottleColideEnemy(e));
}

}