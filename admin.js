// ==========================================
// FIREBASE
// ==========================================

import {

    db,
    auth,
    collection,
    setDoc,
    serverTimestamp,
    doc,
    getDoc,
    getDocs,
    deleteDoc,
    writeBatch,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

} from "./firebase.js";

// ==========================================
// ESTADO
// ==========================================

let convidados =
    [];

let reservas =
    [];

let contribuicoes =
    [];


// ==========================================
// ELEMENTOS
// ==========================================

function el(id) {

    return document.getElementById(id);

}


// ==========================================
// MOEDA
// ==========================================

function moeda(valor) {

    return Number(valor || 0)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


// ==========================================
// DATA
// ==========================================

function dataFormatada(valor) {

    if (!valor) {
        return "-";
    }


    try {

        const data =
            valor.toDate
                ? valor.toDate()
                : new Date(valor);


        return data.toLocaleString(
            "pt-BR"
        );

    } catch {

        return "-";

    }

}


// ==========================================
// LOGIN
// ==========================================

async function login() {

    const email =
        el("adminEmail")
            .value
            .trim();


    const senha =
        el("adminSenha")
            .value;


    const erro =
        el("adminLoginErro");


    if (!email || !senha) {

        erro.textContent =
            "Digite e-mail e senha.";

        return;

    }


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );


        erro.textContent =
            "";


    } catch (error) {

        console.error(error);


        erro.textContent =
            "E-mail ou senha incorretos.";

    }

}


// ==========================================
// SAIR
// ==========================================

async function sair() {

    await signOut(auth);

}


// ==========================================
// ESTADO DE LOGIN
// ==========================================

onAuthStateChanged(
    auth,
    user => {

        if (user) {

            el("adminLogin")
                .style.display =
                "none";


            el("adminPainel")
                .style.display =
                "block";


            carregarTudo();

        } else {

            el("adminLogin")
                .style.display =
                "flex";


            el("adminPainel")
                .style.display =
                "none";

        }

    }
);


// ==========================================
// CARREGAR TUDO
// ==========================================

async function carregarTudo() {

    try {

        await Promise.all([

            carregarConvidados(),

            carregarReservas(),

            carregarContribuicoes()

        ]);

        await carregarInformacoesLua();

        atualizarResumo();

    } catch (erro) {

        console.error(
            "Erro carregando painel:",
            erro
        );

        alert(
            "Não foi possível carregar todos os dados."
        );

    }

}


// ==========================================
// CONVIDADOS
// ==========================================

async function carregarConvidados() {

    const snapshot =
        await getDocs(
            collection(
                db,
                "convidados"
            )
        );


    convidados =
        snapshot.docs.map(
            documento => ({

                id:
                    documento.id,

                ...documento.data()

            })
        );


    convidados.sort(
        (a, b) =>
            String(a.nome || "")
                .localeCompare(
                    String(b.nome || ""),
                    "pt-BR"
                )
    );


    renderizarConvidados();

}


// ==========================================
// RENDER CONVIDADOS
// ==========================================

function renderizarConvidados() {

    const container =
        el(
            "listaAdminConvidados"
        );


    if (!convidados.length) {

        container.innerHTML =
            "<p>Nenhum convidado encontrado.</p>";

        return;

    }


    container.innerHTML = `

        <div class="admin-tabela">

            <div class="admin-tabela-cabecalho">

                <span>Nome</span>
                <span>Telefone</span>
                <span>Confirmado</span>
                <span>Data</span>
                <span>Ação</span>

            </div>


            ${convidados
                .map(
                    convidado => `

                        <div class="admin-tabela-linha">

                            <span>
                                ${escapar(convidado.nome)}
                            </span>

                            <span>
                                ${escapar(convidado.telefone)}
                            </span>

                            <span>
                                ${convidado.confirmado
                                    ? "Sim"
                                    : "Não"}
                            </span>

                            <span>
                                ${dataFormatada(
                                    convidado.criadoEm
                                )}
                            </span>

                            <span>

                                <button
                                    class="btn-excluir"
                                    type="button"
                                    data-acao="excluir-convidado"
                                    data-id="${convidado.id}"
                                >
                                    Excluir
                                </button>

                            </span>

                        </div>

                    `
                )
                .join("")}

        </div>

    `;

}


// ==========================================
// RESERVAS
// ==========================================

async function carregarReservas() {

    const snapshot =
        await getDocs(
            collection(
                db,
                "reservas"
            )
        );


    reservas =
        snapshot.docs.map(
            documento => ({

                id:
                    documento.id,

                ...documento.data()

            })
        );


    reservas.sort(
        (a, b) => {

            const aData =
                a.criadoEm?.toMillis
                    ? a.criadoEm.toMillis()
                    : 0;

            const bData =
                b.criadoEm?.toMillis
                    ? b.criadoEm.toMillis()
                    : 0;

            return bData - aData;

        }
    );


    renderizarReservas();

}


