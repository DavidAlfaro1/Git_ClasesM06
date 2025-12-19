// Lista de palabras posibles
let palabras = [
    "CASAS", "PERRO", "GATOS", "PLANO", "ARBOL", "LIMON", "SILLA", "MESA", "LLAVE", "RELOJ",
    "CAMPO", "JUEGO", "LAPIZ", "PIANO", "TORRE", "NIEVE", "SALUD", "RATON", "SOLAR", "MARCO",
    "BOLSA", "COCHE", "LLAMA", "PLATA", "BRISA", "CIELO", "FRUTA", "VIAJE", "FLOTA", "CANTO",
    "NINJA", "MONTE", "GRUPO", "BOMBA", "MUNDO", "HIELO", "RAZON", "FELIZ", "PARED", "RUIDO",
    "SUELO", "HOJAS", "LUCES", "LIBRO", "PERLA", "FOSIL", "DUCHA", "BRUJA", "FUEGO", "MANGO",
    "AVION", "LARGO", "GRASA", "PISTA", "CIRCO", "TUNEL", "CASCO", "GLOBO", "LECHE", "AMIGO",
    "NOCHE", "CABRA", "BAILE", "SALSA", "FONDO", "HUMOR", "MOTOR", "PLUMA", "COLMO", "RAPTO",
    "FAROL", "ARENA", "BEBER", "PECHO", "RODAR", "PUENTE", "TRONO", "CUEVA", "HUEVO", "ROBOT"
];

let palabraSecreta = "";
let intentosMax = 6;
let intentoActual = 0;
let posicionActual = 0;
let letrasIntento = [];
let grid = [];

// Divs del HTML
let gridDiv = document.getElementById("grid");
let tecladoDiv = document.getElementById("keyboard");
let mensaje = document.getElementById("message");

// Teclado
let filasTeclado = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L","Ñ"],
    ["BORRAR","Z","X","C","V","B","N","M","ENTER"]
];

// Elegir palabra aleatoria
function obtenerPalabra() {
    let random = Math.floor(Math.random() * palabras.length);
    palabraSecreta = palabras[random];
    console.log("Palabra secreta:", palabraSecreta);
}

// Crear tablero
function crearGrid() {
    for (let i = 0; i < intentosMax; i++) {
        grid[i] = [];
        for (let j = 0; j < 5; j++) {
            let celda = document.createElement("div");
            celda.className = "cell";
            gridDiv.appendChild(celda);
            grid[i][j] = celda;
        }
    }
}

// Añadir letra
function agregarLetra(letra) {
    if (posicionActual < 5) {
        grid[intentoActual][posicionActual].textContent = letra;
        letrasIntento.push(letra);
        posicionActual++;
    }
}

// Borrar letra
function borrarLetra() {
    if (posicionActual > 0) {
        posicionActual--;
        letrasIntento.pop();
        grid[intentoActual][posicionActual].textContent = "";
    }
}

// Comprobar intento
function enviarIntento() {
    if (posicionActual < 5) {
        return;
    }

    let intento = letrasIntento.join("");

    for (let i = 0; i < 5; i++) {
        if (intento[i] === palabraSecreta[i]) {
            grid[intentoActual][i].classList.add("correct");
        } else if (palabraSecreta.indexOf(intento[i]) !== -1) {
            grid[intentoActual][i].classList.add("present");
        } else {
            grid[intentoActual][i].classList.add("absent");
        }
    }

    if (intento === palabraSecreta) {
        mensaje.textContent = "¡Has ganado!";
        alert("¡Felicidades!");
        return;
    }

    intentoActual++;
    posicionActual = 0;
    letrasIntento = [];

    if (intentoActual === intentosMax) {
        mensaje.textContent = "Has perdido. La palabra era: " + palabraSecreta;
    }
}

// Crear teclado
function crearTeclado() {
    tecladoDiv.innerHTML = "";

    for (let i = 0; i < filasTeclado.length; i++) {
        let fila = document.createElement("div");
        fila.className = "keyboard-row";

        for (let j = 0; j < filasTeclado[i].length; j++) {
            let letra = filasTeclado[i][j];
            let tecla = document.createElement("div");
            tecla.className = "key";

            if (letra === "ENTER" || letra === "BORRAR") {
                tecla.classList.add("big");
            }

            tecla.textContent = (letra === "BORRAR") ? "DELETE" : letra;

            tecla.onclick = function () {
                if (letra === "ENTER") enviarIntento();
                else if (letra === "BORRAR") borrarLetra();
                else agregarLetra(letra);
            };

            fila.appendChild(tecla);
        }
        tecladoDiv.appendChild(fila);
    }
}

// Control por teclado físico
document.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") borrarLetra();
    else if (e.key === "Enter") enviarIntento();
    else if (/^[a-zA-ZñÑ]$/.test(e.key)) {
        agregarLetra(e.key.toUpperCase());
    }
});

// INICIO DEL JUEGO
obtenerPalabra();
crearGrid();
crearTeclado();
