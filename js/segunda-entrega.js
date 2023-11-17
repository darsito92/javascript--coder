// Variables
const juego = {
    numeroSecreto: generarNumeroAleatorio(),
    intentos: 0,
    limiteIntentos: 10,
    intentosUsuario: [],
    jugadores: [],
  };
  
  // Función para generar un número aleatorio entre 1 y 100
  function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Función para realizar un intento de adivinanza
  function realizarIntento(intentoUsuario) {
    juego.intentos++;
  
    if (intentoUsuario < juego.numeroSecreto) {
      return "El número es más grande. Intenta de nuevo.";
    } else if (intentoUsuario > juego.numeroSecreto) {
      return "El número es más pequeño. Intenta de nuevo.";
    } else {
      return `¡Adivinaste el número secreto ${juego.numeroSecreto} en ${juego.intentos} intentos!`;
    }
  }
  
  // Función para agregar un intento al array
  function agregarIntento(intento) {
    juego.intentosUsuario.push(intento);
  }
  
  // Función para buscar un intento en el array
  function buscarIntento(numero) {
    return juego.intentosUsuario.includes(numero);
  }
  
  // Función para filtrar intentos mayores que un valor dado
  function filtrarIntentosMayores(valor) {
    return juego.intentosUsuario.filter((intento) => intento > valor);
  }
  
  // Función para registrar un jugador y su puntuación
  function registrarJugador(nombre, puntuacion) {
    const jugador = { nombre, puntuacion };
    juego.jugadores.push(jugador);
  }
  
  // Ejemplo de uso
  const nombreUsuario = prompt("Ingresa tu nombre:");
  if (nombreUsuario) {
    const tiempoInicio = new Date().getTime();
    adivinaNum();
    const tiempoFin = new Date().getTime();
    const tiempoTotal = tiempoFin - tiempoInicio;
    const puntuacion = juego.limiteIntentos - juego.intentos + tiempoTotal / 1000; // Puntuación basada en intentos y tiempo
    registrarJugador(nombreUsuario, puntuacion);
    console.log(juego.jugadores);
  } else {
    alert("Nombre inválido. Recarga la página e ingresa un nombre válido para jugar.");
  }
  