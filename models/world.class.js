class World {

    character = new Character();

    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    currentImage = 0;
    throwableBottles = [];
    thrownBottles = [];

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
    }

    checkCollisions() {
        if (this.character.hurt) return;
        
        setInterval(() => {
            this.level.enemies.forEach((e) => {
               if (this.character.isColliding(e)) {
                this.character.hp -= e.damage;
                this.character.hurt = true;
                this.character.animateHurt();
                console.log('collision between character and enemy detected', this.character.hp);
               }
            })
        },500)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectToMap(this.thrownBottles);
        //this.generateMap();
        this.ctx.translate(-this.camera_x, 0);
        

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
        if (mo.otherDirection) this.ctx.restore(); // falls flipImage save/translate macht
        return;
        }
        //console.log("drawing object:", mo);
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
          setInterval(()=>{
            this.level.enemies.forEach((e) => {
            const prevBottom = this.character.prevY + this.character.height - this.character.offset.bottom;
            const currentBottom = this.character.y + this.character.height - this.character.offset.bottom;
            const enemyTop = e.y + e.offset.top;
            if (this.character.isColliding(e) && prevBottom <= enemyTop && currentBottom > enemyTop && !e.dead) {
            this.chickenIsDead(e);
        }
        })  
        })
    }

    collectCoins() {
        setInterval(() => {
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
        setInterval(() => {
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
    

    chickenIsDead(e) {
        e.dead = true;
        e.damage = 0;
        e.img.src = '../img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        e.draw(this.ctx);
        setTimeout(() => {
       this.level.enemies = this.level.enemies.filter(e => !e.dead);
       }, 500)
    }

    diff(e) {
       const playerBottom =  this.character.y + this.character.height - this.character.offset.bottom;
       const enemyTop = e.y + e.offset.top;
       const difference = playerBottom - enemyTop;
       return difference;
    }

    createBottleToThrow() {
        if (this.throwableBottles.length >= this.character.bottles) return;

        const bx = this.character.x + this.character.width /2;
        const by = this.character.y + this.character.height /2;
        const b = new ThrowBottle(bx, by);
        this.throwableBottles.push(b);
    }


    moveBottle() {
        this.throwableBottles.forEach((bo) => {
            setInterval(() => {
            if (this.character.otherDirection) {
                bo.x -= bo.speed;
                bo.y += bo.acceleration;
            }
            else {
                bo.x += bo.speed;
                bo.y += bo.acceleration;
            };
            }, 100)
        })
    }

    bottleThrown() {
        console.log('aufgerufen');
        if (this.throwableBottles.length == 0) return;

        let bottle = this.throwableBottles.splice(0, 1)[0];
        this.thrownBottles.push(bottle);
        bottle.thrown = true;
    }

    splashed() {
        this.thrownBottles.forEach((tB) => {
            if (tB.y >= 680 || bottleColideEnemy(tB)) {
                tB.splashes = true;
                splashAnimation();
                splashdelete();
            }
        })
    }
    

    // generateMap() {
    //   const TILE = 720;
    //   const PRELOAD = 300; // wie früh nachladen

    //   // rechte sichtbare Kante in World-Koordinaten
    //   const viewRight = -this.camera_x + this.canvas.width;

    //   // rechteste vorhandene Hintergrund-X Position
    //   const maxX = Math.max(...this.backgroundObjects.map(o => o.x));

    //   // Guard-Variable initialisieren
    //   if (this.nextRightX === undefined) this.nextRightX = maxX + TILE;

    //   // Wenn wir nahe am Ende sind: rechts 2 Tiles anhängen
    //   if (viewRight >= maxX + TILE - PRELOAD) {
    //     const x = this.nextRightX;

    //     const addedBG = [
    //       new BackgroundObject('img/img/5_background/layers/air.png', x, 0),
    //       new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', x, 0),
    //       new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', x, 0),
    //       new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', x, 0),

    //       new BackgroundObject('img/img/5_background/layers/air.png', x + TILE, 0),
    //       new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', x + TILE, 0),
    //       new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', x + TILE, 0),
    //       new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', x + TILE, 0),
    //     ];

    //     // WICHTIG: wirklich in backgroundObjects aufnehmen
    //     this.backgroundObjects.push(...addedBG);

    //     // Pointer weiterschieben (weil du 2 Tiles addest)
    //     this.nextRightX += TILE * 2;
    //   }
    // }

    // goNotOutOfMap() {
    //     const minWorldX = 0;
    //     const charWorldX = character.x - camera_x;
    //     if (charWorldX <= 0) {
    //         this.character.x = 0;
    //     }

    // }


}