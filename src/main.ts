import { } from "./main.scss";
import { GameSettings } from "./interfaces";
import { gameStatsInnerHTML } from "./innerHTML";
import { gameLayoutInnerHTML } from "./innerHTML"

const gameSettings: GameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

const firstPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
}
const secPick = {
    cardid: null,
    cardIndex: null,
    cardElement: null,
}

// let firstPick: string | null = null;
// let secPick: string | null = null;
// let firstPickIndex: string | null = null
// let secPickIndex: string | null = null
let game = document.getElementById("gameLayout");

init()

function init() {
    layoutChange()
    changeImg()
    updateSettingsUI()
    gameLayout()
}

function clearform() {
    let x = Object.values(gameSettings)
    x.forEach(e => e.length = 0)
}

function layoutChange(): void {
    clearform()
    const checked = Array.from(document.querySelectorAll<HTMLElement>(":checked"));
    if (checked.length > 0) {
        checked.forEach(e => {
            const data = e.dataset
            if (data.theme) {
                gameSettings.theme.push(data.theme);
            }
            if (data.playerselect) {
                gameSettings.player.push(data.playerselect);
            }
            if (data.size) {
                gameSettings.mapSize.push(Number(data.size));
            }
        })
    }
}

function changeImg(): void {
    if (gameSettings.theme.length === 0) {
        return
    } else {
        const img = document.querySelectorAll<HTMLImageElement>(".wrapper__img img");
        img.forEach(e => {
            const theme = gameSettings.theme[0].toLowerCase().replaceAll(" ", "-");
            const isMatch = e.src.toLowerCase().includes(theme);
            if (isMatch) {

                e.classList.remove("hidden");
            } else {

                e.classList.add("hidden");
            }
        });
    }
}

function cardsGenerate(mapSize: number) {
    const pairs = mapSize / 2;
    const cards = [];
    for (let i = 0; i < pairs; i++) {
        cards.push(i);
        cards.push(i)
    }
    for (let i = cards.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[random]] = [cards[random], cards[i]];
    }
    return cards
}

function updateSettingsUI(): void {
    const anchors = [document.getElementById("content")];
    anchors.forEach((anchor) => {
        if (anchor) {
            anchor.innerHTML = "";
            anchor.innerHTML += gameStatsInnerHTML(gameSettings.theme, gameSettings.player, gameSettings.mapSize);
        }
    });
}

function gameLayout(): void {
    const content = document.getElementById("gameLayout")
    if (content) {
        content.innerHTML = "";
        const cards = cardsGenerate(gameSettings.mapSize)
        cards.forEach((cardValue, i) => {
            content.innerHTML += gameLayoutInnerHTML(cardValue, i)
        })
    }
}


if (game) {
    game.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target) {
            datatrnsform(target)
        }
    });
}

function datatrnsform(target: null | string | HTMLElement) {
    if (firstPick.cardid === null) {
        firstPick.cardid = target.closest(".gameLayout") as HTMLElement
        firstPick.cardindex = target.closest(".gameLayout").dataset.cardIndex as HTMLElement
        firstPick.cardelement = target
        console.log(firstPick);
    } else if (secPick.cardid === null) {
        secPick.cardid = target.closest(".gameLayout") as HTMLElement
        secPick.cardindex = target.closest(".gameLayout").dataset.cardIndex as HTMLElement
        secPick.cardelement = target
        console.log(secPick);
        gameEngine()
    }

}

function gameEngine() {
    if (secPick.cardid === null) {
        return;
    }
    const result = matched();

    if (result) {
        console.log("Muster matched! Ein Paar gefunden!");
        resetRound()
    } else {
        console.log("Leider falsch!");
        resetRound()
    }
}

function matched(): boolean {
    if (firstPick === null || secPick === null) {
        return false;
    }
    return firstPick.cardid === secPick.cardid;
}

function resetRound(): void {
    firstPick.cardid = null;
    firstPick.cardindex = null;
    firstPick.cardelement = null;
    secPick.cardid = null;
    secPick.cardindex = null;
    secPick.cardelement = null;
}

function win(): void {
    setTimeout(() => {
        styleReset()
        resetRound()
    }, 20);

}

function lose(): void {
    setTimeout(() => {
        styleReset()
        resetRound()
    }, 20);

}

function styleReset() {
    let x = document.querySelectorAll("data.cardindex")
    console.log(x);





}


