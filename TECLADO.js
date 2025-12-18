const palabras = [
    "CASAS", "PERRO", "GATOS", "PLANO", "ARBOL", "LIMON", "SILLA", "MESA", "LLAVE", "RELOJ",
    "CAMPO", "JUEGO", "LAPIZ", "PIANO", "TORRE", "NIEVE", "SALUD", "RATON", "SOLAR", "MARCO",
    "BOLSA", "COCHE", "LLAMA", "PLATA", "BRISA", "CIELO", "FRUTA", "VIAJE", "FLOTA", "CANTO",
    "NINJA", "MONTE", "GRUPO", "BOMBA", "MUNDO", "HIELO", "RAZON", "FELIZ", "PARED", "RUIDO",
    "SUELO", "HOJAS", "LUCES", "LIBRO", "PERLA", "FOSIL", "DUCHA", "BRUJA", "FUEGO", "MANGO",
    "AVION", "LARGO", "GRASA", "PISTA", "CIRCO", "TUNEL", "CASCO", "GLOBO", "LECHE", "AMIGO",
    "NOCHE", "CABRA", "BAILE", "SALSA", "FONDO", "HUMOR", "MOTOR", "PLUMA", "COLMO", "RAPTO",
    "FAROL", "ARENA", "BEBER", "PECHO", "RODAR", "PUENTE", "TRONO", "CUEVA", "HUEVO", "ROBOT"
];

let palabra = "";
const intentosMax = 6;
let intentoActual = 0;
let posicionActual = 0;
let grid = [];
let intentoArray = [];

const letrasFilas = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["BORRAR", "Z", "X", "C", "V", "B", "N", "M", "ENTER"]
];

const gridDiv = document.getElementById("grid");
const keyboardDiv = document.getElementById("keyboard");
const message = document.getElementById("message");

function obtenerPalabraSecreta() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    console.log("Palabra secreta:", palabra);
}

obtenerPalabraSecreta();

for (let i = 0; i < intentosMax; i++) {
    grid[i] = [];
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridDiv.appendChild(cell);
        grid[i][j] = cell;
    }
}

function agregarLetra(letra) {
    if (posicionActual < 5) {
        grid[intentoActual][posicionActual].textContent = letra;
        intentoArray.push(letra);
        posicionActual++;
        console.log("Letra añadida:", letra, "→", intentoArray.join(""));
    }
}

function borrarLetra() {
    if (posicionActual > 0) {
        posicionActual--;
        const borrada = intentoArray.pop();
        grid[intentoActual][posicionActual].textContent = "";
        console.log("Letra borrada:", borrada, "→", intentoArray.join(""));
    }
}

function enviarIntento() {
    if (posicionActual !== 5) {
        console.log("Intento incompleto:", intentoArray.join(""));
        return;
    }

    const intento = intentoArray.join("");
    console.log("Intento enviado:", intento);

    for (let i = 0; i < 5; i++) {
        if (intento[i] === palabra[i]) {
            grid[intentoActual][i].classList.add("correct");
        } else if (palabra.includes(intento[i])) {
            grid[intentoActual][i].classList.add("present");
        } else {
            grid[intentoActual][i].classList.add("absent");
        }
    }

    if (intento === palabra) {
        console.log("¡Victoria!");
        alert("¡Felicidades! Has ganado");
        message.textContent = "¡Ganaste!";
        return;
    }

    intentoActual++;
    posicionActual = 0;
    intentoArray = [];

    if (intentoActual === intentosMax) {
        console.log("Derrota. Palabra:", palabra);
        message.textContent = `Perdiste. La palabra era: ${palabra}`;
    }
}

function crearTeclado() {
    keyboardDiv.innerHTML = "";

    letrasFilas.forEach(fila => {
        const row = document.createElement("div");
        row.classList.add("keyboard-row");

        fila.forEach(letra => {
            const key = document.createElement("div");
            key.classList.add("key");

            if (letra === "ENTER" || letra === "BORRAR") {
                key.classList.add("big");
            }

            key.textContent = letra === "BORRAR" ? "DELETE" : letra;

            key.addEventListener("click", () => {
                if (letra === "ENTER") enviarIntento();
                else if (letra === "BORRAR") borrarLetra();
                else agregarLetra(letra);
            });

            row.appendChild(key);
        });

        keyboardDiv.appendChild(row);
    });
}

function resetJuego() {
    for (let i = 0; i < intentosMax; i++) {
        for (let j = 0; j < 5; j++) {
            grid[i][j].textContent = "";
            grid[i][j].classList.remove("correct", "present", "absent");
        }
    }

    intentoActual = 0;
    posicionActual = 0;
    intentoArray = [];
    message.textContent = "";
    console.clear();
    console.log("Juego reiniciado");
    obtenerPalabraSecreta();
    crearTeclado();
}

crearTeclado();

document.addEventListener("keydown", e => {
    if (e.key === "Backspace") borrarLetra();
    else if (e.key === "Enter") enviarIntento();
    else if (/^[a-zA-ZñÑ]$/.test(e.key)) agregarLetra(e.key.toUpperCase());
});
