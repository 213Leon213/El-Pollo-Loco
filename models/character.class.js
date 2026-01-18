class Character extends movableObject{

    IMG_WALKING = [
            '../img/img/2_character_pepe/2_walk/W-21.png',
            '../img/img/2_character_pepe/2_walk/W-22.png',
            '../img/img/2_character_pepe/2_walk/W-23.png',
            '../img/img/2_character_pepe/2_walk/W-24.png',
            '../img/img/2_character_pepe/2_walk/W-25.png',
            '../img/img/2_character_pepe/2_walk/W-26.png'
        ];

        

    constructor() {
        super().loadImage('../img/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMG_WALKING);
        this.animate();
        this.height = 330;
        this.width = 150;
        this.y = 120;
    }


    jump(){

    }

    animate() {
        setInterval (() => {
            let i = this.currentImage % this.IMG_WALKING.length;
            let path = this.IMG_WALKING[i];
            this.img = this.classImages[path];
            this.currentImage++;
        }, 1000/15)
    }
}