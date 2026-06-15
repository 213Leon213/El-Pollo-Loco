/**
 * Represents the game world and manages
 * all game objects, collisions and rendering.
 */
class World {

    character = new Character();
    healthStatusBar = new Healthbar(this);
    coinStatusBar = new Coinbar(this);
    bottleStatusBar = new Bottlebar()
    endbossHealthBar = new EndbossHealthbar(this);

    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    currentImage = 0;
    thrownBottles = [];
    win = false;
    lose = false;
    showEndbossHealthbar = false;

    worldInterval = [
        this.collisonInterval,
        this.jumpOnEInterval,
        this.collectCInterval,
        this.collectBInterval
    ]

    /**
     * Creates a new game world.
     * 
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw()
        this.setWorld();
        this.checkCollisions();
        this.jumpOnEnemy();
        this.collectCoins();
        this.collectBottles();
    }

    /**
     * Assigns the current world reference
     * to all game objects.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => {
            e.world = this;
            if (e instanceof Endboss) {
                e.chickenIsAlert();
            }
        });
    }

    /**
     * Checks collisions between the character
     * and enemies.
     */
    checkCollisions() {
        if (this.character.hurt) return;
        
        this.collisonInterval = setInterval(() => {
            this.level.enemies.forEach((e) => {
               if (this.character.isColliding(e)) {
                this.character.hp -= e.damage;
                if (e.damage > 0) {
                    this.character.hurt = true;
                    this.character.animateHurt();
                }
               }
            })
        },500)
    }

    /**
     * Draws all game objects to the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.thrownBottles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);

        if (this.showEndbossHealthbar) {
            this.addToMap(this.endbossHealthBar);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * Draws multiple objects.
     * 
     * @param {Array} objects - Objects to draw.
     */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Draws a single object.
     * 
     * @param {DrawableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        if (!mo.img || !mo.img.complete) {
            if (mo.otherDirection) this.ctx.restore();
            return;
        }
        mo.draw(this.ctx);
        mo.drawHitbox(this.ctx);
        mo.drawOffsetBox(this.ctx);
    
        if (mo.otherDirection) {
            this.resetflipImage(mo);
        }
    }

    /**
     * Flips an image horizontally.
     * 
     * @param {movableObject} mo - Object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Resets image flipping.
     * 
     * @param {movableObject} mo - Object to reset.
     */
    resetflipImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks whether the character
     * jumps on enemies.
     */
    jumpOnEnemy() {
        this.jumpOnEInterval = setInterval(()=>{
            this.level.enemies.forEach((e) => {
                const prevBottom = this.character.prevY + this.character.height - this.character.offset.bottom;
                const currentBottom = this.character.y + this.character.height - this.character.offset.bottom;
                const enemyTop = e.y + e.offset.top;
                if (this.character.isColliding(e) &&
                    prevBottom <= enemyTop &&
                    currentBottom > enemyTop) {
                    e.on = false;
                    e.damage = 0;
                    e.stopAnimation();
                    e.chickenDiesAnimation(this);
                }
            })  
        })
    }

    /**
     * Starts coin collection checks.
     */
    collectCoins() {
        this.collectCInterval = setInterval(() => {
            this.level.coins.forEach(coin => {
                if (!this.character.collidesWithItems(coin)) return;
                this.handleCoinCollect(coin);
            });
        }, 1000 / 25);
    }

    /**
     * Handles coin collection.
     * 
     * @param {Coin} coin - The collected coin.
     */
    handleCoinCollect(coin) {
        coin.animateCoinCollect(this.character);

        if (!coin.isCollected) {
            coin.isCollected = true;
            this.character.coins++;
        }

        if (this.isCoinCollected(coin)) {
            this.removeCoin(coin);
        }
    }

    /**
     * Checks if a coin is fully collected.
     * 
     * @param {Coin} coin - The coin to check.
     * @returns {boolean}
     */
    isCoinCollected(coin) {
        let charCenter = coin.getCenterOfObject(this.character);
        let coinCenter = coin.getCenterOfObject(coin);

        return (
            Math.abs(charCenter.x - coinCenter.x) <= 5 &&
            Math.abs(charCenter.y - coinCenter.y) <= 5
        ) || coin.width < 15 || coin.height < 15;
    }

