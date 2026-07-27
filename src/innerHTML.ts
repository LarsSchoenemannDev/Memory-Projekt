
export function gameStatsInnerHTML(theme: string[], player: string[], mapSize: number[], disabled: string) {
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
                    <button class="wrapper__start-btn" onclick="startGame()" ${disabled}>
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
    return `<svg class="theme-icon theme-icon--code" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z" fill="#F58E39"/>
</svg>
<svg class="theme-icon theme-icon--gaming theme-icon--player-orange" width="22" height="28" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 12C0.90625 12 0.611979 11.8825 0.367188 11.6475C0.122396 11.4125 0 11.13 0 10.8V9.615C0 9.415 0.046875 9.23 0.140625 9.06C0.234375 8.89 0.359375 8.745 0.515625 8.625C1.23438 8.065 1.77344 7.5 2.13281 6.93C2.49219 6.36 2.74479 5.85 2.89062 5.4H1.875C1.69792 5.4 1.54948 5.3425 1.42969 5.2275C1.3099 5.1125 1.25 4.97 1.25 4.8C1.25 4.63 1.3099 4.4875 1.42969 4.3725C1.54948 4.2575 1.69792 4.2 1.875 4.2H2.65625C2.51042 3.98 2.39583 3.745 2.3125 3.495C2.22917 3.245 2.1875 2.98 2.1875 2.7C2.1875 1.95 2.46094 1.3125 3.00781 0.7875C3.55469 0.2625 4.21875 0 5 0C5.78125 0 6.44531 0.2625 6.99219 0.7875C7.53906 1.3125 7.8125 1.95 7.8125 2.7C7.8125 2.98 7.77083 3.245 7.6875 3.495C7.60417 3.745 7.48958 3.98 7.34375 4.2H8.125C8.30208 4.2 8.45052 4.2575 8.57031 4.3725C8.6901 4.4875 8.75 4.63 8.75 4.8C8.75 4.97 8.6901 5.1125 8.57031 5.2275C8.45052 5.3425 8.30208 5.4 8.125 5.4H7.10938C7.25521 5.85 7.50781 6.36 7.86719 6.93C8.22656 7.5 8.76562 8.065 9.48438 8.625C9.64062 8.745 9.76562 8.89 9.85938 9.06C9.95312 9.23 10 9.415 10 9.615V10.8C10 11.13 9.8776 11.4125 9.63281 11.6475C9.38802 11.8825 9.09375 12 8.75 12H1.25ZM1.25 10.8H8.75V9.6C7.79167 8.88 7.09896 8.1375 6.67188 7.3725C6.24479 6.6075 5.95833 5.95 5.8125 5.4H4.1875C4.04167 5.95 3.75521 6.6075 3.32813 7.3725C2.90104 8.1375 2.20833 8.88 1.25 9.6V10.8ZM5 4.2C5.4375 4.2 5.80729 4.055 6.10938 3.765C6.41146 3.475 6.5625 3.12 6.5625 2.7C6.5625 2.28 6.41146 1.925 6.10938 1.635C5.80729 1.345 5.4375 1.2 5 1.2C4.5625 1.2 4.19271 1.345 3.89062 1.635C3.58854 1.925 3.4375 2.28 3.4375 2.7C3.4375 3.12 3.58854 3.475 3.89062 3.765C4.19271 4.055 4.5625 4.2 5 4.2Z" fill="#FFFFFF"/>
</svg>
`
}

