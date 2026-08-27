// ==========================================
// FIREBASE
// ==========================================

import {

    db,

    collection,
    addDoc,
    setDoc,
    serverTimestamp,
    doc,
    runTransaction,
    onSnapshot

} from "./firebase.js";


// ==========================================
// CONFIGURAÇÕES
// ==========================================

const CONFIG = {

    casamento:
        "2027-01-24T15:30:00",

    whatsapp:
        "5585988338580",

    localizacao:
        ""

};


// ==========================================
// PRESENTES
// ==========================================

const presentes = [

    {
        id: "smart-tv",
        nome: "Smart TV",
        categoria: "Sala",
        icone: "📺",
        descricao:
            "Para deixar nossa sala ainda mais especial.",


          linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2CJB5Th"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0gF1qrvw"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "sofa",
        nome: "Sofá",
        categoria: "Sala",
        icone: "🛋️",
        descricao:
            "Nosso cantinho para descansar e receber.",

          linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1FbjJ4Q"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0eicUUoo"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    
    },

    {
        id: "rack",
        nome: "Rack para TV",
        categoria: "Sala",
        icone: "🪵",
        descricao:
            "Para completar a organização da sala.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1Bbe2V8"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B02Do0Jfw"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "geladeira",
        nome: "Geladeira",
        categoria: "Cozinha",
        icone: "❄️",
        descricao:
            "Um item essencial para nossa nova casa.",


          linksCompra: [
            {
                loja: "Mercado Livre",
                url: ""
            },

            {
                loja: "Amazon",
                url: ""
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "fogao",
        nome: "Fogão",
        categoria: "Cozinha",
        icone: "🍳",
        descricao:
            "Para preparar muitas histórias e refeições.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2hH3fYK"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0haNel7L"
            },

            {
                loja: "Magazine Luiza",
                url: "https://www.magazineluiza.com.br/fogao-5-bocas-esmaltec-preto-mesa-de-vidro-esmaltec-ideal-top-glass/p/240437900/ed/fg5b/?seller_id=magazineluiza"
            }
        ]
    },

    {
        id: "air-fryer",
        nome: "Air Fryer",
        categoria: "Cozinha",
        icone: "🍟",
        descricao:
            "Praticidade para o nosso dia a dia.",

            
        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2AuR75X"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B05mGayig"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "jogo-panelas",
        nome: "Jogo de Panelas",
        categoria: "Cozinha",
        icone: "🍲",
        descricao:
            "Para cozinhar com carinho em nosso lar.",

                    linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1V4877v"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B031NuqXT"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "mesa-e-cadeiras",
        nome: "Mesa e Cadeiras",
        categoria: "Cozinha",
        icone: "🪑",
        descricao:
            "Mais praticidade para nossa rotina.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2pCw76r"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B08HJ11kY"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "microondas",
        nome: "Micro-ondas",
        categoria: "Cozinha",
        icone: "📦",
        descricao:
            "Mais praticidade para nossa rotina.",

          linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2WjKcTs"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0h0JsWJO"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "liquidificador",
        nome: "Liquidificador",
        categoria: "Cozinha",
        icone: "🥤",
        descricao:
            "Mais praticidade para nossa rotina.",

            linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2sNoAuw"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0bByIaEV"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "filtro-de-agua",
        nome: "Gelagua",
        categoria: "Cozinha",
        icone: "💧",
        descricao:
            "Mais praticidade para nossa rotina.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2hFZyPS"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0fLKpl0p"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "pratos",
        nome: "Pratos",
        categoria: "Cozinha",
        icone: "🍽️",
        descricao:
            "Mais praticidade para nossa rotina.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1gyK2yf"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0gbINOKU"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
            id: "talheres",
        nome: "talheres",
        categoria: "Cozinha",
        icone: "🍽️",
        descricao:
            "Mais praticidade para nossa rotina.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2FqvvQi"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B07xsbFvr"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "batedeira",
        nome: "Batedeira",
        categoria: "Cozinha",
        icone: "🥣",
        descricao:
            "Mais praticidade para nossa rotina.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1qcUjhk"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0fqt4sjq"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "cama",
        nome: "Cama",
        categoria: "Quarto",
        icone: "🛏️",
        descricao:
            "Nosso espaço de descanso.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1CURLN1"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B05FhTkJB"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },

    {
        id: "guarda-roupa",
        nome: "Guarda-Roupa",
        categoria: "Quarto",
        icone: "🚪",
        descricao:
            "Para organizar nosso novo quarto.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2LC1wbU"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B0b2GuME1"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "potes",
        nome: "Jogo de Potes",
        categoria: "Organização",
        icone: "🫙",
        descricao:
            "Para organizar a cozinha com praticidade.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2P7tKpi"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B05GXMsbB"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "maquina-de-lavar",
        nome: "Máquina de Lavar",
        categoria: "Organização",
        icone: "🧺",
        descricao:
            "Para deixar nossas roupas sempre bem cuidadas.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/2MPEfdy"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B06wLEZMl"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "tabua-e-ferro",
        nome: "Tábua e Ferro de Passar",
        categoria: "Organização",
        icone: "👕",
        descricao:
            "Para facilitar nossa rotina.",

        linksCompra: [
            {
                loja: "Mercado Livre",
                url: "https://meli.la/1VSYKT3"
            },

            {
                loja: "Amazon",
                url: "https://link.amazon/B01SeecwE"
            },

            {
                loja: "Magazine Luiza",
                url: ""
            }
        ]
    },


    {
        id: "lua-de-mel",
        nome: "Lua de Mel",
        categoria: "Sonhos",
        icone: "✈️",
        descricao:
            "Contribua com qualquer valor para esse sonho.",

        tipo:
            "contribuicao"
    }

];


// ==========================================
// ESTADO
// ==========================================

let categoriaAtual = "todos";

let presenteSelecionado = null;

let presenteCompraSelecionado = null;

let resumoContribuicoes = [];

let reservasAtuais = new Map();


// ==========================================
// AUXILIARES
// ==========================================

function obterElemento(id) {

    return document.getElementById(id);

}


function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent =
        String(texto ?? "");

    return elemento.innerHTML;

}


