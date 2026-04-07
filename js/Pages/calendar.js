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