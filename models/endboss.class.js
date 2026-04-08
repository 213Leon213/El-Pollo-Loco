class Endboss extends movableObject{

    height = 500;
    width = 300;
    dead = false;
    hp = 600;
    hurt = false;
    on = true;
    alertActivated = false;
    damage = 50;
    speedY = 0;
    acceleration = 3;

    Images_WALKING = [
        "../img/img/4_enemie_boss_chicken/1_walk/G1.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G2.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G3.png",
        "../img/img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    Images_ALERT = [
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

    Images_ATTACK = [
        "../img/img/4_enemie_boss_chicken/3_attack/G13.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G14.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G15.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G16.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G17.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G18.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G19.png",
        "../img/img/4_enemie_boss_chicken/3_attack/G20.png",
    ]

    constructor() {
        super().loadImage(this.Images_WALKING[0]);
        this.loadImages(this.Images_WALKING);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_ALERT);
        this.loadImages(this.Images_ATTACK);
        this.speed = 0.1;
        this.x = 720 * 7;
        this.y = -45;
        this.checkIfDead();
        this.chickenIsAlert();
        this.applyGravityEndboss();
        
    }

    offset = {
        top: 90,
        bottom: 30,
        right: 30,
        left: 8
    }

    endbossGOTHIT(bottle) {
        bottle.splashes = true;
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
            this.y += 10;
            clearInterval(this.deathInterval);
            this.deathInterval = null;
            this.img = this.Images_DEAD[2];
            this.world.level.enemies = world.level.enemies.filter(e => e !== this);
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
    const endboss = this.world?.level.enemies.find(e => e instanceof Endboss);
    

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
                this.animate(this.Images_ALERT);

                setTimeout(()=> {
                    this.stopAnimation();
                    clearInterval(this.alertCheckInterval);
                    this.alertCheckInterval = null;
                    this.attackPlayer();
                },1000)
            }
        },100);
    }

    
    attackPlayer() {
    if (this.attackInterval) return;

    this.isAttacking = false;

    this.attackInterval = setInterval(() => {
        if (!this.alertActivated) return;

        this.endbossMovesTowardsPlayer();
        if (this.dead) {
            this.endbossDiedInBattle();
        }
        this.stopAnimation();
        this.currentImage = 0;

        if (this.isAttacking && (!this.dead)) {
            this.animate(this.Images_WALKING);
            this.speedY = 0;
            this.isAttacking = false;
        } else {
            this.animate(this.Images_ATTACK);
            this.speedY = 10;
            this.isAttacking = true;
        }
    }, 500);
    }    
    
    isInAirEndboss() {
        return this.y < 1;
    }

    applyGravityEndboss() {
        if (this.dead) return;
        
        setInterval(()=> {
            if (this.speedY > 0 || this.isInAirEndboss()) {
            this.prevY = this.y;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25);
    
    }

    stopAllBossActions() {
        clearInterval(this.animation);
        this.animation = null;

        clearInterval(this.attackInterval);
        this.attackInterval = null;

        clearInterval(this.hurtInterval);
        this.hurtInterval = null;

        clearInterval(this.alertCheckInterval);
        this.alertCheckInterval = null;
    }

    endbossDiedInBattle() {
        if (this.dead) {
            this.stopAnimation();
            this.stopAllBossActions();
            return true;
        } else {
            return false;
        }
    }
    
    endbossMovesTowardsPlayer() {
        const endbossCenterX = this.x + this.width / 2;
        const playerCenterX = this.world.character.x + this.world.character.width / 2;

        this.x += (playerCenterX - endbossCenterX) * this.speed;

        if (playerCenterX > endbossCenterX) {
            this.otherDirection = true;
        } else {
            this.otherDirection = false;
        }
    }

}

