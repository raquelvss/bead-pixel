let produtoSelecionado = "";
let precoSelecionado = "";

function abrirFormulario(produto, preco) {
    const opcaoProduto = document.getElementById("opcao-produto");

alert("JavaScript funcionando!");

if (produto === "Snoop personalizado") {

    produtoSelecionado = produto;
    precoSelecionado = preco;

    document.getElementById("produto-escolhido").textContent =
        produto + " — " + preco;

    const opcaoProduto = document.getElementById("opcao-produto");

    if (produto === "Snoop personalizado") {

        opcaoProduto.innerHTML = `
            <label for="personalizacao">Como você quer personalizar?</label>
            <input type="text" id="personalizacao" placeholder="Ex: nome, desenho, cor...">
        `;

    } else if (produto === "Stitch (com tamanho personalizado)") {

        opcaoProduto.innerHTML = `
            <label for="tamanho">Qual tamanho você deseja?</label>
            <input type="text" id="tamanho" placeholder="Ex: pequeno, médio, grande">
        `;

    } else if (produto === "Laço (cores variadas)") {

        opcaoProduto.innerHTML = `
            <label for="cor">Qual cor você deseja?</label>
            <input type="text" id="cor" placeholder="Ex: rosa, azul, lilás...">
        `;
    }

    document.getElementById("formulario-pedido").classList.remove("formulario-escondido");

    document.getElementById("mensagem-pedido").textContent = "";
}
function enviarPedido() {

    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const observacao = document.getElementById("observacao").value;

    if (nome === "") {

        document.getElementById("mensagem-pedido").textContent =
            "Por favor, informe seu nome.";

        return;
    }

    document.getElementById("mensagem-pedido").textContent =
        "Pedido preenchido! Um responsável poderá receber os detalhes.";
}
function fecharFormulario() {

    document.getElementById("formulario-pedido").classList.add("formulario-escondido");
}