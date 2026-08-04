/**
 * Defines a structure for game settings, including theme preferences and player selections.
 *
 * @type {GameSettings} The interface specifies arrays of strings representing themes and players, alongside an array of numbers indicating map size dimensions.
 */
export interface GameSettings {
    theme: string[];
    player: string[];
    mapSize: number[];
}

/**
 * Represents the state of a player's first card pick during gameplay.
 *
 * @type {firstPick} This interface includes properties for storing references to the selected card (DOM element), its index, and the card itself when chosen by a player as their starting choice.
 */
export interface firstPick {
    cardid: HTMLElement | null;
    cardindex: string | null;
    cardelement: HTMLElement | null;
}

/**
 * Represents the state of a player's second card pick during gameplay.
 *
 * @type {secPick} This interface includes properties for storing references to the selected card (DOM element), its index, and the card itself when chosen by a player as their subsequent choice after an initial pick has been made.
 */
export interface secPick {
    cardid: HTMLElement | null;
    cardindex: string | null;
    cardelement: HTMLElement | null;
}

/**
 * Contains definitions of theme assets used within the game application.
 *
 * @type {ThemeAssets} This object includes keys representing names of themes and values being arrays containing paths to respective asset images or front image placeholders for display in different contexts (e.g., gaming vs code).
 */
export interface ThemeAssets {
    "code-vibes-theme": string[];
    codeFront: string[];
    "gaming-theme": string[];
    gamingFront: string[];
}

/**
 * Represents a record mapping players to their scores.
 *
 * @type {Scores} The object associates 'blue' and 'orange' strings with number values indicating the score of each player in the game.
 */
export interface Scores {
    blue: number;
    orange: number;
}

/**
 * Defines color codes for two players involved in a game.
 *
 * @type {PlayerColors} This object contains properties p1 and p2 that map to string values representing hex color codes used to distinguish between player 1 (blue) and player 2 (orange).
 */
export interface PlayerColors {
    p1: string;
    p2: string;
}