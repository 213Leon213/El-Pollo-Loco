class Bottle extends Objects{

    img;
    damage = 50;

    constructor() {
        super();
        const imagesBottles = [
        "img/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
        ];
        this.img = new Image();
        this.img.src = imagesBottles[Math.floor(Math.random() * imagesBottles.length)];
    }
}