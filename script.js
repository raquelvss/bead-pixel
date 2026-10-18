let produtoSelecionado = "";
let precoSelecionado = "";

let carrinho = [];
let pedidoDoCarrinho = false;


/* =========================
   FORMULÁRIO INDIVIDUAL
========================= */

function abrirFormulario(produto, preco) {

    pedidoDoCarrinho = false;

    produtoSelecionado = produto;
    precoSelecionado = preco;

    document.getElementById("produto-escolhido").textContent =
        produto + " — " + preco;

    const opcaoProduto =
        document.getElementById("opcao-produto");

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

    else {

        opcaoProduto.innerHTML = "";
    }

    document
        .getElementById("formulario-pedido")
        .classList.remove("formulario-escondido");

    document.getElementById("mensagem-pedido").textContent = "";
}


/* =========================
   ENVIAR PEDIDO
========================= */

function enviarPedido() {

    const nome =
        document.getElementById("nome").value;

    const quantidade =
        document.getElementById("quantidade").value;

    const observacao =
        document.getElementById("observacao").value;


    if (nome.trim() === "") {

        document.getElementById("mensagem-pedido").textContent =
            "Por favor, informe seu nome.";

        return;
    }


    let linkFormulario =
        "https://docs.google.com/forms/d/e/1FAIpQLSd90NeH7SP3mMeNkeeeMtOnZznb3nP5pzzyIltUFsf8AUrROQ/viewform?usp=pp_url";


    /* =========================
       PEDIDO PELO CARRINHO
    ========================= */

    if (pedidoDoCarrinho === true) {

        let resumoCarrinho = "";

        carrinho.forEach(function(item) {

            resumoCarrinho +=
                item.produto +
                " - Quantidade: " +
                item.quantidade +
                " - R$ " +
                (item.preco * item.quantidade)
                    .toFixed(2)
                    .replace(".", ",") +
                " | ";
        });


        let observacaoCompleta =
            "PEDIDO PELO CARRINHO: " +
            resumoCarrinho;

        if (observacao.trim() !== "") {

            observacaoCompleta +=
                " Observações do cliente: " +
                observacao;
        }


        let dados =
            "&entry.683667895=" +
            encodeURIComponent(nome) +

            "&entry.1570339122=" +
            encodeURIComponent("Outro") +

            "&entry.2118814320=" +
            encodeURIComponent(quantidade) +

            "&entry.1420204518=" +
            encodeURIComponent(observacaoCompleta);


        window.open(
            linkFormulario + dados,
            "_blank"
        );

        return;
    }


    /* =========================
       PEDIDO INDIVIDUAL
    ========================= */

    let produtoFormulario = produtoSelecionado;

    /*
       Os nomes abaixo precisam corresponder
       às opções existentes no Google Forms.
    */

    if (produtoSelecionado === "Snoop personalizado") {
        produtoFormulario = "Snoop";
    }

    else if (produtoSelecionado === "Laço (cores variadas)") {
        produtoFormulario = "Laço (cores variádas)";
    }

    else if (produtoSelecionado === "Cinnamonroll personalizado") {
        produtoFormulario = "Cinnamonroll";
    }


    let dados =
        "&entry.683667895=" +
        encodeURIComponent(nome) +

        "&entry.1570339122=" +
        encodeURIComponent(produtoFormulario) +

        "&entry.2118814320=" +
        encodeURIComponent(quantidade) +

        "&entry.1420204518=" +
        encodeURIComponent(observacao);


    if (produtoSelecionado === "Snoop personalizado") {

        const personalizacao =
            document.getElementById("personalizacao").value;

        dados +=
            "&entry.1335285438=" +
            encodeURIComponent(personalizacao);
    }


    else if (
        produtoSelecionado ===
        "Stitch (com tamanho personalizável)"
    ) {

        const tamanho =
            document.getElementById("tamanho").value;

        dados +=
            "&entry.1806182445=" +
            encodeURIComponent(tamanho);
    }


    else if (
        produtoSelecionado ===
        "Laço (cores variadas)"
    ) {

        const cor =
            document.getElementById("cor").value;

        dados +=
            "&entry.302907372=" +
            encodeURIComponent(cor);
    }


    window.open(
        linkFormulario + dados,
        "_blank"
    );
}


/* =========================
   FECHAR FORMULÁRIO
========================= */

function fecharFormulario() {

    document
        .getElementById("formulario-pedido")
        .classList.add("formulario-escondido");

    pedidoDoCarrinho = false;
}


/* =========================
   ADICIONAR AO CARRINHO
========================= */

