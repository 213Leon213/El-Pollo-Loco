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

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => {e.world = this;
        if (e instanceof Endboss) {
            e.chickenIsAlert();
        }});
    }

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
        requestAnimationFrame(
            function () {
                self.draw();
            }
        )
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    resetflipImage(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    jumpOnEnemy() {
    this.jumpOnEInterval = setInterval(()=>{
            this.level.enemies.forEach((e) => {
            const prevBottom = this.character.prevY + this.character.height - this.character.offset.bottom;
            const currentBottom = this.character.y + this.character.height - this.character.offset.bottom;
            const enemyTop = e.y + e.offset.top;
            if (this.character.isColliding(e) && prevBottom <= enemyTop && currentBottom > enemyTop) {
            e.on = false;
            e.damage = 0;
            e.stopAnimation();
            e.chickenDiesAnimation(this);
            
        }
        })  
        })
    }

    collectCoins() {
    this.collectCInterval = setInterval(() => {
        this.level.coins.forEach( c => {
                if (this.character.collidesWithItems(c)) {
                    c.animateCoinCollect(this.character);
                    if (c.isCollected == false) {
                        c.isCollected = true;
                        this.character.coins += 1;
                    }
                    this.charCenter = c.getCenterOfObject(this.character);
                    this.coinCenter = c.getCenterOfObject(c);
                    if ((Math.abs(this.charCenter.x - this.coinCenter.x)) <= 5 && (Math.abs(this.charCenter.y - this.coinCenter.y)) <= 5 || c.width < 15 || c.height < 15) {
                       this.level.coins = this.level.coins.filter(coin => !coin.isCollected);
                    }
                }
        });  
        }, 1000 / 25)
    }

    collectBottles() {
    this.collectBInterval = setInterval(() => {
        this.level.bottles.forEach( b => {
                if (this.character.collidesWithItems(b)) {
                    b.animateBottleCollect(this.character);
                    if (b.isCollected == false) {
                        b.isCollected = true;
                        this.character.bottles += 1;
                    }
                    this.charCenter = b.getCenterOfObject(this.character);
                    this.bottleCenter = b.getCenterOfObject(b);
                    if ((Math.abs(this.charCenter.x - this.bottleCenter.x)) <= 5 && (Math.abs(this.charCenter.y - this.bottleCenter.y)) <= 5 || b.width < 15 || b.height < 15) {
                       this.level.bottles = this.level.bottles.filter(bottle => !bottle.isCollected);
                    }
                }
        });  
        }, 1000 / 25)
    }
    

    

    diff(e) {
       const playerBottom =  this.character.y + this.character.height - this.character.offset.bottom;
       const enemyTop = e.y + e.offset.top;
       const difference = playerBottom - enemyTop;
       return difference;
    }



    bottleThrown() {
    const bx = this.character.x + this.character.width / 2;
    const by = this.character.y + this.character.height / 2;

    let bottle = new ThrowBottle(bx, by, this.character.otherDirection, this);
    this.thrownBottles.push(bottle);
    bottle.throwB();
    }

    youWon() {
        if (this.lose) return;

        mobile.classList.add('hidden');
        win.classList.remove('hidden');
        this.win = true;
        music.pause();
        winningSound.play()
    }

    youLose() {
        if (this.win) return;

        mobile.classList.add('hidden');
        this.deleteIntervals();
        gameOver.classList.remove('hidden');
        this.lose = true;
        music.pause();
        losingSound.play()
    }

    destroyWorld() {
        this.deleteIntervals();
    }

    deleteIntervals() {
        this.deleteWorldIntervals();
        this.deleteCharacterIntervals();
        this.deleteEnemyIntervals();
        this.deleteStatusbarIntervals();
        this.deleteMovableObjectsIntervals();
    }

    deleteStatusbarIntervals() {
        clearInterval(this.healthStatusBar.updateInterval);
        this.healthStatusBar.updateInterval = null;
        clearInterval(this.coinStatusBar.updateInterval);
        this.coinStatusBar.updateInterval = null;
        clearInterval(this.bottleStatusBar.updateInterval);
        this.bottleStatusBar.updateInterval = null;
        clearInterval(this.endbossHealthBar.updateInterval);
        this.endbossHealthBar.updateInterval = null;
    }

    deleteEnemyIntervals() {
        this.level.enemies.forEach(e => {
        if (e instanceof Endboss) {
            this.deleteEndbossIntervals(e);
            e.stopAnimation();
            e.stopMoveLeft();
        }
        if (e instanceof Chicken || e instanceof Smallchicken) {
            e.stopAnimation();
            e.stopMoveLeft();
            clearInterval(e.deadInterval);
            e.deadInterval = null;
        }
    });
    }

    deleteEndbossIntervals(e) {
        e.intervals.forEach((i, index) => {
            clearInterval(i);
            this.worldInterval[index] = null;
        })
    }

    deleteWorldIntervals() {
        this.worldInterval.forEach((i, index)=> {
            clearInterval(i);
            this.worldInterval[index] = null;
        })
    }
    
    deleteCharacterIntervals() {
        this.character.intervals.forEach((i, index)=>{
            clearInterval(i);
            this.character.intervals[index] = null;
        })
    }

    deleteMovableObjectsIntervals() {
        this.character.mOIntervals.forEach((i, index) => {
            clearInterval(i);
            this.character.mOIntervals[index] = null;
        })
    }


    

    

}