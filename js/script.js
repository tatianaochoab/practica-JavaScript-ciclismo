var Ciclista = {
    nombre: "",
    tiempoEt1: 0,
    tiempoEt2: 0,
    tiempoEt3: 0,
    tiempoEt4: 0,
    tiempoEt5: 0,
    promedio: 0.0
};

var arrayCiclistas = [];

let convertirArray = () => {

    if (localStorage.getItem('ciclistas') != null) {
        let elementJson = JSON.parse(localStorage.getItem('ciclistas'));
        arrayCiclistas = elementJson.map((elemento) => {
            let newCiclista = Object.create(Ciclista);
            newCiclista.nombre = elemento.nombre;
            newCiclista.tiempoEt1 = elemento.tiempoEt1;
            newCiclista.tiempoEt2 = elemento.tiempoEt2;
            newCiclista.tiempoEt3 = elemento.tiempoEt3;
            newCiclista.tiempoEt4 = elemento.tiempoEt4;
            newCiclista.tiempoEt5 = elemento.tiempoEt5;
            newCiclista.promedio = (elemento.tiempoEt1 + elemento.tiempoEt2 + elemento.tiempoEt3 + elemento.tiempoEt4 + elemento.tiempoEt5) / 5;
            return newCiclista;
        });
        cargarCiclistas();
        cargarPromedios();
        premiarCiclistas();
    }
};

let crearCiclista = (nombre, tiempoEt1, tiempoEt2, tiempoEt3, tiempoEt4, tiempoEt5) => {
    //crear un objeto nuevo a partir de otro objeto de tipo Ciclista
    let newCiclista = Object.create(Ciclista);
    newCiclista.nombre = nombre;
    newCiclista.tiempoEt1 = tiempoEt1;
    newCiclista.tiempoEt2 = tiempoEt2;
    newCiclista.tiempoEt3 = tiempoEt3;
    newCiclista.tiempoEt4 = tiempoEt4;
    newCiclista.tiempoEt5 = tiempoEt5;
    newCiclista.promedio = (tiempoEt1 + tiempoEt2 + tiempoEt3 + tiempoEt4 + tiempoEt5) / 5;
    arrayCiclistas.push(newCiclista);
}

let ordenarCiclistas = () => {
    let ciclistas = arrayCiclistas.sort((ciclista1, ciclista2) => {
        return ciclista1.promedio - ciclista2.promedio;
    });
    return ciclistas;
}

let calcularPremio = (nombre, posicion) => {
    let premio = 0;
    let cantidad = nombre.length;
    switch (posicion) {
        case 0:
            if (cantidad <= 15) {
                premio = "$25.000.000";
            } else {
                if (cantidad >= 15 && cantidad <= 30) {
                    premio = "$27.000.000";
                } else {
                    premio = "$30.000.000";
                }
            }
            break;
        case 1:
            if (cantidad < 10) {
                premio = "$15'000.000";
            } else {
                if (cantidad >= 10 && cantidad <= 25) {
                    premio = "$17.500.000";
                } else {
                    premio = "$20.000.000";
                }
            }
            break;
        case 2:
            if (cantidad < 13) {
                premio = "$7.500.000";
            } else {
                if (cantidad >= 13 && cantidad <= 20) {
                    premio = "$10.000.000";
                } else {
                    premio = "$12.500.000";
                }
            }
            break;
        default:
            break;
    }
    return premio;
}

let cargarCiclistas = () => {
    let HTML = "";
    //recorrer el arreglo
    for (let index = 0; index < arrayCiclistas.length; index++) {
        const element = arrayCiclistas[index];
        HTML += `<tr>
                    <td>${index + 1}</td>
                    <td>${element.nombre}</td>
                    <td>${element.tiempoEt1}</td>
                    <td>${element.tiempoEt2}</td>
                    <td>${element.tiempoEt3}</td>
                    <td>${element.tiempoEt4}</td>
                    <td>${element.tiempoEt5}</td>
                    <td><a href"#">Acciones</a></td>
                </tr>`;
    }
    document.querySelector("#tbl-registro-tiempos tbody").innerHTML = HTML;
}