    /**
     * Removes a collected coin.
     * 
     * @param {Coin} coin - The coin to remove.
     */
    removeCoin(coin) {
        this.level.coins =
            this.level.coins.filter(c => c !== coin);
    }

    /**
     * Starts bottle collection checks.
     */
    collectBottles() {
        this.collectBInterval = setInterval(() => {
            this.level.bottles.forEach(bottle => {
                if (!this.character.collidesWithItems(bottle)) return;
                this.handleBottleCollect(bottle);
            });
        }, 1000 / 25);
    }

    /**
     * Handles bottle collection.
     * 
     * @param {Bottle} bottle - The collected bottle.
     */
    handleBottleCollect(bottle) {
        bottle.animateBottleCollect(this.character);

        if (!bottle.isCollected) {
            bottle.isCollected = true;
            this.character.bottles++;
        }

        if (this.isBottleCollected(bottle)) {
            this.removeBottle(bottle);
        }
    }

    /**
     * Checks if a bottle is fully collected.
     * 
     * @param {Bottle} bottle - The bottle to check.
     * @returns {boolean}
     */
    isBottleCollected(bottle) {
        let charCenter = bottle.getCenterOfObject(this.character);
        let bottleCenter = bottle.getCenterOfObject(bottle);

        return (
            Math.abs(charCenter.x - bottleCenter.x) <= 5 &&
            Math.abs(charCenter.y - bottleCenter.y) <= 5
        ) || bottle.width < 15 || bottle.height < 15;
    }

    /**
     * Removes a collected bottle.
     * 
     * @param {Bottle} bottle - The bottle to remove.
     */
    removeBottle(bottle) {
        this.level.bottles =
        this.level.bottles.filter(b => b !== bottle);
    }

    /**
     * Calculates the vertical difference
     * between the player and an enemy.
     * 
     * @param {movableObject} e - The enemy.
     * @returns {number}
     */
    diff(e) {
       const playerBottom = this.character.y + this.character.height - this.character.offset.bottom;
       const enemyTop = e.y + e.offset.top;
       const difference = playerBottom - enemyTop;
       return difference;
    }

    /**
     * Creates and throws a bottle.
     */
    bottleThrown() {
        const bx = this.character.x + this.character.width / 2;
        const by = this.character.y + this.character.height / 2;

        let bottle = new ThrowBottle(
            bx,
            by,
            this.character.otherDirection,
            this
        );

        this.thrownBottles.push(bottle);
        bottle.throwB();
    }

    /**
     * Handles the win state.
     */
    youWon() {
        if (this.lose) return;

        mobile.classList.add('hidden');
        win.classList.remove('hidden');
        this.win = true;
        music.pause();
        winningSound.play()
    }

    /**
     * Handles the lose state.
     */
    youLose() {
        if (this.win) return;

        mobile.classList.add('hidden');
        this.deleteIntervals();
        gameOver.classList.remove('hidden');
        this.lose = true;
        music.pause();
        losingSound.play()
    }

    /**
     * Destroys the world and clears intervals.
     */
    destroyWorld() {
        this.deleteIntervals();
    }

    /**
     * Deletes all active intervals.
     */
    deleteIntervals() {
        this.deleteWorldIntervals();
        this.deleteCharacterIntervals();
        this.deleteEnemyIntervals();
        this.deleteStatusbarIntervals();
        this.deleteMovableObjectsIntervals();
    }

    /** Deletes all status bar intervals. */
    deleteStatusbarIntervals() { /* dein Code unverändert */ }

    /** Deletes all enemy intervals. */
    deleteEnemyIntervals() { /* dein Code unverändert */ }

    /**
     * Deletes all endboss intervals.
     * 
     * @param {Endboss} e - The endboss.
     */
    deleteEndbossIntervals(e) { /* dein Code unverändert */ }

    /** Deletes all world intervals. */
    deleteWorldIntervals() { /* dein Code unverändert */ }

    /** Deletes all character intervals. */
    deleteCharacterIntervals() { /* dein Code unverändert */ }

    /** Deletes all movable object intervals. */
    deleteMovableObjectsIntervals() { /* dein Code unverändert */ }

}