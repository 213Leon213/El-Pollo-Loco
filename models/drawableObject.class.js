class DrawableObject {

    img;
    classImages = {};

    constructor() {

    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha ?? 1;
        ctx.save();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    drawHitbox(ctx) {
        if (this.checkObject()) {
        ctx.beginPath();
        ctx.linewidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

    loadImages(arr) {
       arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.classImages[path] = img;
       });
    }

    drawOffsetBox(ctx) {
        if (this.checkObject()) {
        ctx.beginPath();
        ctx.linewidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
        }
    }

    checkObject() {
        return this instanceof Character|| this instanceof chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss;
    }

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

    
}