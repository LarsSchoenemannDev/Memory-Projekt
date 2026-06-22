
export function gameStatsInnerHTML(theme, player, mapSize) {
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
                    <button class="wrapper__start-btn" onklick="init()">
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
        <div class="wrapper" data-card="${value}" data-card-index="${i}">
            <div class="card-inner">
                            <div class="card-front">
                    <img src="${frontImg}" alt="card back" />
                </div>
                <div class="card-back">                    
                    <img src="${imgSrc}" alt="card ${value}" />
                </div>
            </div>
        </div>
    `;
}