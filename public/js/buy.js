const params = new URLSearchParams(window.location.search);

const nome = params.get("nome");
const preco = params.get("preco");
const imagem = params.get("img");

const specsPorVeiculo = {
    "Honda Civic": {
        motor: "2.0 Flex",
        cambio: "Automático CVT",
        ano: "2023",
        km: "18.000 km",
        potencia: "155cv",
        combustivel: "Flex"
    },
    "Fiat Pulse": {
        motor: "1.0 Turbo",
        cambio: "Automático",
        ano: "2027",
        km: "0 km",
        potencia: "130cv",
        combustivel: "Flex"
    },
    "Volkswagen Polo": {
        motor: "1.0 TSI",
        cambio: "Manual",
        ano: "2021",
        km: "42.000 km",
        potencia: "116cv",
        combustivel: "Gasolina"
    },
    "Chevrolet Onix": {
        motor: "1.0 Flex",
        cambio: "Manual",
        ano: "2022",
        km: "35.000 km",
        potencia: "80cv",
        combustivel: "Flex"
    },
    "Renault Kwid": {
        motor: "1.0 Flex",
        cambio: "Manual",
        ano: "2027",
        km: "0 km",
        potencia: "80cv",
        combustivel: "Flex"
    },
    "Hyundai HB20": {
        motor: "1.0 Turbo",
        cambio: "Manual",
        ano: "2020",
        km: "55.000 km",
        potencia: "120cv",
        combustivel: "Flex"
    },
    "Ford Bronco": {
        motor: "2.7 V6",
        cambio: "Automático",
        ano: "2027",
        km: "0 km",
        potencia: "330cv",
        combustivel: "Gasolina"
    },
    "Peugeot 208": {
        motor: "1.6 Flex",
        cambio: "Manual",
        ano: "2027",
        km: "0 km",
        potencia: "122cv",
        combustivel: "Flex"
    }
};

const specsAtuais = specsPorVeiculo[nome] || {
    motor: params.get("motor") || "2.0 Flex",
    cambio: params.get("cambio") || "Automático CVT",
    ano: params.get("ano") || "2023",
    km: params.get("km") || "18.000 km",
    potencia: params.get("potencia") || "155cv",
    combustivel: params.get("combustivel") || "Flex"
};

document.getElementById("carName").textContent =
    nome || "Veículo";

document.getElementById("carPrice").textContent =
    preco || "0,00";

document.getElementById("carImage").src =
    imagem || "../assets/images/vehicles/honda-civic.jpg";

document.getElementById("motorValue").textContent = specsAtuais.motor;
document.getElementById("cambioValue").textContent = specsAtuais.cambio;
document.getElementById("anoValue").textContent = specsAtuais.ano;
document.getElementById("kmValue").textContent = specsAtuais.km;
document.getElementById("potenciaValue").textContent = specsAtuais.potencia;
document.getElementById("combustivelValue").textContent = specsAtuais.combustivel;

/* ───────── Parcelamentos Dinâmicos ───────── */

function converterPreco(precoTexto) {

    return Number(
        precoTexto
            .replaceAll(".", "")
            .replace(",", ".")
    );

}

const precoNumero = converterPreco(preco || "0");

const valor12 =
    (precoNumero / 12).toFixed(2);

const valor24 =
    (precoNumero / 24 * 1.10).toFixed(2);

const valor48 =
    (precoNumero / 48 * 1.25).toFixed(2);

const pagamentos =
    document.querySelectorAll(".payment-option span");

pagamentos[0].textContent =
    `À vista — R$ ${(precoNumero * 0.95).toFixed(2)}`;

pagamentos[1].textContent =
    `12x de R$ ${valor12}`;

pagamentos[2].textContent =
    `24x de R$ ${valor24}`;

pagamentos[3].textContent =
    `48x de R$ ${valor48}`;

/* ───────── Compra ───────── */

function confirmarCompra() {

    const pagamentoSelecionado =
        document.querySelector("input[name='payment']:checked");

    const mensagem =
        document.getElementById("mensagemCompra");

    if (!pagamentoSelecionado) {

        mensagem.style.color = "#c0392b";

        mensagem.textContent =
            "Selecione uma forma de pagamento.";

        return;
    }

    mensagem.style.color = "#27ae60";

    mensagem.textContent =
        `Compra do ${nome} realizada com sucesso!`;

}