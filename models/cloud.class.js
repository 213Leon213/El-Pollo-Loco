class Cloud extends movableObject {

    height = 400;
    width = 700;
    speed = 0.1;

    constructor() {
        super().loadImage('../img/img/5_background/layers/4_clouds/1.png');
        this.y = 1;
        this.moveClouds();
        this.height = 400;
        this.width = 700;
    }


    //img/img/5_background/layers/4_clouds/1.png

    moveClouds() {
        this.moveLeft();
    }
    


}

