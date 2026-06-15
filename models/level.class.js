/**
 * Represents a game level containing all level objects.
 */
class Level {

    /** @type {Array} Contains all enemies of the level. */
    enemies;

    /** @type {Array} Contains all clouds of the level. */
    clouds;

    /** @type {Array} Contains all background objects of the level. */
    backgroundObjects;

    /** @type {Array} Contains all collectible coins of the level. */
    coins;

    /** @type {Array} Contains all collectible bottles of the level. */
    bottles;

    /** @type {number} Defines the end position of the level. */
    level_end_x = 720 * 7;

    /**
     * Creates a new level.
     * 
     * @param {Array} enemies - All enemies in the level.
     * @param {Array} clouds - All clouds in the level.
     * @param {Array} backgroundObjects - All background objects in the level.
     * @param {Array} coins - All collectible coins in the level.
     * @param {Array} bottles - All collectible bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}