function escaparAtributo(valor) {

    return String(valor || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


function formatarMoeda(valor) {

    return Number(valor || 0)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


function ehContribuicao(item) {

    return item?.tipo === "contribuicao";

}


// ==========================================
// INICIALIZAR CONVITE
// ==========================================

function iniciarConvite() {

    const paginas =
        Array.from(
            document.querySelectorAll(".page")
        );

    if (!paginas.length) {
        return;
    }


    let paginaAtual = 0;


    function mostrarPagina(indice) {

        if (
            indice < 0 ||
            indice >= paginas.length
        ) {
            return;
        }


        paginaAtual = indice;


        paginas.forEach(
            (pagina, i) => {

                pagina.classList.toggle(
                    "active",
                    i === paginaAtual
                );

            }
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        atualizarConfirmacaoVisual();

    }


    document
        .querySelectorAll(".next-btn")
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        mostrarPagina(
                            paginaAtual + 1
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(".prev-btn")
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        mostrarPagina(
                            paginaAtual - 1
                        );

                    }
                );

            }
        );


    const btnCasaNova =
        obterElemento("btnCasaNova");


    if (btnCasaNova) {

        btnCasaNova.addEventListener(
            "click",
            () => {

                window.location.href =
                    "casa.html";

            }
        );

    }


    const btnLocalizacao =
        obterElemento("btnLocalizacao");


    if (btnLocalizacao) {

        btnLocalizacao.addEventListener(
            "click",
            () => {

                if (CONFIG.localizacao) {

                    window.open(
                        CONFIG.localizacao,
                        "_blank"
                    );

                } else {

                    alert(
                        "Ainda falta colocar o link da localização no CONFIG do scripts.js."
                    );

                }

            }
        );

    }


    mostrarPagina(0);

}


// ==========================================
// CONFIRMAÇÃO VISUAL
// ==========================================

function atualizarConfirmacaoVisual() {

    const paginaConfirmacao =
        obterElemento("paginaConfirmacao");

    const paginaConfirmada =
        obterElemento("paginaConfirmada");


    if (
        !paginaConfirmacao ||
        !paginaConfirmada
    ) {
        return;
    }


    const confirmado =
        localStorage.getItem(
            "confirmado"
        ) === "sim";


    paginaConfirmacao.style.display =
        confirmado
            ? "none"
            : "block";


    paginaConfirmada.style.display =
        confirmado
            ? "block"
            : "none";

}


// ==========================================
// CONFIRMAR PRESENÇA
// ==========================================

async function confirmarPresenca(evento) {

    if (evento) {
        evento.preventDefault();
    }


    const nomeCampo =
        obterElemento("nome");

    const telefoneCampo =
        obterElemento("telefone");

    const confirmacao =
        obterElemento("confirmacao");


    if (
        !nomeCampo ||
        !telefoneCampo ||
        !confirmacao
    ) {
        return;
    }


    const nome =
        nomeCampo.value.trim();

    const telefone =
        telefoneCampo.value.trim();


    if (!nome) {

        alert(
            "Digite seu nome completo."
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


    if (!confirmacao.checked) {

        alert(
            "Marque a confirmação de presença."
        );

        return;

    }


    const telefoneId =
        telefone.replace(/\D/g, "");


    if (!telefoneId) {

        alert(
            "Digite um telefone válido."
        );

        return;

    }


    const botao =
        obterElemento("btnConfirmar");


    if (botao) {

        botao.disabled = true;

        botao.textContent =
            "Confirmando...";

    }


    try {

        await setDoc(

            doc(
                db,
                "convidados",
                telefoneId
            ),

            {

                nome,
                telefone,

                confirmado:
                    true,

                criadoEm:
                    serverTimestamp()

            }

        );


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


        atualizarConfirmacaoVisual();


    } catch (erro) {

        console.error(
            "Erro ao confirmar:",
            erro
        );


        alert(
            "Não foi possível confirmar agora. Verifique sua conexão e tente novamente."
        );

    } finally {

        if (botao) {

            botao.disabled = false;

            botao.textContent =
                "Confirmar presença";

        }

    }

}


// ==========================================
// PROTEGER CASA.HTML
// ==========================================

function protegerCasaNova() {

    const pagina =
        window.location.pathname
            .toLowerCase();


    if (
        !pagina.endsWith("casa.html")
    ) {
        return;
    }


    if (
        localStorage.getItem(
            "confirmado"
        ) !== "sim"
    ) {

        window.location.href =
            "index.html";

    }

}


// ==========================================
// MONITORAR RESERVAS
// ==========================================

function iniciarMonitoramentoReservas() {

    const referencia =
        collection(
            db,
            "presentes_status"
        );


    onSnapshot(

        referencia,

        snapshot => {

            reservasAtuais.clear();


            snapshot.forEach(
                documento => {

                    const dados =
                        documento.data();


                    if (
                        dados.reservado === true
                    ) {

                        reservasAtuais.set(
                            documento.id,
                            dados
                        );

                    }

                }
            );


            renderizarPresentes();

        },

        erro => {

            console.error(
                "Erro ao carregar reservas:",
                erro
            );

        }

    );

}


// ==========================================
// RENDERIZAR PRESENTES
// ==========================================

function renderizarPresentes() {

    const container =
        obterElemento("listaPresentes");


    if (!container) {
        return;
    }


    const campoBusca =
        obterElemento("buscarPresente");


    const termo =
        campoBusca
            ? campoBusca.value
                .trim()
                .toLowerCase()
            : "";


    const filtrados =
        presentes.filter(
            item => {

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

            }
        );


    if (!filtrados.length) {

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

        categorias
            .map(
                categoria => {

                    const itens =
                        filtrados.filter(
                            item =>
                                item.categoria ===
                                categoria
                        );


                    if (!itens.length) {
                        return "";
                    }


                    return `

                        <div class="categoria-presente">

                            <h3>
                                ${categoria}
                            </h3>

                        </div>


                        <div class="gift-grid-novo">

                            ${itens
                                .map(criarCardPresente)
                                .join("")}

                        </div>

                    `;

                }
            )
            .join("");

}


// ==========================================
// CARD DO PRESENTE
// ==========================================

function criarCardPresente(item) {

    const contribuicao =
        ehContribuicao(item);


    const reservado =
        reservasAtuais.has(
            item.id
        );


    if (contribuicao) {

        return `

            <article
                class="gift-card-novo card-sonho"
            >

                <div class="gift-icone">
                    ${item.icone}
                </div>


                <h3>
                    ${escaparHTML(item.nome)}
                </h3>


                <p>
                    ${escaparHTML(item.descricao)}
                </p>


                <div class="gift-meta">

                    <span class="tipo-presente">
                        Contribuição livre
                    </span>


                    <button
                        type="button"
                        class="btn-contribuir"
                        data-presente="${item.id}"
                    >
                        Contribuir
                    </button>

                </div>

            </article>

        `;

    }


    return `

        <article
            class="gift-card-novo
            ${reservado ? "presente-reservado" : ""}"
        >

            <div class="gift-icone">
                ${item.icone}
            </div>


            <h3>
                ${escaparHTML(item.nome)}
            </h3>


            <p>
                ${escaparHTML(item.descricao)}
            </p>


            <div class="gift-meta">

                <span class="tipo-presente">

                    ${
                        reservado
                            ? "Presente reservado ❤️"
                            : "Presente para nossa casa"
                    }

                </span>


                <button
                    type="button"
                    class="btn-contribuir"
                    data-presente="${item.id}"
                    ${reservado ? "disabled" : ""}
                >

                    ${
                        reservado
                            ? "Reservado"
                            : "Dar este presente"
                    }

                </button>

            </div>

        </article>

    `;

}


// ==========================================
// ABRIR MODAL DE COMPRA
// ==========================================

function abrirModalCompra(presente) {

    presenteCompraSelecionado =
        presente;


    const modal =
        obterElemento("modalCompra");

    const titulo =
        obterElemento("modalCompraTitulo");

    const descricao =
        obterElemento("modalCompraDescricao");

    const lista =
        obterElemento("listaLinksCompra");


    if (
        !modal ||
        !titulo ||
        !descricao ||
        !lista
    ) {

        console.error(
            "Modal de compra não encontrado no casa.html."
        );

        return;

    }


    titulo.textContent =
        presente.nome;


    descricao.textContent =
        "Escolha uma loja para comprar este presente:";


    const links =
        Array.isArray(
            presente.linksCompra
        )
            ? presente.linksCompra.filter(
                link => link.url
            )
            : [];


    if (!links.length) {

        lista.innerHTML = `

            <div class="sem-links-compra">

                <span>🛍️</span>

                <p>
                    Ainda não cadastramos links de lojas
                    para este presente.
                </p>

            </div>

        `;

    } else {

        lista.innerHTML =

            links
                .map(
                    loja => `

                        <a
                            href="${escaparAtributo(loja.url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="link-loja-compra"
                        >

                            <span>
                                🛒
                            </span>

                            <strong>
                                ${escaparHTML(loja.loja)}
                            </strong>

                            <span class="seta-loja">
                                →
                            </span>

                        </a>

                    `
                )
                .join("");

    }


    modal.classList.add(
        "aberto"
    );


    document.body.style.overflow =
        "hidden";

}


// ==========================================
// FECHAR MODAL DE COMPRA
// ==========================================

function fecharModalCompra() {

    const modal =
        obterElemento("modalCompra");


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "aberto"
    );


    document.body.style.overflow =
        "";


    presenteCompraSelecionado =
        null;

}


// ==========================================
// FILTROS
// ==========================================

function iniciarFiltros() {

    document
        .querySelectorAll(".filtro-btn")
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(".filtro-btn")
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "ativo"
                                    )
                            );


                        botao.classList.add(
                            "ativo"
                        );


                        categoriaAtual =
                            botao.dataset.categoria ||
                            "todos";


                        renderizarPresentes();

                    }
                );

            }
        );

}