let cargarPromedios = () => {
    let HTML = "";
    for (let index = 0; index < arrayCiclistas.length; index++) {
        const element = arrayCiclistas[index];
        HTML += `<tr>
                    <td>${index + 1}</td>
                    <td>${element.nombre}</td>
                    <td>${element.promedio}</td>
                </tr>`;
    }
    document.querySelector("#tbl-promedio-tiempos tbody").innerHTML = HTML;
}

document.getElementById("btn-agregar-reg-tiempo").addEventListener("click", (e) => {
    document.getElementById("frm_nuevo_registro_tiempo").reset();
    $("#modalRegistroTiempo").modal("toggle");
});


document.getElementById("btn_guardar_nuevo_reg_tiempo").addEventListener("click", (e) => {
    if (document.getElementById("frm_nuevo_registro_tiempo").reportValidity()) {

        let nombreCiclista = document.getElementById("nombre_ciclista").value;
        let carrera1 = parseInt(document.getElementById("carrera_1").value);
        let carrera2 = parseInt(document.getElementById("carrera_2").value);
        let carrera3 = parseInt(document.getElementById("carrera_3").value);
        let carrera4 = parseInt(document.getElementById("carrera_4").value);
        let carrera5 = parseInt(document.getElementById("carrera_5").value);
        crearCiclista(nombreCiclista, carrera1, carrera2, carrera3, carrera4, carrera5);
        cargarCiclistas();
        localStorage.setItem('ciclistas', JSON.stringify(arrayCiclistas));
        cargarPromedios();
        premiarCiclistas();
    }
});

let premiarCiclistas = () => {
    let ordenGanadores = ordenarCiclistas();
    let premio = "";
    let HTML = "";
    let element = ordenGanadores[0];
    premio = calcularPremio(element.nombre, 0);
    HTML = `<tr>
                <div class="p-2 w-100 bd-highlight">
                    <p><b>Nombre: </b>${element.nombre}</p>
                    <p><b>Tiempo: </b>${element.promedio}</p>
                    <h4><b>Premio: </b>${premio}</h4>
                </div>
                <img class="p-2 flex-shrink-1 bd-highlight img-fluid rounded float-right" src="/imagenes/medalla-oro.PNG" alt="Oro">
            </tr>`;

    document.querySelector("#tbl-premios-oro tbody").innerHTML = HTML;
    element = ordenGanadores[1];
    premio = calcularPremio(element.nombre, 1);
    HTML = `<tr>
                <div class="p-2 w-100 bd-highlight">
                    <p><b>Nombre: </b>${element.nombre}</p>
                    <p><b>Tiempo: </b>${element.promedio}</p>
                    <h4><b>Premio: </b>${premio}</h4>
                </div>
                <img class="p-2 flex-shrink-1 bd-highlight img-fluid rounded float-right" src="/imagenes/medalla-plata.PNG" alt="Plata">
            </tr>`;

    document.querySelector("#tbl-premios-plata tbody").innerHTML = HTML;
    element = ordenGanadores[2];
    premio = calcularPremio(element.nombre, 2);
    HTML = `<tr>
                <div class="p-2 w-100 bd-highlight">
                    <p><b>Nombre: </b>${element.nombre}</p>
                    <p><b>Tiempo: </b>${element.promedio}</p>
                    <h4><b>Premio: </b>${premio}</h4>
                </div>
                <img class="p-2 flex-shrink-1 bd-highlight img-fluid rounded float-right" src="/imagenes/medalla-bronce.PNG" alt="Bronce">
            </tr>`;

    document.querySelector("#tbl-premios-bronce tbody").innerHTML = HTML;
}

convertirArray();





