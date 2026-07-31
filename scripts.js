// ==========================================
// CONFIGURAÇÕES DO CASAMENTO 
// ==========================================

const CONFIG = {

    casamento: "2027-01-24T15:30:00",

    pix: "samuelmoreira0608@gmail.com",

    whatsapp: "5585988338580"

};



// ==========================================
// LISTA EDITÁVEL DE PRESENTES barra-progresso
// ==========================================

// Para adicionar um presente, copie um objeto
// e altere os dados.
//
// Exemplo:
//
// {
//     id: "novo-item",
//     nome: "Nome do presente",
//     categoria: "Sala",
//     icone: "🎁",
//     descricao: "Descrição do presente.",
//     meta: 500,
//     arrecadado: 0,
//     concluido: false
// }


const presentes = [

    {
        id: "smart-tv",
        nome: "Smart TV",
        categoria: "Sala",
        icone: "📺",
        descricao: "Para deixar nossa sala ainda mais especial.",
        meta: 3000,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "sofa",
        nome: "Sofá",
        categoria: "Sala",
        icone: "🛋️",
        descricao:
        "Nosso cantinho para descansar e receber.",
        meta: 2500,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "rack",
        nome: "Rack para TV",
        categoria: "Sala",
        icone: "🪵",
        descricao:
        "Para completar a organização da sala.",
        meta: 900,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "geladeira",
        nome: "Geladeira",
        categoria: "Cozinha",
        icone: "❄️",
        descricao:
        "Um item essencial para nossa nova casa.",
        meta: 3500,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "fogao",
        nome: "Fogão",
        categoria: "Cozinha",
        icone: "🍳",
        descricao:
        "Para preparar muitas histórias e refeições.",
        meta: 2000,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "air-fryer",
        nome: "Air Fryer",
        categoria: "Cozinha",
        icone: "🍟",
        descricao:
        "Praticidade para o nosso dia a dia.",
        meta: 500,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "jogo-panelas",
        nome: "Jogo de Panelas",
        categoria: "Cozinha",
        icone: "🍲",
        descricao:
        "Para cozinhar com carinho em nosso lar.",
        meta: 800,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "microondas",
        nome: "Micro-ondas",
        categoria: "Cozinha",
        icone: "📦",
        descricao:
        "Mais praticidade para a nossa rotina.",
        meta: 700,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "cama",
        nome: "Cama ",
        categoria: "Quarto",
        icone: "🛏️",
        descricao:
        "Nosso espaço de descanso já foi presenteado.",
        meta: 2500,
        arrecadado: 2500,
        concluido: true
    },

    {
        id: "guarda-roupa",
        nome: "Guarda-Roupa",
        categoria: "Quarto",
        icone: "🚪",
        descricao:
        "Para organizar nosso novo quarto.",
        meta: 2200,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "jogo-cama",
        nome: "Jogo de Cama",
        categoria: "Quarto",
        icone: "🛌",
        descricao:
        "Conforto e aconchego para o nosso lar.",
        meta: 350,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "cesto-roupas",
        nome: "Cesto de Roupas",
        categoria: "Organização",
        icone: "🧺",
        descricao:
        "Para manter nossa rotina mais organizada.",
        meta: 250,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "potes",
        nome: "Jogo de Potes",
        categoria: "Organização",
        icone: "🫙",
        descricao:
        "Para organizar a cozinha com praticidade.",
        meta: 250,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "organizadores",
        nome: "Caixas Organizadoras",
        categoria: "Organização",
        icone: "🗃️",
        descricao:
        "Para deixar cada espaço em seu lugar.",
        meta: 400,
        arrecadado: 0,
        concluido: false
    },

    {
        id: "lua-de-mel",
        nome: "Lua de Mel",
        categoria: "Sonhos",
        icone: "✈️",
        descricao:
        "Contribua com qualquer valor para esse sonho.",
        arrecadado: 0,
        concluido: false
    },

    {
        id: "fundo-casa",
        nome: "Fundo Casa Nova",
        categoria: "Sonhos",
        icone: "🏡",
        descricao:
        "Ajude nos detalhes e necessidades do nosso lar.",
        arrecadado: 0,
        concluido: false
    }

];



