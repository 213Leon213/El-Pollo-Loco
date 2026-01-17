class movableObject {
    x = 120;
    y = 350;
    img;
    classImages = [];
    width = 100;
    height = 100;
    moveRight(){
        console.log('moving-right');
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages() {
        setInterval(() => {
            this.classImages.forEach(path => {
                this.img.src = path;
            })
        }, 1000 / 60)
    }

    moveLeft(){

    }
}