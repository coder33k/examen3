//karla diaz anaya 740480
const readline = require('readline');

// Crear una interfaz de lectura y escritura para la entrada estándar y salida estándar
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para generar un número aleatorio entre min (incluido) y max (incluido)
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Inicialización de variables
const numeroAdivinar = generarNumeroAleatorio(1, 100);
let intentos = 10;
const intentosPrevios = [];

// Función para comparar el número adivinado con el número aleatorio
function compararNumeros(numeroAdivinado) {
  intentos--;
  intentosPrevios.push(numeroAdivinado);

  if (numeroAdivinado === numeroAdivinar) {
    return { mensaje: `¡Felicidades! ¡Has adivinado el número ${numeroAdivinar} en ${10 - intentos} intentos!`, finJuego: true };
  }

  if (intentos === 0) {
    return { mensaje: `¡Se acabaron los intentos! El número era ${numeroAdivinar}.`, finJuego: true };
  }

  const mensaje = `Número incorrecto. Te quedan ${intentos} intentos.`;
  if (numeroAdivinado < numeroAdivinar) {
    return { mensaje: `${mensaje} Intenta con un número mayor.`, finJuego: false };
  } else {
    return { mensaje: `${mensaje} Intenta con un número menor.`, finJuego: false };
  }
}

// Función para iniciar el juego
function iniciarJuego() {
  const pregunta = `¡Bienvenido a Adivina el número! Hemos seleccionado un número aleatorio entre 1 y 100. Fíjate si lo puedes adivinar en 10 turnos o menos. : `;
  rl.question(pregunta, (numeroAdivinado) => {
    const resultado = compararNumeros(parseInt(numeroAdivinado));
    console.log(resultado.mensaje);

    if (resultado.finJuego || isNaN(numeroAdivinado)) {
      reiniciarJuego();
    } else {
      iniciarJuego();
    }
  });
}

// Función para reiniciar el juego con confirmación
function reiniciarJuego() {
  const pregunta = "¿Quieres jugar de nuevo? (s/n): ";
  rl.question(pregunta, (respuesta) => {
    if (respuesta.toLowerCase() === 's') {
      intentos = 10;
      intentosPrevios.length = 0;
      iniciarJuego();
    } else {
      console.log("¡Gracias por jugar! ¡Hasta luego!");
      rl.close(); // Cerrar la interfaz readline
    }
  });
}

// Iniciar el juego por primera vez
iniciarJuego();