// ==========================================
// ESTADO DA PÁGINA
// ==========================================

let categoriaAtual = "todos";

let presenteSelecionado = null;

let resumoContribuicoes = [];



// ==========================================
// FORMATAR MOEDA
// ==========================================

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(

        "pt-BR",

        {
            style: "currency",
            currency: "BRL"
        }

    );

}



// ==========================================
// ESCAPAR TEXTO
// ==========================================

function escaparHTML(texto) {

    const elemento =
    document.createElement("div");

    elemento.textContent =
    texto;

    return elemento.innerHTML;

}



// ==========================================
// GERAR PRESENTES
// ==========================================

function renderizarPresentes() {

    const container =
    document.getElementById(
        "listaPresentes"
    );


    if (!container) return;


    const busca =
    document.getElementById(
        "buscarPresente"
    );


    const termo =
    busca
    ?
    busca.value
    .trim()
    .toLowerCase()
    :
    "";


    const filtrados =
    presentes.filter(item => {

        const categoriaOk =

        categoriaAtual === "todos"

        ||

        item.categoria ===
        categoriaAtual;


        const buscaOk =

        item.nome
        .toLowerCase()
        .includes(termo)

        ||

        item.descricao
        .toLowerCase()
        .includes(termo);


        return (
            categoriaOk &&
            buscaOk
        );

    });


    if (
        filtrados.length === 0
    ) {

        container.innerHTML = `

        <div class="nenhum-presente">

            <h3>
                Nenhum presente encontrado
            </h3>

            <p>
                Tente pesquisar outro nome.
            </p>

        </div>

        `;

        return;

    }


    const categorias = [

        "Sala",

        "Cozinha",

        "Quarto",

        "Organização",

        "Sonhos"

    ];


    container.innerHTML =

    categorias.map(categoria => {


        const itensCategoria =

        filtrados.filter(item =>

            item.categoria ===
            categoria

        );


        if (
            itensCategoria.length === 0
        ) {

            return "";

        }


        return `

        <div class="categoria-presente">

            <h3>
                ${categoria}
            </h3>

        </div>


        <div class="gift-grid-novo">

            ${itensCategoria
            .map(criarCardPresente)
            .join("")}

        </div>

        `;


    }).join("");

}



// ==========================================
// CRIAR CARD
// ==========================================

function criarCardPresente(item) {

    const percentual =

    item.meta > 0

    ?

    Math.min(

        100,

        (
            item.arrecadado /
            item.meta
        ) * 100

    )

    :

    0;


    const classeConcluido =

    item.concluido

    ?

    "gift-concluido"

    :

    "";


    const status =

    item.concluido

    ?

    `

    <span class="status-concluido">

        CONCLUÍDO

    </span>

    `

    :

    "";


    const textoBotao =

    item.concluido

    ?

    "Ajudar mesmo assim"

    :

    "Contribuir";


    return `

    <article

    class="
    gift-card-novo
    ${classeConcluido}
    "

    >

        ${status}


        <div class="gift-icone">

            ${item.icone}

        </div>


        <h3>

            ${escaparHTML(
                item.nome
            )}

        </h3>


        <p>

            ${escaparHTML(
                item.descricao
            )}

        </p>


        <div class="gift-meta">


            <div class="gift-meta-topo">

                <span>

                    Meta:
                    ${formatarMoeda(
                        item.meta
                    )}

                </span>


                <strong>

                    ${Math.round(
                        percentual
                    )}%

                </strong>

            </div>


            <div class="barra-progresso">

                <span

                style="
                width:
                ${percentual}%
                "

                ></span>

            </div>


            <button

            type="button"

            onclick="
            abrirContribuicao(
            '${item.id}'
            )
            "

            >

                ${textoBotao}

            </button>


        </div>

    </article>

    `;

}



