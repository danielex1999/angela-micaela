function abrirNotas() {
    document.getElementById("notes-popup").style.display = "flex";
}

function cerrarNotas() {
    document.getElementById("notes-popup").style.display = "none";
}




const ruta = "assets/img/moments/";

const imagenes = [
    "🎂 Kitty cumpleañera.jpeg",
    "💇‍♀️ Balayage.jpeg"
];


imagenes.sort(() => Math.random() - 0.5);

const contenedores = document.querySelectorAll(".img-container-moment");

contenedores.forEach((container, index) => {

    const img = container.querySelector("img");
    const p = container.querySelector("p");

    const nombreArchivo = imagenes[index];

    img.src = ruta + nombreArchivo;

    let nombre = nombreArchivo.split(".")[0];
    p.textContent = nombre;
});