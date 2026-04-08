class Statusbar extends DrawableObject {

    percentage = 0;
    

    imageGroup = {
        Health: [
        "../img/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "../img/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "../img/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "../img/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "../img/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "../img/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
        ],
        Bottles: [
        "../img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "../img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "../img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "../img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "../img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "../img/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
        ],
        Coins: [
        "../img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "../img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "../img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "../img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "../img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "../img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
        ]
    }

    

    constructor() {
        super();
        this.loadImages(this.imageGroup.Health);
        this.loadImages(this.imageGroup.Coins);
        this.loadImages(this.imageGroup.Bottles);
        this.x = 30;
        this.y = 100;
        this.width = 100;
        this.height = 60;
    }


    setPercentage(barType, percentage) {
        let groupName = this.imageGroup[barType];
        let result = groupName.find(path => path.includes(percentage + ".png"));
        this.img = this.classImages[result];

    }
    
    
    
}