// ==========================================
// FILTROS
// ==========================================

function iniciarFiltros() {

    const filtros =

    document.querySelectorAll(
        ".filtro-btn"
    );


    filtros.forEach(botao => {

        botao.addEventListener(

            "click",

            () => {

                filtros.forEach(item => {

                    item.classList
                    .remove("ativo");

                });


                botao.classList
                .add("ativo");


                categoriaAtual =

                botao.dataset
                .categoria;


                renderizarPresentes();

            }

        );

    });

}



// ==========================================
// BUSCA
// ==========================================

function iniciarBusca() {

    const campo =

    document.getElementById(
        "buscarPresente"
    );


    if (!campo) return;


    campo.addEventListener(

        "input",

        renderizarPresentes

    );

}



// ==========================================
// ABRIR CONTRIBUIÇÃO
// ==========================================

function abrirContribuicao(id) {

    presenteSelecionado =

    presentes.find(item =>

        item.id === id

    );


    if (!presenteSelecionado) {

        return;

    }


    document.getElementById(
        "modalTitulo"
    ).textContent =

    presenteSelecionado.nome;


    document.getElementById(
        "modalDescricao"
    ).textContent =

    presenteSelecionado.descricao;


    document.getElementById(
        "modalMeta"
    ).textContent =

    formatarMoeda(
        presenteSelecionado.meta
    );


    document.getElementById(
        "valorContribuicao"
    ).value = "";


    const modal =

    document.getElementById(
        "modalContribuicao"
    );


    modal.classList
    .add("aberto");


    modal.setAttribute(

        "aria-hidden",

        "false"

    );


    document.body.style
    .overflow = "hidden";

}



// ==========================================
// FECHAR MODAL
// ==========================================

function fecharModal() {

    const modal =

    document.getElementById(
        "modalContribuicao"
    );


    if (!modal) return;


    modal.classList
    .remove("aberto");


    modal.setAttribute(

        "aria-hidden",

        "true"

    );


    document.body.style
    .overflow = "";



    presenteSelecionado = null;

}



// ==========================================
// VALOR RÁPIDO
// ==========================================

function definirValor(valor) {

    const campo =

    document.getElementById(
        "valorContribuicao"
    );


    if (!campo) return;


    campo.value =

    Number(valor)
    .toLocaleString(

        "pt-BR",

        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }

    );

}



// ==========================================
// CONVERTER VALOR
// ==========================================

function converterValor(valor) {

    let texto =

    String(valor)

    .trim()

    .replace(
        "R$",
        ""
    )

    .replace(
        /\s/g,
        ""
    );


    if (
        texto.includes(",")
        &&
        texto.includes(".")
    ) {

        texto =

        texto.replace(
            /\./g,
            ""
        );

    }


    texto =

    texto.replace(
        ",",
        "."
    );


    return Number(texto);

}



// ==========================================
// ADICIONAR AO RESUMO
// ==========================================

function adicionarContribuicao() {

    if (!presenteSelecionado) {

        return;

    }


    const campo =

    document.getElementById(
        "valorContribuicao"
    );


    const valor =

    converterValor(
        campo.value
    );


    if (

        !Number.isFinite(valor)

        ||

        valor <= 0

    ) {

        alert(

        "Digite um valor válido."

        );

        campo.focus();

        return;

    }


    resumoContribuicoes.push({

        id:

        Date.now()
        +
        Math.random(),


        presenteId:

        presenteSelecionado.id,


        presente:

        presenteSelecionado.nome,


        valor:

        valor

    });


    atualizarResumoFixo();


    fecharModal();


    abrirResumo();

}



// ==========================================
// RESUMO FIXO
// ==========================================

