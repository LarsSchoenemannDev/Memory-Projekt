
export function gameStatsInnerHTML(theme: string[], player: string[], mapSize: number[], ready: boolean) {
    return `<aside class=" wrapper__game-settings">                    
                    <p id="theme">${theme}</p>
                    <svg width="27" height="56" viewBox="0 0 27 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="22.3154" y1="1.32435" x2="3.7745" y2="54.166" stroke="#F0EA6E" stroke-width="8" />
                    </svg>
                    <p id="player">${player}</p>
                    <p>Player</p>

                    <svg width="27" height="56" viewBox="0 0 27 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="22.3154" y1="1.32435" x2="3.7745" y2="54.166" stroke="#F0EA6E" stroke-width="8" />
                    </svg>
                    <p>Board size</p>
                    <p id="size">${mapSize}</p>
                    <button class="wrapper__start-btn" onclick="startGame()" ${ready ? "" : "disabled"}>
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.275 12L13.85 8.425C14 8.325 14.075 8.18333 14.075 8C14.075 7.81667 14 7.675 13.85 7.575L8.275 4C8.10833 3.88333 7.9375 3.875 7.7625 3.975C7.5875 4.075 7.5 4.225 7.5 4.425V11.575C7.5 11.775 7.5875 11.925 7.7625 12.025C7.9375 12.125 8.10833 12.1167 8.275 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V2H2V14Z"
                                fill="#303131" />
                        </svg>
                        Start
                    </button>
                </aside>`
};


export function gameLayoutInnerHTML(value: number, i: number, imgSrc: string, frontImg: string) {
    return `
    <div class="flip" data-card="${value}" data-card-index="${i}">
        <div class="flip__inner">
            <div class="flip__back">
                <img src="${frontImg}"/>
            </div>
            <div class="flip__front">
                <img src="${imgSrc}"/>
            </div>
        </div>
    </div>
    `;
}

export function playerSVGOrange() {
    return `<div><svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z" fill="#F58E39"/>
</svg>
</div>`
}

export function playerSVGBlue() {
    return `<div><svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z" fill="#2BB1FF"/>
</svg>
</div>`
}


function flagSVG(color: string): string {
    const fill = color === "orange" ? "#F58E39" : "#2BB1FF";
    return `<svg width="20" height="16" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z" fill="${fill}"/></svg>`;
}


export function gameOverInnerHTML(blueScore: number, orangeScore: number, isGaming: boolean) {
    const titleImg = isGaming ? "assets/img/game-over-gaming.png" : "assets/img/game-over-code.png";
    return `
    <img class="game-over__title-img" src="${titleImg}" alt="Game over">
    <p class="game-over__label">Final score</p>
    <div class="game-over__score">
        <span class="game-over__score-item game-over__score-item--blue">${flagSVG("blue")} Blue ${blueScore}</span>
        <span class="game-over__score-item game-over__score-item--orange">${flagSVG("orange")} Orange ${orangeScore}</span>
    </div>
    `;
}

export function resultInnerHTML(winner: "blue" | "orange" | "draw", isGaming: boolean) {
    const btnLabel = isGaming ? "Home" : "Back to start";
    const btn = `<button class="game-over__home-btn" id="homeBtn" onclick="goHome()">${btnLabel}</button>`;
    if (winner === "draw") {
        const drawTitle = isGaming ? "assets/img/draw-gamin.png" : "assets/img/draw-code.png";
        const drawIcon = isGaming ? "assets/img/drawGaming.svg" : "assets/img/drawCode.svg";
        return `
        <p class="game-over__winner">It's a</p>
        <img class="game-over__title-img game-over__title-img--draw" src="${drawTitle}" alt="Draw">
        <img class="game-over__icon" src="${drawIcon}" alt="Draw">
        ${btn}
        `;
    }
    const name = winner === "orange" ? "Orange Player" : "Blue Player";
    const displayName = isGaming ? name : name.toUpperCase();
    const icon = isGaming
        ? `<img class="game-over__icon" src="assets/img/pockal.png" alt="Winner">`
        : `<img class="game-over__icon" src="assets/img/${winner}.svg" alt="${name}">`;
    const confetti = isGaming ? "" : `<img class="game-over__confetti" src="assets/img/Confetti.svg" alt="">`;
    return `
    ${confetti}
    <p class="game-over__winner">The winner is</p>
    <h2 class="game-over__winner-name game-over__winner-name--${winner}">${displayName}</h2>
    ${icon}
    ${btn}
    `;
}