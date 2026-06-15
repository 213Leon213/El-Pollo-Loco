/**
 * Represents the bottle status bar.
 * Updates the current bottle percentage.
 */
class Bottlebar extends Statusbar {

    /**
     * Creates a new bottle status bar.
     * 
     * @param {World} world - The current game world.
     */
    constructor(world) {
        super();

        this.img = img;
        this.x = 10;
        this.y = 130;

        this.setPercentage("Bottles", 0);

        world = world;

        this.bottleBarUpdate();
    }

    /**
     * Continuously updates the bottle status bar.
     */
    bottleBarUpdate() {
        this.updateInterval = setInterval(() => {
            let percentage = world.character.bottles * 20;

            world.bottleStatusBar
                .setPercentage("Bottles", percentage);

        }, 100);
    }
}