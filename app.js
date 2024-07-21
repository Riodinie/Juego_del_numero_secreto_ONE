let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 15;
let numeroMaximoIntentos = 0;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    numeroMaximoIntentos--;

    while(numeroMaximoIntentos>0){
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p',`El número secreto es menor, ${(numeroMaximoIntentos > 1) ? 'te quedan' : 'te queda'} ${numeroMaximoIntentos} ${(numeroMaximoIntentos > 1) ? 'intentos' : 'intento'}`);
            } else {
                asignarTextoElemento('p',`El número secreto es mayor, ${(numeroMaximoIntentos > 1) ? 'te quedan' : 'te queda'} ${numeroMaximoIntentos} ${(numeroMaximoIntentos > 1) ? 'intentos' : 'intento'}`);
            }
            intentos++;
            limpiarCaja();
        }
        return;
    }

    asignarTextoElemento('p', 'Te has quedado sin intentos.');
    document.getElementById('reiniciar').removeAttribute('disabled');
    

}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','★ Adivina el número secreto  ★');
    asignarTextoElemento('p',`Ingresa un número del 1 al  ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    numeroMaximoIntentos = 5;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();
