const modoclaroBtn = document.querySelector(".modoclaro");
const modooscuroBtn = document.querySelector(".modooscuro");

modoclaroBtn.addEventListener("click", setModoOscuro);
modooscuroBtn.addEventListener("click", setModoClaro);

function setModoOscuro() {
    cambiarTema("dark");
}

function setModoClaro() {
    cambiarTema("light");
}

function cambiarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
}