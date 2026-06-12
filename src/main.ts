import "./main.scss"

interface GameSettings {
    theme: string[];
    player: string[];
    mapSize: string[];
}

const gameSettings: GameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

init()

function init() {
    layoutChange()
    changeImg()
}

function clearform() {
    let x = Object.values(gameSettings)
    x.forEach(e => e.length = 0)
}

function layoutChange() {
    clearform()
    const checked = Array.from(document.querySelectorAll<HTMLElement>(":checked")); // daten hollen 
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
                gameSettings.mapSize.push(data.size);
            }
        })
    }
}

function changeImg() {
    if (gameSettings.theme.length === 0) {
        return
    } else {
        const img = document.querySelectorAll(".wrapper__img img");
        img.forEach(e => {
            const isMatch: boolean = e.classList.contains(gameSettings.theme[0] || "");
            if (isMatch) {
                e.classList.remove("hidden");
            } else {
                e.classList.add("hidden");
            }
        });
    }
}

document.addEventListener("change", init)


