class Character extends movableObject{

    IMG_WALKING = [
        '../img/img/2_character_pepe/2_walk/W-21.png',
        '../img/img/2_character_pepe/2_walk/W-22.png',
        '../img/img/2_character_pepe/2_walk/W-23.png',
        '../img/img/2_character_pepe/2_walk/W-24.png',
        '../img/img/2_character_pepe/2_walk/W-25.png',
        '../img/img/2_character_pepe/2_walk/W-26.png'
    ];
    
    IMG_JUMPING = [
        '../img/img/2_character_pepe/3_jump/J-31.png',
        '../img/img/2_character_pepe/3_jump/J-32.png',
        '../img/img/2_character_pepe/3_jump/J-33.png',
        '../img/img/2_character_pepe/3_jump/J-34.png'
    ];

    IMG_FALLING = [
        '../img/img/2_character_pepe/3_jump/J-35.png',
        '../img/img/2_character_pepe/3_jump/J-36.png',
        '../img/img/2_character_pepe/3_jump/J-37.png',
        '../img/img/2_character_pepe/3_jump/J-38.png',
        '../img/img/2_character_pepe/3_jump/J-39.png'
    ]

    IMG_HURT = [
        '../img/img/2_character_pepe/4_hurt/H-41.png',
        '../img/img/2_character_pepe/4_hurt/H-42.png',
        '../img/img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMG_DEATH = [
        '../img/img/2_character_pepe/5_dead/D-51.png',
        '../img/img/2_character_pepe/5_dead/D-52.png',
        '../img/img/2_character_pepe/5_dead/D-53.png',
        '../img/img/2_character_pepe/5_dead/D-54.png',
        '../img/img/2_character_pepe/5_dead/D-55.png',
        '../img/img/2_character_pepe/5_dead/D-56.png',
        '../img/img/2_character_pepe/5_dead/D-57.png'
    ]

    IMG_SLEEP = [
        '../img/img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/img/2_character_pepe/1_idle/idle/I-10.png'
        
    ];

    IMG_LONGSLEEP = [
        '../img/img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    intervals = [
        this.sleepCheckInterval,
        this.sleepIntervall,
        this.snoozeSoundIntervall,
        this.jumpInterval,
        this.fallInterval,
        this.deathInterval,
        this.hurtInterval,
        this.checkDeadInterval,
        this.movementInterval
    ]

    world;
    speed = 12;
    hp = 100;
    hurt = false;
    dead = false;
    bottles = 0;
    coins = 0;
    ePressed;
        
    constructor() {
        super().loadImage('../img/img/2_character_pepe/2_walk/W-21.png')
        this.initImageLoad();
        this.y = 120;
        this.applyGravity();
        this.movement();
        this.checkIfDead();
        this.height = 330;
        this.width = 150;
        
    }

    engageSleep() {
        if (this.sleepCheckInterval || this.dead || this.world.win) return;

        this.sleepCheckInterval = setInterval(() => {
            if (this.noMovement()) {
                this.tryStartSleepTimeout();
            } else {
                this.tryWakeUp();
            }
        }, 100);
    }

    wakeUp() {
     clearTimeout(this.sleepTimeout);
     this.sleepTimeout = null;
     clearInterval(this.sleepIntervall);
     this.sleepIntervall = null;
     this.stopAnimation();
     this.isSleeping = false;
     this.currentImage = 0;
     this.img = this.classImages['../img/img/2_character_pepe/2_walk/W-21.png'];
    }

    tryStartSleepTimeout() {
    if (this.sleepTimeout || this.sleepIntervall || this.isSleeping || this.world.win) return;

        this.sleepTimeout = setTimeout(() => {
            this.sleepTimeout = null;

            if (!this.noMovement() || this.dead) return;

            this.startSleepAnimation();
        }, 15000);
    }

    startSleepAnimation() {
    if (this.dead || this.world.win) return;

    this.isSleeping = true;
    this.stopAnimation();
    let index = 0;
        this.sleepIntervall = setInterval(() => {
            if (index >= this.IMG_SLEEP.length) {
                clearInterval(this.sleepIntervall);
                this.sleepIntervall = null;
                this.sleepSound();
                this.animate(this.IMG_LONGSLEEP);
                return;
            }
            this.img = this.classImages[this.IMG_SLEEP[index]];
            index++;
        }, 100);
    }

    sleepSound() {
    if (this.snoozeSoundIntervall) return;

        this.snoozeSoundIntervall = setInterval(() => {
            if (this.isSleeping) {characterSnoozeSound.play()}
            else {
                clearInterval(this.snoozeSoundIntervall);
                this.snoozeSoundIntervall = null;
            }
        }, 100);     
    }

    tryWakeUp() {
        if (this.sleepTimeout || this.sleepIntervall || this.isSleeping) {
            this.wakeUp();
        }
    }

