/*
alert("Alerta en archivo externo .js");
*/

function funcionAlerta() {
    alert("tuve fe, pero con una funcion");
}

function quitarSITEC() {
    let pregunta = confirm("Seguro de eliminar SITEC?");
    if(pregunta == true) {
        alert("SITEC borrado :(");
        let chi = document.getElementById("sitec");
        chi.innerHTML = "<br>Chiale";
    }
}