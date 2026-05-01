class Bottlebar extends Statusbar {

    


    constructor(world) {
        super();
        this.img = img;
        this.x = 10;
        this.y = 130;
        this.setPercentage("Bottles", 0);
        world = world;
        this.bottleBarUpdate();
    }

    bottleBarUpdate() {
    this.updateInterval = setInterval(()=> {
            switch (world.character.bottles) {
                case 0:
                    world.bottleStatusBar.setPercentage("Bottles", 0);
                    break;
                case 1:
                    world.bottleStatusBar.setPercentage("Bottles", 20);
                    break;
                case 2:
                    world.bottleStatusBar.setPercentage("Bottles", 40);
                    break;
                case 3:
                    world.bottleStatusBar.setPercentage("Bottles", 60);
                    break;
                case 4:
                    world.bottleStatusBar.setPercentage("Bottles", 80);
                    break;
                case 5:
                    world.bottleStatusBar.setPercentage("Bottles", 100);
                    break;

                default: 
                    break;
            }
        }, 100);
    }
}