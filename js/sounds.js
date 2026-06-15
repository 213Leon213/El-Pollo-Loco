/** @type {HTMLAudioElement} Sound played when a button is clicked. */
let buttonClickSound = new Audio("/audio/51124243-click-369586.mp3");

/** @type {HTMLAudioElement} Sound played while the character is sleeping. */
let characterSnoozeSound = new Audio("/audio/587349_7495013-lq.mp3");

/** @type {HTMLAudioElement} Sound played when the character takes damage. */
let characterDamageSound = new Audio("/audio/character_damage.mp3");

/** @type {HTMLAudioElement} Sound played when the character jumps. */
let characterJumpSound = new Audio("/audio/jump_sound.mp3");

/** @type {HTMLAudioElement} Sound played while the character is walking. */
let characterMoveSound = new Audio("/audio/footsteps_loop.wav");

/** @type {HTMLAudioElement} Sound played when a chicken dies. */
let chickenDiesSound = new Audio("/audio/chicken_dead_sound.wav");

/** @type {HTMLAudioElement} Sound played when the endboss becomes alert. */
let chickenAlarmSound = new Audio("/audio/chicken_alarm.mp3");

/** @type {HTMLAudioElement} Sound played when the endboss gets hurt. */
let chickenBossHurtSound = new Audio("/audio/chickenBoss_Hurt.wav");

/** @type {HTMLAudioElement} Sound played when the player wins. */
let winningSound = new Audio("/audio/win_sound.ogg");

/** @type {HTMLAudioElement} Sound played when the player loses. */
let losingSound = new Audio("/audio/GameOver_Sound.mp3");

/** @type {HTMLAudioElement} Sound played when the endboss gets hit. */
let endbossHittedSound = new Audio("/audio/endboss_gothurt_sound.ogg");

/** @type {HTMLAudioElement} Background music of the game. */
let music = new Audio("/audio/El Jarabe Tapatio-The Mexican Hat Dance - Nollan Smith (192k).mp3");

music.volume = 0.2;
characterMoveSound.volume = 0.17;

/**
 * Contains all game audio elements.
 * Used for muting and unmuting sounds.
 * 
 * @type {HTMLAudioElement[]}
 */
let sounds = [
    buttonClickSound,
    characterSnoozeSound,
    characterDamageSound,
    characterJumpSound,
    characterMoveSound,
    chickenDiesSound,
    chickenAlarmSound,
    chickenBossHurtSound,
    winningSound,
    losingSound,
    endbossHittedSound,
    music
];