let produtoSelecionado = "";
let precoSelecionado = "";

function abrirFormulario(produto, preco) {
    produtoSelecionado = produto;
    precoSelecionado = preco;

    document.getElementById("produto-escolhido").textContent =
        produto + " — " + preco;

    const opcaoProduto = document.getElementById("opcao-produto");

    if (produto === "Snoop personalizado") {
        opcaoProduto.innerHTML =
            '<label for="personalizacao">Como você quer personalizar?</label>' +
            '<input type="text" id="personalizacao" placeholder="Ex: nome, desenho, cor...">';
    }

    else if (produto === "Stitch (com tamanho personalizável)") {
        opcaoProduto.innerHTML =
            '<label for="tamanho">Qual tamanho você deseja?</label>' +
            '<input type="text" id="tamanho" placeholder="Ex: pequeno, médio">';
    }

    else if (produto === "Laço (cores variadas)") {
        opcaoProduto.innerHTML =
            '<label for="cor">Qual cor você deseja?</label>' +
            '<input type="text" id="cor" placeholder="Ex: rosa, azul, lilás...">';
    }

    document.getElementById("formulario-pedido").classList.remove("formulario-escondido");

    document.getElementById("mensagem-pedido").textContent = "";
}


function enviarPedido() {
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const observacao = document.getElementById("observacao").value;

    if (nome.trim() === "") {
        document.getElementById("mensagem-pedido").textContent =
            "Por favor, informe seu nome.";
        return;
    }

    let linkFormulario =
        "https://docs.google.com/forms/d/e/1FAIpQLSd90NeH7SP3mMeNkeeeMtOnZznb3nP5pzzyIltUFsf8AUrROQ/viewform?usp=pp_url";

    let dados =
        "&entry.683667895=" + encodeURIComponent(nome) +
        "&entry.1570339122=" + encodeURIComponent(produtoSelecionado) +
        "&entry.2118814320=" + encodeURIComponent(quantidade) +
        "&entry.1420204518=" + encodeURIComponent(observacao);

    if (produtoSelecionado === "Snoop personalizado") {
        const personalizacao =
            document.getElementById("personalizacao").value;

        dados +=
            "&entry.1335285438=" + encodeURIComponent(personalizacao);
    }

    else if (produtoSelecionado === "Stitch (com tamanho personalizável)") {
        const tamanho =
            document.getElementById("tamanho").value;

        dados +=
            "&entry.1806182445=" + encodeURIComponent(tamanho);
    }

    else if (produtoSelecionado === "Laço (cores variadas)") {
        const cor =
            document.getElementById("cor").value;

        dados +=
            "&entry.302907372=" + encodeURIComponent(cor);
    }

    window.open(linkFormulario + dados, "_blank");
}


function fecharFormulario() {
    document.getElementById("formulario-pedido").classList.add("formulario-escondido");
}