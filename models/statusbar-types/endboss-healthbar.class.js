/**
 * Represents the endboss health bar.
 */
class EndbossHealthbar extends Statusbar {

    /**
     * Creates a new endboss health bar.
     * 
     * @param {World} world - The current game world.
     */
    constructor(world) {
        super();
        this.img = img;
        this.x = 500;
        this.y = 0;
        this.world = world
        this.setValue();
        this.setPercentage("Endboss", 100);
        this.healthBarUpdate()
    }

    /**
     * Searches and stores the current endboss.
     */
    setValue() {
        this.world.level?.enemies?.forEach(e => 
        {if (e instanceof Endboss) {
            this.endboss = e;
        }});
    }

    /**
     * Continuously updates the endboss health bar.
     */
    healthBarUpdate() {
    this.updateInterval = setInterval(() => {
        if (!this.endboss) {
            this.setValue();
            return;
        }

        let hp = this.endboss.hp;

        if (hp <= 0) this.setPercentage("Endboss", 0);
        else if (hp <= 150) this.setPercentage("Endboss", 20);
        else if (hp <= 300) this.setPercentage("Endboss", 40);
        else if (hp <= 450) this.setPercentage("Endboss", 60);
        else if (hp < 600) this.setPercentage("Endboss", 80);
        else this.setPercentage("Endboss", 100);
    }, 100);
}

}