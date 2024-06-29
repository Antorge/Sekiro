// Funci贸n para aplicar el control de audio despues de cargar el contenido
function applyAudioControl() {
    const audio = document.getElementById('myAudio');
    const control = document.getElementById('audioControl');

    // Evento para alternar la reproduccion del audio
    control.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Reproduccion automatica bloqueada por el navegador:', error);
            });
            control.textContent = '🔊';
        } else {
            audio.pause();
            control.textContent = '🔇';
        }
        // Guardar estado de reproducci贸n en localStorage
        localStorage.setItem('audioState', audio.paused ? 'paused' : 'playing');
    });

    // Verificar el estado de reproduccion almacenado al cargar la pagina
    const storedState = localStorage.getItem('audioState');
    if (storedState === 'playing') {
        control.textContent = '🔊';
    } else {
        control.textContent = '🔇';
    }

    // Evento para iniciar la reproduccion del audio al hacer clic en cualquier parte de la pagina
    document.addEventListener('click', function playAudioOnClick() {
        if (audio.paused && storedState !== 'paused') {
            audio.play().catch(error => {
                console.log('Reproduccion automatica bloqueada por el navegador:', error);
            });
            localStorage.setItem('audioState', 'playing');
            control.textContent = '🔊';
        }
        // Remover el evento despues de que se ha hecho clic una vez
        document.removeEventListener('click', playAudioOnClick);
    }, { once: true });

    // Almacenar la posicion de reproduccion actual
    if (localStorage.getItem('audioCurrentTime')) {
        audio.currentTime = localStorage.getItem('audioCurrentTime');
    }

    // Guardar la posicion de reproduccion actual antes de descargar la pagina
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('audioCurrentTime', audio.currentTime);
    });
}

// Cargar el control de audio al cargar la pagina inicialmente
document.addEventListener('DOMContentLoaded', function() {
    applyAudioControl();
});