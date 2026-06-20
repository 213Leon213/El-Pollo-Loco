/**
 * Represents a cloud in the background.
 */
class Cloud extends movableObject {

    height = 400;
    width = 700;
    speed = 0.1;

    /**
     * Creates a new cloud object.
     */
    constructor() {
        super().loadImage('./img/img/5_background/layers/4_clouds/1.png');
        this.y = 1;
        this.moveClouds();
        this.height = 400;
        this.width = 700;
    }

    /**
     * Starts the cloud movement.
     */
    moveClouds() {
        this.moveLeft();
    }

}