function generarAleatorio(min,max){
    let random = Math.random();
    let nroRandom = parseInt(random*(max - min));
    return nroRandom = nroRandom + min;

}


function mostrarEnSpam(id,valor){
    let cmpPuntaje = document.getElementById(id);
        cmpPuntaje.textContent = valor;
}