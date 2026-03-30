class Endboss extends movableObject{

    height = 500;
    width = 300;
    dead = false;
    hp = 300;
    hurt = false;
    on = true;
    alertActivated = false;
    damage = 50;

    Images_WALKING = [
        "../img/img/4_enemie_boss_chicken/1_walk/G1.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G2.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G3.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    Images_Alert = [
        "../img/img/4_enemie_boss_chicken/2_alert/G5.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G6.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G7.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G8.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G9.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G10.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G11.png",
        "../img/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    Images_HURT = [
        "../img/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "../img/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "../img/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    Images_DEAD = [
        "../img/img/4_enemie_boss_chicken/5_dead/G24.png",
        "../img/img/4_enemie_boss_chicken/5_dead/G25.png",
        "../img/img/4_enemie_boss_chicken/5_dead/G26.png",
    ]

    constructor() {
        super().loadImage(this.Images_WALKING[0]);
        this.loadImages(this.Images_WALKING);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_Alert);
        this.speed = this.speed + Math.random() * 0.5;
        this.x = 720 * 7;
        this.y = -45;
        //this.chickenIsAlert();
        this.animate(this.Images_Alert);
    }

    offset = {
        top: 90,
        bottom: 30,
        right: 30,
        left: 8
    }

    endbossGOTHIT(bottle) {
        this.hp -= bottle.damage;
        console.log('hp:', this.hp);
        this.hurt = true;
        this.on = false;
        this.gotHitAnimation();
    }

    gotHitAnimation() {
        if (this.hurtInterval || this.dead) return;
        if (this.hp <= 0) {return this.animateDeath()}
        this.stopAnimation();

        let index = 0;
        this.hurtInterval = setInterval(() => {

            this.img = this.classImages[this.Images_HURT[index]];
            index++;
            if (index >= this.Images_HURT.length) {
                clearInterval(this.hurtInterval);
                this.hurtInterval = null;
                this.hurt = false;
                this.on = true;
                this.animate(this.Images_WALKING);
            }
        }, 1000 / 5)

        
    }

    checkIfDead() {
        setInterval(() => {
            if (this.hp < 0) {
                this.hp = 0;
            }
            if (this.hp == 0) {
            this.dead = true;
            this.damage = 0;
            this.on = false;
            this.animateDeath();
            } else {
                this.dead = false;
                this.on = true;
            }
        }, 500)
    }

    animateDeath() {
        this.stopAnimation();
        let index = 0;
        this.deathInterval = setInterval(() => {    
            this.img = this.classImages[this.Images_DEAD[index]];
            index++;
            if (index >= this.Images_DEAD.length) {
                clearInterval(this.deathInterval);
                this.hurtInterval = null;
                this.hurt = false;
                this.on = true;
                this.afterDeathRemoval();
            }
        }, 1000 / 5)
    }

    afterDeathRemoval() {
        setTimeout(() => {
            setInterval(()=> {
                this.y += 10;
            }, 1000 / 60)
            this.img.src = this.Images_DEAD[2];
        },500)
    }

    isObjectVisible(mo) {
    const viewLeft = -this.world.camera_x;
    const viewRight = viewLeft + this.world.canvas.width;
    const viewTop = 0;
    const viewBottom = this.world.canvas.height;

    return mo.x + mo.width > viewLeft &&
           mo.x < viewRight &&
           mo.y + mo.height > viewTop &&
           mo.y < viewBottom;
    }

    areCharacterAndEndbossVisible() {
    const endboss = this.world.level.enemies.find(e => e instanceof Endboss);
    

    if (!endboss) return false;

    return this.isObjectVisible(this.world.character) &&
           this.isObjectVisible(endboss);
    }   


    chickenIsAlert() {
        if (this.alertCheckInterval) return;
        
        this.alertCheckInterval = setInterval(()=> {

            if (this.areCharacterAndEndbossVisible() && !this.alertActivated) {
                this.alertActivated = true;
                this.stopAnimation();
                this.animate(this.Images_Alert);

                setTimeout(()=> {
                    this.stopAnimation();
                    this.animate(this.Images_WALKING);
                    clearInterval(this.alertCheckInterval);
                    this.alertCheckInterval = null;
                },1000)
            }
        },100);
    }

    

}

