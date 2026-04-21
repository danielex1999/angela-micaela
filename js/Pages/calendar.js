const navBarToogle = document.querySelector(".navbar-toggle");
const navBarMenu = document.querySelector(".navbar-menu");

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

// Evento de Pestañas
const eventos = [
    {
        fecha: new Date("2026-04-16"),
        titulo: "Retoque de uñas acrilicas",
        inicio: "9:00 AM",
        fin: "11:00 AM",
        lugar: "Blossom Beauty",
        img: "/assets/icons/9727798.png"
    },
    {
        fecha: new Date("2026-04-16"),
        titulo: "Tercer tratamiento de Balayage",
        inicio: "11:00 AM",
        fin: "1:00 PM",
        lugar: "Blossom Beauty",
        img: "/assets/icons/imagen_2026-03-08_204039656-removebg-preview.png"
    },
    {
        fecha: new Date("2026-04-09"),
        titulo: "Examen de Ingles (Oral)",
        inicio: "9:00 AM",
        fin: "11:00 AM",
        lugar: "Sala Meet",
        img: "/assets/icons/rosa.png"
    },
    {
        fecha: new Date("2026-04-11"),
        titulo: "Lavar Mochila y Ropa",
        inicio: "9:00 AM",
        fin: "1:00 PM",
        lugar: "---",
        img: "https://cdn-icons-png.flaticon.com/512/760/760609.png"
    },
    {
        fecha: new Date("2026-04-16"),
        titulo: "Comprar Serums",
        inicio: "2:00 PM",
        fin: "2:30 PM",
        lugar: "Pañitos desmsaquillantes",
        img: "https://images.rappi.pe/marketplace/aruma_encalada-1755885135900.png"
    },
    {
        fecha: new Date("2026-04-16"),
        titulo: "Comprar Locion Corporal",
        inicio: "1:00 PM",
        fin: "1:30 PM",
        lugar: "Victoria's Secret",
        img: "https://w7.pngwing.com/pngs/743/815/png-transparent-victorias-secret-logo-fashion-clothes.png"
    }
];

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


// Procesar cada evento del array
eventos.forEach(evento => {
    evento.gridArea = calcularGridArea(evento.fecha, evento.inicio, evento.fin);
    console.log(evento.gridArea); // "4 / 5 / 8 / 5"

    // Si está en esta semana → crear div
    if (evento.fecha >= inicioSemana && evento.fecha <= finSemana) {
        const createEvent = document.createElement("div");
        createEvent.className = "slot";
        createEvent.id = "events";
        createEvent.style.gridArea = evento.gridArea;

        createEvent.innerHTML = `
        <img id="popup-img" src="${evento.img}" alt="">
        <p class="slot-title">${evento.titulo}</p>
        <p class="slot-time">${evento.inicio} - ${evento.fin}</p>
        <p class="aula">${evento.lugar}</p>
      `;
        document.getElementById("event-container").appendChild(createEvent);
    }
});

/* Semana de Estudios*/
const numberWeek = document.getElementById("number-week");
const startOfYear = new Date(hoy.getFullYear(), 0, 1);
const pastDaysOfYear = (hoy - startOfYear) / 86400000;
const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7) - 12;
numberWeek.textContent = `Semana 0${weekNumber}`;