// ==========================================
// RENDER RESERVAS
// ==========================================

function renderizarReservas() {

    const container =
        el(
            "listaAdminReservas"
        );


    if (!reservas.length) {

        container.innerHTML =
            "<p>Nenhum presente reservado.</p>";

        return;

    }


    container.innerHTML = `

        <div class="admin-tabela">

            <div class="admin-tabela-cabecalho">

                <span>Presente</span>
                <span>Convidado</span>
                <span>Telefone</span>
                <span>Data</span>
                <span>Ação</span>

            </div>


            ${reservas
                .map(
                    reserva => `

                        <div class="admin-tabela-linha">

                            <span>
                                ${escapar(reserva.presente)}
                            </span>

                            <span>
                                ${escapar(reserva.nome)}
                            </span>

                            <span>
                                ${escapar(reserva.telefone)}
                            </span>

                            <span>
                                ${dataFormatada(
                                    reserva.criadoEm
                                )}
                            </span>

                            <span>

                                <button
                                    class="btn-excluir"
                                    type="button"
                                    data-acao="excluir-reserva"
                                    data-id="${reserva.id}"
                                    data-presente="${reserva.presenteId}"
                                >
                                    Excluir
                                </button>

                            </span>

                        </div>

                    `
                )
                .join("")}

        </div>

    `;

}


// ==========================================
// CONTRIBUIÇÕES
// ==========================================

async function carregarContribuicoes() {

    const snapshot =
        await getDocs(
            collection(
                db,
                "contribuicoes"
            )
        );


    contribuicoes =
        snapshot.docs.map(
            documento => ({

                id:
                    documento.id,

                ...documento.data()

            })
        );


    contribuicoes.sort(
        (a, b) => {

            const aData =
                a.criadoEm?.toMillis
                    ? a.criadoEm.toMillis()
                    : 0;

            const bData =
                b.criadoEm?.toMillis
                    ? b.criadoEm.toMillis()
                    : 0;

            return bData - aData;

        }
    );


    renderizarContribuicoes();

}


// ==========================================
// RENDER CONTRIBUIÇÕES
// ==========================================

function renderizarContribuicoes() {

    const container =
        el(
            "listaAdminContribuicoes"
        );


    if (!contribuicoes.length) {

        container.innerHTML =
            "<p>Nenhuma contribuição registrada.</p>";

        return;

    }


    container.innerHTML = `

        <div class="admin-tabela">

            <div class="admin-tabela-cabecalho">

                <span>Convidado</span>
                <span>Item</span>
                <span>Valor</span>
                <span>Data</span>
                <span>Ação</span>

            </div>


            ${contribuicoes
                .map(
                    item => `

                        <div class="admin-tabela-linha">

                            <span>
                                ${escapar(item.nome)}
                            </span>

                            <span>
                                ${escapar(item.presente)}
                            </span>

                            <span>
                                ${moeda(item.valor)}
                            </span>

                            <span>
                                ${dataFormatada(
                                    item.criadoEm
                                )}
                            </span>

                            <span>

                                <button
                                    class="btn-excluir"
                                    type="button"
                                    data-acao="excluir-contribuicao"
                                    data-id="${item.id}"
                                >
                                    Excluir
                                </button>

                            </span>

                        </div>

                    `
                )
                .join("")}

        </div>

    `;

}


// ==========================================
// LUA DE MEL
// ==========================================

async function carregarInformacoesLua() {

    const referencia =
        doc(
            db,
            "configuracoes_privadas",
            "lua-de-mel"
        );

        

    const snapshot =
        await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
        )
        .then(
            modulo =>
                modulo.getDoc(
                    referencia
                )
        );


    let meta = 0;


    if (snapshot.exists()) {

        meta =
            Number(
                snapshot.data().meta || 0
            );

    }


    const arrecadado =
        contribuicoes
            .filter(
                item =>
                    item.presenteId ===
                    "lua-de-mel"
            )
            .reduce(
                (
                    soma,
                    item
                ) =>
                    soma +
                    Number(item.valor || 0),
                0
            );


    atualizarLuaNaTela(
        meta,
        arrecadado
    );

}


// ==========================================
// ATUALIZAR LUA NA TELA
// ==========================================

function atualizarLuaNaTela(
    meta,
    arrecadado
) {

    el("metaLuaMel")
        .textContent =
        meta > 0
            ? moeda(meta)
            : "Não configurada";


    el("arrecadadoLuaMel")
        .textContent =
        moeda(arrecadado);


    const percentual =
        meta > 0
            ? Math.min(
                100,
                (arrecadado / meta) *
                100
            )
            : 0;


    el("percentualAdminLua")
        .textContent =
        `${percentual
            .toFixed(1)
            .replace(".0", "")}%`;

}


