class chicken extends movableObject{

    height = 100;
    width = 90;
    damage = 20;
    on = true;
    
    IMG_WALKING = [
        '../img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMG_DEAD = [
        '../img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset = {
        top: 10,
        bottom: 10,
        right: 5,
        left: 5
    }

    constructor() {
        super().loadImage('../img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMG_WALKING);
        this.speed = this.speed + Math.random() * 0.5;
        this.x = 720 + Math.random() * 200;
        this.y = 340;
        this.animate(this.IMG_WALKING);
        this.moveLeft(this);
    }

    chickenDiesAnimation(world) {
       this.deadInterval = setInterval(() => {
            this.img.src = "../img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
        },100)
        setTimeout(() => {
            clearInterval(this.deadInterval);
            this.deadInterval = null;
            world.level.enemies = world.level.enemies.filter(e => e !== this);
        },2000);

        
    
    }
        
    chickenGOTHIT(bottle, world) {
        bottle.splashes = true;
        this.on = false;
        this.chickenDiesAnimation(world);
    }

    
    
}