    noMovement() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.D
        || this.world.keyboard.LEFT || this.world.keyboard.A
        || this.world.keyboard.UP || this.world.keyboard.W
        || this.world.keyboard.SPACE || this.isInAir() || this.dead) {
            return false;
        } else {
            return true;
        } 
    }

    initImageLoad() {
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_JUMPING);
        this.loadImages(this.IMG_FALLING);
        this.loadImages(this.IMG_HURT);
        this.loadImages(this.IMG_DEATH);
        this.loadImages(this.IMG_SLEEP);
        this.loadImages(this.IMG_LONGSLEEP);
    }

    jump() {
        if (this.dead) {return};
    
        characterJumpSound.play();
        this.animateJump();
    }

    animateRight() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.D) {
            if (this.jumpInterval || this.fallInterval || this.hurt) return;
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
           this.img = this.classImages[path];
            this.currentImage++;
        } 
    }

    animateLeft() {
        if (this.world.keyboard.LEFT || this.world.keyboard.A) {
            if (this.jumpInterval || this.fallInterval || this.hurt) return;
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
            this.img = this.classImages[path];
            this.currentImage++;
        } 
    }

    animateJump() {
        if (this.jumpInterval || this.fallInterval) return;
        let index = 0;
        this.jumpInterval = setInterval(() => {
        this.img = this.classImages[this.IMG_JUMPING[index]];
        index++;
        if (index == 3) {this.speedY = 30}
        if (index >= 4) {
            clearInterval(this.jumpInterval);
            this.jumpInterval = null;
            this.animateFall();
        }
        }, 10);
    }

    animateFall() {
        let index = 0;
        this.fallInterval = setInterval(() => {
        if (this.speedY <= 0) {
        this.img = this.classImages[this.IMG_FALLING[index]];
        index++
        if (index >= this.IMG_FALLING.length) {
            clearInterval(this.fallInterval);
            this.fallInterval = null;
        }
        }
        }, 100)
            
    }

    animateHurt() {
        if (this.hurtInterval || this.dead) return;

        characterDamageSound.play();
        let index = 0;
        this.hurtInterval = setInterval(() => {
            this.img = this.classImages[this.IMG_HURT[index]];
            index++;
            if (index >= this.IMG_HURT.length) {
                clearInterval(this.hurtInterval);
                this.hurtInterval = null;
                this.hurt = false;
            }
        }, 100)
    }

    animateDeath() {
        if (this.deathInterval) return;

        let index = 0;
        this.deathInterval = setInterval(() => {
            this.img = this.classImages[this.IMG_DEATH[index]];
            this.y += 50;
            index++;
            if (index >= this.IMG_DEATH.length) {
                clearInterval(this.deathInterval);
                
            }
        }, 100)
    }

    movement() {
    this.movementInterval = setInterval(() => {
            if (this.checkRight()) {
                this.rightMovement();
            }
            if (this.checkLeft()) {
                this.leftMovement();
            }
            if (this.checkJump()) {
                this.jump();
            }
            this.engageSleep();
            this.throwBottle();
        }, 1000 / 30)  
    }

    rightMovement() {
        this.otherDirection = false;
        this.animateRight();
        this.moveRight();
        if (this.checkRight() && !this.isInAir()) {characterMoveSound.play()}
        else {
            characterMoveSound.pause();
        }
    }

    leftMovement() {
        this.otherDirection = true;
        this.animateLeft();
        this.moveLeft();
        if (this.checkRight() && !this.isInAir()) {characterMoveSound.play()}
        else {
            characterMoveSound.pause();
        }
    }

    checkRight() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.D) 
            && this.x < this.world.level.level_end_x 
            && !this.dead && !this.world.win) {
            return true;
        } else {
            return false;
        }
    }

    checkLeft() {
        if ((this.world.keyboard.LEFT || this.world.keyboard.A) &&
            this.x > 100 &&
            !this.dead &&
            !this.world.win && !this.world.lose) {
            return true;
        } else {
            false;
        }
    }

    checkJump() {
        if ((this.world.keyboard.UP || this.world.keyboard.W || this.world.keyboard.SPACE) &&
            !this.isInAir() &&
            !this.dead &&
            !this.world.win && !this.world.lose) {
            return true;
        } else {
            return false;
        }
    }

    moveRight(){
        this.x += this.speed;
        this.world.camera_x = -this.x;
    };

    moveLeft() {
        this.x -= this.speed;
        this.world.camera_x = -this.x;
    }

    offset = {
        top: 150,
        bottom: 15,
        right: 25,
        left: 25
    }

    checkIfDead() {    
    this.checkDeadInterval = setInterval(() => {
            if (this.hp < 0) {
                this.hp = 0;
            }
            if (this.hp == 0) {
            this.dead = true;
            clearInterval(this.checkDeadInterval);
            this.checkDeadInterval = null;
            this.animateDeath();
            this.world.youLose();
            }
        }, 500)
    }

    throwBottle() {   
        if (this.bottles == 0) return;

        if (this.world.keyboard.E && !this.ePressed) {
            this.world.bottleThrown();
            if(this.bottles > 0) {
            this.bottles -= 1};
            this.ePressed = true;
        }
        if (!this.world.keyboard.E) {
            this.ePressed = false;
            
        }
    }
}