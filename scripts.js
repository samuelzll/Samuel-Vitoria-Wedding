// ==========================================
// FIREBASE
// ==========================================

import {

    db,
    collection,
    addDoc,
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
        "2027-01-24T16:00:00-03:00",

    whatsapp:
        "5585988338580",

    localizacao:
        ""

};


// ==========================================
// LISTA DE PRESENTES
// ==========================================

const presentes = [

    {
        id: "smart-tv",
        nome: "Smart TV",
        categoria: "Sala",
        icone: "📺",
        descricao:
            "Para deixar nossa sala ainda mais especial."
    },

    {
        id: "sofa",
        nome: "Sofá",
        categoria: "Sala",
        icone: "🛋️",
        descricao:
            "Nosso cantinho para descansar e receber."
    },

    {
        id: "rack",
        nome: "Rack para TV",
        categoria: "Sala",
        icone: "🪵",
        descricao:
            "Para completar a organização da sala."
    },

    {
        id: "geladeira",
        nome: "Geladeira",
        categoria: "Cozinha",
        icone: "❄️",
        descricao:
            "Um item essencial para nossa nova casa."
    },

    {
        id: "fogao",
        nome: "Fogão",
        categoria: "Cozinha",
        icone: "🍳",
        descricao:
            "Para preparar muitas histórias e refeições."
    },

    {
        id: "air-fryer",
        nome: "Air Fryer",
        categoria: "Cozinha",
        icone: "🍟",
        descricao:
            "Praticidade para o nosso dia a dia."
    },

    {
        id: "jogo-panelas",
        nome: "Jogo de Panelas",
        categoria: "Cozinha",
        icone: "🍲",
        descricao:
            "Para cozinhar com carinho em nosso lar."
    },

    {
        id: "microondas",
        nome: "Micro-ondas",
        categoria: "Cozinha",
        icone: "📦",
        descricao:
            "Mais praticidade para nossa rotina."
    },

    {
        id: "cama",
        nome: "Cama",
        categoria: "Quarto",
        icone: "🛏️",
        descricao:
            "Nosso espaço de descanso."
    },

    {
        id: "guarda-roupa",
        nome: "Guarda-Roupa",
        categoria: "Quarto",
        icone: "🚪",
        descricao:
            "Para organizar nosso novo quarto."
    },

    {
        id: "jogo-cama",
        nome: "Jogo de Cama",
        categoria: "Quarto",
        icone: "🛌",
        descricao:
            "Conforto e aconchego para nosso lar."
    },

    {
        id: "cesto-roupas",
        nome: "Cesto de Roupas",
        categoria: "Organização",
        icone: "🧺",
        descricao:
            "Para manter nossa rotina mais organizada."
    },

    {
        id: "potes",
        nome: "Jogo de Potes",
        categoria: "Organização",
        icone: "🫙",
        descricao:
            "Para organizar a cozinha com praticidade."
    },

    {
        id: "organizadores",
        nome: "Caixas Organizadoras",
        categoria: "Organização",
        icone: "🗃️",
        descricao:
            "Para deixar cada espaço em seu lugar."
    }

];


// ==========================================
// ESTADO
// ==========================================

let categoriaAtual =
    "todos";


let reservas =
    {};


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
        String(texto);

    return elemento.innerHTML;

}


function telefoneNormalizado(telefone) {

    return String(telefone)
        .replace(/\D/g, "");

}


