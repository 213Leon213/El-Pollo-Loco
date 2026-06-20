/**
 * Creates and returns the first level with all level objects.
 * 
 * @returns {Level} The created level.
 */
function createLevel() {
    return level1 = new Level(
        createLevelEnemies(),
        createLevelClouds(),
        createLevelBackground(),
        createLevelCoins(),
        createLevelBottles()
    );
}

/**
 * Creates all enemies for the level.
 * 
 * @returns {Array} The enemies of the level.
 */
function createLevelEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Endboss()
    ];
}

/**
 * Creates all clouds for the level.
 * 
 * @returns {Array} The clouds of the level.
 */
function createLevelClouds() {
    return [new Cloud()];
}

/**
 * Creates the complete background of the level.
 * 
 * @returns {Array} The background objects of the level.
 */
function createLevelBackground() {
    return [
        ...backgroundA(),
        ...backgroundB(),
        ...backgroundC()
    ];
}

/**
 * Creates all coins for the level.
 * 
 * @returns {Array} The coins of the level.
 */
function createLevelCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ];
}

/**
 * Creates all bottles for the level.
 * 
 * @returns {Array} The bottles of the level.
 */
function createLevelBottles() {
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ];
}

/**
 * Creates the first background section.
 * 
 * @returns {Array} Background objects from position 0 to 720 * 2.
 */
function backgroundA() {
    return [
        new BackgroundObject('./img/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('./img/img/5_background/layers/air.png', 720, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 720, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 720, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 720, 0),
        new BackgroundObject('./img/img/5_background/layers/air.png', 720 * 2, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 720 * 2, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 720 * 2, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 720 * 2, 0),
    ];
}

/**
 * Creates the second background section.
 * 
 * @returns {Array} Background objects from position 720 * 3 to 720 * 4.
 */
function backgroundB() {
    return [
        new BackgroundObject('./img/img/5_background/layers/air.png', 720 * 3, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 720 * 3, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 720 * 3, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 720 * 3, 0),
        new BackgroundObject('./img/img/5_background/layers/air.png', 720 * 4, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 720 * 4, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 720 * 4, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 720 * 4, 0)
    ];
}

/**
 * Creates the third background section.
 * 
 * @returns {Array} Background objects from position 720 * 5 to 720 * 7.
 */
function backgroundC() {
    return [
        new BackgroundObject('./img/img/5_background/layers/air.png', 720 * 5, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 720 * 5, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 720 * 5, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 720 * 5, 0),
        new BackgroundObject('./img/img/5_background/layers/air.png', 720 * 6, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 720 * 6, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 720 * 6, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 720 * 6, 0),
        new BackgroundObject('./img/img/5_background/layers/air.png', 720 * 7, 0),
        new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 720 * 7, 0),
        new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 720 * 7, 0),
        new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 720 * 7, 0)
    ];
}