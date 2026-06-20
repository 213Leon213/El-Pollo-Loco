/**
 * Represents the endboss enemy.
 */
class Endboss extends movableObject{

    height = 500;
    width = 300;
    dead = false;
    hp = 600;
    hurt = false;
    alertActivated = false;
    damage = 50;
    speedY = 0;
    acceleration = 3;

    Images_WALKING = [
        "./img/img/4_enemie_boss_chicken/1_walk/G1.png",
        "./img/img/4_enemie_boss_chicken/1_walk/G2.png",
        "./img/img/4_enemie_boss_chicken/1_walk/G3.png",
        "./img/img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    Images_ALERT = [
        "./img/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    Images_HURT = [
        "./img/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./img/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./img/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    Images_DEAD = [
        "./img/img/4_enemie_boss_chicken/5_dead/G24.png",
        "./img/img/4_enemie_boss_chicken/5_dead/G25.png",
        "./img/img/4_enemie_boss_chicken/5_dead/G26.png",
    ]

    Images_ATTACK = [
        "./img/img/4_enemie_boss_chicken/3_attack/G13.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G14.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G15.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G16.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G17.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G18.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G19.png",
        "./img/img/4_enemie_boss_chicken/3_attack/G20.png",
    ]

    intervals = [
        this.deadCheckInterval,
        this.deathInterval,
        this.hurtInterval,
        this.alertCheckInterval,
        this.attackInterval,
        this.gravityInterval
    ]

    /**
     * Creates a new endboss enemy.
     */
    constructor() {
        super().loadImage(this.Images_WALKING[0]);
        this.loadImages(this.Images_WALKING);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_ALERT);
        this.loadImages(this.Images_ATTACK);
        this.speed = 0.3;
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

    /**
     * Handles the endboss getting hit by a bottle.
     * 
     * @param {ThrowBottle} bottle - The bottle that hit the endboss.
     */
    endbossGOTHIT(bottle) {
        bottle.splashes = true;
        this.hp -= bottle.damage;
        this.hurt = true;
        this.on = false;
        if (!this.dead) {endbossHittedSound.play()}
        this.gotHitAnimation();
    }

    /**
     * Starts the hurt animation of the endboss.
     */
    gotHitAnimation() {
        if (this.hurtInterval || this.dead) return;
        if (this.startDeathIfNeeded()) return;

        this.stopAnimation();
        let index = 0;
        this.hurtInterval = setInterval(() => {
            this.img = this.classImages[this.Images_HURT[index++]];

            if (index >= this.Images_HURT.length) {
            this.endHurtAnimation();
            }
        }, 1000 / 5);
    }

    /**
     * Starts the death animation if the endboss has no health left.
     * 
     * @returns {boolean} True if the death animation was started.
     */
    startDeathIfNeeded() {
        if (this.hp > 0 || this.deathInterval) return false;

        this.animateDeath();
        return true;
    }

    /**
     * Ends the hurt animation and returns the endboss to walking.
     */
    endHurtAnimation() {
        clearInterval(this.hurtInterval);
        this.hurtInterval = null;
        this.hurt = false;
        this.on = true;
        this.animate(this.Images_WALKING);
    }

    /**
     * Checks repeatedly if the endboss is dead.
     */
    checkIfDead() {
        if (this.deadCheckInterval) return;

        this.deadCheckInterval = setInterval(() => {
            this.hp = Math.max(0, this.hp);

            if (this.hp === 0) {
                this.handleDeath();
            } else {
                this.dead = false;
                this.on = true;
            }
        }, 500);
    }

    /**
     * Sets the endboss into its death state.
     */
    handleDeath() {
        this.dead = true;
        this.damage = 0;
        this.on = false;

        if (!this.deathStarted) {
            endbossHittedSound.pause();
            chickenDiesSound.play();
            this.animateDeath();
        }
    }

/**
     * Starts the death animation.
     */
    animateDeath() {
        if (this.deathStarted) return;

        this.deathStarted = true;
        this.stopAnimation();

        let index = 0;

        this.deathInterval = setInterval(() => {
            this.img = this.classImages[this.Images_DEAD[index++]];

            if (index >= this.Images_DEAD.length) {
                this.finishDeathAnimation();
            }
        }, 1000 / 2);
    }

    /**
     * Finishes the death animation.
     */
    finishDeathAnimation() {
        clearInterval(this.deathInterval);
        this.deathInterval = null;

        this.stopAllBossActions();

        this.hurtInterval = null;
        this.hurt = false;
        this.on = true;

        this.afterDeathRemoval();
    }  

