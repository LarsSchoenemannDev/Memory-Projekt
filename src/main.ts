import "./main.scss"


init(

)

function init() {
layoutChange()
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
    const img = document.getElementById("theme-img")
    if (img) {
        img.src = "assets/img/blue.png"

    }
}