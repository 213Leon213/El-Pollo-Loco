class movableObject {
    x = 120;
    y = 350;
    img;
    classImages = {};
    currentImage = 0;
    width = 100;
    height = 100;
    speed = 0.2;


    moveRight(){
        console.log('moving-right');
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
       arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.classImages[path] = img;
       });
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}