    /**
     * Removes the endboss after the death sequence
     * and triggers the win condition.
     */
    afterDeathRemoval() {
        if (this.deathHandled) return;
        this.deathHandled = true;

        this.stopAllBossActions();
        this.img = this.classImages[this.Images_DEAD[2]];

        this.deadEnd = setTimeout(() => {
        this.world.level.enemies = world.level.enemies.filter(e => e !== this);
        this.world.deleteEnemyIntervals();
        this.world.youWon();
        this.deadEnd = null;
        },3000)
    }

    /**
     * Checks whether an object is visible inside
     * the current camera viewport.
     * 
     * @param {movableObject} mo - The object to check.
     * @returns {boolean} True if the object is visible.
     */
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

    /**
     * Checks whether both the character and the endboss
     * are visible on screen.
     * 
     * @returns {boolean} True if both objects are visible.
     */
    areCharacterAndEndbossVisible() {
    const endboss = this.world?.level.enemies.find(e => e instanceof Endboss);
    

    if (!endboss) return false;

    return this.isObjectVisible(this.world.character) &&
           this.isObjectVisible(endboss);
    }   

    /**
     * Starts checking if the endboss should enter alert mode.
     */
    chickenIsAlert() {
        if (this.alertCheckInterval) return;

        this.alertCheckInterval = setInterval(() => {
            if (this.shouldStartAlert()) {
                this.startAlert();
            }
        }, 100);
    }

    /**
     * Checks if the alert animation should start.
     * 
     * @returns {boolean} True if alert mode should start.
     */
    shouldStartAlert() {
        return this.areCharacterAndEndbossVisible() &&
           !this.alertActivated &&
           !this.world.lose;
    }

    /**
     * Starts the alert animation and displays
     * the endboss health bar.
     */
    startAlert() {
        this.alertActivated = true;
        this.stopAnimation();
        this.animate(this.Images_ALERT);
        this.world.showEndbossHealthbar = true;

        this.alertTimeout = setTimeout(() => {
            this.finishAlert();
        }, 1000);
    }

    /**
     * Finishes the alert animation and starts attacking.
     */
    finishAlert() {
        this.stopAnimation();
        clearInterval(this.alertCheckInterval);
        this.alertCheckInterval = null;
        this.attackPlayer();
    }   

    /**
     * Starts the attack behaviour.
     */
    attackPlayer() {
        if (this.attackInterval || this.hurt || this.world.lose) return;

        this.isAttacking = false;
        this.attackInterval = setInterval(() => {
            if (!this.canAttack()) return;

            this.handleAttackState();
        }, 500);
    }
    
    /**
     * Checks whether the endboss is allowed to attack.
     * 
     * @returns {boolean} True if attacking is possible.
     */
    canAttack() {
        return this.alertActivated &&
               !this.hurt &&
               !this.world.lose;
    }

    /**
     * Handles switching between attack states.
     */
    handleAttackState() {
        this.endbossMovesTowardsPlayer();
        this.stopAnimation();
        this.currentImage = 0;

        if (this.isAttacking && !this.dead && !this.hurt) {
            this.startWalkingAttack();
        } else {
            this.startJumpAttack();
        }
    }

    /**
     * Starts the walking attack animation.
     */
    startWalkingAttack() {
        this.animate(this.Images_WALKING);
        this.speedY = 0;
        this.isAttacking = false;
    }

    /**
     * Starts the jump attack animation.
     */
    startJumpAttack() {
        if (this.hurt) return;

        this.animate(this.Images_ATTACK);
        this.speedY = 10;
        this.isAttacking = true;
    }
    
    /**
     * Checks whether the endboss is currently in the air.
     * 
     * @returns {boolean} True if the endboss is in the air.
     */
    isInAirEndboss() {
        return this.y < 1;
    }

    /**
     * Applies gravity to the endboss.
     */
    applyGravityEndboss() {
        if (this.dead) return;
        if (this.world?.lose) return;
        if (this.gravityInterval) return;
        
        this.gravityInterval = setInterval(()=> {
            if (this.speedY > 0 || this.isInAirEndboss()) {
            this.prevY = this.y;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25);
    
    }

    /**
     * Stops all active endboss actions and intervals.
     */
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

    /**
     * Moves the endboss towards the player.
     */
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

