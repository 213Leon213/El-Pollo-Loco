class Coin extends Objects{

    img;
    isCollected = false;

    constructor() {
        super();
        this.img = new Image();
        this.img.src = "../img/img/8_coin/coin_1.png";
    }

    animateCoinCollect(character) {
        const targetX = character.x + character.width / 2;
        const targetY = character.y + character.height / 2 + 60;
        const coinCenterX = this.x + this.width / 2;
        const coinCenterY = this.y + this.height / 2;
        this.x += (targetX - coinCenterX) * 0.2;
        this.y += (targetY - coinCenterY) * 0.2;
        this.width -= 10;
        this.height -= 10;
    }

    


    offset = {
        top: 70,
        bottom: 70,
        right: 70,
        left: 70
    }
}