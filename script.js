let produtoSelecionado = "";
let precoSelecionado = "";

function abrirFormulario(produto, preco) {

```
produtoSelecionado = produto;
precoSelecionado = preco;

document.getElementById("produto-escolhido").textContent =
    produto + " — " + preco;

const opcaoProduto = document.getElementById("opcao-produto");

if (produto === "Snoop personalizado") {

    opcaoProduto.innerHTML = `
        <label for="personalizacao">Como você quer personalizar?</label>

        <input
            type="text"
            id="personalizacao"
            placeholder="Ex: nome, desenho, cor..."
        >
    `;

} else if (produto === "Stitch (com tamanho personalizável)") {

    opcaoProduto.innerHTML = `
        <label for="tamanho">Qual tamanho você deseja?</label>

        <input
            type="text"
            id="tamanho"
            placeholder="Ex: pequeno, médio"
        >
    `;

} else if (produto === "Laço (cores variadas)") {

    opcaoProduto.innerHTML = `
        <label for="cor">Qual cor você deseja?</label>

        <input
            type="text"
            id="cor"
            placeholder="Ex: rosa, azul, lilás..."
        >
    `;
}

document
    .getElementById("formulario-pedido")
    .classList
    .remove("formulario-escondido");

document.getElementById("mensagem-pedido").textContent = "";
```

}

function enviarPedido() {

```
const nome =
    document.getElementById("nome").value.trim();

const quantidade =
    document.getElementById("quantidade").value;

const observacao =
    document.getElementById("observacao").value.trim();


if (nome === "") {

    document.getElementById("mensagem-pedido").textContent =
        "Por favor, informe seu nome.";

    return;
}


const linkFormulario =
    "https://docs.google.com/forms/d/e/1FAIpQLSd90NeH7SP3mMeNkeeeMtOnZznb3nP5pzzyIltUFsf8AUrROQ/viewform?usp=pp_url";


const dados = new URLSearchParams();


// Nome
dados.append(
    "entry.683667895",
    nome
);


// Produto
dados.append(
    "entry.1570339122",
    produtoSelecionado
);


// Quantidade
dados.append(
    "entry.2118814320",
    quantidade
);


// Observações
dados.append(
    "entry.1420204518",
    observacao
);


// Personalização do Snoop
if (produtoSelecionado === "Snoop personalizado") {

    const personalizacao =
        document.getElementById("personalizacao")?.value.trim() || "";

    dados.append(
        "entry.1335285438",
        personalizacao
    );
}


// Tamanho do Stitch
else if (
    produtoSelecionado ===
    "Stitch (com tamanho personalizável)"
) {

    const tamanho =
        document.getElementById("tamanho")?.value.trim() || "";

    dados.append(
        "entry.1806182445",
        tamanho
    );
}


// Cor do Laço
else if (
    produtoSelecionado ===
    "Laço (cores variadas)"
) {

    const cor =
        document.getElementById("cor")?.value.trim() || "";

    dados.append(
        "entry.302907372",
        cor
    );
}


// Abre o Google Forms já preenchido
window.open(
    linkFormulario + "&" + dados.toString(),
    "_blank"
);
```

}

function fecharFormulario() {

```
document
    .getElementById("formulario-pedido")
    .classList
    .add("formulario-escondido");
```

}
