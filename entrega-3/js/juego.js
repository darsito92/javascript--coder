document.addEventListener('DOMContentLoaded', function () {
  let tiempoInicio;
  let tiempoActual;
  let tiempoTranscurrido;
  let numeroAleatorio;
  let intentosMaximos;
  let intentos;
  let puntaje;
  let numerosIngresados;
  let jugadoresGuardados;  // Mover la declaración aquí

  const reiniciarJuego = () => {
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

  const actualizarIntentosRestantes = () => {
      document.getElementById('intentosRestantes').textContent = intentosMaximos - intentos;
  };

  const reiniciarContadorTiempo = () => {
      tiempoInicio = Date.now();
      tiempoActual = 0;
      actualizarContadorTiempo();
  };

  const actualizarContadorTiempo = () => {
      tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
      document.getElementById('tiempo').textContent = tiempoTranscurrido;
  };

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

  const guardarPuntaje = () => {
      const nombre = prompt('¡Felicidades! Has adivinado el número. Ingresa tu nombre:');
      if (nombre) {
          // jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || []; // Quitar esta línea

          const usuarioExistente = jugadoresGuardados.find((jugador) => jugador.nombre === nombre);

          if (usuarioExistente) {
              alert('Ya hay un usuario con ese nombre. Elige otro nombre.');
              return;
          }

          const jugador = {
              nombre: nombre,
              puntaje: puntaje,
              tiempo: tiempoTranscurrido
          };

          jugadoresGuardados.push(jugador);
          jugadoresGuardados.sort((a, b) => b.puntaje - a.puntaje);
          const mejoresJugadores = jugadoresGuardados.slice(0, 5);
          localStorage.setItem('jugadores', JSON.stringify(mejoresJugadores));

          alert(`Gracias, ${nombre}, por jugar. Tu puntaje es ${puntaje} puntos.`);
          mostrarPuntajes();
      }
  };

  const desvincularEventos = () => {
      btnIntentar.removeEventListener('click', intentarNumero);
      btnReiniciar.removeEventListener('click', reiniciarJuego);
  };

  const intentarNumero = () => {
    const numeroUsuario = parseInt(inputNumero.value);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
        resultado.textContent = 'Ingresa un número válido entre 1 y 100.';
        return;
    }

    if (numerosIngresados.has(numeroUsuario)) {
        resultado.textContent = 'Ya ingresaste ese número. Prueba otro.';
        return;
    }

    numerosIngresados.add(numeroUsuario);
    intentos++;

    if (numeroUsuario === numeroAleatorio) {
        puntaje = intentosMaximos - intentos + 1;
        resultado.textContent = `¡Felicidades! Adivinaste el número en ${intentos} intentos. Puntaje: ${puntaje}`;
        btnIntentar.disabled = true;
        guardarPuntaje();
    } else {
        const mensaje = numeroUsuario < numeroAleatorio ? 'Demasiado bajo.' : 'Demasiado alto.';
        resultado.textContent = `${mensaje} Intentos restantes: ${intentosMaximos - intentos}`;
    }

    if (intentos === intentosMaximos) {
        resultado.textContent = `Agotaste tus intentos. El número era ${numeroAleatorio}.`;
        btnIntentar.disabled = true;
        guardarPuntaje();
    }
    actualizarIntentosRestantes();
};

const btnIntentar = document.getElementById('btnIntentar');
const btnReiniciar = document.getElementById('btnReiniciar');
const resultado = document.getElementById('resultado');

btnIntentar.addEventListener('click', intentarNumero);
btnReiniciar.addEventListener('click', function () {
    desvincularEventos();
    reiniciarJuego();
    btnIntentar.addEventListener('click', intentarNumero);
    btnReiniciar.addEventListener('click', reiniciarJuego);
});



  reiniciarJuego();
  setInterval(actualizarContadorTiempo, 1000);
  mostrarPuntajes();
});