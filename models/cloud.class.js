class Cloud extends movableObject {

    height = 400;
    width = 700;

    constructor() {
        super().loadImage('../img/img/5_background/layers/4_clouds/1.png');
        this.y = 1;
        this.moveClouds();
        this.height = 400;
        this.width = 700;
    }


    //img/img/5_background/layers/4_clouds/1.png

    moveClouds() {
        setInterval( () => {
            this.x -= 0.1;
        }, 1000 / 60)
    }
    

}

