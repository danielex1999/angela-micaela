function validarHoras(inicio, fin) {
    return inicio < fin;
}

function ajustarHora(input) {
    let [h, m] = input.value.split(":").map(Number);

    if (m <= 15) m = 0;
    else if (m <= 45) m = 30;
    else {
        m = 0;
        h = (h + 1) % 24;
    }

    input.value = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function guardarEvento(e) {
    e.preventDefault();

    const inicio = document.querySelector("[name='inicio']").value;
    const fin = document.querySelector("[name='fin']").value;

    if (!validarHoras(inicio, fin)) {
        alert("La hora de fin debe ser mayor que la de inicio ❌");
        return;
    }

    const evento = {
        titulo: document.querySelector("[name='titulo']").value,
        fecha: document.querySelector("[name='fecha']").value,
        inicio: inicio,
        fin: fin,
        lugar: document.querySelector("[name='lugar']").value,
        img: "/assets/icons/default.png",
        color: document.querySelector("[name='color']").value,
    };

    const API_URL = "https://attendance-system-1-vkq7.onrender.com";
    fetch(`${API_URL}/api/eventos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
    })
        .then(res => res.json())
        .then(() => {
            window.parent.postMessage("eventoGuardado", "*");
        });
}