class Coinbar extends Statusbar {

    


    constructor(world) {
        super();
        this.img = img;
        this.x = 10;
        this.y = 55;
        this.setPercentage("Coins", 0);
        world = world;
        this.coinBarUpdate();
    }


    coinBarUpdate() {
        setInterval(()=> {
            switch (world.character.coins) {
                case 1:
                    world.coinStatusBar.setPercentage("Coins", 20);
                    break;
                case 2:
                    world.coinStatusBar.setPercentage("Coins", 40);
                    break;
                case 3:
                    world.coinStatusBar.setPercentage("Coins", 60);
                    break;
                case 4:
                    world.coinStatusBar.setPercentage("Coins", 80);
                    break;
                case 5:
                    world.coinStatusBar.setPercentage("Coins", 100);
                    break;

                default: 
                    break;
            }
        }, 100);
    }
}