function atualizarResumoFixo() {

    const elemento =

    document.getElementById(
        "resumoQuantidade"
    );


    if (!elemento) return;


    const quantidade =

    resumoContribuicoes.length;


    if (
        quantidade === 0
    ) {

        elemento.textContent =

        "Nenhum presente selecionado";

        return;

    }


    const total =

    resumoContribuicoes.reduce(

        (soma, item) =>

        soma + item.valor,

        0

    );


    elemento.textContent =

    `${quantidade}
    ${quantidade === 1
    ?
    "contribuição"
    :
    "contribuições"}
    ·
    ${formatarMoeda(total)}`;

}



// ==========================================
// ABRIR RESUMO
// ==========================================

function abrirResumo() {

    const modal =

    document.getElementById(
        "modalResumo"
    );


    if (
        resumoContribuicoes.length === 0
    ) {

        alert(

        "Escolha pelo menos um presente."

        );

        return;

    }


    renderizarResumo();


    modal.classList
    .add("aberto");


    modal.setAttribute(

        "aria-hidden",

        "false"

    );


    document.body.style
    .overflow = "hidden";

}



// ==========================================
// FECHAR RESUMO
// ==========================================

function fecharResumo() {

    const modal =

    document.getElementById(
        "modalResumo"
    );


    if (!modal) return;


    modal.classList
    .remove("aberto");


    modal.setAttribute(

        "aria-hidden",

        "true"

    );


    document.body.style
    .overflow = "";

}



// ==========================================
// RENDERIZAR RESUMO
// ==========================================

function renderizarResumo() {

    const container =

    document.getElementById(
        "itensResumo"
    );


    const totalElemento =

    document.getElementById(
        "totalResumo"
    );


    if (
        !container ||
        !totalElemento
    ) {

        return;

    }


    container.innerHTML =

    resumoContribuicoes.map(

        item => `

        <div class="item-resumo">

            <div>

                <strong>

                    ${escaparHTML(
                        item.presente
                    )}

                </strong>


                <small>

                    ${formatarMoeda(
                        item.valor
                    )}

                </small>

            </div>


            <button

            class="remover-item"

            type="button"

            onclick="
            removerDoResumo(
            '${item.id}'
            )
            "

            >

                Remover

            </button>

        </div>

        `

    ).join("");


    const total =

    resumoContribuicoes.reduce(

        (soma, item) =>

        soma + item.valor,

        0

    );


    totalElemento.textContent =

    formatarMoeda(total);

}



// ==========================================
// REMOVER DO RESUMO
// ==========================================

function removerDoResumo(id) {

    resumoContribuicoes =

    resumoContribuicoes.filter(

        item =>

        String(item.id) !==
        String(id)

    );


    atualizarResumoFixo();


    if (
        resumoContribuicoes.length === 0
    ) {

        fecharResumo();

        return;

    }


    renderizarResumo();

}



// ==========================================
// FINALIZAR
// ==========================================

function finalizarContribuicao() {

    if (
        resumoContribuicoes.length === 0
    ) {

        return;

    }


    const nome =

    localStorage.getItem(
        "nomeConvidado"
    )

    ||

    "Convidado";


    const telefone =

    localStorage.getItem(
        "telefoneConvidado"
    )

    ||

    "";


    const total =

    resumoContribuicoes.reduce(

        (soma, item) =>

        soma + item.valor,

        0

    );


    const lista =

    resumoContribuicoes.map(

        item =>

        `• ${item.presente}: ${formatarMoeda(
            item.valor
        )}`

    ).join("\n");


    const mensagem =

`Olá, Samuel e Anna Vitória! ❤️

Gostaria de confirmar minha contribuição para o Chá de Casa Nova.

Nome:
${nome}

Telefone:
${telefone}

Contribuições:
${lista}

Total:
${formatarMoeda(total)}

Realizarei o pagamento pelo PIX.

Com carinho! 🤍`;


    salvarContribuicoes();


    const url =

    `https://wa.me/${CONFIG.whatsapp}?text=`

    +

    encodeURIComponent(
        mensagem
    );


    window.open(

        url,

        "_blank"

    );



    resumoContribuicoes = [];


    atualizarResumoFixo();


    fecharResumo();

}



