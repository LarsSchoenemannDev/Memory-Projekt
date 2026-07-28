import type { GameSettings, firstPick as FirstPick, secPick as SecPick } from "./interfaces";

export const PLAYER_COLOR: Record<"blue" | "orange", string> = {
    blue: "#2BB1FF",
    orange: "#F58E39",
};

export const gameSettings: GameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

export const firstPick: FirstPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
};

export const secPick: SecPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
};
