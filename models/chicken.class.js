class chicken extends movableObject{

    height = 100;
    width = 90;

    constructor() {
        super().loadImage('../img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 200;
        this.y = 340
    }
}