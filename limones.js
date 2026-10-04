let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 60;

let limonX = canvas.width/2, limonY=0;
const ALTO_LIMON =20, ANCHO_LIMON = 20

//posiscion inicial personaje
let personajeX = canvas.width/2;
let personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
    

function iniciar(){
    dibujarSuelo();
    dibujarPersonaje();
    dinujarLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="red";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

//mover izquierda
function moverIzquierda(){
    personajeX -= 10;
    actualizarPantalla();     
    detectorColision();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dinujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//mover derecha
function moverDerecha(){
    personajeX += 10;
    actualizarPantalla();   
    detectorColision();  
}

function dinujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
}


function detectorColision(){
    if (limonX + ANCHO_LIMON > personajeX &&
        limonX < personajeX + ANCHO_PERSONAJE &&
        limonY + ANCHO_LIMON > personajeY &&
        limonY < personajeY + ANCHO_PERSONAJE) {

        alert("Atrapado...")
    }
}