/**
 * Represents a drawable game object.
 */
class DrawableObject {

    img;
    classImages = {};

    /**
     * Creates a new drawable object.
     */
    constructor() {

    }

    /**
     * Draws the object on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.globalAlpha = this.alpha ?? 1;
        ctx.save();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    /**
     * Draws the object's hitbox for debugging purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawHitbox(ctx) {
        if (this.checkObject()) {
        ctx.beginPath();
        ctx.linewidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * 
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
       arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.classImages[path] = img;
       });
    }

    /**
     * Draws the collision offset box for debugging purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawOffsetBox(ctx) {
        if (this.checkObject()) {
        ctx.beginPath();
        ctx.linewidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
        }
    }

    /**
     * Checks whether the object should display debug hitboxes.
     * 
     * @returns {boolean} True if the object supports debug hitboxes.
     */
    checkObject() {
        return this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss;
    }

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

}