import { } from "./main.scss";
import { GameSettings } from "./interfaces";
import { gameStatsInnerHTML } from "./innerHTML";
import { gameLayoutInnerHTML } from "./innerHTML"

const gameSettings: GameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

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

function layoutChange() {
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

function changeImg() {
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

function updateSettingsUI() {
    const anchors = [document.getElementById("content")];
    anchors.forEach((anchor) => {
        if (anchor) {
            anchor.innerHTML = "";
            anchor.innerHTML += gameStatsInnerHTML(gameSettings.theme, gameSettings.player, gameSettings.mapSize);
        }
    });
}


function gameLayout() {
    const content = document.getElementById("gameLayout")
    if (content) {
        content.innerHTML = "";
        const cards = cardsGenerate(gameSettings.mapSize)
        cards.forEach((cardValue) => {
            content.innerHTML += gameLayoutInnerHTML(cardValue)
        })
    }
}

let game = document.getElementById("gameLayout");
if (game) {
    game.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        const closest = target.closest(".gameLayout") as HTMLElement | null;
        if (closest) {
            pickMatch(closest);
        }
    });
}
let firstPick: string | null = null;
let secPick: string | null = null;
function pickMatch(closest: HTMLElement): void {
    if (firstPick === null) {
        firstPick = closest.dataset.card;  // id der karte
        closest.classList.add("first-Card"); // add styling nach pick
    } else if (firstPick !== null) { 
        secPick = closest.dataset.card // id der karte 
        closest.classList.add("sec-Card");
    }

    if (matched() === true) {
        closest.classList.remove("first-Card") // kommen wir immer rein bei doppel pick

    } else if (matched() === false) {
        closest.classList.remove("sec-Card")
    }
}

function matched() { // simpler vergleich  der muss aber auch denn status der ids zurücklsetzen und das styling
    if (firstPick === null && secPick === null) { 
        return
    } else if (firstPick !== null && secPick !== null) { 
        if (firstPick == secPick) {
            console.log("win");
            console.log(firstPick, secPick);
            firstPick = null
            secPick = null
            return true
        } else {
            console.log("lose");
            console.log(firstPick, secPick);
            firstPick = null
            secPick = null
            return false
        }

    }
}





