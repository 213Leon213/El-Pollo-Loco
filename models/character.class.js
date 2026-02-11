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

        world;
        speed = 10;
    constructor() {
        super().loadImage('../img/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMG_WALKING);
        this.loadImages(this.IMG_JUMPING);
        this.loadImages(this.IMG_FALLING);
        this.y = 120;
        this.applyGravity();
        this.movement();
        this.height = 330;
        this.width = 150;
        
    }


    jump() {
        this.animateJump();
        //this.speedY = 30;
    }

    animateRight() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.D) {
            if (this.jumpInterval || this.fallInterval) return;
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
           this.img = this.classImages[path];
            this.currentImage++;
        } 
    }

    animateLeft() {
        if (this.world.keyboard.LEFT || this.world.keyboard.A) {
            if (this.jumpInterval || this.fallInterval) return;
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
            this.img = this.classImages[path];
            this.currentImage++;
        } 
        
    }

    animateJump() {
        if (this.jumpInterval || this.fallInterval) {return};
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

    movement() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.D && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.animateRight();
            this.moveRight();
            //this.world.generateMap()
            
            }

            if (this.world.keyboard.LEFT || this.world.keyboard.A && this.x > 100) {
                this.otherDirection = true;
                this.animateLeft();
                this.moveLeft();
            }

            if (this.world.keyboard.UP || this.world.keyboard.W || this.world.keyboard.SPACE && !this.isInAir()) {
                this.jump();
            }

            else{return}

        }, 1000 / 60)  
    }

    moveRight(){
        this.x += this.speed;
        this.world.camera_x = -this.x;
    };

    moveLeft() {
        this.x -= this.speed;
        this.world.camera_x = -this.x;
    }

    


    
}