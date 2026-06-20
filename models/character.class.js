class Character extends movableObject{

    IMG_WALKING = [
        './img/img/2_character_pepe/2_walk/W-21.png',
        './img/img/2_character_pepe/2_walk/W-22.png',
        './img/img/2_character_pepe/2_walk/W-23.png',
        './img/img/2_character_pepe/2_walk/W-24.png',
        './img/img/2_character_pepe/2_walk/W-25.png',
        './img/img/2_character_pepe/2_walk/W-26.png'
    ];
    
    IMG_JUMPING = [
        './img/img/2_character_pepe/3_jump/J-31.png',
        './img/img/2_character_pepe/3_jump/J-32.png',
        './img/img/2_character_pepe/3_jump/J-33.png',
        './img/img/2_character_pepe/3_jump/J-34.png'
    ];

    IMG_FALLING = [
        './img/img/2_character_pepe/3_jump/J-35.png',
        './img/img/2_character_pepe/3_jump/J-36.png',
        './img/img/2_character_pepe/3_jump/J-37.png',
        './img/img/2_character_pepe/3_jump/J-38.png',
        './img/img/2_character_pepe/3_jump/J-39.png'
    ]

    IMG_HURT = [
        './img/img/2_character_pepe/4_hurt/H-41.png',
        './img/img/2_character_pepe/4_hurt/H-42.png',
        './img/img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMG_DEATH = [
        './img/img/2_character_pepe/5_dead/D-51.png',
        './img/img/2_character_pepe/5_dead/D-52.png',
        './img/img/2_character_pepe/5_dead/D-53.png',
        './img/img/2_character_pepe/5_dead/D-54.png',
        './img/img/2_character_pepe/5_dead/D-55.png',
        './img/img/2_character_pepe/5_dead/D-56.png',
        './img/img/2_character_pepe/5_dead/D-57.png'
    ]

    IMG_SLEEP = [
        './img/img/2_character_pepe/1_idle/idle/I-1.png',
        './img/img/2_character_pepe/1_idle/idle/I-2.png',
        './img/img/2_character_pepe/1_idle/idle/I-3.png',
        './img/img/2_character_pepe/1_idle/idle/I-4.png',
        './img/img/2_character_pepe/1_idle/idle/I-5.png',
        './img/img/2_character_pepe/1_idle/idle/I-6.png',
        './img/img/2_character_pepe/1_idle/idle/I-7.png',
        './img/img/2_character_pepe/1_idle/idle/I-8.png',
        './img/img/2_character_pepe/1_idle/idle/I-9.png',
        './img/img/2_character_pepe/1_idle/idle/I-10.png'
        
    ];

    IMG_LONGSLEEP = [
        './img/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/img/2_character_pepe/1_idle/long_idle/I-20.png'
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
        
    /**
     * Creates a new character instance.
     * Loads the default character image, initializes all animation images,
     * sets the initial position and size, applies gravity,
     * starts movement handling and checks for death state.
     */
    constructor() {
        super().loadImage('./img/img/2_character_pepe/2_walk/W-21.png')
        this.initImageLoad();
        this.y = 120;
        this.applyGravity();
        this.movement();
        this.checkIfDead();
        this.height = 330;
        this.width = 150;
        
    }

    /**
     * Starts checking whether the character should enter sleep mode.
     * If the character does not move for a certain time,
     * the sleep timeout is started. If movement is detected,
     * the character wakes up.
     */
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

    /**
     * Wakes the character up from sleep mode.
     * Clears sleep timers and intervals, stops the current animation,
     * resets the sleeping state and restores the default walking image.
     */
    wakeUp() {
     clearTimeout(this.sleepTimeout);
     this.sleepTimeout = null;
     clearInterval(this.sleepIntervall);
     this.sleepIntervall = null;
     this.stopAnimation();
     this.isSleeping = false;
     this.currentImage = 0;
     this.img = this.classImages['./img/img/2_character_pepe/2_walk/W-21.png'];
    }

    /**
     * Starts a timeout before the character enters sleep mode.
     * The sleep animation only starts if the character still has
     * no movement after the timeout has finished.
     */
    tryStartSleepTimeout() {
    if (this.sleepTimeout || this.sleepIntervall || this.isSleeping || this.world.win) return;

        this.sleepTimeout = setTimeout(() => {
            this.sleepTimeout = null;

            if (!this.noMovement() || this.dead) return;

            this.startSleepAnimation();
        }, 15000);
    }

    /**
     * Starts the character's sleep animation.
     * Plays the short idle sleep animation first and then switches
     * to the long sleep animation with snooze sound.
     */
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

    /**
     * Plays the snooze sound repeatedly while the character is sleeping.
     * Stops the sound interval when the character is no longer sleeping.
     */
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

    /**
     * Wakes the character up if a sleep timeout,
     * sleep animation or sleeping state is currently active.
     */
    tryWakeUp() {
        if (this.sleepTimeout || this.sleepIntervall || this.isSleeping) {
            this.wakeUp();
        }
    }

    /**
     * Checks whether the character is currently inactive.
     *
     * @returns {boolean} True if no movement key is pressed,
     * the character is not in the air and the character is not dead.
     */
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

    /**
     * Loads and caches all character animation images.
     * This includes walking, jumping, falling, hurt,
     * death, idle and long idle animations.
     */
    initImageLoad() {
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_JUMPING);
        this.loadImages(this.IMG_FALLING);
        this.loadImages(this.IMG_HURT);
        this.loadImages(this.IMG_DEATH);
        this.loadImages(this.IMG_SLEEP);
        this.loadImages(this.IMG_LONGSLEEP);
    }

    /**
     * Starts the jump action if the character is not dead.
     * Plays the jump sound and triggers the jump animation.
     */
    jump() {
    if (this.dead) {return};
    
        characterJumpSound.play();
        this.animateJump();
    }

    /**
     * Updates the walking animation while moving right.
     * Does not play if the character is jumping,
     * falling or currently hurt.
     */
    animateRight() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.D) {
            if (this.jumpInterval || this.fallInterval || this.hurt) return;
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
           this.img = this.classImages[path];
            this.currentImage++;
        } 
    }

    /**
     * Updates the walking animation while moving left.
     * Does not play if the character is jumping,
     * falling or currently hurt.
     */
    animateLeft() {
        if (this.world.keyboard.LEFT || this.world.keyboard.A) {
            if (this.jumpInterval || this.fallInterval || this.hurt) return;
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
            this.img = this.classImages[path];
            this.currentImage++;
        } 
    }

    /**
     * Plays the jump animation frame by frame.
     * Applies upward velocity during the animation
     * and starts the falling animation afterwards.
     */
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

    /**
     * Plays the falling animation while the character
     * is descending after a jump.
     */
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

    /**
     * Plays the hurt animation when the character
     * takes damage. Resets the hurt state when
     * the animation has finished.
     */
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

    /**
     * Plays the death animation.
     * The character moves downward while
     * the death frames are displayed.
     */
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

    /**
     * Starts the main movement loop.
     * Handles movement input, jumping,
     * sleep behavior and bottle throwing.
     * Runs at approximately 30 FPS.
     */
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

    /**
     * Moves the character to the right.
     * Sets the facing direction, starts the walking animation,
     * moves the character and plays the walking sound
     * while the character is on the ground.
     */
    rightMovement() {
        this.otherDirection = false;
        this.animateRight();
        this.moveRight();
        if (this.checkRight() && !this.isInAir()) {characterMoveSound.play()}
        else {
            characterMoveSound.pause();
        }
    }

    /**
     * Moves the character to the left.
     * Sets the facing direction, starts the walking animation,
     * moves the character and plays the walking sound
     * while the character is on the ground.
     */
    leftMovement() {
        this.otherDirection = true;
        this.animateLeft();
        this.moveLeft();
        if (this.checkRight() && !this.isInAir()) {characterMoveSound.play()}
        else {
            characterMoveSound.pause();
        }
    }

    /**
     * Checks whether the character is allowed to move right.
     *
     * @returns {boolean} True if moving right is allowed.
     */
    checkRight() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.D) 
            && this.x < this.world.level.level_end_x 
            && !this.dead && !this.world.win) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks whether the character is allowed to move left.
     *
     * @returns {boolean} True if moving left is allowed.
     */
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

    /**
     * Checks whether the character is allowed to jump.
     *
     * @returns {boolean} True if jumping is allowed.
     */
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

    /**
     * Moves the character to the right
     * and updates the camera position.
     */
    moveRight(){
        this.x += this.speed;
        this.world.camera_x = -this.x;
    };

    /**
     * Moves the character to the left
     * and updates the camera position.
     */
    moveLeft() {
        this.x -= this.speed;
        this.world.camera_x = -this.x;
    }

    /**
     * Collision offset values for the character.
     * These values adjust the hitbox in relation to the character image.
     *
     * @type {{top: number, bottom: number, right: number, left: number}}
     */
    offset = {
        top: 150,
        bottom: 15,
        right: 25,
        left: 25
    }

    /**
     * Checks the character's health points repeatedly.
     * If health drops below 0, it is reset to 0.
     * When health reaches 0, the character is marked as dead,
     * the death animation starts and the lose state is triggered.
     */
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

    /**
     * Throws a bottle when bottles are available
     * and the E key is pressed.
     * Prevents multiple throws while the key is held down.
     */
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