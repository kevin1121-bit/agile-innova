import { setLocalStorage, getLocalStorageByKey } from "../utils/localStorage.js";

const dataCharacters = [
    {
        id: 1,
        name: "Golem",
        pathImage: "./src/img/golem.png",
        description:
            "Es lento, pero persistente, y solo ataca las estructuras. Cuando se destruye, explota y se convierte en dos golemitas que infligen daño en área. Gólem es una carta de rareza épica de Clash Royale que puede obtenerse a partir de la arena 3.",
    },
    {
        id: 2,
        name: "Pekka",
        pathImage: "./src/img/Pekka.webp",
        description:
            "Es una tropa poderosa y puede hacer bastante daño con la colocación y el apoyo correctos. Hace daño masivo a un objetivo a la vez. Sólo a niveles decentes, una P.E.K.K.A puede matar a un Bárbaro de un solo golpe.",
    },
    {
        id: 3,
        name: "Caballero",
        pathImage: "./src/img/caballero.png",
        description:
            "Se puede utilizar como tanque para tropas más pequeñas como los Duendes. Es una gran carta para usar al frente de un mini-ataque. Tiene una gran sinergia en particular con los mazos de carnada de hechizos, y con el Barril de duendes, además es también común en mazos de Bait junto a la Valquiria.",
    },
    {
        id: 4,
        name: "Bruja nocturna",
        pathImage: "./src/img/bruja.png",
        description:
            "Es una tropa de base constructora que proviene de Clash Royale, junto con el bombardero y el bebé dragón. Sin embargo, dispara el mismo proyectil que la Bruja, a diferencia de su contraparte cuerpo a cuerpo de Clash Royale, a pesar de blandir un hacha.",
    },
    {
        id: 5,
        name: "Los pillos",
        pathImage: "./src/img/los-pillos.png",
        description:
            'Está formada por dos "niñas pillas" y un "niño pillo", el cual tiene la función de defender a sus amigas mientras estas lanzan "chicles" a sus enemigos. Por lo tanto, la función de esta carta es muy sencilla: realizar el daño con las niñas pillas mientras distraemos con el niño pillo.',
    },
    {
        id: 6,
        name: "Sneaky goblings",
        pathImage: "./src/img/goblin.webp",
        description:
            "Es una Súper Tropa basada en el Goblin. Se puede desbloquear aumentando el Goblin cuando el Goblin tiene al menos el nivel 7 y cuando el Ayuntamiento se actualiza al nivel 11 o superior.",
    },
    {
        id: 7,
        name: "Arquero",
        pathImage: "./src/img/arquero.png",
        description:
            "Dispara una flecha mágica que atraviesa y daña a los enemigos que se interponen en su camino. No es ningún truco, ¡es magia! Arquero mágico es una carta de rareza legendaria de Clash Royale que puede obtenerse a partir de la arena 5.",
    },
    {
        id: 8,
        name: "Montapuercos",
        pathImage: "./src/img/montaPuercos.webp",
        description:
            "Es una tropa terrestre rápida con puntos de vida medios, poco daño y la capacidad de saltar sobre los muros enemigos. Se desbloquea en el nivel 2 del Cuartel oscuro.",
    },
    {
        id: 9,
        name: "Minero",
        pathImage: "./src/img/Miner_info.webp",
        description:
            "Es una carta legendaria que puede obtenerse de los cofres una vez alcanzamos la arena 6. Cuesta 3 de elixir, una cifra bastante asequible, y puede desplegarse en cualquier parte de la Arena. Tiene bastantes puntos de vida, 1.000 a nivel 1 y de 1.460 a nivel 5, que no está nada mal.",
    },
    {
        id: 10,
        name: "Principe",
        pathImage: "./src/img/principe.png",
        description:
            "Es una tropa muy fuerte, además que tiene una gran velocidad, acompañar esta carta con otras unidades que ataquen con daño en área suele ser un buen combo.",
    },
];

let currentIndex = 0;
const previusArrow = document.getElementById("previus-arrow");
const nextArrow = document.getElementById("next-arrow");
const imageCharacters = document.getElementById("img-characters")
const buttonName = document.getElementById("button-name")
const buttonBack = document.getElementById("button-back")
const titleDescription = document.getElementById("title-description")
const textDescription = document.getElementById("text-description")
const containerDescriptio = document.querySelector("#container-description")

previusArrow.addEventListener("click", (e) => handlerArrow(e));
nextArrow.addEventListener("click", (e) => handlerArrow(e));
buttonBack.addEventListener("click", (e) => showOrHiddenDescription(e))
buttonName.addEventListener("click", (e) => showOrHiddenDescription(e))


window.addEventListener("load", () => {
    currentIndex = getLocalStorageByKey("current-index") ? getLocalStorageByKey("current-index") : 0;
    validateArrowActive()
    const { name, pathImage } = dataCharacters[currentIndex];
    imageCharacters.setAttribute("src", pathImage);
    buttonName.textContent = name;
});

function handlerArrow(event) {
    event.target.dataset.action == "next" ? currentIndex += 1 : currentIndex -= 1;
    const { name, pathImage } = dataCharacters[currentIndex];
    if (imageCharacters.classList.contains("animate-img-description-revert")) {
        imageCharacters.classList.remove("animate-img-description-revert")
    }
    imageCharacters.classList.toggle("animate");
    buttonName.classList.toggle("animate");

    document.getElementById("img-characters").setAttribute("src", pathImage);
    document.getElementById("button-name").textContent = name;
    validateArrowActive();
    setTimeout(() => { imageCharacters.classList.toggle("animate"); buttonName.classList.toggle("animate") }, 1);
}

function validateArrowActive() {
    if (currentIndex == 0) {
        previusArrow.setAttribute("disabled", "true");
    } else if (currentIndex == dataCharacters.length - 1) {
        nextArrow.setAttribute("disabled", "true");
    }
    if (currentIndex != 0) {
        previusArrow.removeAttribute("disabled");
    }
    if (currentIndex != dataCharacters.length - 1) {
        nextArrow.removeAttribute("disabled");
    }
}

function showOrHiddenDescription(event) {
    const { name, description } = dataCharacters[currentIndex];
    if (event.target.dataset.action == "show") {
        if (imageCharacters.classList.contains("animate-img-description-revert")) {
            imageCharacters.classList.remove("animate-img-description-revert")
        }
        imageCharacters.classList.toggle("animate-img-description");
        previusArrow.classList.add("d-none")
        nextArrow.classList.add("d-none")
        buttonName.classList.replace("name-button", "d-none")
        buttonBack.classList.replace("d-none", "animate-items-description")
        containerDescriptio.classList.replace("d-none", "animate-items-description")
        titleDescription.textContent = name;
        textDescription.textContent = description;
    }
    else {
        imageCharacters.classList.replace("animate-img-description", "animate-img-description-revert");
        previusArrow.classList.replace("d-none", "animate-items-description")
        nextArrow.classList.replace("d-none", "animate-items-description")
        buttonName.classList.replace("d-none", "name-button")
        buttonName.classList.add("animate")
        buttonBack.classList.add("d-none")
        containerDescriptio.classList.add("d-none")
    }
}

window.addEventListener("beforeunload", () => setLocalStorage("current-index", currentIndex));