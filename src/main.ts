import "./styles/main.scss";

import type { Scores, PlayerColors } from "./interfaces";
import { theme } from "./themes";
import { PLAYER_COLOR, gameSettings, firstPick, secPick } from "./state";
import { showScreen, goToSettings, goHome, openExitPopup, closeExitPopup, quitToHome } from "./screens";
import { init, isReady, changeImg } from "./settings";
import { gameLayoutInnerHTML } from "./innerHTML"
import { playerSVGOrange } from "./innerHTML"
import { playerSVGBlue } from "./innerHTML"
import { gameOverInnerHTML } from "./innerHTML"
import { winnerInnerHTML } from "./innerHTML"
import { drawInnerHTML } from "./innerHTML"
import { confettiInnerHTML } from "./innerHTML"

let player1Moves = 0;
let player2Moves = 0;
let activePlayer = 1;
let matchedPairs = 0;
let totalPairs = 0;

const game = document.getElementById("gameLayout");

function startGame(): void {
    if (!isReady()) return;
    resetScores();
    gameLayout();
    resizeplayermap();
    applyBoardTheme();
    updateActivePlayerUI();
    updatePlayerStats();
    showScreen("game");
}

function applyBoardTheme(): void {
    const grid = document.getElementById("gamingWrapper");
    if (!grid) return;
    const selected = gameSettings.theme[0]?.toLowerCase().replaceAll(" ", "-");
    const isGaming = selected === "gaming-theme";
    grid.classList.toggle("wrapper-grid--gaming", isGaming);
    const back = document.getElementById("returnBack");
    const quit = document.getElementById("exitGame");
    if (back) back.textContent = isGaming ? "No, back to game" : "Back to game";
    if (quit) quit.textContent = isGaming ? "Yes, quit game" : "Exit game";
}

(window as any).goToSettings = goToSettings;
(window as any).openExitPopup = openExitPopup;
(window as any).closeExitPopup = closeExitPopup;
(window as any).quitToHome = quitToHome;
(window as any).goHome = goHome;
(window as any).startGame = startGame;

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
    if (wrapper.classList.contains("flip--flipped")) {
        return
    };
    if (wrapper === firstPick.cardid) {
        return
    };
    if (firstPick.cardid === null) {
        firstPick.cardid = wrapper;
        firstPick.cardindex = wrapper.dataset.cardIndex ?? null;
        firstPick.cardelement = target;
        stylePick(target);
    } else if (secPick.cardid === null) {
        secPick.cardid = wrapper;
        secPick.cardindex = wrapper.dataset.cardIndex ?? null;
        secPick.cardelement = target;
        stylePick(target);
        gameEngine();
    }
}

function stylePick(target: HTMLElement): void {
    const layout = target.closest(".flip");
    if (!layout) return;
    layout.classList.add("flip--flipped");
}

function styleReset(): void {
    firstPick.cardelement?.closest(".flip")?.classList.remove("flip--flipped");
    secPick.cardelement?.closest(".flip")?.classList.remove("flip--flipped");
}