// ==========================================
// PRESENÇA
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

        console.error(
            "Campos da confirmação não encontrados."
        );

        return;

    }


    const nome =
        nomeCampo.value.trim();


    const telefone =
        telefoneCampo.value.trim();


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


    if (!confirmacao.checked) {

        alert(
            "Marque a confirmação de presença."
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

        const id =
            telefoneNormalizado(
                telefone
            );


        await runTransaction(

            db,

            async transaction => {

                const referencia =
                    doc(
                        db,
                        "convidados",
                        id
                    );


                transaction.set(

                    referencia,

                    {

                        nome:
                            nome,

                        telefone:
                            telefone,

                        confirmado:
                            true,

                        criadoEm:
                            serverTimestamp()

                    },

                    {
                        merge: true
                    }

                );

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


        window.location.href =
            "casa.html";


    } catch (erro) {

        console.error(
            "Erro ao confirmar presença:",
            erro
        );


        alert(
            "Não foi possível confirmar sua presença.\n\nVerifique sua conexão e tente novamente."
        );


        if (botao) {

            botao.disabled =
                false;

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
        confirmado !==
        "sim"
    ) {

        window.location.href =
            "index.html";

    }

}


// ==========================================
// CONTAGEM
// ==========================================

function iniciarContagem() {

    const contador =
        obterElemento(
            "countdown"
        );


    if (!contador) {

        return;

    }


    const data =
        new Date(
            CONFIG.casamento
        );


    function atualizar() {

        const distancia =
            data -
            new Date();


        if (
            distancia <= 0
        ) {

            contador.textContent =
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


        contador.innerHTML = `

            <span>
                ${dias}
            </span>

            <small>
                dias
            </small>

            <span>
                ${String(horas)
                    .padStart(2, "0")}
            </span>

            <small>
                h
            </small>

            <span>
                ${String(minutos)
                    .padStart(2, "0")}
            </span>

            <small>
                m
            </small>

            <span>
                ${String(segundos)
                    .padStart(2, "0")}
            </span>

            <small>
                s
            </small>

        `;

    }


    atualizar();


    setInterval(
        atualizar,
        1000
    );

}


// ==========================================
// LIVRO DO CONVITE
// ==========================================

function iniciarLivro() {

    const paginas =
        document.querySelectorAll(
            ".page"
        );


    if (
        paginas.length === 0
    ) {

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


        paginas.forEach(
            pagina => {

                pagina.classList
                    .remove(
                        "active"
                    );

            }
        );


        paginas[indice]
            .classList
            .add("active");


        paginaAtual =
            indice;

    }


    document.addEventListener(
        "click",
        evento => {

            const proximo =
                evento.target.closest(
                    ".next-btn"
                );


            const anterior =
                evento.target.closest(
                    ".prev-btn"
                );


            if (proximo) {

                mostrarPagina(
                    paginaAtual + 1
                );

            }


            if (anterior) {

                mostrarPagina(
                    paginaAtual - 1
                );

            }

        }
    );


    mostrarPagina(0);

}


// ==========================================
// PRESENTES
// ==========================================

function iniciarFiltros() {

    const filtros =
        document.querySelectorAll(
            ".filtro-btn"
        );


    filtros.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    filtros.forEach(
                        item => {

                            item.classList
                                .remove(
                                    "ativo"
                                );

                        }
                    );


                    botao.classList
                        .add("ativo");


                    categoriaAtual =
                        botao.dataset
                            .categoria
                        ||
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
// RENDERIZAR PRESENTES
// ==========================================

function renderizarPresentes() {

    const container =
        obterElemento(
            "listaPresentes"
        );


    if (!container) {

        return;

    }


    const campoBusca =
        obterElemento(
            "buscarPresente"
        );


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

                    categoriaAtual ===
                    "todos"

                    ||

                    item.categoria ===
                    categoriaAtual;


                const buscaOk =

                    item.nome
                        .toLowerCase()
                        .includes(
                            termo
                        )

                    ||

                    item.descricao
                        .toLowerCase()
                        .includes(
                            termo
                        );


                return (
                    categoriaOk &&
                    buscaOk
                );

            }
        );


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
        "Organização"

    ];


    container.innerHTML =

        categorias.map(
            categoria => {

                const itens =
                    filtrados.filter(
                        item =>
                            item.categoria ===
                            categoria
                    );


                if (
                    itens.length === 0
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

                        ${itens
                            .map(
                                criarCardPresente
                            )
                            .join("")
                        }

                    </div>

                `;

            }
        )
        .join("");

}


// ==========================================
// CARD
// ==========================================

function criarCardPresente(item) {

    const reserva =
        reservas[item.id];


    const reservado =
        Boolean(reserva);


    return `

        <article
            class="
                gift-card-novo
                ${reservado
                    ? "presente-reservado"
                    : ""}
            "
        >

            ${
                reservado

                ?

                `
                    <span class="status-reservado">

                        ✓ RESERVADO

                    </span>
                `

                :

                ""
            }


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

                <div
                    class="presente-sem-meta"
                >

                    ${
                        reservado

                        ?

                        "Este presente já foi escolhido."

                        :

                        "Presente para nosso lar."
                    }

                </div>


                <button

                    type="button"

                    class="btn-presente"

                    data-presente="${item.id}"

                    ${
                        reservado
                        ? "disabled"
                        : ""
                    }

                >

                    ${
                        reservado

                        ?

                        "Reservado"

                        :

                        "Vou presentear"
                    }

                </button>

            </div>

        </article>

    `;

}


// ==========================================
// CLIQUE NOS PRESENTES
// ==========================================

function iniciarBotoesPresentes() {

    document.addEventListener(
        "click",
        evento => {

            const botao =
                evento.target.closest(
                    ".btn-presente"
                );


            if (!botao) {

                return;

            }


            if (
                botao.disabled
            ) {

                return;

            }


            const id =
                botao.dataset
                    .presente;


            const presente =
                presentes.find(
                    item =>
                        item.id === id
                );


            if (!presente) {

                return;

            }


            reservarPresente(
                presente,
                botao
            );

        }
    );

}


// ==========================================
// RESERVAR PRESENTE
// ==========================================

async function reservarPresente(
    presente,
    botao
) {

    const confirmado =
        localStorage.getItem(
            "confirmado"
        );


    if (
        confirmado !==
        "sim"
    ) {

        alert(
            "Confirme sua presença primeiro."
        );

        window.location.href =
            "index.html";

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


    const confirmar =
        window.confirm(

            `Você deseja escolher:\n\n🎁 ${presente.nome}\n\ncomo seu presente para nós?`

        );


    if (!confirmar) {

        return;

    }


    const janela =
        window.open(
            "",
            "_blank"
        );


    botao.disabled =
        true;

    botao.textContent =
        "Reservando...";


    const reservaRef =
        doc(
            db,
            "reservas",
            presente.id
        );


    const detalheRef =
        doc(
            db,
            "reservas_detalhes",
            presente.id
        );


    try {

        await runTransaction(

            db,

            async transaction => {

                const reservaSnapshot =
                    await transaction.get(
                        reservaRef
                    );


                if (
                    reservaSnapshot.exists()
                ) {

                    throw new Error(
                        "PRESENTE_JA_RESERVADO"
                    );

                }


                transaction.set(

                    reservaRef,

                    {

                        presenteId:
                            presente.id,

                        presente:
                            presente.nome,

                        reservado:
                            true,

                        criadoEm:
                            serverTimestamp()

                    }

                );


                transaction.set(

                    detalheRef,

                    {

                        presenteId:
                            presente.id,

                        presente:
                            presente.nome,

                        nome:
                            nome,

                        telefone:
                            telefone,

                        criadoEm:
                            serverTimestamp()

                    }

                );

            }

        );


        reservas[
            presente.id
        ] = {

            presente:
                presente.nome

        };


        renderizarPresentes();


        const mensagem = `Olá, Samuel e Anna Vitória! ❤️

Gostaria de presentear vocês com:

🎁 ${presente.nome}

Nome:
${nome}

Telefone:
${telefone}

Acabei de reservar este presente pelo site.

Com carinho! 🤍`;


        const url =

            `https://wa.me/${CONFIG.whatsapp}?text=`

            +

            encodeURIComponent(
                mensagem
            );


        if (janela) {

            janela.location.href =
                url;

        } else {

            window.location.href =
                url;

        }


    } catch (erro) {

        console.error(
            "Erro ao reservar presente:",
            erro
        );


        if (janela) {

            janela.close();

        }


        if (
            erro.message ===
            "PRESENTE_JA_RESERVADO"
        ) {

            alert(
                "Esse presente acabou de ser reservado por outra pessoa. Escolha outro presente. ❤️"
            );

        } else {

            alert(
                "Não foi possível reservar este presente. Tente novamente."
            );

        }


        botao.disabled =
            false;

        botao.textContent =
            "Vou presentear";

    }

}


// ==========================================
// ATUALIZAÇÃO EM TEMPO REAL
// ==========================================

function acompanharReservas() {

    const container =
        obterElemento(
            "listaPresentes"
        );


    if (!container) {

        return;

    }


    const referencia =
        collection(
            db,
            "reservas"
        );


    onSnapshot(

        referencia,

        snapshot => {

            reservas =
                {};


            snapshot.forEach(
                documento => {

                    reservas[
                        documento.id
                    ] =
                        documento.data();

                }
            );


            renderizarPresentes();

        },

        erro => {

            console.error(
                "Erro ao carregar reservas:",
                erro
            );


            container.innerHTML = `

                <div class="nenhum-presente">

                    <h3>
                        Não foi possível carregar a lista.
                    </h3>

                    <p>
                        Atualize a página e tente novamente.
                    </p>

                </div>

            `;

        }

    );

}


// ==========================================
// LOCALIZAÇÃO
// ==========================================

function iniciarLocalizacao() {

    const botao =
        obterElemento(
            "btnLocalizacao"
        );


    if (!botao) {

        return;

    }


    botao.addEventListener(
        "click",
        () => {

            if (
                CONFIG.localizacao
            ) {

                window.open(
                    CONFIG.localizacao,
                    "_blank"
                );

                return;

            }


            alert(
                "O link da localização ainda não foi configurado."
            );

        }
    );

}


// ==========================================
// ESTADO DA PRESENÇA
// ==========================================

function verificarPresencaAnterior() {

    const confirmado =
        localStorage.getItem(
            "confirmado"
        );


    const paginaConfirmada =
        obterElemento(
            "paginaConfirmada"
        );


    const paginaConfirmacao =
        obterElemento(
            "paginaConfirmacao"
        );


    if (
        !paginaConfirmada ||
        !paginaConfirmacao
    ) {

        return;

    }


    if (
        confirmado ===
        "sim"
    ) {

        paginaConfirmacao
            .style
            .display =
            "none";


        paginaConfirmada
            .style
            .display =
            "block";

    } else {

        paginaConfirmada
            .style
            .display =
            "none";


        paginaConfirmacao
            .style
            .display =
            "block";

    }

}


// ==========================================
// BOTÃO CHÁ
// ==========================================

function iniciarBotaoCasaNova() {

    const botao =
        obterElemento(
            "btnCasaNova"
        );


    if (!botao) {

        return;

    }


    botao.addEventListener(
        "click",
        () => {

            if (
                localStorage.getItem(
                    "confirmado"
                ) !==
                "sim"
            ) {

                alert(
                    "Confirme sua presença primeiro."
                );

                return;

            }


            window.location.href =
                "casa.html";

        }
    );

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Sistema do convite carregado."
        );


        protegerCasaNova();

        iniciarContagem();

        iniciarLivro();

        iniciarFiltros();

        iniciarBusca();

        iniciarBotoesPresentes();

        iniciarLocalizacao();

        iniciarBotaoCasaNova();

        verificarPresencaAnterior();


        const botaoConfirmar =
            obterElemento(
                "btnConfirmar"
            );


        if (botaoConfirmar) {

            botaoConfirmar
                .addEventListener(
                    "click",
                    confirmarPresenca
                );

        }


        renderizarPresentes();

        acompanharReservas();

    }
);