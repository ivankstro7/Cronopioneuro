// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración del tiempo (en minutos)
    const offerTime = 15;

    // Intentamos obtener una fecha de fin guardada en el navegador del usuario
    let endTime = localStorage.getItem('cronopioOfferEnd');

    if (!endTime) {
        // Si no existe, creamos una nueva fecha: AHORA + 15 minutos
        const now = new Date().getTime();
        endTime = now + (offerTime * 60 * 1000);
        localStorage.setItem('cronopioOfferEnd', endTime);
    }

    // Función que actualiza el contador cada segundo
    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        // Cálculos matemáticos para horas, minutos y segundos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar en el HTML (asegurando que tenga 2 dígitos con "0")
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        // Si el tiempo termina
        if (distance < 0) {
            clearInterval(updateTimer);
            // Opción A: Poner todo en 00
            document.getElementById("countdown").innerHTML = "<span class='badge bg-danger'>¡Oferta Terminada!</span>";

            // Opción B: Reiniciar el contador (Loop infinito de marketing - Opcional)
            // localStorage.removeItem('cronopioOfferEnd'); 
            // location.reload(); 
        }
    }, 1000);
});