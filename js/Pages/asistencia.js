//Semana actual de Clases
/* Semana de Estudios*/
const hoy = new Date();
const startOfYear = new Date(hoy.getFullYear(), 0, 1);
const pastDaysOfYear = (hoy - startOfYear) / 86400000;
const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7) - 12;
const semanaActual = `Semana ${weekNumber}`;
const API_URL = "https://attendance-system-1-vkq7.onrender.com";
const navBarToogle = document.querySelector(".navbar-toggle");
const navBarMenu = document.querySelector(".navbar-menu");

document.addEventListener("DOMContentLoaded", () => {

    // NAVBAR RESPONSIVE


    if (navBarToogle && navBarMenu) {
        navBarToogle.addEventListener("click", () => {
            navBarMenu.classList.toggle("active");
            navBarToogle.classList.toggle("active");
        });
    }

    document.getElementById("finSemana").textContent = semanaActual;
    generarHeader();

    Promise.all([
        fetch(`${API_URL}/asistencia/all`).then(r => r.json()),
        fetch(`${API_URL}/alumnos/showall`).then(r => r.json())
    ])
        .then(([asistData, alumnosData]) => {
            asistencias = asistData;
            generarTabla(alumnosData);
        });
});

//Objeto de Fecha
const calendario = {
    1: { Mie: "2026-03-25", Vie: "2026-03-27" },
    2: { Mie: "2026-04-01", Vie: "2026-04-03" },
    3: { Mie: "2026-04-08", Vie: "2026-04-10" },
    4: { Mie: "2026-04-15", Vie: "2026-04-17" },
    5: { Mie: "2026-04-22", Vie: "2026-04-24" },
    6: { Mie: "2026-04-29", Vie: "2026-05-01" },
    7: { Mie: "2026-05-06", Vie: "2026-05-08" },
    8: { Mie: "2026-05-13", Vie: "2026-05-15" },
    9: { Mie: "2026-05-20", Vie: "2026-05-22" },
    10: { Mie: "2026-05-27", Vie: "2026-05-29" },
    11: { Mie: "2026-06-03", Vie: "2026-06-05" },
    12: { Mie: "2026-06-10", Vie: "2026-06-12" },
    13: { Mie: "2026-06-17", Vie: "2026-06-19" },
    14: { Mie: "2026-06-24", Vie: "2026-06-26" },
    15: { Mie: "2026-07-01", Vie: "2026-07-03" },
    16: { Mie: "2026-07-08", Vie: "2026-07-10" },
    17: { Mie: "2026-07-15", Vie: "2026-07-17" },
    18: { Mie: "2026-07-22", Vie: "2026-07-24" },
    19: { Mie: "2026-07-29", Vie: "2026-07-31" },
    20: { Mie: "2026-08-05", Vie: "2026-08-07" }
};
//Generar header de tabla
function generarHeader() {

    const thead = document.getElementById("thead-asistencia");

    let row1 = `<tr>
        <th rowspan="2" class="col-fixed-numero">N°</th>
        <th rowspan="2" class="col-fixed-alumnos">Alumnos</th>`;

    let row2 = `<tr>`;

    for (let i = 1; i <= weekNumber; i++) {
        row1 += `<th colspan="2">Semana ${i}</th>`;
        row2 += `<th>Mie</th><th>Vie</th>`;
    }

    row1 += `</tr>`;
    row2 += `</tr>`;

    thead.innerHTML = row1 + row2;
}

//Generar tabla de asistencia
function generarTabla(alumnos) {

    const tbody = document.getElementById("tbody-asistencia");
    tbody.innerHTML = "";

    alumnos.forEach((alumno, index) => {

        let row = `
            <td class="col-fixed-numero">${index + 1}</td>
            <td class="col-fixed-alumnos">${alumno.name}</td>
        `;

        for (let i = 1; i <= weekNumber; i++) {

            const fechaMie = calendario[i].Mie;
            const fechaVie = calendario[i].Vie;

            const checkedMie = estaMarcado(alumno.id, fechaMie) ? "checked" : "";
            const checkedVie = estaMarcado(alumno.id, fechaVie) ? "checked" : "";

            row += `
        <td>
            <input type="checkbox"
                data-fecha="${fechaMie}"
                data-alumno="${alumno.id}"
                ${checkedMie}>
        </td>
        <td>
            <input type="checkbox"
                data-fecha="${fechaVie}"
                data-alumno="${alumno.id}"
                ${checkedVie}>
        </td>
    `;
        }

        tbody.innerHTML += `<tr>${row}</tr>`;
    });
}

//Botón Guardar asistencia
document.getElementById("guardar-btn").addEventListener("click", () => {

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const asistencias = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            asistencias.push({
                fecha: cb.dataset.fecha,
                asistio: true,
                alumno: {
                    id: parseInt(cb.dataset.alumno)
                }
            });
        }
    });

    fetch(`${API_URL}/asistencia/bulk`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asistencias)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al guardar");
        return res.json();
    })
    .then(data => {
        Swal.fire({
            icon: "success",
            title: "Guardado",
            text: "Se guardó exitosamente"
        });
    })
    .catch(err => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo guardar"
        });
        console.error(err);
    });

});
//Cargar asistencia al cargar la página
let asistencias = [];

fetch(`${API_URL}/asistencia/all`)
    .then(res => res.json())
    .then(data => {
        asistencias = data;
        fetch(`${API_URL}/alumnos/showall`)
            .then(res => res.json())
            .then(data => generarTabla(data));
    });

function estaMarcado(alumnoId, fecha) {
    return asistencias.some(a =>
        a.alumno?.id === alumnoId &&
        a.fecha === fecha &&
        a.asistio === true
    );
}

//Botón Generar Excel
function exportarExcel() {

    const tabla = document.querySelector(".generated-table");
    const tablaClon = tabla.cloneNode(true);

    // 🔥 Reemplazar checkboxes por ✔
    tablaClon.querySelectorAll("input[type='checkbox']").forEach(cb => {
        cb.parentElement.textContent = cb.checked ? "✔" : "";
    });

    // Crear workbook
    const wb = XLSX.utils.table_to_book(tablaClon, { sheet: "Asistencia" });
    const ws = wb.Sheets["Asistencia"];

    const range = XLSX.utils.decode_range(ws['!ref']);

    // 🔥 ESTILOS
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {

            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            if (!ws[cellAddress]) continue;

            // Header (primeras 2 filas)
            if (R <= 1) {
                ws[cellAddress].s = {
                    font: { bold: true },
                    alignment: { horizontal: "center", vertical: "center" },
                    fill: { fgColor: { rgb: "D9EAF7" } },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            } else {
                // Datos
                ws[cellAddress].s = {
                    alignment: {
                        horizontal: C === 1 ? "left" : "center", // 👈 nombres a la izquierda
                        vertical: "center"
                    },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }
        }
    }

    // 🔥 ANCHO DE COLUMNAS
    const colCount = range.e.c + 1;
    ws["!cols"] = [];

    for (let i = 0; i < colCount; i++) {
        if (i === 0) {
            ws["!cols"].push({ wch: 5 }); // N°
        } else if (i === 1) {
            ws["!cols"].push({ wch: 30 }); // Alumnos
        } else {
            ws["!cols"].push({ wch: 8 }); // Mie / Vie
        }
    }

    // 🔥 DESCARGA
    XLSX.writeFile(wb, "asistencia.xlsx");
}

