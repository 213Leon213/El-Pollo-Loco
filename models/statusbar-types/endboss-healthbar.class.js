class EndbossHealthbar extends Statusbar {


constructor(world) {
    super();
    this.img = img;
    this.x = 500;
    this.y = 0;
    this.world = world
    this.setValue();
    this.setPercentage("Endboss", 100);
    this.healthBarUpdate()
}

    setValue() {
        this.world.level?.enemies?.forEach(e => 
        {if (e instanceof Endboss) {
            this.endboss = e;
        }});
    }

    healthBarUpdate() {
    this.updateInterval = setInterval(()=> {
        if (!this.endboss) {
            this.setValue();
        }

            switch (this.endboss?.hp) {
                case 0:
                    this.setPercentage("Endboss", 0);
                    break;
                case 150:
                    this.setPercentage("Endboss", 40);
                    break;
                case 300:
                    this.setPercentage("Endboss", 60);
                    break;
                case 450:
                    this.setPercentage("Endboss", 80);
                    break;
                case 600:
                    this.setPercentage("Endboss", 100);
                    break;

                default: 
                    break;
            }
        }, 100);
    }




















}