/**
 * Represents a collectible game object.
 */
class Objects extends DrawableObject {

    x = 400 + Math.random() * (720 * 7) - 500;
    y = 290;
    height = 200;
    width = 200;

    /**
     * Creates a new collectible object.
     */
    constructor() {
        super();
    }

    /**
     * Returns the center coordinates of an object.
     * 
     * @param {DrawableObject} obj - The object whose center should be calculated.
     * @returns {{x: number, y: number}} The center coordinates.
     */
    getCenterOfObject(obj) {
        const targetX = obj.x + obj.width / 2;
        const targetY = obj.y + obj.height / 2;
        const target = {x: targetX, y: targetY}
        return target;
    }

}