// ==========================================
// CONFIGURAR META
// ==========================================

async function configurarMeta() {

    const valor =
        prompt(
            "Digite a meta da Lua de Mel em reais:",
            ""
        );


    if (valor === null) {
        return;
    }


    const meta =
        Number(
            String(valor)
                .replace(",", ".")
        );


    if (
        !Number.isFinite(meta) ||
        meta <= 0
    ) {

        alert(
            "Digite um valor válido."
        );

        return;

    }


    try {

        await setDoc(

            doc(
                db,
                "configuracoes_privadas",
                "lua-de-mel"
            ),

            {

                meta:
                    meta,

                atualizadoEm:
                    serverTimestamp()

            }

        );


        await atualizarPercentualPublico();


        await carregarInformacoesLua();


        alert(
            "Meta salva com sucesso."
        );


    } catch (erro) {

        console.error(
            erro
        );


        alert(
            "Não foi possível salvar a meta."
        );

    }

}


// ==========================================
// ATUALIZAR PERCENTUAL PÚBLICO
// ==========================================

async function atualizarPercentualPublico() {

    const modulo =
        await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
        );


    const getDoc =
        modulo.getDoc;


    const metaSnapshot =
        await getDoc(

            doc(
                db,
                "configuracoes_privadas",
                "lua-de-mel"
            )

        );


    if (
        !metaSnapshot.exists()
    ) {

        alert(
            "Configure primeiro a meta da Lua de Mel."
        );

        return;

    }


    const meta =
        Number(
            metaSnapshot.data().meta || 0
        );


    if (meta <= 0) {
        return;
    }


    const total =
        contribuicoes
            .filter(
                item =>
                    item.presenteId ===
                    "lua-de-mel"
            )
            .reduce(
                (
                    soma,
                    item
                ) =>
                    soma +
                    Number(item.valor || 0),
                0
            );


    const percentual =
        Math.min(
            100,
            Number(
                (
                    total /
                    meta *
                    100
                ).toFixed(1)
            )
        );


    await setDoc(

        doc(
            db,
            "progresso_publico",
            "lua-de-mel"
        ),

        {

            percentual:
                percentual,

            atualizadoEm:
                serverTimestamp()

        }

    );


    atualizarLuaNaTela(
        meta,
        total
    );

}


// ==========================================
// EXCLUIR CONVIDADO
// ==========================================

async function excluirConvidado(id) {

    const convidado =
        convidados.find(
            item =>
                item.id === id
        );


    if (!convidado) {
        return;
    }


    const confirmar =
        confirm(
            `Excluir o convidado "${convidado.nome}"?`
        );


    if (!confirmar) {
        return;
    }


    try {

        await deleteDoc(

            doc(
                db,
                "convidados",
                id
            )

        );


        await carregarConvidados();


        atualizarResumo();


    } catch (erro) {

        console.error(
            erro
        );


        alert(
            "Não foi possível excluir."
        );

    }

}


// ==========================================
// EXCLUIR RESERVA
// ==========================================

async function excluirReserva(
    id,
    presenteId
) {

    const reserva =
        reservas.find(
            item =>
                item.id === id
        );


    if (!reserva) {
        return;
    }


    const confirmar =
        confirm(

            `Excluir a reserva de "${reserva.presente}"?\n\nO presente ficará disponível novamente.`

        );


    if (!confirmar) {
        return;
    }


    try {

        const batch =
            writeBatch(db);


        batch.delete(

            doc(
                db,
                "reservas",
                id
            )

        );


        batch.delete(

            doc(
                db,
                "presentes_status",
                presenteId
            )

        );


        await batch.commit();


        await carregarReservas();


        atualizarResumo();


    } catch (erro) {

        console.error(
            erro
        );


        alert(
            "Não foi possível excluir a reserva."
        );

    }

}


// ==========================================
// EXCLUIR CONTRIBUIÇÃO
// ==========================================

async function excluirContribuicao(
    id
) {

    const item =
        contribuicoes.find(
            contribuicao =>
                contribuicao.id === id
        );


    if (!item) {
        return;
    }


    const confirmar =
        confirm(

            `Excluir a contribuição de ${moeda(item.valor)} feita por ${item.nome}?`

        );


    if (!confirmar) {
        return;
    }


    try {

        await deleteDoc(

            doc(
                db,
                "contribuicoes",
                id
            )

        );


        await carregarContribuicoes();


        await atualizarPercentualPublico();


        await carregarInformacoesLua();


        atualizarResumo();


    } catch (erro) {

        console.error(
            erro
        );


        alert(
            "Não foi possível excluir a contribuição."
        );

    }

}


// ==========================================
// RESUMO
// ==========================================

