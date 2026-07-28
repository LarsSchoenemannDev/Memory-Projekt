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

export function goToSettings(): void {
    showScreen("settings");
}

export function goHome(): void {
    showScreen("start");
}

export function openExitPopup(): void {
    document.getElementById("exit-action")?.classList.remove("hidden");
}

export function closeExitPopup(): void {
    document.getElementById("exit-action")?.classList.add("hidden");
}

export function quitToHome(): void {
    closeExitPopup();
    showScreen("settings");
}