// ==========================================
// BUSCA
// ==========================================

function iniciarBusca() {

    const campo =
        obterElemento(
            "buscarPresente"
        );


    if (!campo) {
        return;
    }


    campo.addEventListener(
        "input",
        renderizarPresentes
    );

}


// ==========================================
// CLIQUES NOS PRESENTES
// ==========================================

function iniciarBotoesPresentes() {

    document.addEventListener(
        "click",
        evento => {

            const botao =
                evento.target.closest(
                    ".btn-contribuir"
                );


            if (
                !botao ||
                botao.disabled
            ) {
                return;
            }


            const id =
                botao.dataset.presente;


            const presente =
                presentes.find(
                    item =>
                        item.id === id
                );


            if (!presente) {
                return;
            }


            if (
                ehContribuicao(
                    presente
                )
            ) {

                abrirContribuicao(id);

            } else {

                abrirModalCompra(
                    presente
                );

            }

        }
    );

}


// ==========================================
// RESERVAR PRESENTE
// ==========================================

async function confirmarPresente(presente) {

    const nome =
        localStorage.getItem(
            "nomeConvidado"
        ) || "Convidado";


    const telefone =
        localStorage.getItem(
            "telefoneConvidado"
        ) || "";


    if (!telefone) {

        alert(
            "Não encontramos sua confirmação de presença."
        );

        window.location.href =
            "index.html";

        return;

    }


    const confirmar =
        window.confirm(
            `Você deseja reservar o presente:\n\n${presente.nome}?`
        );


    if (!confirmar) {
        return;
    }


    try {

        const statusRef =
            doc(
                db,
                "presentes_status",
                presente.id
            );


        const reservaRef =
            doc(
                collection(
                    db,
                    "reservas"
                )
            );


        await runTransaction(

            db,

            async transaction => {

                const statusSnapshot =
                    await transaction.get(
                        statusRef
                    );


                if (
                    statusSnapshot.exists() &&
                    statusSnapshot.data()
                        .reservado === true
                ) {

                    throw new Error(
                        "PRESENTE_JA_RESERVADO"
                    );

                }


                transaction.set(

                    statusRef,

                    {

                        presenteId:
                            presente.id,

                        reservado:
                            true,

                        atualizadoEm:
                            serverTimestamp()

                    }

                );


                transaction.set(

                    reservaRef,

                    {

                        nome,
                        telefone,

                        presente:
                            presente.nome,

                        presenteId:
                            presente.id,

                        status:
                            "reservado",

                        criadoEm:
                            serverTimestamp()

                    }

                );

            }

        );


        alert(
            `O presente "${presente.nome}" foi reservado com sucesso!`
        );


        const mensagem = `Olá, Samuel e Anna Vitória! ❤️

Gostaria de presentear vocês com:

🎁 ${presente.nome}

Nome:
${nome}

Telefone:
${telefone}

Com carinho! 🤍`;


        window.open(

            `https://wa.me/${CONFIG.whatsapp}?text=`
            +
            encodeURIComponent(
                mensagem
            ),

            "_blank"

        );


    } catch (erro) {

        console.error(
            "Erro ao reservar:",
            erro
        );


        if (
            erro.message ===
            "PRESENTE_JA_RESERVADO"
        ) {

            alert(
                "Esse presente acabou de ser reservado por outra pessoa."
            );

        } else {

            alert(
                "Não foi possível reservar o presente. Verifique sua conexão e tente novamente."
            );

        }

    }

}


