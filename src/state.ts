import type { GameSettings, firstPick as FirstPick, secPick as SecPick } from "./interfaces";

/**
 * A record mapping player colors to their corresponding hexadecimal color codes.
 *
 * @type {Record<"blue" | "orange", string>} The object associates the strings 'blue' and 'orange' with hex color values representing these players.
 */
export const PLAYER_COLOR: Record<"blue" | "orange", string> = {
    blue: "#2BB1FF",
    orange: "#F58E39",
};

/**
 * Contains all settings for a new game instance, including theme preferences, player selection, and map dimensions.
 *
 * @type {GameSettings} The object defines arrays that hold information about the selected theme, chosen players (which can be 'blue' or 'orange'), and preferred grid size.
 */
export const gameSettings: GameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

/**
 * Represents the state of the player's initial card pick during gameplay.
 *
 * @type {FirstPick} This interface is used to store references to the selected card (DOM element), its index, and the element itself upon selection by a player as their starting choice.
 */
export const firstPick: FirstPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
};

/**
 * Represents the state of the second player's card pick during gameplay.
 *
 * @type {SecPick} This interface is used to store references to the selected card (DOM element), its index, and the element itself upon selection by a player as their subsequent choice after an initial pick has been made.
 */
export const secPick: SecPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
};
