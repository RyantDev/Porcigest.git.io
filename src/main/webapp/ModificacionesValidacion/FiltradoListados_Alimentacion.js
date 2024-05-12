(function (document) {
    'use strict';
    var LightTableFilter = (function (Arr) {

        var _input;
        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function (table) {
                Arr.forEach.call(table.tBodies, function (tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }

        function _filter(row) {
            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
            init: function () {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function (input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);
    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });
})(document);

const table = document.getElementById("table");
const modal = document.getElementById("modal");
const inputs = document.querySelectorAll("input, select");
let count = 0;

window.addEventListener("click", (e) => {
    if (e.target.matches(".btn-warning")) {
        let data = e.target.parentElement.parentElement.children;
        fillData(data);
        modal.classList.toggle("translate");

    }

    if (e.target.matches(".btn-danger")) {
        modal.classList.toggle("translate");
        count = 0;
    }
});


const fillData = (data) => {
    for (let index of inputs) {
        console.log(data[count].textContent);
        if (index === inputs[0]) {
            continue;
        }
        index.value = data[count].textContent;
        count += 1;
    }
};


const formulario = document.getElementById('formulario');
const inputssa = document.querySelectorAll('#formulario input');
const OptionSelected = document.querySelectorAll('#formulario select');

const expresiones = {
    id: /^[^a-zA-Z]{1,20}$/, // No mas de 20  Digitos
    semana: /^[a-zA-Z0-9\s]*$/, // Decimales con punto  o Enteros
    dias: /^-?\d+([.,]\d+)?$/, // Decimales con punto  o Enteros
    fecha: /^(?=\s*\S)(\d{4}-\d{2}-\d{2})?$/, // Formato Fecha.
    promedio: /^-?\d+([.,]\d+)?$/ // Decimales con punto  o Enteros
}

const campos = {
    id_lote: true,
    semana: true,
    id_alimento: true,
    dia_1: true,
    dia_2: true,
    dia_3: true,
    dia_4: true,
    dia_5: true,
    dia_6: true,
    dia_7: true,
    fecha_I: true,
    fecha_F: true,
    promedio_semanal: true,
    promedio_diario: true,
    
}

const ValidarForm = (e) => {
    let NombreCampo = e.target.name;
    console.log(NombreCampo);
    switch (NombreCampo) {
        case "id_lote":
        case "id_alimento":        
            validarCampo(expresiones.id, e.target, NombreCampo);
            break;
        case "semana":
            validarCampo(expresiones.semana, e.target, NombreCampo);
            break;
        case "dia_1":
        case "dia_2":
        case "dia_3":
        case "dia_4":
        case "dia_5":
        case "dia_6":
        case "dia_7":
            validarCampo(expresiones.dias, e.target, NombreCampo);
            break;
        case "fecha_I":
        case "fecha_F":
            validarCampo(expresiones.fecha, e.target, NombreCampo);
            break;
        case "promedio_semanal":
        case "promedio_diario":
            validarCampo(expresiones.promedio, e.target, NombreCampo);
            break;
        default:
            break;
    }
}

const validarCampo = (expre, inputssa, campo) => {
    if (expre.test(inputssa.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputssa.forEach((input) => {
    // input.addEventListener('keyup', ValidarForm);
    input.addEventListener('blur', ValidarForm);
});

OptionSelected.forEach((Option) => {
    // input.addEventListener('keyup', ValidarForm);
    Option.addEventListener('blur', ValidarForm);
});


function MiFuncion() {
    if (
        campos.id_lote &&
        campos.semana &&
        campos.dia_1 &&
        campos.dia_2 &&
        campos.dia_3 &&
        campos.dia_4 &&
        campos.dia_5 &&
        campos.dia_6 &&
        campos.dia_7 &&
        campos.fecha_I &&
        campos.fecha_F &&
        campos.promedio_semanal &&
        campos.promedio_diario &&
        campos.id_alimento
    ) {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        console.log("Entro a MiFuncion");

        setTimeout(function () {
            // Retrasa el envío del formulario después de 5 segundos (2000 milisegundos)
            document.getElementById('formulario').submit();
            formulario.reset();
        }, 2000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 2000);
        return false;
    }
}







