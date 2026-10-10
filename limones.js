let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;
let limonX = canvas.width/2, limonY = 0;
const ALTO_LIMON = 10, ANCHO_LIMON = 10;
let puntaje = 0;
let vidas = 3;
let velocidadCaida = 200;
let intervalo;
let juegoIniciado = false;

// Posición inicial personaje
let personajeX = canvas.width/2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);


// ===== INICIO DEL JUEGO =====
function iniciar() {
  // Ocultar overlay de inicio
  const overlay = document.getElementById("overlayInicio");
  if (overlay) overlay.classList.add("oculto");
  
  juegoIniciado = true;
  intervalo = setInterval(bajarLimon, velocidadCaida);
  dibujarSuelo();
  dibujarPersonaje();
  aparecerLimon();
}


// ===== DIBUJAR ELEMENTOS =====
function dibujarSuelo() {
  // Suelo con gradiente
  let gradiente = ctx.createLinearGradient(0, canvas.height - ALTURA_SUELO, 0, canvas.height);
  gradiente.addColorStop(0, "#27ae60");
  gradiente.addColorStop(1, "#1e8449");
  ctx.fillStyle = gradiente;
  ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}


function dibujarPersonaje() {
  // Personaje con sombra
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  
  // Cuerpo del personaje (rojo con gradiente)
  let gradiente = ctx.createLinearGradient(personajeX, personajeY, personajeX, personajeY + ALTURA_PERSONAJE);
  gradiente.addColorStop(0, "#e74c3c");
  gradiente.addColorStop(1, "#c0392b");
  ctx.fillStyle = gradiente;
  ctx.fillRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTURA_PERSONAJE);
  
  // Ojos del personaje
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "white";
  ctx.fillRect(personajeX + 8, personajeY + 15, 8, 8);
  ctx.fillRect(personajeX + 24, personajeY + 15, 8, 8);
  ctx.fillStyle = "black";
  ctx.fillRect(personajeX + 10, personajeY + 17, 4, 4);
  ctx.fillRect(personajeX + 26, personajeY + 17, 4, 4);
  
  // Sonrisa
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(personajeX + 20, personajeY + 35, 8, 0, Math.PI);
  ctx.stroke();
}


function dibujarLimon() {
  // Limón con brillo
  ctx.shadowColor = "rgba(255, 174, 0, 0.5)";
  ctx.shadowBlur = 10;
  
  let gradiente = ctx.createRadialGradient(
    limonX + ANCHO_LIMON/2, limonY + ALTO_LIMON/2, 2,
    limonX + ANCHO_LIMON/2, limonY + ALTO_LIMON/2, ANCHO_LIMON/2
  );
  gradiente.addColorStop(0, "#ffff99");
  gradiente.addColorStop(0.7, "#f1c40f");
  gradiente.addColorStop(1, "#d4ac0d");
  
  ctx.fillStyle = gradiente;
  ctx.beginPath();
  ctx.ellipse(
    limonX + ANCHO_LIMON/2, 
    limonY + ALTO_LIMON/2, 
    ANCHO_LIMON/2, 
    ALTO_LIMON/2, 
    0, 0, Math.PI * 2
  );
  ctx.fill();
  
  // Hoja del limón
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#27ae60";
  ctx.beginPath();
  ctx.ellipse(limonX + ANCHO_LIMON/2 + 5, limonY - 3, 6, 3, Math.PI/4, 0, Math.PI * 2);
  ctx.fill();
}


// ===== MOVIMIENTO =====
function moverIzquierda() {
  if (!juegoIniciado) return;
  personajeX -= 10;
  if (personajeX < 0) personajeX = 0;
  actualizarPantalla();
}


function moverDerecha() {
  if (!juegoIniciado) return;
  personajeX += 10;
  if (personajeX + ANCHO_PERSONAJE > canvas.width) {
    personajeX = canvas.width - ANCHO_PERSONAJE;
  }
  actualizarPantalla();
}


// ===== ACTUALIZAR PANTALLA =====
function actualizarPantalla() {
  limpiarCanva();
  dibujarSuelo();
  dibujarPersonaje();
  dibujarLimon();
}

function limpiarCanva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ===== LÓGICA DEL JUEGO =====
function bajarLimon() {
  limonY = limonY + 10;
  actualizarPantalla();
  detectarAtrapado();
  detectarPiso();
}


function detectarAtrapado() {
  if (limonX + ANCHO_LIMON > personajeX &&
      limonX < personajeX + ANCHO_PERSONAJE &&
      limonY + ALTO_LIMON > personajeY &&
      limonY < personajeY + ALTURA_PERSONAJE) {
    
    aparecerLimon();
    puntaje += 1;
    mostrarEnSpam("txtPuntaje", puntaje);
    
    // Aumentar dificultad
    if (puntaje == 3) {
      velocidadCaida = 150;
      clearInterval(intervalo);
      intervalo = setInterval(bajarLimon, velocidadCaida);
    } else if (puntaje == 6) {
      velocidadCaida = 100;
      clearInterval(intervalo);
      intervalo = setInterval(bajarLimon, velocidadCaida);
    } else if (puntaje == 10) {
      clearInterval(intervalo);
      alert("🎉 ¡GANADOR! TIENES LOS LIMONES, AHORA TE FALTA SAL Y TEQUILA 🍹");
    }
  }
}


function detectarPiso() {
  if (limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO) {
    aparecerLimon();
    vidas = vidas - 1;
    mostrarEnSpam("txtVidas", vidas);
    
    if (vidas == 0) {
      alert("💀 Juego Terminado - Puntaje final: " + puntaje);
      clearInterval(intervalo);
      juegoIniciado = false;
    }
  }
}


function aparecerLimon() {
  limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
  limonY = 0;
  actualizarPantalla();
}


// ===== REINICIAR =====
function reiniciar() {
  vidas = 3;
  puntaje = 0;
  velocidadCaida = 200;
  personajeX = canvas.width/2;
  personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
  limonX = canvas.width/2;
  limonY = 0;
  juegoIniciado = false;
  
  if (intervalo) {
    clearInterval(intervalo);
  }
  
  mostrarEnSpam("txtPuntaje", puntaje);
  mostrarEnSpam("txtVidas", vidas);
  
  // Mostrar overlay de inicio
  const overlay = document.getElementById("overlayInicio");
  if (overlay) overlay.classList.remove("oculto");
  
  // Limpiar canvas
  limpiarCanva();
  dibujarSuelo();
}


// ===== UTILIDADES =====
function generarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mostrarEnSpam(id, valor) {
  let componente = document.getElementById(id);
  if (componente) {
    componente.innerText = valor;
  }
}

// ===== CONTROLES CON TECLADO =====
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    moverIzquierda();
  } else if (event.key === 'ArrowRight') {
    moverDerecha();
  }
});


function desaparecerPersonaje(){  
  ctx.clearRect((personajeX, personajeY, ALTURA_PERSONAJE, ANCHO_PERSONAJE));
  //limpiarCanva();
}