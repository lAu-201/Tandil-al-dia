"use strict"

async function cargarNoticias(){
    const politica = document.querySelector("#noticiaspoliticas");
    const deporte = document.querySelector("#deportes");
    politica.addEventListener("click", () => push(politica.id));
    deporte.addEventListener("click", () => push(deporte.id));
}

async function cargarContenido(id) {
    const container = document.querySelector("#carga")
    container.innerHTML = "Cargando " + id + "...";

    try {
        let response = await fetch(id + '.html');
        if (response.ok) {
            let t = await response.text();
            container.innerHTML = t;
            if (id === "home") {
                cargarCaptcha();
                await cargarNoticias();
            }       
            if (id === "economia"){
                cargarTabla();
            }
        } else {
            container.innerHTML = "Página no encontrada";
        }
    } catch (error) {
        container.innerHTML = "Error de conexión";
    }
}

function push(id) {
    cargarContenido(id);
    window.history.pushState({id}, id, "/" + id);
}

let partialrender = document.querySelectorAll(".partialrender");
partialrender.forEach((item) => item.addEventListener("click", (event) => push(event.target.id)));

window.addEventListener("popstate", (event) => {
    let stateId = event.state.id;
    cargarContenido(stateId);
})

cargarContenido("home");
window.history.pushState("home", "home", "/home");