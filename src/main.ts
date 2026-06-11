import "./main.scss"

interface gameSettings {
    img: [];
    player: string[];
    mapSize: string[];
}

const gameSettings = {
    theme: [],
    player: [],
    mapSize: []
};

init(

)

function init() {
    layoutChange()
    changeImg()
}

// function init() {
//     const fieldRef = document.getElementById("field")
//     if (fieldRef) {
//         fieldRef.addEventListener("click", e => {
//             const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement
//             if (card) {
//                 card.classList.toggle("is-flipped")
//             }
//         })
//     }
// }

function layoutChange() {
    const checked = Array.from(document.querySelectorAll<HTMLElement>(":checked")); // daten hollen 
    if (checked.length > 0) {
        checked.forEach(e => {
            const data = e.dataset
            if (e.dataset.theme) {
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
    const img = document.querySelectorAll<HTMLElement>("#theme-img");
    let x = img
    x.include(scr)
    console.log(x.length);
}

// daten hollen am besten alle thems dann mit forech if abgleich frage und das bild schalten dann einfach am besten per onclick interhängen