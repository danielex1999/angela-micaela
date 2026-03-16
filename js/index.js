function abrirNotas() {
    document.getElementById("notes-popup").style.display = "flex";
}

function cerrarNotas() {
    document.getElementById("notes-popup").style.display = "none";
}



const cantidad = window.innerWidth < 600 ? 4 : 3;


const ruta = "assets/img/moments/";

const imagenes = [
    "🎂 Kitty cumpleañera.jpeg",
    "💇‍♀️ Balayage.jpeg",
    "🥂 Sorpresa romántica.jpeg",
    "🎄 Primer encuentro.jpeg"
];


imagenes.sort(() => Math.random() - 0.5);

// cantidad de imágenes que quieres mostrar
const contenedor = document.querySelector(".momentos-images");

for (let i = 0; i < cantidad; i++) {

    const div = document.createElement("div");
    div.className = "img-container-moment";

    const img = document.createElement("img");
    img.src = ruta + imagenes[i];

    const p = document.createElement("p");
    p.textContent = imagenes[i].replace(/\.[^/.]+$/, "");

    div.appendChild(img);
    div.appendChild(p);

    contenedor.appendChild(div);
}