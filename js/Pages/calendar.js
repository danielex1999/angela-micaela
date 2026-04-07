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