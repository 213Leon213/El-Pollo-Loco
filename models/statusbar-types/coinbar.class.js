/**
 * Represents the coin status bar.
 * Updates the current coin percentage.
 */
class Coinbar extends Statusbar {

    /**
     * Creates a new coin status bar.
     * 
     * @param {World} world - The current game world.
     */
    constructor(world) {
        super();

        this.img = img;
        this.x = 10;
        this.y = 55;

        this.setPercentage("Coins", 0);

        world = world;

        this.coinBarUpdate();
    }

    /**
     * Continuously updates the coin status bar.
     */
    coinBarUpdate() {
        this.updateInterval = setInterval(() => {
            let percentage = world.character.coins * 20;

            world.coinStatusBar
                .setPercentage("Coins", percentage);

        }, 100);
    }
}