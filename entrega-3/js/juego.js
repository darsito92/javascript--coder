// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Declaración de variables globales
  let tiempoInicio;
  let tiempoActual;
  let tiempoTranscurrido;
  let numeroAleatorio;
  let intentosMaximos;
  let intentos;
  let puntaje;
  let numerosIngresados;
  let jugadoresGuardados;

  // Función para reiniciar el juego
  const reiniciarJuego = () => {
      // Genera un nuevo número aleatorio y restablece las variables
      numeroAleatorio = Math.floor(Math.random() * 100) + 1;
      intentosMaximos = 10;
      intentos = 0;
      puntaje = 0;
      numerosIngresados = new Set();
      btnIntentar.disabled = false;
      resultado.textContent = '';
      inputNumero.value = '';
      actualizarIntentosRestantes();
      reiniciarContadorTiempo();
  };

  // Función para actualizar la cantidad de intentos restantes en la interfaz
  const actualizarIntentosRestantes = () => {
      document.getElementById('intentosRestantes').textContent = intentosMaximos - intentos;
  };

  // Función para reiniciar el contador de tiempo
  const reiniciarContadorTiempo = () => {
      tiempoInicio = Date.now();
      tiempoActual = 0;
      actualizarContadorTiempo();
  };

  // Función para actualizar y mostrar el tiempo transcurrido
  const actualizarContadorTiempo = () => {
      tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
      document.getElementById('tiempo').textContent = tiempoTranscurrido;
  };

  // Función para mostrar los puntajes de los jugadores almacenados en el localStorage
  const mostrarPuntajes = () => {
      jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];
      const puntajesContainer = document.getElementById('puntajes');
      puntajesContainer.innerHTML = '';

      jugadoresGuardados.forEach((jugador) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${jugador.nombre}: ${jugador.puntaje} puntos en ${jugador.tiempo} segundos`;
          puntajesContainer.appendChild(listItem);
      });
  };

  // Función para guardar el puntaje del jugador
  const guardarPuntaje = () => {
      // Solicita al jugador su nombre mediante un prompt
      const nombre = prompt('¡Felicidades! Has adivinado el número. Ingresa tu nombre:');

      // Verifica si el jugador ingresó un nombre
      if (nombre) {
          // Busca si ya existe un usuario con el mismo nombre
          const usuarioExistente = jugadoresGuardados.find((jugador) => jugador.nombre === nombre);

          // Si ya existe, alerta al usuario y no guarda el puntaje
          if (usuarioExistente) {
              alert('Ya hay un usuario con ese nombre. Elige otro nombre.');
              return;
          }

          // Crea un objeto con los datos del jugador actual y lo agrega a la lista de jugadores
          const jugador = {
              nombre: nombre,
              puntaje: puntaje,
              tiempo: tiempoTranscurrido
          };

          jugadoresGuardados.push(jugador);

          // Ordena la lista de jugadores por puntaje de mayor a menor
          jugadoresGuardados.sort((a, b) => b.puntaje - a.puntaje);

          // Guarda solo los mejores 5 puntajes en el localStorage
          const mejoresJugadores = jugadoresGuardados.slice(0, 5);
          localStorage.setItem('jugadores', JSON.stringify(mejoresJugadores));

          // Muestra un mensaje agradeciendo al jugador y actualiza la lista de puntajes
          alert(`Gracias, ${nombre}, por jugar. Tu puntaje es ${puntaje} puntos.`);
          mostrarPuntajes();
      }
  };

  // Función para desvincular eventos click de los botones
  const desvincularEventos = () => {
      btnIntentar.removeEventListener('click', intentarNumero);
      btnReiniciar.removeEventListener('click', reiniciarJuego);
  };

  // Función principal para intentar adivinar el número
  const intentarNumero = () => {
      // Obtiene el número ingresado por el usuario desde el campo de entrada
      const numeroUsuario = parseInt(inputNumero.value);

      // Verifica si el número ingresado es válido
      if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
          resultado.textContent = 'Ingresa un número válido entre 1 y 100.';
          return;
      }

      // Verifica si el número ya ha sido ingresado previamente
      if (numerosIngresados.has(numeroUsuario)) {
          resultado.textContent = 'Ya ingresaste ese número. Prueba otro.';
          return;
      }

      // Actualiza el conjunto de números ingresados y el contador de intentos
      numerosIngresados.add(numeroUsuario);
      intentos++;

      // Comprueba si el número ingresado es correcto
      if (numeroUsuario === numeroAleatorio) {
          puntaje = intentosMaximos - intentos + 1;
          resultado.textContent = `¡Felicidades! Adivinaste el número en ${intentos} intentos. Puntaje: ${puntaje}`;
          btnIntentar.disabled = true;
          // Llama a la función para guardar el puntaje del jugador
          guardarPuntaje();
      } else {
          // Proporciona pistas sobre si el número es demasiado alto o bajo
          const mensaje = numeroUsuario < numeroAleatorio ? 'Demasiado bajo.' : 'Demasiado alto.';
          resultado.textContent = `${mensaje} Intentos restantes: ${intentosMaximos - intentos}`;
      }

      // Comprueba si se agotaron los intentos
      if (intentos === intentosMaximos) {
          resultado.textContent = `Agotaste tus intentos. El número era ${numeroAleatorio}.`;
          btnIntentar.disabled = true;
          // Llama a la función para guardar el puntaje del jugador
          guardarPuntaje();
      }

      // Actualiza la cantidad de intentos restantes en la interfaz
      actualizarIntentosRestantes();
  };

  // Obtiene referencias a elementos del DOM
  const btnIntentar = document.getElementById('btnIntentar');
  const btnReiniciar = document.getElementById('btnReiniciar');
  const resultado = document.getElementById('resultado');

  // Agrega event listeners a los botones
  btnIntentar.addEventListener('click', intentarNumero);
  btnReiniciar.addEventListener('click', function () {
      // Desvincula eventos click para evitar múltiples llamadas
      desvincularEventos();
      // Llama a la función para reiniciar el juego
      reiniciarJuego();
      // Vuelve a vincular eventos click después de reiniciar el juego
      btnIntentar.addEventListener('click', intentarNumero);
      btnReiniciar.addEventListener('click', reiniciarJuego);
  });

  // Inicia el juego al cargar la página
  reiniciarJuego();

  // Establece un intervalo para actualizar el contador de tiempo cada segundo
  setInterval(actualizarContadorTiempo, 1000);

  // Muestra los puntajes almacenados en el localStorage
  mostrarPuntajes();
});