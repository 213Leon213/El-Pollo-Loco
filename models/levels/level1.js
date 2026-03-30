const level1 = new Level(
    [
    new chicken(), 
    new chicken(), 
    new chicken(),
    new Endboss(this)
    ],
    [
    new Cloud()
    ],
    [
        new BackgroundObject('img/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 720, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720 * 2, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 720 * 2, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 720 * 2, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 720 * 2, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720 * 3, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 720 * 3, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 720 * 3, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 720 * 3, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720 * 4, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 720 * 4, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 720 * 4, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 720 * 4, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720 * 5, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 720 * 5, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 720 * 5, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 720 * 5, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720 * 6, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 720 * 6, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 720 * 6, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 720 * 6, 0),
        new BackgroundObject('img/img/5_background/layers/air.png', 720 * 7, 0),
        new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 720 * 7, 0),
        new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 720 * 7, 0),
        new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 720 * 7, 0),
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle()
    ]
);