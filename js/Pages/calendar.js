window.addEventListener("message", function (event) {
    if (event.data === "eventoGuardado") {
        cerrarPopup();     // 👈 cerrar iframe
        cargarEventos();   // 👈 refrescar calendario
    }
});

window.onload = function () {
    cargarEventos();
}

const navBarToogle = document.querySelector(".navbar-toggle");
const navBarMenu = document.querySelector(".navbar-menu");
const slots = document.getElementsByClassName("slot");

navBarToogle.addEventListener("click", () => {
    navBarMenu.classList.toggle("active");
    navBarToogle.classList.toggle("active");
});


/*Abrir Notas Seminario de Investigacion*/
function abrirNotasSeminario() {
    document.getElementById("notes-popup-semi-invest").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "none";
    }
}

function cerrarNotasSeminario() {
    document.getElementById("notes-popup-semi-invest").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "flex";
    }
}

/*Abrir Notas Psicopatologia*/
function abrirNotasPsicopatologia() {
    document.getElementById("notes-popup-psicopatology").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "none";
    }
}

function cerrarNotasPsicopatologia() {
    document.getElementById("notes-popup-psicopatology").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "flex";
    }
}

/*Abrir Notas Estadistica*/

function abrirNotasEstadistica() {
    document.getElementById("notes-popup-estadistica").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "none";
    }
}

function cerrarNotasEstadistica() {
    document.getElementById("notes-popup-estadistica").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "flex";
    }
}

/*Abrir Notas Psicologia Experimental*/
function abrirNotasPsicoExperimental() {
    document.getElementById("notes-popup-psico-experimental").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "none";
    }

}

function cerrarNotasPsicoExperimental() {
    document.getElementById("notes-popup-psico-experimental").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "flex";
    }
}

function cerrarTodo() {
    cerrarNotasSeminario();
    cerrarNotasPsicopatologia();
    cerrarNotasEstadistica();
    cerrarNotasPsicoExperimental();
    cerrarNotasDiscapacidad();
    cerrarPopup();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cerrarTodo();
    }
});


/*Abrir Notas Discapacidad e Inclusión*/

function abrirNotasDiscapacidad() {
    document.getElementById("notes-popup-discapacidad").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "none";
    }
}

function cerrarNotasDiscapacidad() {
    document.getElementById("notes-popup-discapacidad").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "flex";
    }
}



/* Lógica para mostrar eventos dinámicamente */

const hoy = new Date(); // Simulamos que hoy es el 10 de abril de 2026

// Semana domingo → sábado
const inicioSemana = new Date(hoy);
inicioSemana.setDate(hoy.getDate() - hoy.getDay());

const finSemana = new Date(inicioSemana);
finSemana.setDate(inicioSemana.getDate() + 6);

function calcularGridArea(fechaEvento, inicio, fin) {
    const dia = fechaEvento.getDay() + 1;

    function horaAFila(horaStr) {
        // Convierte "9:30 AM" a fila
        const [time, period] = horaStr.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        // Cada media hora = 1 fila, fila 1 = 7:00 AM
        return (h - 7) * 2 + (m === 30 ? 2 : 1);
    }

    const inicioFila = horaAFila(inicio);
    const finFila = horaAFila(fin);

    return `${inicioFila} / ${dia + 1} / ${finFila} / ${dia + 1}`;
}


/* Semana de Estudios*/
const numberWeek = document.getElementById("number-week");
const startOfYear = new Date(hoy.getFullYear(), 0, 1);
const pastDaysOfYear = (hoy - startOfYear) / 86400000;
const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7) - 12;
numberWeek.textContent = `Semana 0${weekNumber}`;


/*Abrir Agregar Evento*/
function popupAgregarEvento() {
    document.getElementById("popup-agregar-evento").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "none";
    }
}

function cerrarPopup() {
    document.getElementById("popup-agregar-evento").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
    for (let i = 0; i < slots.length; i++) {
        slots[i].style.display = "flex";
    }
}
const API_URL = "https://attendance-system-1-vkq7.onrender.com";

function cargarEventos() {
    fetch(`${API_URL}/api/eventos`)
        .then(res => res.json())
        .then(data => {
            renderEventos(data);
        })
        .catch(err => console.error(err));
}

function formatearHora(hora) {
    let [h, m] = hora.split(":");
    h = parseInt(h);

    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `${h}:${m} ${ampm}`;
}

function renderEventos(eventos) {

    eventos.forEach(evento => {

        const fecha = new Date(evento.fecha);

        const inicio = formatearHora(evento.inicio);
        const fin = formatearHora(evento.fin);

        const gridArea = calcularGridArea(fecha, inicio, fin);

        if (fecha >= inicioSemana && fecha <= finSemana) {

            const createEvent = document.createElement("div");
            createEvent.className = "slot backend";
            createEvent.style.backgroundColor = evento.color;
            createEvent.style.gridArea = gridArea;

            createEvent.innerHTML = `
                <img id="popup-img" src="${evento.img}" alt="">
                <p class="slot-title">${evento.titulo}</p>
                <p class="slot-time">${inicio} - ${fin}</p>
                <p class="aula">${evento.lugar}</p>
            `;

            document.getElementById("event-container").appendChild(createEvent);
        }
    });
}

document.querySelectorAll(".backend").forEach(e => e.remove());