const pulsar = document.querySelector('.pulsa');
pulsar.addEventListener('click', pulsia);

let fechaActual = new Date();
let anyoActual = fechaActual.getFullYear();
let mesActual = fechaActual.getMonth() + 1;
let diaActual = fechaActual.getDate();

//Calculadora de años

function pulsia() {
    //id = year, id = mounth, id = day 
    let dia = document.getElementById('day');
    let mes = document.getElementById('mounth');
    let anyo = document.getElementById('year');
    let errorDia = document.getElementById('dia-error');
    let errorMes = document.getElementById('mes-error');
    let errorAnyo = document.getElementById('anyo-error');
    let diasCorrectos = true;

    //Recoger los datos de los input
    let unDia = parseInt(dia.value);
    let unMes = parseInt(mes.value);
    let unAnyo = parseInt(anyo.value);

    //Comprobamos si es correcto
    let diasBien = obtenerDiasMes(unAnyo, unMes);

    if (unDia <= diasBien) {
        diasCorrectos = true
    } else {
        diasCorrectos = false;
    }

    //Repito la recogido por feachaActual *Modificar
    fechaFinal = `${fechaActual.getFullYear()}-${fechaActual.getMonth()+1}-${fechaActual.getDate()}`;
    fechaInicio = `${unAnyo}-${unMes}-${unDia}`;

    console.log(fechaInicio);
    console.log(fechaFinal);

    //Llamo a la función que me devuelve los años, meses y dias
    const diff = getDateDiff(fechaInicio, fechaFinal);

    //Se puede refactorizar los errores y ponerlos en una función para que no se repita tanto *
    if (unDia == '' || unDia == 0 || diasCorrectos == false) {
        errorDia.innerText = 'This field is required';
        dia.setAttribute('class', 'error-input');
        mes.setAttribute('class', 'error-input');
        anyo.setAttribute('class', 'error-input');
    } else if (unDia > 31 || unDia < 0 || isNaN(unDia)) {
        errorDia.innerText = 'Must be a valid date';
        dia.setAttribute('class', 'error-input');
        mes.setAttribute('class', 'error-input');
        anyo.setAttribute('class', 'error-input');
    } else {
        errorDia.innerText = "";
        document.getElementById('muestra-dia').setAttribute('class', 'resultado-nuevo');
        document.getElementById('muestra-dia').innerText = diff.dias;
    }

    if (unMes == '' || unMes == 0 || diasCorrectos == false) {
        errorMes.innerText = 'This field is required';
        dia.setAttribute('class', 'error-input');
        mes.setAttribute('class', 'error-input');
        anyo.setAttribute('class', 'error-input');

    } else if (unMes > 12 || unMes < 0 || isNaN(unMes)) {
        errorMes.innerText = 'Must be a valid date';
        dia.setAttribute('class', 'error-input');
        mes.setAttribute('class', 'error-input');
        anyo.setAttribute('class', 'error-input');
    } else {
        errorMes.innerText = "";
        document.getElementById('muestra-mes').setAttribute('class', 'resultado-nuevo');
        document.getElementById('muestra-mes').innerText = diff.meses;
    }

    if (unAnyo == '' || unAnyo == 0 || diasCorrectos == false) {
        errorAnyo.innerText = 'This field is required';
        dia.setAttribute('class', 'error-input');
        mes.setAttribute('class', 'error-input');
        anyo.setAttribute('class', 'error-input');
    } else if (unAnyo > anyoActual || unAnyo < 0 || isNaN(unAnyo)) {
        errorAnyo.innerText = 'Must be a valid date';
        dia.setAttribute('class', 'error-input');
        mes.setAttribute('class', 'error-input');
        anyo.setAttribute('class', 'error-input');
    } else {
        errorAnyo.innerText = "";
        document.getElementById('muestra-anyo').setAttribute('class', 'resultado-nuevo');
        document.getElementById('muestra-anyo').innerText = diff.anios;
        // if (unMes > mesActual) {//Si no llegamos al mes que estamos es que aún no se ha llegado al año entero
        //     unAnyo = unAnyo + 1;
        // }
    }

}
//Función para obtener los dias del mes que se consulta (1963, 8) retornará 31
function obtenerDiasMes(anyo, mes) {
    return new Date(anyo, mes, 0).getDate();
}
//función que retorna un objeto con los años, meses y dias que han pasado entre dos fechas
function getDateDiff(fechasInicio, fechasFinal) {

    // Crear objetos de fecha a partir de las fechas proporcionadas
    const start = new Date(fechasInicio);
    const end = new Date(fechasFinal);

    // Calcular la diferencia en milisegundos entre las dos fechas
    const diff = end - start;

    // Calcular el número de años completos en la diferencia
    const anios = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);

    // Calcular el número de meses completos en la diferencia
    // utilizando el residuo de los días no cubiertos por los años completos
    const meses = Math.floor((diff / 1000 / 60 / 60 / 24) % 365 / 30.44);

    // Calcular el número de días restantes en la diferencia
    // utilizando el residuo de los días no cubiertos por los años y los meses
    const dias = Math.floor((diff / 1000 / 60 / 60 / 24) % 365 % 30.44);

    // Retornar un objeto con los valores de años, meses y días
    return { anios: anios, meses: meses, dias: dias };
}
