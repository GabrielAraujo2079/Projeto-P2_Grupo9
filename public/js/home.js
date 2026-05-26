// ─── Filtro de veículos ───────────────────────────────────────────────────────

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
        const nome    = card.dataset.name.toLowerCase();
        const cambio  = card.dataset.cambio;
        const estado  = card.dataset.estado;
        const marca   = card.dataset.marca;

        const passouNome   = nome.includes(texto);
        const passouCambio = cambiosMarcados.length === 0  || cambiosMarcados.includes(cambio);
        const passouEstado = estadosMarcados.length === 0  || estadosMarcados.includes(estado);
        const passouMarca  = marcasSelecionadas.length === 0 || marcasSelecionadas.includes(marca);

        card.style.display = (passouNome && passouCambio && passouEstado && passouMarca)
            ? "block"
            : "none";
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

// ─── Sessão do usuário ────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    const logado = localStorage.getItem("logado") === "true";
    const nome   = localStorage.getItem("usuarioLogin");

    if (logado && nome) {
        document.getElementById("nomeUsuarioHeader").textContent = "Olá, " + nome + "!";
        document.getElementById("linkPerfil").href = "#";
        document.getElementById("btnSair").style.display = "block";
    }
});

function sair() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioLogin");
    localStorage.removeItem("usuarioPerfil");
    window.location.href = "pages/login.html";
}