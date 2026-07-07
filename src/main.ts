import "./main.scss";
import type { firstPick, GameSettings, secPick } from "./interfaces";
import { gameStatsInnerHTML } from "./innerHTML";
import { gameLayoutInnerHTML } from "./innerHTML"
import { playerSVGOrange } from "./innerHTML"
import { playerSVGBlue } from "./innerHTML"
import { gameOverInnerHTML } from "./innerHTML"
import { resultInnerHTML } from "./innerHTML"

let player1Moves = 0;
let player2Moves = 0;
let activePlayer = 1;
let matchedPairs = 0;
let totalPairs = 0;

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

const game = document.getElementById("gameLayout");

function init() {
    layoutChange();
    updateSettingsUI();
    changeImg();
}

function isReady(): boolean {
    return gameSettings.theme.length > 0 && gameSettings.player.length > 0 && gameSettings.mapSize.length > 0;
}

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
    const theme = gameSettings.theme[0]?.toLowerCase().replaceAll(" ", "-");
    const isGaming = theme === "gaming-theme";
    grid.classList.toggle("wrapper-grid--gaming", isGaming);
    const back = document.getElementById("returnBack");
    const quit = document.getElementById("exitGame");
    if (back) back.textContent = isGaming ? "No, back to game" : "Back to game";
    if (quit) quit.textContent = isGaming ? "Yes, quit game" : "Exit game";
}

// NEU: Zentrale Screen-Steuerung. Blendet alle Screens aus und zeigt nur den gewuenschten.
function showScreen(name: "start" | "settings" | "game" | "gameover"): void {
    const screens: Record<string, string> = {
        start: "startScreen",
        settings: "setting",
        game: "gamingWrapper",
        gameover: "gameOverScreen",
    };
    Object.values(screens).forEach(id => {
        document.getElementById(id)?.classList.add("hidden");
    });
    document.getElementById(screens[name])?.classList.remove("hidden");
}

function goToSettings(): void {
    showScreen("settings");
}

function openExitPopup(): void {
    document.getElementById("exit-action")?.classList.remove("hidden");
}

function closeExitPopup(): void {
    document.getElementById("exit-action")?.classList.add("hidden");
}

function quitToHome(): void {
    closeExitPopup();
    showScreen("start");
}

function goHome(): void {
    showScreen("start");
}

(window as any).goToSettings = goToSettings;
(window as any).openExitPopup = openExitPopup;
(window as any).closeExitPopup = closeExitPopup;
(window as any).quitToHome = quitToHome;
(window as any).goHome = goHome;
(window as any).startGame = startGame;

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
            // GEAENDERT: isReady() als 4. Argument -> Start-Button ist nur bei vollstaendiger Auswahl aktiv.
            anchor.innerHTML += gameStatsInnerHTML(gameSettings.theme, gameSettings.player, gameSettings.mapSize, isReady());
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

function styleReset(): void {
    firstPick.cardelement?.closest(".flip")?.classList.remove("flip--flipped");
    secPick.cardelement?.closest(".flip")?.classList.remove("flip--flipped");
}


document.addEventListener("DOMContentLoaded", function () {
    init();
    showScreen("start");
    const checkboxes = document.querySelectorAll<HTMLInputElement>("input[type='radio']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", init,);
    });
});

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

function checkGameOver(): void {
    if (totalPairs > 0 && matchedPairs >= totalPairs) {
        showGameOver();
    }
}

function getScores(): { blue: number, orange: number } {
    const { p1 } = getPlayerColors();
    if (p1 === "blue") {
        return { blue: player1Moves, orange: player2Moves };
    }
    return { blue: player2Moves, orange: player1Moves };
}

function showGameOver(): void {
    const content = document.getElementById("gameOverContent");
    const screen = document.getElementById("gameOverScreen");
    if (!content || !screen) return;
    const isGaming = gameSettings.theme[0]?.toLowerCase().replaceAll(" ", "-") === "gaming-theme";
    screen.classList.toggle("game-over--gaming", isGaming);
    const { blue, orange } = getScores();
    content.innerHTML = gameOverInnerHTML(blue, orange, isGaming);
    showScreen("gameover");
    setTimeout(() => showResult(blue, orange, isGaming), 2500);
}

function showResult(blue: number, orange: number, isGaming: boolean): void {
    const content = document.getElementById("gameOverContent");
    if (!content) return;
    const winner = (blue > orange ? "blue" : orange > blue ? "orange" : "draw") as "blue" | "orange" | "draw";
    content.innerHTML = resultInnerHTML(winner, isGaming);
}