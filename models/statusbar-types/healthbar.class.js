/**
 * Represents the player health bar.
 */
class Healthbar extends Statusbar {

    /**
     * Creates a new health bar.
     * 
     * @param {World} world - The current game world.
     */
    constructor(world) {
        super();
        this.img = img;
        this.x = 10;
        this.y = -10;
        this.setPercentage("Health", 100);
        world = world;
        this.healthBarUpdate();
    }

    /**
     * Continuously updates the player health bar.
     */
    healthBarUpdate() {
        this.updateInterval = setInterval(() => {
            let hp = world.character.hp;
            if (hp <= 0) {
                this.setPercentage("Health", 0);
            } else if (hp <= 20) {
                this.setPercentage("Health", 20);
            } else if (hp <= 40) {
                this.setPercentage("Health", 40);
            } else if (hp <= 60) {
                this.setPercentage("Health", 60);
            } else if (hp <= 80) {
                this.setPercentage("Health", 80);
            } else {
                this.setPercentage("Health", 100);
            }
        }, 100);
    }   
}