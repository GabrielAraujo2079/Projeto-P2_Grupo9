const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

function filtrar() {

    const texto = searchInput.value.toLowerCase();

    const cambiosMarcados = [...document.querySelectorAll("input[value='manual'], input[value='automatico']")]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const estadosMarcados = [...document.querySelectorAll("input[value='novo'], input[value='usado']")]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const marcasSelecionadas = [...document.querySelectorAll(".marca-item.ativa")]
        .map(el => el.dataset.marca);

    cards.forEach(card => {

        const nome = card.dataset.name.toLowerCase();
        const cambio = card.dataset.cambio;
        const estado = card.dataset.estado;
        const marca = card.dataset.marca;

        const passouNome = nome.includes(texto);
        const passouCambio = cambiosMarcados.length === 0 || cambiosMarcados.includes(cambio);
        const passouEstado = estadosMarcados.length === 0 || estadosMarcados.includes(estado);
        const passouMarca = marcasSelecionadas.length === 0 || marcasSelecionadas.includes(marca);

        if (passouNome && passouCambio && passouEstado && passouMarca) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

searchInput.addEventListener("input", filtrar);

document.querySelectorAll(".sidebar input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", filtrar);
});

document.querySelectorAll(".marca-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("ativa");
        filtrar();
    });
});