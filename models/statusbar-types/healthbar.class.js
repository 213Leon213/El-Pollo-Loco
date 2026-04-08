class Healthbar extends Statusbar {

    


    constructor(world) {
        super();
        this.img = img;
        this.x = 10;
        this.y = -10;
        this.setPercentage("Health", 100);
        world = world;
        this.healthBarUpdate();
    }

    healthBarUpdate() {
        setInterval(()=> {
            switch (world.character.hp) {
                case 0:
                    world.healthStatusBar.setPercentage("Health", 0);
                    break;
                case 20:
                    world.healthStatusBar.setPercentage("Health", 20);
                    break;
                case 40:
                    world.healthStatusBar.setPercentage("Health", 40);
                    break;
                case 60:
                    world.healthStatusBar.setPercentage("Health", 60);
                    break;
                case 80:
                    world.healthStatusBar.setPercentage("Health", 80);
                    break;
                case 100:
                    world.healthStatusBar.setPercentage("Health", 100);
                    break;

                default: 
                    break;
            }
        }, 100);
    }
}