"use strict"
const url = new URL("https://6671f5f4e083e62ee43dafa6.mockapi.io/tpe/cambioAPeso");

async function obtenerDatos(u){
    const tabla = document.querySelector("#monedas");
    tabla.innerHTML = " ";
    try {
        let res = await fetch(u);
        if (res.ok){
            let json = await res.json();
            console.log(json);
            for (const e of json){
                let moneda = e.moneda;
                let cambio = e.cambio;
                let id = e.id;
                tabla.innerHTML += `<tr><td>${moneda}</td><td>${cambio}</td><td><button type="button" class="eliminar" data-id="${id}">Eliminar</button></td><td><button type="button" class="modificar" data-id="${id}">Modificar</button></td></tr>`;
            }
            document.querySelectorAll(".eliminar").forEach(item => {item.addEventListener("click", borrarDato);});
            document.querySelectorAll(".modificar").forEach(item => {item.addEventListener("click", modificarDato);});
            /// Agrego los botones en el obtenerDatos para que carguen al mismo tiempo
        }
    } catch (error) {
        console.log("Error");
    }
}

async function agregarDato(e){
    let form = document.querySelector("#formcambios");
    e.preventDefault();
    let formData = new FormData(form);
    let moneda = formData.get("Moneda");
    let cambio = formData.get("Cambio");

    let objeto = {
        "moneda": moneda,
        "cambio": cambio
    }

    try {
        let res = await fetch(url, {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(objeto)
        });
        if (res.status === 201){
            obtenerDatos(url);
        }
    } catch (error) {
        console.log("Error");
    }
}

async function borrarDato(event){
    let id = event.target.getAttribute("data-id");
    try {
        let res = await fetch(`${url}/${id}`, {
            'method': 'DELETE',
        });
        if (res.status === 200){
            obtenerDatos(url);
        }
    } catch (error) {
        console.log("Error");
    }
}

async function modificarDato(event){
    let moneda = document.querySelector("#moneda").value;
    let cambio = document.querySelector("#cambio").value;
    let id = event.target.getAttribute("data-id");
    let objeto = {
        "moneda": moneda,
        "cambio": cambio
    }

    try {
        let res = await fetch(`${url}/${id}`, {
            'method': 'PUT',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(objeto)
        });
        if (res.status === 200){
            obtenerDatos(url);
        }
    } catch (error) {
        console.log("Error");
    }
}

function buscarDato(){
    const params = new URL(url);
    const buscar = document.querySelector("#txtbuscar").value;
    if (buscar == " "){
        obtenerDatos(url);
    } else {
        params.searchParams.append('moneda', buscar);
        obtenerDatos(params);
    }
}

function cargarTabla(){
    obtenerDatos(url);
    document.querySelector("#formcambios").addEventListener("submit", agregarDato);
    const btnBuscar = document.querySelector("#buscar");
    btnBuscar.addEventListener("click", buscarDato);
}