class DrawableObject {



    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    checkObject() {
        return this instanceof Character|| this instanceof chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss;
    }
}