function atualizarResumo() {

    el("totalConvidados")
        .textContent =
        convidados.length;


    el("totalReservas")
        .textContent =
        reservas.length;


    el("totalContribuicoes")
        .textContent =
        contribuicoes.length;


    const totalLua =
        contribuicoes
            .filter(
                item =>
                    item.presenteId ===
                    "lua-de-mel"
            )
            .reduce(
                (
                    soma,
                    item
                ) =>
                    soma +
                    Number(item.valor || 0),
                0
            );


    el("totalLuaMel")
        .textContent =
        moeda(totalLua);

}


// ==========================================
// CSV
// ==========================================

function escaparCSV(valor) {

    const texto =
        String(valor ?? "");


    return `"${texto
        .replace(
            /"/g,
            '""'
        )}"`;

}


function baixarCSV(
    nomeArquivo,
    cabecalho,
    dados
) {

    const linhas = [

        cabecalho
            .map(escaparCSV)
            .join(","),

        ...dados.map(
            linha =>
                linha
                    .map(escaparCSV)
                    .join(",")
        )

    ];


    const blob =
        new Blob(
            [
                "\uFEFF" +
                linhas.join("\n")
            ],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        nomeArquivo;


    link.click();


    URL.revokeObjectURL(
        url
    );

}


// ==========================================
// EXPORTAR CONVIDADOS
// ==========================================

function exportarConvidados() {

    baixarCSV(

        "convidados.csv",

        [
            "Nome",
            "Telefone",
            "Confirmado",
            "Data"
        ],

        convidados.map(
            item => [

                item.nome,

                item.telefone,

                item.confirmado
                    ? "Sim"
                    : "Não",

                dataFormatada(
                    item.criadoEm
                )

            ]
        )

    );

}


// ==========================================
// EXPORTAR RESERVAS
// ==========================================

function exportarReservas() {

    baixarCSV(

        "reservas.csv",

        [
            "Presente",
            "Convidado",
            "Telefone",
            "Status",
            "Data"
        ],

        reservas.map(
            item => [

                item.presente,

                item.nome,

                item.telefone,

                item.status,

                dataFormatada(
                    item.criadoEm
                )

            ]
        )

    );

}


// ==========================================
// EXPORTAR CONTRIBUIÇÕES
// ==========================================

function exportarContribuicoes() {

    baixarCSV(

        "contribuicoes.csv",

        [
            "Convidado",
            "Telefone",
            "Item",
            "Valor",
            "Data"
        ],

        contribuicoes.map(
            item => [

                item.nome,

                item.telefone,

                item.presente,

                moeda(item.valor),

                dataFormatada(
                    item.criadoEm
                )

            ]
        )

    );

}


// ==========================================
// ESCAPAR
// ==========================================

function escapar(valor) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(valor ?? "");


    return div.innerHTML;

}


// ==========================================
// EVENTOS ADMIN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        el("btnLoginAdmin")
            .addEventListener(
                "click",
                login
            );


        el("adminSenha")
            .addEventListener(
                "keydown",
                evento => {

                    if (
                        evento.key ===
                        "Enter"
                    ) {

                        login();

                    }

                }
            );


        el("btnSair")
            .addEventListener(
                "click",
                sair
            );


        el("btnAtualizar")
            .addEventListener(
                "click",
                carregarTudo
            );


        el("btnConfigurarMeta")
            .addEventListener(
                "click",
                configurarMeta
            );


        el("btnAtualizarLua")
            .addEventListener(
                "click",
                async () => {

                    try {

                        await atualizarPercentualPublico();

                        alert(
                            "Percentual atualizado."
                        );

                    } catch (erro) {

                        console.error(
                            erro
                        );

                        alert(
                            "Erro ao atualizar percentual."
                        );

                    }

                }
            );


        el("btnExportarConvidados")
            .addEventListener(
                "click",
                exportarConvidados
            );


        el("btnExportarReservas")
            .addEventListener(
                "click",
                exportarReservas
            );


        el("btnExportarContribuicoes")
            .addEventListener(
                "click",
                exportarContribuicoes
            );


        document.addEventListener(
            "click",
            evento => {

                const botao =
                    evento.target.closest(
                        "[data-acao]"
                    );


                if (!botao) {
                    return;
                }


                const acao =
                    botao.dataset.acao;


                if (
                    acao ===
                    "excluir-convidado"
                ) {

                    excluirConvidado(
                        botao.dataset.id
                    );

                }


                if (
                    acao ===
                    "excluir-reserva"
                ) {

                    excluirReserva(

                        botao.dataset.id,

                        botao.dataset.presente

                    );

                }


                if (
                    acao ===
                    "excluir-contribuicao"
                ) {

                    excluirContribuicao(
                        botao.dataset.id
                    );

                }

            }
        );

    }
);