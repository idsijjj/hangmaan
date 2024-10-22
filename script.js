// Liste over ord spilleren kan gjette
const ordListe = ["eadni", "sámegiella", "ihkku", "disdat", "beana", "guovdageaidnu", "divri"];
let hemmeligOrd = ordListe[Math.floor(Math.random() * ordListe.length)];
let korrekteGjetninger = Array(hemmeligOrd.length).fill("_");
let gjettedeBokstaver = [];
let antallForsok = 6;

// Hangman stadier
const galgeStadier = [
    `
       -----
       |   |
           |
           |
           |
           |
    _______|__
    `,
    `
       -----
       |   |
       O   |
           |
           |
           |
    _______|__
    `,
    `
       -----
       |   |
       O   |
       |   |
           |
           |
    _______|__
    `,
    `
       -----
       |   |
       O   |
      /|   |
           |
           |
    _______|__
    `,
    `
       -----
       |   |
       O   |
      /|\\  |
           |
           |
    _______|__
    `,
    `
       -----
       |   |
       O   |
      /|\\  |
      /    |
           |
    _______|__
    `,
    `
       -----
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    _______|__
    `
];

// Viser status for spillet
function visSpillet() {
    document.getElementById("gallows").innerText = galgeStadier[6 - antallForsok];
    document.getElementById("word").innerText = korrekteGjetninger.join(" ");
}

// Når spilleren gjetter en bokstav
function guessLetter() {
    const letterInput = document.getElementById("letterInput").value.toLowerCase();
    document.getElementById("letterInput").value = ""; // Tøm input-feltet

    if (!letterInput || letterInput.length !== 1 || !/^[a-zæøå]+$/.test(letterInput)) {
        alert("Vennligst gjett en gyldig bokstav.");
        return;
    }

    if (gjettedeBokstaver.includes(letterInput)) {
        alert("Du har allerede gjettet denne bokstaven.");
        return;
    }

    gjettedeBokstaver.push(letterInput);

    if (hemmeligOrd.includes(letterInput)) {
        for (let i = 0; i < hemmeligOrd.length; i++) {
            if (hemmeligOrd[i] === letterInput) {
                korrekteGjetninger[i] = letterInput;
            }
        }
    } else {
        antallForsok--;
    }

    visSpillet();
    sjekkVinner();
}

// Sjekk om spilleren har vunnet eller tapt
function sjekkVinner() {
    if (!korrekteGjetninger.includes("_")) {
        document.getElementById("result").innerHTML = `<span style="color:green;">Riktig! Ordet var: ${hemmeligOrd}.</span>`;
        document.getElementById("letterInput").disabled = true;
    } else if (antallForsok === 0) {
        document.getElementById("result").innerHTML = `<span style="color:red;">Du tapte! Ordet var: ${hemmeligOrd}.</span>`;
        document.getElementById("letterInput").disabled = true;
    }
}

// Start spillet
visSpillet();
