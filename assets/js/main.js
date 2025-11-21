document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración del tiempo (en minutos)
    const offerTime = 45;

    // Clave para localStorage (para no mezclar con otros proyectos)
    const storageKey = 'cronopioOfferEnd';

    // Función para obtener o setear el tiempo final
    function getEndTime() {
        let storedTime = localStorage.getItem(storageKey);
        if (!storedTime) {
            const now = new Date().getTime();
            storedTime = now + (offerTime * 60 * 1000);
            localStorage.setItem(storageKey, storedTime);
        }
        return parseInt(storedTime);
    }

    let endTime = getEndTime();

    // Función que actualiza el contador
    const updateTimer = setInterval(() => {
        const now = new Date().getTime();
        let distance = endTime - now;

        // --- AQUÍ ESTÁ EL CAMBIO PARA EL REINICIO AUTOMÁTICO ---
        if (distance < 0) {
            // El tiempo expiró. En lugar de detenerlo, reiniciamos el ciclo.
            // Calculamos 15 minutos nuevos desde "ahora mismo"
            endTime = now + (offerTime * 60 * 1000);
            localStorage.setItem(storageKey, endTime);

            // Recalculamos la distancia inmediatamente para que no se vea un salto raro
            distance = endTime - now;
        }
        // ---------------------------------------------------------

        // Cálculos matemáticos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar en el HTML (usamos getElementById que es más rápido)
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        // Protección por si acaso no existen los elementos en alguna página interna
        if (elHours && elMinutes && elSeconds) {
            elHours.innerText = hours < 10 ? "0" + hours : hours;
            elMinutes.innerText = minutes < 10 ? "0" + minutes : minutes;
            elSeconds.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

    }, 1000);
});