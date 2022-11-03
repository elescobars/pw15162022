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

async function traePersona() {
    const respuesta = await fetch("https://randomuser.me/api/");
    // console.log(respuesta);
    const datos = await respuesta.json();
    // console.log(datos);
    console.log(datos.results[0].name.first+" "+datos.results[0].name.last);
}