export interface GameSettings {
    theme: string[];
    player: string[];
    mapSize: number[];
}

export interface firstPick {
    cardid: HTMLElement | null;
    cardindex: string | null;
    cardelement: HTMLElement | null;
}

export interface secPick {
    cardid: HTMLElement | null;
    cardindex: string | null;
    cardelement: HTMLElement | null;
}

export interface ThemeAssets {
    "code-vibes-theme": string[];
    codeFront: string[];
    "gaming-theme": string[];
    gamingFront: string[];
}

export interface Scores {
    blue: number;
    orange: number;
}

export interface PlayerColors {
    p1: string;
    p2: string;
}