function gameEngine() {
    if (secPick.cardid === null) {
        return;
    }
    const result = matched();
    if (result) {
        win()
    } else {
        lose()
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

function win(): void {
    firstPick.cardid?.classList.add("flip--matched");
    secPick.cardid?.classList.add("flip--matched");
    firstPick.cardid?.setAttribute("disabled", "");
    secPick.cardid?.setAttribute("disabled", "");

    if (activePlayer === 1) {
        player1Moves++
    }
    else player2Moves++;
    matchedPairs++;
    updatePlayerStats();
    setTimeout(() => {
        resetRound();
        checkGameOver();
    }, 20);
}

function lose(): void {
    setTimeout(() => {
        styleReset();
        resetRound();
        switchPlayer();
    }, 800);
}

function resetScores(): void {
    player1Moves = 0;
    player2Moves = 0;
    activePlayer = 1;
    matchedPairs = 0;
    totalPairs = gameSettings.mapSize[0] / 2;
    resetRound();
}

function switchPlayer(): void {
    activePlayer = activePlayer === 1 ? 2 : 1;
    updateActivePlayerUI();
}

function getPlayerColors(): PlayerColors {
    const chosen = gameSettings.player[0];
    return {
        p1: chosen,
        p2: chosen === "orange" ? "blue" : "orange"
    };
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

function updatePlayerStats(): void {
    const blue = document.getElementById("playerBlue");
    const orange = document.getElementById("playerOrange");
    const { p1 } = getPlayerColors();
    if (p1 === "blue") {
        if (blue) blue.textContent = String(player1Moves);
        if (orange) orange.textContent = String(player2Moves);
    } else {
        if (orange) orange.textContent = String(player1Moves);
        if (blue) blue.textContent = String(player2Moves);
    }
}

function getScores(): Scores {
    const { p1 } = getPlayerColors();
    if (p1 === "blue") {
        return { blue: player1Moves, orange: player2Moves };
    }
    return { blue: player2Moves, orange: player1Moves };
}

function checkGameOver(): void {
    if (totalPairs > 0 && matchedPairs >= totalPairs) {
        showGameOver();
    }
}

function showGameOver(): void {
    const content = document.getElementById("gameOverContent");
    const screen = document.getElementById("gameOverScreen");
    if (!content || !screen) return;
    const isGaming = gameSettings.theme[0]?.toLowerCase().replaceAll(" ", "-") === "gaming-theme";
    screen.classList.toggle("game-over--gaming", isGaming);
    const { blue, orange } = getScores();
    const titleSrc = isGaming ? "assets/img/game-over-gaming.png" : "assets/img/game-over-code.png";
    content.innerHTML = gameOverInnerHTML(blue, orange, titleSrc, PLAYER_COLOR.blue, PLAYER_COLOR.orange);
    showScreen("gameover");
    setTimeout(() => showResult(blue, orange, isGaming), 2500);
}

function showResult(blue: number, orange: number, isGaming: boolean): void {
    const content = document.getElementById("gameOverContent");
    if (!content) return;
    const winner = (blue > orange ? "blue" : orange > blue ? "orange" : "draw") as "blue" | "orange" | "draw";
    const btnLabel = isGaming ? "Home" : "Back to start";

    if (winner === "draw") {
        const titleSrc = isGaming ? "assets/img/draw-gamin.png" : "assets/img/draw-code.png";
        const iconSrc = isGaming ? "assets/img/drawGaming.svg" : "assets/img/drawCode.svg";
        content.innerHTML = drawInnerHTML(titleSrc, iconSrc, btnLabel);
        return;
    }

    const name = winner === "orange" ? "Orange Player" : "Blue Player";
    const displayName = isGaming ? name : name.toUpperCase();
    const iconSrc = isGaming ? "assets/img/pockal.png" : `assets/img/${winner}.svg`;
    const confetti = isGaming ? "" : confettiInnerHTML();
    content.innerHTML = winnerInnerHTML(displayName, `game-over__winner-name--${winner}`, iconSrc, confetti, btnLabel);
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoPlay(): Promise<void> {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("#gameLayout .flip"));
    const pairs: Record<string, HTMLElement[]> = {};
    cards.forEach(card => {
        const value = card.dataset.card;
        if (!value) return;
        (pairs[value] ??= []).push(card);
    });
    for (const value of Object.keys(pairs)) {
        const [first, second] = pairs[value];
        if (!first || !second) continue;
        datatrnsform(first);
        await sleep(10);
        datatrnsform(second);
        await sleep(30);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    showScreen("start");
    const checkboxes = document.querySelectorAll<HTMLInputElement>("input[type='radio']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", init,);
    });

    const themeInputs = document.querySelectorAll<HTMLInputElement>("[data-theme]");
    themeInputs.forEach(input => {
        const row = input.closest<HTMLElement>(".settings-menu__row--checkbox");
        row?.addEventListener("mouseenter", () => changeImg(input.dataset.theme));
        row?.addEventListener("mouseleave", () => changeImg());
    });
});

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        autoPlay();
    }
});
