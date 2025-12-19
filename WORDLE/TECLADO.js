
/*
let palabra = "";
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0]; // La API devuelve un array, ej: ["perro"]
            palabra = palabra.toUpperCase();
            console.log("Tu palabra secreta es:", palabra);
        });
}
*/  //"No funciona la API, así que uso una lista fija de palabras."//





const palabras=[
"CASAS","PERRO","GATOS","PLANO","ARBOL",
"LIMON","SILLA","MESA","LLAVE","RELOJ",
"CAMPO","JUEGO","LAPIZ","PIANO","TORRE",
"NIEVE","SALUD","RATON","SOLAR","MARCO",
"BOLSA","COCHE","LLAMA","PLATA","BRISA"
];

let palabra="",i=0,p=0,letras=[],grid=[],fin=false;
const max=6;
const g=document.getElementById("grid");
const k=document.getElementById("keyboard");
const m=document.getElementById("message");

const filas=[
["Q","W","E","R","T","Y","U","I","O","P"],
["A","S","D","F","G","H","J","K","L","Ñ"],
["BORRAR","Z","X","C","V","B","N","M","ENTER"]
];

palabra=palabras[Math.floor(Math.random()*palabras.length)];
console.log("Palabra secreta:",palabra);

for(let r=0;r<max;r++){
    grid[r]=[];
    for(let c=0;c<5;c++){
        let d=document.createElement("div");
        d.className="cell";
        g.appendChild(d);
        grid[r][c]=d;
    }
}

filas.forEach(f=>{
    let row=document.createElement("div");
    row.className="keyboard-row";
    f.forEach(l=>{
        let t=document.createElement("div");
        t.className="key";
        if(l=="ENTER"||l=="BORRAR") t.classList.add("big");
        t.textContent=l=="BORRAR"?"DELETE":l;
        t.onclick=()=>{
            if(fin) return;
            if(l=="ENTER") enviar();
            else if(l=="BORRAR") borrar();
            else agregar(l);
        };
        row.appendChild(t);
    });
    k.appendChild(row);
});

function agregar(l){
    if(p<5){
        grid[i][p].textContent=l;
        letras.push(l);
        p++;
        console.log("Letra seleccionada:",l,"→",letras.join(""));
    }
}

function borrar(){
    if(p>0){
        let borrada=letras.pop();
        p--;
        grid[i][p].textContent="";
        console.log("Letra borrada:",borrada,"→",letras.join(""));
    }
}

function enviar(){
    if(p<5) return;
    let intento=letras.join("");
    console.log("Intento actual:",intento);

    for(let x=0;x<5;x++){
        if(intento[x]==palabra[x]) grid[i][x].classList.add("correct");
        else if(palabra.includes(intento[x])) grid[i][x].classList.add("present");
        else grid[i][x].classList.add("absent");
    }

    if(intento==palabra){
        m.textContent="¡Has ganado!";
        fin=true;
        return;
    }

    i++;
    p=0;
    letras=[];

    if(i==max){
        m.textContent="Has perdido. La palabra era "+palabra;
        fin=true;
    }
}