function adicionarAoCarrinho(produto, preco) {

    const itemExistente =
        carrinho.find(function(item) {

            return item.produto === produto;
        });


    if (itemExistente) {

        itemExistente.quantidade++;
    }

    else {

        carrinho.push({

            produto: produto,
            preco: preco,
            quantidade: 1

        });
    }


    atualizarCarrinho();
}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    const itensCarrinho =
        document.getElementById("itens-carrinho");

    const quantidadeCarrinho =
        document.getElementById("quantidade-carrinho");

    const totalCarrinho =
        document.getElementById("total-carrinho");


    itensCarrinho.innerHTML = "";


    let quantidadeTotal = 0;
    let valorTotal = 0;


    if (carrinho.length === 0) {

        itensCarrinho.innerHTML =
            "<p>Seu carrinho está vazio.</p>";
    }


    carrinho.forEach(function(item, indice) {

        quantidadeTotal +=
            item.quantidade;

        valorTotal +=
            item.preco * item.quantidade;


        const itemHTML =
            document.createElement("div");


        itemHTML.className =
            "item-carrinho";


        itemHTML.innerHTML =

            "<strong>" +
            item.produto +
            "</strong>" +

            "<br>" +

            "R$ " +
            item.preco
                .toFixed(2)
                .replace(".", ",") +

            " × " +
            item.quantidade +

            "<br>" +

            '<button onclick="diminuirQuantidade(' +
            indice +
            ')">−</button>' +

            '<button onclick="aumentarQuantidade(' +
            indice +
            ')">+</button>' +

            '<button onclick="removerDoCarrinho(' +
            indice +
            ')">Remover</button>';


        itensCarrinho.appendChild(
            itemHTML
        );
    });


    quantidadeCarrinho.textContent =
        quantidadeTotal;


    totalCarrinho.textContent =
        "R$ " +
        valorTotal
            .toFixed(2)
            .replace(".", ",");
}


/* =========================
   QUANTIDADE
========================= */

function aumentarQuantidade(indice) {

    carrinho[indice].quantidade++;

    atualizarCarrinho();
}


function diminuirQuantidade(indice) {

    carrinho[indice].quantidade--;


    if (
        carrinho[indice].quantidade <= 0
    ) {

        carrinho.splice(
            indice,
            1
        );
    }


    atualizarCarrinho();
}


/* =========================
   REMOVER PRODUTO
========================= */

function removerDoCarrinho(indice) {

    carrinho.splice(
        indice,
        1
    );

    atualizarCarrinho();
}


/* =========================
   ABRIR / FECHAR CARRINHO
========================= */

function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("carrinho-aberto");
}


function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("carrinho-aberto");
}


/* =========================
   STITCH
========================= */

function escolherTamanhoStitch() {

    const tamanho = prompt(

        "Qual tamanho do Stitch você deseja?\n\n" +

        "Digite:\n" +

        "1 - Pequeno (R$5,00)\n" +

        "2 - Médio (R$8,00)"
    );


    if (tamanho === "1") {

        adicionarAoCarrinho(
            "Stitch - Pequeno",
            5
        );
    }


    else if (tamanho === "2") {

        adicionarAoCarrinho(
            "Stitch - Médio",
            8
        );
    }


    else if (tamanho !== null) {

        alert(
            "Escolha 1 para Pequeno ou 2 para Médio."
        );
    }
}


/* =========================
   FINALIZAR CARRINHO
========================= */

function finalizarCarrinho() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;
    }


    pedidoDoCarrinho = true;


    let resumoPedido = "";
    let quantidadeTotal = 0;


    carrinho.forEach(function(item) {

        resumoPedido +=

            item.produto +

            " - Quantidade: " +

            item.quantidade +

            " | R$ " +

            (item.preco * item.quantidade)
                .toFixed(2)
                .replace(".", ",") +

            "\n";


        quantidadeTotal +=
            item.quantidade;
    });


    fecharCarrinho();


    document
        .getElementById("formulario-pedido")
        .classList.remove("formulario-escondido");


    document
        .getElementById("produto-escolhido")
        .textContent =

        "Pedido com " +
        quantidadeTotal +
        " item(ns)";


    document
        .getElementById("quantidade")
        .value =

        quantidadeTotal;


    document
        .getElementById("opcao-produto")
        .innerHTML =

        "<label>Produtos escolhidos:</label>" +

        "<textarea id='resumo-carrinho' readonly></textarea>";


    document
        .getElementById("resumo-carrinho")
        .value =

        resumoPedido;


    document
        .getElementById("mensagem-pedido")
        .textContent = "";
}