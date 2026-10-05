let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;

let limonX = canvas.width/2, limonY=0;
const ALTO_LIMON =20, ANCHO_LIMON = 20
let puntaje = 0;
let vidas = 3;
let velocidadCaida = 200;

//posiscion inicial personaje
let personajeX = canvas.width/2;
let personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
    

function iniciar(){
    setInterval(bajarLimon,velocidadCaida);//ejecuta funcion cada medio seg
    dibujarSuelo();
    dibujarPersonaje();
    //dibujarLimon();
    aparecerLimon();
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
    //detectarAtrapado();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//mover derecha
function moverDerecha(){
    personajeX += 10;
    actualizarPantalla();   
    //detectarAtrapado();  
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;    
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}


function detectarAtrapado(){
    if (limonX + ANCHO_LIMON > personajeX &&
        limonX < personajeX + ANCHO_PERSONAJE &&
        limonY + ANCHO_LIMON > personajeY &&
        limonY < personajeY + ANCHO_PERSONAJE) {
        //alert("Atrapado...")
        aparecerLimon();
        puntaje += 1;
        mostrarEnSpam("txtPuntaje",puntaje);
        if (puntaje == 3) {
            velocidadCaida = 150;
        }else if (puntaje == 6) {
            velocidadCaida = 100;
        }else if(puntaje == 10){
            alert("Ganador");
        }
        console.log(velocidadCaida);
    }
}

function detectarPiso(){
    if (limonY +ALTO_LIMON == canvas.height - ALTURA_SUELO) {
        aparecerLimon();
        vidas= vidas-1;
        //let cmpPuntaje = document.getElementById("txtVidas");
        //cmpPuntaje.textContent = vidas;
        mostrarEnSpam("txtVidas",vidas);
        if (vidas == 0) {
            alert("Gamer Over");
            
        }
    }
}


function aparecerLimon(){
    limonX = generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY = 0;
    actualizarPantalla();
}