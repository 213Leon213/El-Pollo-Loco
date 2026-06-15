/**
 * Represents a background object in the game.
 */
class BackgroundObject extends movableObject {

    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     * 
     * @param {string} imagePath - The path of the background image.
     * @param {number} x - The x position of the background object.
     * @param {number} y - The y position of the background object.
     */
    constructor (imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.y = y;
        this.x = x
    }
}