/**
 * Displays the specified screen.
 *
 * @param {string} name - The name of the screen to display. Valid options are 'start', 'settings', 'game', and 'gameover'.
 */
export function showScreen(name: "start" | "settings" | "game" | "gameover"): void {
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

/**
 * Navigate the application to the settings screen.
 *
 * @return {void} The function calls `showScreen("settings")` to display the settings screen.
 */
export function goToSettings(): void {
    showScreen("settings");
}

/**
 * Returns the user to the home/start screen of the application.
 *
 * @return {void} The function calls `showScreen("start")` to return the user to the start screen.
 */
export function goHome(): void {
    showScreen("start");
}

/**
 * Opens the exit confirmation popup.
 *
 * @return {void} This function removes the 'hidden' class from the exit action element, making it visible.
 */
export function openExitPopup(): void {
    document.getElementById("exit-action")?.classList.remove("hidden");
}

/**
 * Closes the exit confirmation popup.
 *
 * @return {void} The function adds the 'hidden' class to the exit action element, hiding the exit confirmation popup.
 */
export function closeExitPopup(): void {
    document.getElementById("exit-action")?.classList.add("hidden");
}

/**
 * Quits the current game and returns the user to the settings screen.
 *
 * @return {void} This function first closes the exit confirmation popup (if open) before navigating back to the settings menu.
 */
export function quitToHome(): void {
    closeExitPopup();
    showScreen("settings");
}
