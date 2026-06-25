import "./main.scss";
import { firstPick, GameSettings, secPick } from "./interfaces";
import { gameStatsInnerHTML } from "./innerHTML";
import { gameLayoutInnerHTML } from "./innerHTML"
import { playerSVGOrange } from "./innerHTML"
import { playerSVGBlue } from "./innerHTML"


const gameSettings: GameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

const theme = {
    "code-vibes-theme": [
        "assets/img/themes/code/Property 1=Component 22-1.png",
        "assets/img/themes/code/Property 1=Component 22-2.png",
        "assets/img/themes/code/Property 1=Component 22-3.png",
        "assets/img/themes/code/Property 1=Component 22-4.png",
        "assets/img/themes/code/Property 1=Component 22-5.png",
        "assets/img/themes/code/Property 1=Component 22-6.png",
        "assets/img/themes/code/Property 1=Component 22-7.png",
        "assets/img/themes/code/Property 1=Component 22-8.png",
        "assets/img/themes/code/Property 1=Component 22-9.png",
        "assets/img/themes/code/Property 1=Component 22-10.png",
        "assets/img/themes/code/Property 1=Component 22-11.png",
        "assets/img/themes/code/Property 1=Component 22-12.png",
        "assets/img/themes/code/Property 1=Component 22-13.png",
        "assets/img/themes/code/Property 1=Component 22-14.png",
        "assets/img/themes/code/Property 1=Component 22-15.png",
        "assets/img/themes/code/Property 1=Component 22-16.png",
        "assets/img/themes/code/Property 1=Component 22-17.png",
        "assets/img/themes/code/Property 1=Component 22-18.png",
    ],
    codeFront: ["assets/img/themes/code/Front.png"],
    "gaming-theme": [
        "assets/img/themes/gaming/Property 1=Component 2-1.png",
        "assets/img/themes/gaming/Property 1=Component 2-2.png",
        "assets/img/themes/gaming/Property 1=Component 2-3.png",
        "assets/img/themes/gaming/Property 1=Component 2-4.png",
        "assets/img/themes/gaming/Property 1=Component 2-5.png",
        "assets/img/themes/gaming/Property 1=Component 2-6.png",
        "assets/img/themes/gaming/Property 1=Component 2-7.png",
        "assets/img/themes/gaming/Property 1=Component 2-8.png",
        "assets/img/themes/gaming/Property 1=Component 2-9.png",
        "assets/img/themes/gaming/Property 1=Component 2-10.png",
        "assets/img/themes/gaming/Property 1=Component 2-11.png",
        "assets/img/themes/gaming/Property 1=Component 2-12.png",
        "assets/img/themes/gaming/Property 1=Component 2-13.png",
        "assets/img/themes/gaming/Property 1=Component 2-14.png",
        "assets/img/themes/gaming/Property 1=Component 2-15.png",
        "assets/img/themes/gaming/Property 1=Component 2-16.png",
        "assets/img/themes/gaming/Property 1=Component 2-17.png",
        "assets/img/themes/gaming/Property 1=Component 2-18.png",
    ],
    gamingFront: ["assets/img/themes/gaming/Front.png"]
}

console.log(gameSettings);


const firstPick: firstPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
}
const secPick: secPick = {
    cardid: null,
    cardindex: null,
    cardelement: null,
}

let player1Moves = 0;
let player2Moves = 0;
let activePlayer = 1;

const game = document.getElementById("gameLayout");