// ==========================================
// MODAL DE CONTRIBUIÇÃO
// ==========================================

function abrirContribuicao(id) {

    presenteSelecionado =
        presentes.find(
            item =>
                item.id === id
        );


    if (!presenteSelecionado) {
        return;
    }


    const modal =
        obterElemento(
            "modalContribuicao"
        );

    const titulo =
        obterElemento(
            "modalTitulo"
        );

    const descricao =
        obterElemento(
            "modalDescricao"
        );

    const meta =
        obterElemento(
            "modalMeta"
        );

    const campo =
        obterElemento(
            "valorContribuicao"
        );


    if (
        !modal ||
        !titulo ||
        !descricao ||
        !meta ||
        !campo
    ) {
        return;
    }


    titulo.textContent =
        presenteSelecionado.nome;

    descricao.textContent =
        presenteSelecionado.descricao;

    meta.textContent =
        "Escolha o valor da contribuição";

    campo.value = "";


    modal.classList.add(
        "aberto"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        () => campo.focus(),
        100
    );

}


// ==========================================
// FECHAR MODAIS
// ==========================================

function fecharModalContribuicao() {

    const modal =
        obterElemento(
            "modalContribuicao"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "aberto"
    );


    document.body.style.overflow =
        "";


    presenteSelecionado =
        null;

}


