function abrirNotas() {
    document.getElementById("notes-popup").style.display = "flex";
    document.getElementsByClassName("navbar")[0].style.display = "none";
}

function cerrarNotas() {
    document.getElementById("notes-popup").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "flex";
}



const cantidad = window.innerWidth < 600 ? 4 : 3;


const ruta = "assets/img/moments/";

const imagenes = [
    "🎂 Kitty cumpleañera.jpeg",
    "💇‍♀️ Balayage.jpeg",
    "🥂 Detalle romantico.jpeg",
    "🎄 Primer encuentro.jpeg",
    "💐 Ramo de flores.jpeg",
    "🍮 Antojitos.jpeg",
    "🍴 Arandanos.jpeg",
    "🎈 Globos.jpeg",
    "🌺 Lirios.jpeg",
    "🛫 Primer vuelo.jpeg",
    "🌼 Flores Bouquet.jpeg"
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

const navBarToogle = document.querySelector(".navbar-toggle");
const navBarMenu = document.querySelector(".navbar-menu");

navBarToogle.addEventListener("click", () => {
    navBarMenu.classList.toggle("active");
    navBarToogle.classList.toggle("active");
});    