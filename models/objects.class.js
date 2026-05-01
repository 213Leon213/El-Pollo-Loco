class Objects extends DrawableObject {
    x = 400 + Math.random() * (720 * 7) -500;
    y = 290;
    height = 200;
    width = 200;
    constructor() {
    super();
    }

    getCenterOfObject(obj) {
        const targetX = obj.x + obj.width / 2;
        const targetY = obj.y + obj.height / 2;
        const target = {x: targetX, y: targetY}
        return target;
    }

}