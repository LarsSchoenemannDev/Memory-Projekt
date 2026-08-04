/**
 * Imports the main scss file for styling.
 */
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

/**
 * Player scores and game state variables.
 *
 * @var {number} player1Moves - Number of moves made by player 1.
 * @var {number} player2Moves - Number of moves made by player 2.
 * @var {number} activePlayer - ID of the current active player (1 or 2).
 * @var {number} matchedPairs - Number of pairs already matched during the game.
 * @var {number} totalPairs - Total number of card pairs in the game.
 */
let player1Moves = 0;
let player2Moves = 0;
let activePlayer = 1;
let matchedPairs = 0;
let totalPairs = 0;

/**
 * Gets a reference to the game layout element.
 *
 * @return {HTMLElement} The element representing the main game area.
 */
const game = document.getElementById("gameLayout");

/**
 * Starts a new game.
 *
 * @return {void} The function does not return any value, but initializes the game state and UI elements.
 */
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

/**
 * Applies the selected board theme.
 *
 * @return {void} The function updates classList and textContent of specific elements based on the current theme setting.
 */
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

/**
 * Generates a shuffled array of pairs for the game.
 *
 * @param {number} mapSize - The size of the game board which determines number of card pairs.
 * @return {Array<number>} An array containing randomized pairs (each number represents a unique pair).
 */
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

/**
 * Applies the layout of card pairs for a new round.
 *
 * @return {void} The function clears and updates HTML content inside "gameLayout" element.
 */
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

/**
 * Dynamically adjusts the grid template for various map sizes.
 *
 * @return {void} The function modifies style attribute of the main game layout element based on current settings.
 */
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

/**
 * Adds click event listener to the main game layout element for card flipping.
 *
 * @return {void} The function sets up event listeners and triggers corresponding functions on click events.
 */
if (game) {
    game.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target) {
            datatrnsform(target)
        }
    });
}

/**
 * Handles the card click event to flip and match cards.
 *
 * @param {HTMLElement} target - The HTML element representing the clicked card.
 * @return {void} This function checks if a second card has been selected, performs matching logic otherwise flips the first card.
 */
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

/**
 * Flips a card element.
 *
 * @param {HTMLElement} target - The HTML element representing the clicked card.
 * @return {void} The function adds a CSS class to flip the card visually.
 */
function stylePick(target: HTMLElement): void {
    const layout = target.closest(".flip");
    if (!layout) return;
    layout.classList.add("flip--flipped");
}

/**
 * Resets the flip state of cards after a pair match or non-match.
 *
 * @return {void} The function removes specific CSS classes to reset card flips.
 */
function styleReset(): void {
    firstPick.cardelement?.closest(".flip")?.classList.remove("flip--flipped");
    secPick.cardelement?.closest(".flip")?.classList.remove("flip--flipped");
}

/**
 * Executes the main logic for checking matches and updating state.
 *
 * @return {void} The function triggers winning or losing scenarios based on card pair matching results.
 */
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

/**
 * Compares data of two selected cards to determine if they match.
 *
 * @return {boolean} Returns true if both selected cards have the same dataset value, false otherwise.
 */
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

/**
 * Handles the logic when a match is made between two selected cards.
 *
 * @return {void} The function updates scores, disables matched card elements, and proceeds to next round if conditions are met.
 */
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

/**
 * Handles the logic when a match is not made between two selected cards.
 *
 * @return {void} The function resets flipped card states and switches active player after an interval delay.
 */
function lose(): void {
    setTimeout(() => {
        styleReset();
        resetRound();
        switchPlayer();
    }, 800);
}

/**
 * Resets the scores and game state for a new round.
 *
 * @return {void} The function resets player1Moves, player2Moves, activePlayer, matchedPairs, and totalPairs to their initial values.
 */
function resetScores(): void {
    player1Moves = 0;
    player2Moves = 0;
    activePlayer = 1;
    matchedPairs = 0;
    totalPairs = gameSettings.mapSize[0] / 2;
    resetRound();
}

/**
 * Switches the turn to the next player.
 *
 * @return {void} The function toggles the value of `activePlayer` between 1 and 2.
 */
function switchPlayer(): void {
    activePlayer = activePlayer === 1 ? 2 : 1;
    updateActivePlayerUI();
}

/**
 * Retrieves the colors assigned to each player based on user settings.
 *
 * @param {PlayerColors} Returns an object with keys p1 representing color of player one and p2 for player two. 
 */
function getPlayerColors(): PlayerColors {
    const chosen = gameSettings.player[0];
    return {
        p1: chosen,
        p2: chosen === "orange" ? "blue" : "orange"
    };
}

/**
 * Updates the UI to reflect which player's turn it is.
 *
 * @return {void} The function sets innerHTML of a specific SVG element based on current active player and theme settings.
 */
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

/**
 * Updates the score displays for both players.
 *
 * @return {void} The function sets textContent of specific elements to reflect updated player scores according to current state.
 */
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

/**
 * Retrieves scores for both players.
 *
 * @return {{blue: number; orange: number}} An object containing the number of moves made by each player.
 */
function getScores(): Scores {
    const { p1 } = getPlayerColors();
    if (p1 === "blue") {
        return { blue: player1Moves, orange: player2Moves };
    }
    return { blue: player2Moves, orange: player1Moves };
}

/**
 * Checks if the game has ended by comparing pairs matched with total number of pairs.
 *
 * @return {void} The function calls showGameOver() when game conditions are met for endgame state.
 */
function checkGameOver(): void {
    if (totalPairs > 0 && matchedPairs >= totalPairs) {
        showGameOver();
    }
}

/**
 * Displays the game over screen.
 *
 * @return {void} The function updates content and styling for game over display based on current theme and player scores.
 */
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

/**
 * Updates the game over screen to show results.
 *
 * @param {number} blue - Number of moves made by player with "blue" color.
 * @param {number} orange - Number of moves made by player with "orange" color.
 * @param {boolean} isGaming - Boolean indicating if gaming theme is active.
 * @return {void} The function sets HTML content to show winner or draw message and icon based on the outcome of the game.
 */
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

/**
 * A simple utility function that creates a promise resolving after a specified time.
 *
 * @param {number} ms - Number of milliseconds to wait before resolve.
 * @return {Promise<void>} The returned promise resolves once the sleep duration has passed.
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Automatically plays through the game by selecting matching cards.
 *
 * @return {Promise<void>} The function asynchronously triggers selection events for pairs of cards with matching data attributes.
 */
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

/**
 * Initializes the application when DOM content is loaded.
 *
 * @return {void} The function sets up event listeners, initializes game state and starts the first screen.
 */
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

/**
 * Adds a keydown event listener to trigger automatic gameplay with Ctrl+P.
 *
 * @return {void} The function sets up an event listener for specific keyboard input and triggers autoPlay function when condition is met.
 */
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        autoPlay();
    }
});