// ==========================================
// SALVAR CONTRIBUIÇÕES
// ==========================================

function salvarContribuicoes() {

    const nome =

    localStorage.getItem(
        "nomeConvidado"
    )

    ||

    "Não informado";


    const telefone =

    localStorage.getItem(
        "telefoneConvidado"
    )

    ||

    "";


    const contribuicoes =

    JSON.parse(

        localStorage.getItem(
            "contribuicoes"
        )

    )

    ||

    [];


    resumoContribuicoes.forEach(

        item => {

            contribuicoes.push({

                nome:

                nome,


                telefone:

                telefone,


                presente:

                item.presente,


                valor:

                item.valor,


                data:

                new Date()
                .toLocaleString(
                    "pt-BR"
                )

            });

        }

    );


    localStorage.setItem(

        "contribuicoes",

        JSON.stringify(
            contribuicoes
        )

    );

}



// ==========================================
// COPIAR PIX
// ==========================================

async function copiarPix() {

    try {

        await navigator
        .clipboard
        .writeText(

            CONFIG.pix

        );


        alert(

        "Chave PIX copiada ❤️"

        );


    } catch (erro) {

        const campo =

        document.createElement(
            "textarea"
        );


        campo.value =

        CONFIG.pix;


        document.body
        .appendChild(
            campo
        );


        campo.select();


        document.execCommand(
            "copy"
        );


        campo.remove();


        alert(

        "Chave PIX copiada ❤️"

        );

    }

}



// ==========================================
// CONTAGEM REGRESSIVA
// ==========================================

function iniciarContagem() {

    const contador =

    document.getElementById(
        "countdown"
    );


    if (!contador) return;


    const casamento =

    new Date(
        CONFIG.casamento
    );


    function atualizar() {

        const agora =

        new Date();


        const distancia =

        casamento - agora;


        if (
            distancia <= 0
        ) {

            contador.innerHTML =

            "Chegou o grande dia ❤️";

            return;

        }


        const dias =

        Math.floor(

            distancia /

            (
                1000 *
                60 *
                60 *
                24
            )

        );


        const horas =

        Math.floor(

            (

                distancia %

                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            )

            /

            (
                1000 *
                60 *
                60
            )

        );


        const minutos =

        Math.floor(

            (

                distancia %

                (
                    1000 *
                    60 *
                    60
                )

            )

            /

            (
                1000 *
                60
            )

        );


        const segundos =

        Math.floor(

            (

                distancia %

                (
                    1000 *
                    60
                )

            )

            /

            1000

        );


        contador.innerHTML =

        `${dias} dias<br>

        ${String(horas)
        .padStart(2, "0")}h :

        ${String(minutos)
        .padStart(2, "0")}m :

        ${String(segundos)
        .padStart(2, "0")}s`;

    }


    atualizar();


    setInterval(

        atualizar,

        1000

    );

}



// ==========================================
// CONFIRMAR PRESENÇA
// ==========================================

