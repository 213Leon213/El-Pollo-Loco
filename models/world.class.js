class World {

    character = new Character();

    enemies = [
    new chicken(), 
    new chicken(), 
    new chicken()
    ];
    
    clouds = [
    new Cloud()
    ]

    backgroundObjects = [
        new BackgroundObject('img/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 720, 0),
    ];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    currentImage = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw()
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);
        this.generateMap();
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

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    generateMap() {
      const TILE = 720;
      const PRELOAD = 300; // wie früh nachladen

      // rechte sichtbare Kante in World-Koordinaten
      const viewRight = -this.camera_x + this.canvas.width;

      // rechteste vorhandene Hintergrund-X Position
      const maxX = Math.max(...this.backgroundObjects.map(o => o.x));

      // Guard-Variable initialisieren
      if (this.nextRightX === undefined) this.nextRightX = maxX + TILE;

      // Wenn wir nahe am Ende sind: rechts 2 Tiles anhängen
      if (viewRight >= maxX + TILE - PRELOAD) {
        const x = this.nextRightX;

        const addedBG = [
          new BackgroundObject('img/img/5_background/layers/air.png', x, 0),
          new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', x, 0),
          new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', x, 0),
          new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', x, 0),

          new BackgroundObject('img/img/5_background/layers/air.png', x + TILE, 0),
          new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', x + TILE, 0),
          new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', x + TILE, 0),
          new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', x + TILE, 0),
        ];

        // WICHTIG: wirklich in backgroundObjects aufnehmen
        this.backgroundObjects.push(...addedBG);

        // Pointer weiterschieben (weil du 2 Tiles addest)
        this.nextRightX += TILE * 2;
      }
    }

    goNotOutOfMap() {
        const charWorldX = character.x - camera_x;
    }


}