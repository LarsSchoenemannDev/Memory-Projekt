import { gameSettings } from "./state";

/**
 * Checks if the game settings are ready for a new game.
 *
 * @return {boolean} Returns true if all required settings (theme, player selection and map size) have been defined.
 */
export function isReady(): boolean {
    return gameSettings.theme.length > 0 && gameSettings.player.length > 0 && gameSettings.mapSize.length > 0;
}

/**
 * Resets all form fields to their initial state by clearing the selected values for theme, player type and grid size.
 *
 * @return {void} This function does not return any value. It updates the gameSettings object directly.
 */
function clearform(): void {
    let x = Object.values(gameSettings)
    x.forEach(e => e.length = 0)
}

/**
 * Updates the settings UI based on user's interactions with form elements to set theme, player type and grid size.
 *
 * @return {void} The method doesn't return anything but modifies global gameSettings object and triggers changeImg() when done.
 */
export function layoutChange(): void {
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

/**
 * Changes the preview images based on selected theme or default settings.
 *
 * @param {string} [previewTheme] - Optional parameter specifying a specific theme to be used for previewing (default is undefined).
 *
 * @return {void} This method doesn't return anything but it updates classes of image elements in DOM according to selection criteria.
 */
export function changeImg(previewTheme?: string): void {
    const images = document.querySelectorAll<HTMLImageElement>(".wrapper__img img");
    const selectedTheme = previewTheme ?? gameSettings.theme[0];
    const themeName = selectedTheme?.toLowerCase().replaceAll(" ", "-");

    images.forEach(image => {
        const showQuestion = !themeName && image.classList.contains("wrapper--question");
        const showTheme = themeName && image.src.toLowerCase().includes(themeName);
        image.classList.toggle("hidden", !showQuestion && !showTheme);
    });
}

/**
 * Updates the content displayed on settings screen based on current game settings (theme, player type and grid size).
 *
 * @return {void} This method doesn't return anything but it updates text contents of relevant elements in DOM according to selected values.
 */
export function updateSettingsUI(): void {
    const themeElement = document.getElementById("theme");
    const playerElement = document.getElementById("player");
    const sizeElement = document.getElementById("size");
    const startButton = document.getElementById("startButton") as HTMLButtonElement | null;

    if (themeElement) {
        themeElement.textContent = gameSettings.theme[0] ?? "";
    }

    if (playerElement) {
        playerElement.textContent = gameSettings.player[0] ?? "";
    }

    if (sizeElement) {
        sizeElement.textContent = String(gameSettings.mapSize[0] ?? "");
    }

    if (startButton) {
        startButton.disabled = !isReady();
    }
}

/**
 * Initializes the settings interface by setting initial layout and triggering necessary UI updates based on game state.
 *
 * @return {void} This method doesn't return anything but sets up event handlers and initial values for UI elements as well as calling changeImg() to initialize image previews.
 */
export function init(): void {
    layoutChange();
    updateSettingsUI();
    changeImg();
}