function fecharResumo() {

    const modal =
        obterElemento(
            "modalResumo"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "aberto"
    );


    document.body.style.overflow =
        "";

}


// ==========================================
// CONVERTER VALOR
// ==========================================

function converterValor(valor) {

    let texto =
        String(valor || "")
            .replace(/R\$/gi, "")
            .replace(/\s/g, "");


    if (
        texto.includes(".") &&
        texto.includes(",")
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
// ADICIONAR CONTRIBUIÇÃO
// ==========================================

function adicionarContribuicao() {

    if (!presenteSelecionado) {
        return;
    }


    const campo =
        obterElemento(
            "valorContribuicao"
        );


    if (!campo) {
        return;
    }


    const valor =
        converterValor(
            campo.value
        );


    if (
        !Number.isFinite(valor) ||
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
            crypto.randomUUID
                ? crypto.randomUUID()
                : String(Date.now()),

        presente:
            presenteSelecionado.nome,

        presenteId:
            presenteSelecionado.id,

        valor

    });


    fecharModalContribuicao();

    abrirResumo();

}


// ==========================================
// ABRIR RESUMO
// ==========================================

function abrirResumo() {

    const modal =
        obterElemento("modalResumo");


    if (!modal) {
        return;
    }


    renderizarResumo();


    modal.classList.add(
        "aberto"
    );


    document.body.style.overflow =
        "hidden";

}


// ==========================================
// RENDERIZAR RESUMO
// ==========================================

function renderizarResumo() {

    const container =
        obterElemento("itensResumo");

    const totalElemento =
        obterElemento("totalResumo");


    if (
        !container ||
        !totalElemento
    ) {
        return;
    }


    container.innerHTML =
        resumoContribuicoes
            .map(
                item => `

                    <div class="item-resumo">

                        <div>

                            <strong>
                                ${escaparHTML(item.presente)}
                            </strong>

                            <small>
                                ${formatarMoeda(item.valor)}
                            </small>

                        </div>

                    </div>

                `
            )
            .join("");


    const total =
        resumoContribuicoes.reduce(
            (soma, item) =>
                soma +
                Number(item.valor || 0),
            0
        );


    totalElemento.textContent =
        formatarMoeda(total);

}


// ==========================================
// FINALIZAR CONTRIBUIÇÃO
// ==========================================

async function finalizarContribuicao() {

    if (
        !resumoContribuicoes.length
    ) {
        return;
    }


    const nome =
        localStorage.getItem(
            "nomeConvidado"
        ) || "Convidado";


    const telefone =
        localStorage.getItem(
            "telefoneConvidado"
        ) || "";


    const total =
        resumoContribuicoes.reduce(
            (soma, item) =>
                soma +
                Number(item.valor || 0),
            0
        );


    const botao =
        obterElemento(
            "btnFinalizarContribuicao"
        );


    if (botao) {

        botao.disabled = true;

        botao.textContent =
            "Salvando...";

    }


    try {

        for (
            const item
            of resumoContribuicoes
        ) {

            await addDoc(

                collection(
                    db,
                    "contribuicoes"
                ),

                {

                    nome,
                    telefone,

                    presente:
                        item.presente,

                    presenteId:
                        item.presenteId,

                    valor:
                        Number(item.valor),

                    tipo:
                        "contribuicao",

                    criadoEm:
                        serverTimestamp()

                }

            );

        }


        const lista =
            resumoContribuicoes
                .map(
                    item =>
                        `• ${item.presente}: ${formatarMoeda(item.valor)}`
                )
                .join("\n");


        const mensagem = `Olá, Samuel e Anna Vitória! ❤️

Gostaria de contribuir com:

${lista}

Total:
${formatarMoeda(total)}

Nome:
${nome}

Telefone:
${telefone}

Realizarei o pagamento pelo PIX.

Com carinho! 🤍`;


        window.open(

            `https://wa.me/${CONFIG.whatsapp}?text=`
            +
            encodeURIComponent(
                mensagem
            ),

            "_blank"

        );


        resumoContribuicoes = [];


        fecharResumo();


    } catch (erro) {

        console.error(
            "Erro ao salvar contribuição:",
            erro
        );


        alert(
            "Não foi possível registrar a contribuição. Tente novamente."
        );

    } finally {

        if (botao) {

            botao.disabled = false;

            botao.textContent =
                "Continuar pelo WhatsApp";

        }

    }

}


// ==========================================
// PROGRESSO LUA DE MEL
// ==========================================

function iniciarProgressoLuaMel() {

    const referencia =
        doc(
            db,
            "progresso_publico",
            "lua-de-mel"
        );


    onSnapshot(

        referencia,

        snapshot => {

            const percentual =
                snapshot.exists()
                    ? Number(
                        snapshot.data()
                            .percentual || 0
                    )
                    : 0;


            atualizarBarraLuaMel(
                percentual
            );

        },

        erro => {

            console.error(
                "Erro no progresso:",
                erro
            );

            atualizarBarraLuaMel(0);

        }

    );

}


function atualizarBarraLuaMel(percentual) {

    const percentualElemento =
        obterElemento(
            "percentualLuaMel"
        );

    const barra =
        obterElemento(
            "barraLuaMel"
        );


    if (!percentualElemento) {
        return;
    }


    const valor =
        Math.max(
            0,
            Math.min(
                100,
                Number(percentual || 0)
            )
        );


    percentualElemento.textContent =
        `${valor.toFixed(1).replace(".0", "")}%`;


    if (barra) {

        barra.style.width =
            `${valor}%`;

    }

}


// ==========================================
// EVENTOS
// ==========================================

function iniciarEventos() {

    const botaoConfirmar =
        obterElemento(
            "btnConfirmar"
        );


    if (botaoConfirmar) {

        botaoConfirmar.addEventListener(
            "click",
            confirmarPresenca
        );

    }


    const btnAdicionar =
        obterElemento(
            "btnAdicionarContribuicao"
        );


    if (btnAdicionar) {

        btnAdicionar.addEventListener(
            "click",
            adicionarContribuicao
        );

    }


    const btnFinalizar =
        obterElemento(
            "btnFinalizarContribuicao"
        );


    if (btnFinalizar) {

        btnFinalizar.addEventListener(
            "click",
            finalizarContribuicao
        );

    }


    const btnFecharContribuicao =
        obterElemento(
            "btnFecharContribuicao"
        );


    if (btnFecharContribuicao) {

        btnFecharContribuicao.addEventListener(
            "click",
            fecharModalContribuicao
        );

    }


    const btnFecharResumo =
        obterElemento(
            "btnFecharResumo"
        );


    if (btnFecharResumo) {

        btnFecharResumo.addEventListener(
            "click",
            fecharResumo
        );

    }


    const btnFecharCompra =
        obterElemento(
            "btnFecharCompra"
        );


    if (btnFecharCompra) {

        btnFecharCompra.addEventListener(
            "click",
            fecharModalCompra
        );

    }


    const btnReservarDepoisCompra =
        obterElemento(
            "btnReservarDepoisCompra"
        );


    if (btnReservarDepoisCompra) {

        btnReservarDepoisCompra.addEventListener(
            "click",
            () => {

                if (
                    !presenteCompraSelecionado
                ) {
                    return;
                }


                const presente =
                    presenteCompraSelecionado;


                fecharModalCompra();


                confirmarPresente(
                    presente
                );

            }
        );

    }


    document.addEventListener(
        "click",
        evento => {

            if (
                evento.target.id ===
                "modalContribuicao"
            ) {

                fecharModalContribuicao();

            }


            if (
                evento.target.id ===
                "modalResumo"
            ) {

                fecharResumo();

            }


            if (
                evento.target.id ===
                "modalCompra"
            ) {

                fecharModalCompra();

            }

        }
    );


    document.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key ===
                "Escape"
            ) {

                fecharModalContribuicao();

                fecharResumo();

                fecharModalCompra();

            }

        }
    );

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        iniciarConvite();

        protegerCasaNova();

        iniciarFiltros();

        iniciarBusca();

        iniciarBotoesPresentes();

        iniciarMonitoramentoReservas();

        iniciarProgressoLuaMel();

        iniciarEventos();

        renderizarPresentes();

    }
);


// ==========================================
// ACESSO SECRETO AO ADMINISTRADOR
// ==========================================

const acessoAdmin =
    document.getElementById(
        "acessoAdmin"
    );


let quantidadeCliques = 0;

let tempoClique;


if (acessoAdmin) {

    acessoAdmin.addEventListener(
        "click",
        () => {

            quantidadeCliques++;

            clearTimeout(
                tempoClique
            );


            tempoClique =
                setTimeout(
                    () => {

                        quantidadeCliques = 0;

                    },
                    2000
                );


            if (
                quantidadeCliques >= 5
            ) {

                window.location.href =
                    "admin.html";

            }

        }
    );

}