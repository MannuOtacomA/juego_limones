let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 40;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;

let personajeX = canvas.width/2;

function iniciar(){
    dibujarSuelo();
    dibujarPersonaje();
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="green";
    ctx.fillRect(personajeX,canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE),ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

//mover izquierda
function moverIzquierda(){
    personajeX -= 10;
    actualizarPantalla();     
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//mover derecha
function moverDerecha(){
    personajeX += 10;
    actualizarPantalla();     
}
