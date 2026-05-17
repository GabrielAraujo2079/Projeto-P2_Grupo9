const params = new URLSearchParams(window.location.search);

const nome = params.get("nome");
const preco = params.get("preco");
const imagem = params.get("img");

document.getElementById("carName").textContent =
    nome || "Veículo";

document.getElementById("carPrice").textContent =
    preco || "0,00";

document.getElementById("carImage").src =
    imagem || "../assets/images/vehicles/honda-civic.jpg";

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