export function playerSVGBlue() {
    return `<svg class="theme-icon theme-icon--code" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z" fill="#2BB1FF"/>
</svg>
<svg class="theme-icon theme-icon--gaming theme-icon--player-blue" width="22" height="28" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 12C0.90625 12 0.611979 11.8825 0.367188 11.6475C0.122396 11.4125 0 11.13 0 10.8V9.615C0 9.415 0.046875 9.23 0.140625 9.06C0.234375 8.89 0.359375 8.745 0.515625 8.625C1.23438 8.065 1.77344 7.5 2.13281 6.93C2.49219 6.36 2.74479 5.85 2.89062 5.4H1.875C1.69792 5.4 1.54948 5.3425 1.42969 5.2275C1.3099 5.1125 1.25 4.97 1.25 4.8C1.25 4.63 1.3099 4.4875 1.42969 4.3725C1.54948 4.2575 1.69792 4.2 1.875 4.2H2.65625C2.51042 3.98 2.39583 3.745 2.3125 3.495C2.22917 3.245 2.1875 2.98 2.1875 2.7C2.1875 1.95 2.46094 1.3125 3.00781 0.7875C3.55469 0.2625 4.21875 0 5 0C5.78125 0 6.44531 0.2625 6.99219 0.7875C7.53906 1.3125 7.8125 1.95 7.8125 2.7C7.8125 2.98 7.77083 3.245 7.6875 3.495C7.60417 3.745 7.48958 3.98 7.34375 4.2H8.125C8.30208 4.2 8.45052 4.2575 8.57031 4.3725C8.6901 4.4875 8.75 4.63 8.75 4.8C8.75 4.97 8.6901 5.1125 8.57031 5.2275C8.45052 5.3425 8.30208 5.4 8.125 5.4H7.10938C7.25521 5.85 7.50781 6.36 7.86719 6.93C8.22656 7.5 8.76562 8.065 9.48438 8.625C9.64062 8.745 9.76562 8.89 9.85938 9.06C9.95312 9.23 10 9.415 10 9.615V10.8C10 11.13 9.8776 11.4125 9.63281 11.6475C9.38802 11.8825 9.09375 12 8.75 12H1.25ZM1.25 10.8H8.75V9.6C7.79167 8.88 7.09896 8.1375 6.67188 7.3725C6.24479 6.6075 5.95833 5.95 5.8125 5.4H4.1875C4.04167 5.95 3.75521 6.6075 3.32813 7.3725C2.90104 8.1375 2.20833 8.88 1.25 9.6V10.8ZM5 4.2C5.4375 4.2 5.80729 4.055 6.10938 3.765C6.41146 3.475 6.5625 3.12 6.5625 2.7C6.5625 2.28 6.41146 1.925 6.10938 1.635C5.80729 1.345 5.4375 1.2 5 1.2C4.5625 1.2 4.19271 1.345 3.89062 1.635C3.58854 1.925 3.4375 2.28 3.4375 2.7C3.4375 3.12 3.58854 3.475 3.89062 3.765C4.19271 4.055 4.5625 4.2 5 4.2Z" fill="#FFFFFF"/>
</svg>
`
}

function flagSVG(fill: string): string {
    return `<svg width="20" height="16" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z" fill="${fill}"/></svg>`;
}

export function gameOverInnerHTML(blueScore: number, orangeScore: number, titleSrc: string, blueFill: string, orangeFill: string) {
    return `
    <img class="game-over__title-img" src="${titleSrc}" alt="Game over">
    <p class="game-over__label">Final score</p>
    <div class="game-over__score">
        <span class="game-over__score-item game-over__score-item--blue">${flagSVG(blueFill)} Blue ${blueScore}</span>
        <span class="game-over__score-item game-over__score-item--orange">${flagSVG(orangeFill)} Orange ${orangeScore}</span>
    </div>
    `;
}

export function confettiInnerHTML(): string {
    return `<img class="game-over__confetti" src="assets/img/Confetti.svg" alt="">`;
}

export function winnerInnerHTML(displayName: string, colorClass: string, iconSrc: string, confetti: string, btnLabel: string): string {
    return `
    ${confetti}
    <p class="game-over__winner">The winner is</p>
    <h2 class="game-over__winner-name ${colorClass}">${displayName}</h2>
    <img class="game-over__icon" src="${iconSrc}" alt="${displayName}">
    <button class="game-over__home-btn" id="homeBtn" onclick="goHome()">${btnLabel}</button>
    `;
}

export function drawInnerHTML(titleSrc: string, iconSrc: string, btnLabel: string): string {
    return `
    <p class="game-over__winner">It's a</p>
    <img class="game-over__title-img game-over__title-img--draw" src="${titleSrc}" alt="Draw">
    <img class="game-over__icon" src="${iconSrc}" alt="Draw">
    <button class="game-over__home-btn" id="homeBtn" onclick="goHome()">${btnLabel}</button>
    `;
}
