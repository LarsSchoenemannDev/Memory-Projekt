import { gameSettings } from "./state";

export function isReady(): boolean {
    return gameSettings.theme.length > 0 && gameSettings.player.length > 0 && gameSettings.mapSize.length > 0;
}

function clearform(): void {
    let x = Object.values(gameSettings)
    x.forEach(e => e.length = 0)
}

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

export function init(): void {
    layoutChange();
    updateSettingsUI();
    changeImg();
}