function confirmarPresenca() {

    const nomeCampo =

    document.getElementById(
        "nome"
    );


    const telefoneCampo =

    document.getElementById(
        "telefone"
    );


    const confirmacao =

    document.getElementById(
        "confirmacao"
    );


    if (

        !nomeCampo ||

        !telefoneCampo ||

        !confirmacao

    ) {

        return;

    }


    const nome =

    nomeCampo.value
    .trim();


    const telefone =

    telefoneCampo.value
    .trim();


    if (!nome) {

        alert(

        "Digite seu nome."

        );

        nomeCampo.focus();

        return;

    }


    if (!telefone) {

        alert(

        "Digite seu telefone."

        );

        telefoneCampo.focus();

        return;

    }


    if (
        !confirmacao.checked
    ) {

        alert(

        "Marque a confirmação de presença."

        );

        return;

    }


    const convidados =

    JSON.parse(

        localStorage.getItem(
            "convidados"
        )

    )

    ||

    [];


    const existe =

    convidados.some(

        convidado =>

        convidado.telefone ===
        telefone

    );


    if (!existe) {

        convidados.push({

            nome:

            nome,


            telefone:

            telefone,


            data:

            new Date()
            .toLocaleString(
                "pt-BR"
            )

        });


        localStorage.setItem(

            "convidados",

            JSON.stringify(
                convidados
            )

        );

    }


    localStorage.setItem(

        "nomeConvidado",

        nome

    );


    localStorage.setItem(

        "telefoneConvidado",

        telefone

    );


    localStorage.setItem(

        "confirmado",

        "sim"

    );


    alert(

    "Presença confirmada com sucesso ❤️"

    );


    window.location.href =

    "casa.html";

}



// ==========================================
// ABRIR CHÁ
// ==========================================

function abrirCasaNova() {

    const confirmado =

    localStorage.getItem(
        "confirmado"
    );


    if (
        confirmado !== "sim"
    ) {

        alert(

        "Confirme sua presença primeiro."

        );

        return;

    }


    window.location.href =

    "casa.html";

}



// ==========================================
// PROTEGER CASA.HTML
// ==========================================

function protegerCasaNova() {

    const pagina =

    window.location.pathname
    .toLowerCase();


    if (
        !pagina.includes(
            "casa.html"
        )
    ) {

        return;

    }


    const confirmado =

    localStorage.getItem(
        "confirmado"
    );


    if (
        confirmado !== "sim"
    ) {

        window.location.href =

        "index.html";

    }

}



// ==========================================
// MODAIS
// ==========================================

function iniciarModais() {

    const modais =

    document.querySelectorAll(
        ".modal"
    );


    modais.forEach(

        modal => {

            modal.addEventListener(

                "click",

                evento => {

                    if (

                        evento.target ===
                        modal

                    ) {

                        if (

                            modal.id ===
                            "modalResumo"

                        ) {

                            fecharResumo();

                        } else {

                            fecharModal();

                        }

                    }

                }

            );

        }

    );


    document.addEventListener(

        "keydown",

        evento => {

            if (

                evento.key ===
                "Escape"

            ) {

                fecharModal();

                fecharResumo();

            }

        }

    );

}



// ==========================================
// LIVRO
// ==========================================

function iniciarLivro() {

    const pages =

    document.querySelectorAll(
        ".page"
    );


    if (
        pages.length === 0
    ) {

        return;

    }


    let currentPage = 0;


    function showPage(index) {

        pages.forEach(

            page => {

                page.classList
                .remove("active");

            }

        );


        pages[index]
        .classList
        .add("active");

    }


    document.addEventListener(

        "click",

        evento => {

            if (

                evento.target
                .classList
                .contains(
                    "next-btn"
                )

            ) {

                if (

                    currentPage <
                    pages.length - 1

                ) {

                    currentPage++;

                    showPage(
                        currentPage
                    );

                }

            }


            if (

                evento.target
                .classList
                .contains(
                    "prev-btn"
                )

            ) {

                if (

                    currentPage > 0

                ) {

                    currentPage--;

                    showPage(
                        currentPage
                    );

                }

            }

        }

    );


    showPage(
        currentPage
    );

}



// ==========================================
// INICIAR SITE
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        protegerCasaNova();

        iniciarLivro();

        iniciarContagem();

        iniciarFiltros();

        iniciarBusca();

        iniciarModais();

        renderizarPresentes();

        atualizarResumoFixo();

    }

);