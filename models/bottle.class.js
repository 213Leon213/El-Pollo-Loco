/**
 * Represents a collectible bottle object.
 */
class Bottle extends Objects {

    img;
    damage = 50;
    isCollected = false;

    /**
     * Creates a new bottle object with a random image.
     */
    constructor() {
        super();

        const imagesBottles = [
            "img/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
            "img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
        ];

        this.img = new Image();
        this.img.src = imagesBottles[
            Math.floor(Math.random() * imagesBottles.length)
        ];
    }

    offset = {
        top: 40,
        bottom: 20,
        right: 60,
        left: 60
    }

    /**
     * Animates the bottle collection movement
     * towards the player character.
     * 
     * @param {Character} character - The player character.
     */
    animateBottleCollect(character) {
        const targetX = character.x + character.width / 2;
        const targetY = character.y + character.height / 2 + 60;

        const bottleCenterX = this.x + this.width / 2;
        const bottleCenterY = this.y + this.height / 2;

        this.x += (targetX - bottleCenterX) * 0.4;
        this.y += (targetY - bottleCenterY) * 0.4;

        this.width -= 10;
        this.height -= 10;
    }
}