// Función principal del juego
function adivinaNum() {
  while (juego.intentos < juego.limiteIntentos) {
    const entradaUsuario = prompt(`Intento ${juego.intentos + 1}/${juego.limiteIntentos}: Adivina el número secreto (entre 1 y 100):`);

    if (!entradaUsuario) {
      alert("¡Gracias por jugar! Hasta la próxima.");
      break;
    }

    const intentoUsuario = parseInt(entradaUsuario);

    if (isNaN(intentoUsuario)) {
      alert("Por favor, ingresa un número válido.");
      continue;
    }

    agregarIntento(intentoUsuario);

    const resultado = realizarIntento(intentoUsuario);
    alert(resultado);

    if (resultado.includes("¡Adivinaste")) {
      break;
    }
  }

  if (juego.intentos === juego.limiteIntentos) {
    alert(`¡Llegaste al límite de ${juego.limiteIntentos} intentos! El número secreto era ${juego.numeroSecreto}. ¡Mejor suerte la próxima vez!`);
  }
}