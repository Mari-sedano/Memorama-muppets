const images = [
    "imagen1.jpg", "imagen2.jpg", "imagen3.jpg", "imagen4.jpg", "imagen5.jpg",
    "imagen6.jpg", "imagen7.jpg", "imagen8.jpg", "imagen9.jpg", "imagen10.jpg",
    // Duplica las imágenes para formar pares
    "imagen1.jpg", "imagen2.jpg", "imagen3.jpg", "imagen4.jpg", "imagen5.jpg",
    "imagen6.jpg", "imagen7.jpg", "imagen8.jpg", "imagen9.jpg", "imagen10.jpg"
];

let flippedCards = [];
let matchedCards = [];

// Función para crear una carta con la imagen proporcionada
function createCard(image) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardImage = document.createElement("img");
    cardImage.src = image;
    card.appendChild(cardImage);
    return card;
}

// Función para mezclar un array de manera aleatoria
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para voltear una carta
function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.querySelector("img").style.display = "block";
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

// Función para verificar si las dos cartas volteadas son iguales
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.querySelector("img").src === card2.querySelector("img").src) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === images.length) {
            showVictoryMessage();
        }
    } else {
        // Si no son iguales, remueve la clase "flipped" para volver a la posición original
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.querySelector("img").style.display = "none";
            card2.querySelector("img").style.display = "none";
            flippedCards = [];
        }, 1000);
    }
}

// Función para reiniciar el juego
function resetGame() {
    flippedCards = [];
    matchedCards = [];
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";
    startGame();
}

// Función para mostrar el mensaje de victoria
function showVictoryMessage() {
    const message = document.querySelector(".message");
    message.style.display = "block";
}

// Función para comenzar el juego
function startGame() {
    shuffleArray(images);
    const gameContainer = document.querySelector(".game-container");

    for (const image of images) {
        const card = createCard(image);
        card.addEventListener("click", () => flipCard(card));
        gameContainer.appendChild(card);
    }
}

// Inicia el juego cuando se carga la página
startGame();

// Función para ocultar el mensaje de victoria
function hideVictoryMessage() {
    const message = document.querySelector(".message");
    message.style.display = "none";
}

// Agrega un evento al botón de reiniciar
document.getElementById("restart-button").addEventListener("click", function() {
    hideVictoryMessage(); // Oculta el mensaje de victoria
    resetGame();
});
