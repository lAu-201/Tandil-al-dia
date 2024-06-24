"use strict"
function generarCaptcha() {
    let btn = document.querySelector("#enviar");
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" //genera un valor un valor aleatorio
    document.querySelector(".ingresar").value = "";
    let codigo = "";
    let captcha = document.querySelector(".cajacaptcha");
    for (let i = 1; i <= 5; i++) { //agrega hasta 5 caracteres para el captcha
        codigo += randomchar[Math.floor(Math.random() * randomchar.length)]; // "suma" los caracteres para formar un string
    }
    captcha.innerHTML = codigo;
    let verificarCaptcha = document.querySelector("#verificar");

    verificarCaptcha.addEventListener('click', function verificar() { //function para verificar el captcha
        let advertencia = document.querySelector(".advertencia");
        let valor = document.querySelector(".ingresar").value;
        if (valor == codigo) {
            advertencia.innerHTML = "¡Captcha correcto!";
            advertencia.style.color = 'green';
            btn.disabled = false;
        } else {
            advertencia.innerHTML = "Captcha icorrecto. Intente de nuevo.";
            advertencia.style.color = 'red';
            btn.disabled = true;
        }
    });
}

function registrar(e) {
    let form = document.querySelector("#form");
    e.preventDefault();
    let formData = new FormData(form);
    let nombre = formData.get("nombre");
    let dni = formData.get("dni");
    let email = formData.get("email");
    let sexo = formData.get("sexo");

    console.log(nombre + " " + dni + " " + email + " " + sexo);
}

function cargarCaptcha() {
    generarCaptcha();
    document.querySelector("#form").addEventListener('submit', registrar); //formulario que imprime datos en la consola
    document.querySelector(".refresh").addEventListener('click', generarCaptcha);
}
