<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min Enkle Nettside</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Velkommen til Min Nettside</h1>
    <p id="demo">Dette er en enkel nettside med JavaScript.</p>
    <button onclick="changeText()">Klikk meg!</button>

    <script src="script.js"></script>
</body>
</html>
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hangman Samegilli</title>

    <!-- CSS direkte inne i <head> -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #333;
        }

        button {
            padding: 10px 20px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Spille Hagmana Samegilli!</h1>
    <p id="demo">Da lea souhtats neahttasidu gos sahtat speallat hangmana!.</p>
    <button onclick="changeText()">Deadel mu!</button>

    <!-- JavaScript direkte før </body> -->
    <script>
        function changeText() {
            document.getElementById("demo").innerHTML = "Takk for at du klikket!";
        }
    </script>
</body>
</html>
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

