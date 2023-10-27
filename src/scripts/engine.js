const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: { 
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
        versus: document.getElementById("img-versus"),
    },
    playersSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
    others: {
        msgDeEscolhaUmaCarta: document.getElementById("msg-de-escolha"),
        msgDeResultado: document.getElementById("versus-msg")
    }
}

const aguaVantagens = ["Fogo", "Terra"]
const aguaFraquezas = ["Natureza", "Metal"]

const fogoVantagens = ["Natureza", "Metal"]
const fogoFraquezas = ["Água", "Terra"]

const naturezaVantagens = ["Água", "Terra"]
const naturezaFraquezas = ["Fogo", "Metal"]

const metalVantagens = ["Água", "Natureza"]
const metalFraquezas = ["Fogo", "Terra"]

const terraVantagens = ["Fogo", "Metal"]
const terraFraquezas = ["Água", "Natureza"]

const pathImages = "./src/assets/cards/id"
const cardData = [
    {
        id: 0,
        name: "Felipe Lobão",
        type: "Água",
        img: `${pathImages}0.png`,
        winOf: aguaVantagens,
        loseOf: aguaFraquezas,
    },
    {
        id: 1,
        name: "O Mal",
        type: "Fogo",
        img: `${pathImages}1.png`,
        winOf: fogoVantagens,
        loseOf: fogoFraquezas,
    },
    {
        id: 2,
        name: "Samurai Otani",
        type: "Natureza",
        img: `${pathImages}2.png`,
        winOf: naturezaVantagens,
        loseOf: naturezaFraquezas,
    },
    {
        id: 3,
        name: "Rafinha 2077",
        type: "Metal",
        img: `${pathImages}3.png`,
        winOf: metalVantagens,
        loseOf: metalFraquezas,
    },
    {
        id: 4,
        name: "Sovarada",
        type: "Terra",
        img: `${pathImages}4.png`,
        winOf: terraVantagens,
        loseOf: terraFraquezas,
    },
    {
        id: 5,
        name: "Café dos Mares",
        type: "Água",
        img: `${pathImages}5.png`,
        winOf: aguaVantagens,
        loseOf: aguaFraquezas,
    },
    {
        id: 6,
        name: "Café Sayajin",
        type: "Fogo",
        img: `${pathImages}6.png`,
        winOf: fogoVantagens,
        loseOf: fogoFraquezas,
    },
    {
        id: 7,
        name: "Rodorfo",
        type: "Natureza",
        img: `${pathImages}7.png`,
        winOf: naturezaVantagens,
        loseOf: naturezaFraquezas,
    },
    {
        id: 8,
        name: "Martins Corinthiano",
        type: "Metal",
        img: `${pathImages}8.png`,
        winOf: metalVantagens,
        loseOf: metalFraquezas,
    },
    {
        id: 9,
        name: "Edr Militar",
        type: "Terra",
        img: `${pathImages}9.png`,
        winOf: terraVantagens,
        loseOf: terraFraquezas,
    },
]

async function getRandomNumber() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return randomIndex
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img")
    cardImage.setAttribute("height", "200")
    cardImage.setAttribute("src", `${pathImages}${idCard}.png`)
    cardImage.setAttribute("data-id", idCard)
    cardImage.classList.add("card")

    if (fieldSide === state.playersSides.computer) {
        cardImage.setAttribute("height", "100")
        cardImage.setAttribute("src", `./src/assets/cards/back.png`)
    }
  
    if (fieldSide === state.playersSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"))
    })    
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard)
            playAudio("card-hover")
    })
    }

    return cardImage   
}

async function setCardsField(cardId) {

    await removeAllCardsImages()
    
    let numberDrawForRepresentation = await getRandomNumber()

    state.fieldCards.player.style.display = "block"
    state.fieldCards.computer.style.display = "block"

    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[numberDrawForRepresentation].img

     let duelResults = await checkDuelResults(cardId, cardData[numberDrawForRepresentation].type)

     state.fieldCards.versus.classList.toggle("hidden")
     
     await updateScore()
     
     await drawButton("OK!")
     await duelResultado(duelResults)
 }

async function updateScore() {
    state.score.scoreBox.innerText = `Vitórias: ${state.score.playerScore} | Derrotas: ${state.score.computerScore}`
}

async function drawButton(text) {
    state.actions.button.innerText = text
    state.actions.button.style.display = "block"
}

async function duelResultado(duelResults) {
    state.others.msgDeResultado.innerText = duelResults
}

async function checkDuelResults(playerCardId, numberDrawForRepresentation) {
    let duelResults = "EMPATE!"
    let playerCard = cardData[playerCardId]


    if(playerCard.winOf.includes(numberDrawForRepresentation)) {
        duelResults = "VOCÊ VENCEU!"
        state.score.playerScore++
        await playAudio("win2")
    } else if(playerCard.loseOf.includes(numberDrawForRepresentation)) {
        duelResults = "VOCÊ PERDEU!"
        state.score.computerScore++
        await playAudio("lose2")
    } else {
        await playAudio("draw")
    }

    return duelResults
}

async function removerMsgDeEscolhaUmaCarta() {
    state.others.msgDeEscolhaUmaCarta.textContent = ""
}

async function adicionarMsgDeEscolhaUmaCarta() {
    state.others.msgDeEscolhaUmaCarta.textContent = "Escolha uma carta!"
}

async function removeAllCardsImages() {
    let { computerBox, player1Box} = state.playersSides
    let imgElements = computerBox.querySelectorAll("img")
    await removerMsgDeEscolhaUmaCarta()
    imgElements.forEach((img) => img.remove())

    imgElements = player1Box.querySelectorAll("img")
    imgElements.forEach((img) => img.remove())
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img
    state.cardSprites.name.innerText = cardData[index].name
    state.cardSprites.type.innerText = "Atributo: " + cardData[index].type
} 

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomNumber()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "./src/assets/cards/unknow-card.png"
    state.cardSprites.name.innerText = "Selecione uma carta"
    state.cardSprites.type.innerText = "para inspecionar"
    state.actions.button.style.display = "none"
    state.fieldCards.player.style.display = "none"
    state.fieldCards.computer.style.display = "none"
    state.fieldCards.versus.classList.toggle("hidden")
    state.others.msgDeResultado.innerText = ""
    adicionarMsgDeEscolhaUmaCarta()
    init()
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.volume = 0.2
    audio.play()
}

function init() {
    state.fieldCards.player.style.display = "none"
    state.fieldCards.computer.style.display = "none"
    drawCards(5, state.playersSides.player1)
    drawCards(5, state.playersSides.computer)
}

init()