function init() {
    layoutChange();
    updateSettingsUI();
    gameLayout();
    resizeplayermap();
    changeImg();
    updateActivePlayerUI();
    updatePlayerStats();
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
                console.log(data.playerselect)
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
        if (!gameSettings.theme[0]) return
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
    const content = document.getElementById("gameLayout");
    if (content) {
        content.innerHTML = "";
        if (!gameSettings.theme[0]) return
        const img = gameSettings.theme[0].toLowerCase().replaceAll(" ", "-");
        let frontImg = img === "code-vibes-theme" ? theme.codeFront[0] : theme.gamingFront[0]
        const images = theme[img as keyof typeof theme] as string[];
        const cards = cardsGenerate(gameSettings.mapSize[0]);
        cards.forEach((cardValue, i) => {
            content.innerHTML += gameLayoutInnerHTML(cardValue, i, images[cardValue], frontImg);
        });
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

function datatrnsform(target: HTMLElement) {
    const wrapper = target.closest(".flip") as HTMLElement;

    if (!wrapper) return;
    if (wrapper.classList.contains("flipped")) {
        return
    };
    if (wrapper === firstPick.cardid) {
        return
    };
    if (firstPick.cardid === null) {
        firstPick.cardid = wrapper;
        firstPick.cardindex = wrapper.dataset.cardIndex ?? null;
        firstPick.cardelement = target;
        console.log(firstPick);
        stylePick(target);
    } else if (secPick.cardid === null) {
        secPick.cardid = wrapper;
        secPick.cardindex = wrapper.dataset.cardIndex ?? null;
        secPick.cardelement = target;
        console.log(secPick);
        stylePick(target);
        gameEngine();
    }
}

function stylePick(target: HTMLElement): void {
    const layout = target.closest(".flip");
    if (!layout) return;
    layout.classList.add("flipped");
}

function gameEngine() {
    if (secPick.cardid === null) {
        return;
    }
    const result = matched();
    if (result) {

        win()
        console.log("matched");
    } else {
        lose()
        console.log("wrong");
    }
}

function matched(): boolean {
    const cardone = (firstPick.cardid as HTMLElement)?.dataset.card;
    const cardtwo = (secPick.cardid as HTMLElement)?.dataset.card;
    return cardone !== undefined && cardone === cardtwo;
}

function resetRound(): void {
    firstPick.cardid = null;
    firstPick.cardindex = null;
    firstPick.cardelement = null;
    secPick.cardid = null;
    secPick.cardindex = null;
    secPick.cardelement = null;
}

// function win(): void {
//     setTimeout(() => {
//         resetRound();
//     }, 20);
// }

// function lose(): void {
//     setTimeout(() => {
//         styleReset()
//         resetRound()
//     }, 800);
// }

function styleReset(): void {
    firstPick.cardelement?.closest(".flip")?.classList.remove("flipped");
    secPick.cardelement?.closest(".flip")?.classList.remove("flipped");
}


document.addEventListener("DOMContentLoaded", function () {
    init();
    const checkboxes = document.querySelectorAll<HTMLInputElement>("input[type='radio']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", init,);
    });
});

console.log(gameSettings.mapSize);


function resizeplayermap() {
    let x = document.getElementById("gameLayout")
    if (!x) return;
    const mapSize = gameSettings.mapSize[0];
    if (mapSize === undefined || mapSize === null) {
        return;
    }
    if (mapSize === 16) {
        x.style.gridTemplateColumns = "repeat(4,1fr)";
    }
    if (mapSize === 24) {
        x.style.gridTemplateColumns = "repeat(6,1fr)";
    }
    if (mapSize === 36) {
        x.style.gridTemplateColumns = "repeat(6,1fr)";
    }
}

function switchPlayer(): void {
    activePlayer = activePlayer === 1 ? 2 : 1;
    updateActivePlayerUI();
}



function updateActivePlayerUI(): void {
    const playerSVG = document.getElementById("playerSVG");
    if (!playerSVG) return;
    const { p1, p2 } = getPlayerColors();
    const currentColor = activePlayer === 1 ? p1 : p2;
    if (currentColor === "orange") {
        playerSVG.innerHTML = playerSVGOrange();
    } else {
        playerSVG.innerHTML = playerSVGBlue();
    }
}

function getPlayerColors(): { p1: string, p2: string } {
    const chosen = gameSettings.player[0];
    return {
        p1: chosen,
        p2: chosen === "orange" ? "blue" : "orange"
    };
}

function updatePlayerStats(): void {
    const blue = document.getElementById("playerBlue");
    const orange = document.getElementById("playerOrange");
    const { p1, p2 } = getPlayerColors();
    if (p1 === "blue") {
        if (blue) blue.textContent = String(player1Moves);
        if (orange) orange.textContent = String(player2Moves);
    } else {
        if (orange) orange.textContent = String(player1Moves);
        if (blue) blue.textContent = String(player2Moves);
    }
}

function win(): void {
    if (activePlayer === 1) {
        player1Moves++
    }
    else player2Moves++;
    updatePlayerStats();
    setTimeout(() => resetRound(), 20);
}

function lose(): void {
    if (activePlayer === 1) player1Moves++;
    else player2Moves++;
    updatePlayerStats();
    setTimeout(() => {
        styleReset();
        resetRound();
        switchPlayer();
    }, 800);
}