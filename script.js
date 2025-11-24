let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let botaoBusca = document.querySelector("header button#botao-busca");
let mensagemInicial = document.querySelector(".mensagem-inicial");
let tituloPrincipal = document.getElementById("titulo-principal");
let modal = document.getElementById("modal");
let modalContent = document.querySelector(".modal-content");
let dados = [];

tituloPrincipal.addEventListener('click', function () {
    location.reload();
});

async function iniciarBusca() {
    const termoBusca = campoBusca.value.trim().toLowerCase();

    if (mensagemInicial) {
        mensagemInicial.style.display = 'none';
    }

    if (termoBusca === "" && dados.length > 0) {
        const dadosOrdenados = [...dados].sort((a, b) => a.nome.localeCompare(b.nome));
        renderizarCards(dadosOrdenados);
        return;
    }

    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();

            if (termoBusca === "") {
                const dadosOrdenados = [...dados].sort((a, b) => a.nome.localeCompare(b.nome));
                renderizarCards(dadosOrdenados);
                return;
            }

        } catch (error) {
            console.error("Falha ao buscar dados do Guia (data.json):", error);
            cardContainer.innerHTML = `<p class="mensagem-erro">Erro ao carregar dados. Tente novamente mais tarde.</p>`;
            return;
        }
    }

    const dadosFiltrados = dados.filter(dado => {
        const exemplosEmMinuscula = (dado.exemplos || []).map(ex => ex.toLowerCase()).join(" ");

        const textoCompleto = [
            dado.nome,
            exemplosEmMinuscula
        ].join(' ').toLowerCase();
        return textoCompleto.includes(termoBusca);
    });

    const dadosOrdenados = dadosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
    renderizarCards(dadosOrdenados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";

    if (dados.length === 0 && campoBusca.value.trim() !== "") {
        cardContainer.innerHTML = `<p class="mensagem-inicial">Não encontramos resultados para sua pesquisa. 
            Por favor, tente verificar a ortografia ou usar sinônimos e termos mais amplos.</p>`;
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h5>${dado.nome}</h5>
        <p>${dado.uso}</p>
        `
        cardContainer.appendChild(article);
        article.addEventListener('click', () => abrirModal(dado));
    }
}

function abrirModal(dado) {
    modalContent.innerHTML = `
        <span class="close-card">&times;</span>
        <h2 style="color: var(--primary-color);">${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <p>${dado.uso}</p>
        <br><h4>Exemplos:</h4>
        <div class="exemplos-container">
        ${dado.exemplos.map(ex => `<pre><code>${ex}</code></pre>`).join('')} 
        </div>
        <br><p>Esse é um ${dado.tipo} e pode ser utilizado de maneira ${dado['interface'] ? dado['interface'].join(' ou ') : 'Não especificado'} e nos Sistemas Operacionais: 
            ${dado['sistema-operacional'] ? dado['sistema-operacional'].join(', ') : 'Não especificado'}.
        </p>
        <br><a href="${dado.link}" class="link_modal" target="_blank">Veja mais sobre esse comando</a>
    `;
    modal.style.display = "block";
    modalContent.querySelector('.close-card').addEventListener('click', fecharModal);
}

function fecharModal() {
    modal.style.display = "none";
}

async function configurarTerminal() {
    let sim_data = { respostas_simuladas: [] };
    try {
        const response = await fetch("comandos_simulados.json");
        sim_data = await response.json();
    } catch (error) {
        console.error("Falha ao carregar comandos simulados (comandos_simulados.json):", error);
    }
    const comandosSimulados = sim_data.respostas_simuladas || [];

    const input = document.getElementById('command-input');
    const output = document.getElementById('output');

    if (!input) return;

    input.focus();

    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const comandoBruto = input.value.trim();
            const comandoBrutoLower = comandoBruto.toLowerCase();

            const divInput = document.createElement('div');
            divInput.classList.add('input-line');

            const spanPrompt = document.createElement('span');
            spanPrompt.classList.add('prompt');
            spanPrompt.textContent = '>';

            divInput.appendChild(spanPrompt);
            divInput.appendChild(document.createTextNode(comandoBruto));
            output.appendChild(divInput);

            let resposta = '';

            if (comandoBrutoLower === 'clear') {
                output.innerHTML = '';
            } else {
                const resultado = comandosSimulados.find(item =>
                    item.comando.toLowerCase() === comandoBrutoLower
                );

                if (resultado) {
                    resposta = resultado.retorno;
                } else {
                    resposta = `Comando "${comandoBruto}" inválido ou não encontrado. Digite 'ajuda' para comandos simulados disponíveis atualmente.`;
                }
            }

            if (resposta) {
                const divResposta = document.createElement('div');
                divResposta.innerHTML = resposta.replace(/\n/g, '<br>');
                output.appendChild(divResposta);
            }

            input.value = '';
            input.focus();
            output.scrollTop = output.scrollHeight;
        }
    });
}

function abrirTerminal() {
    if (mensagemInicial) {
        mensagemInicial.style.display = 'none';
    }

    modalContent.innerHTML = `
        <span class="close-terminal">&times;</span>
        <div id="terminal-container">
            <div id="output">
                Bem-vindo ao Guia de Comandos! <br><br>
                Esse é um terminal dedicado aos que precisam de ajuda ao utilizar comandos. 
                <br><br> Tem dúvida se o seu comando pode ser utilizado de verdade e está com a sintaxe correta antes de usar? Digite ele abaixo e descubra a melhor construção base:
                <br><br> Obs: Base de dados em construção. Se precisar verificar os comandos disponíveis para teste digite "ajuda".
                <br><br> -------------------------------------------------- <br><br>
            </div>
            <div class="input-line">
                <span class="prompt">></span>
                <input type="text" id="command-input">
            </div>
        </div><br><br>
    `;

    modal.style.display = "block";
    modalContent.querySelector('.close-terminal').addEventListener('click', fecharModal);
    configurarTerminal();
}

window.onclick = function (event) {
    if (event.target == modal) {
        fecharModal();
    }
}

botaoBusca.addEventListener('click', () => {
    campoBusca.value = "";
    iniciarBusca();
});

campoBusca.addEventListener('keyup', iniciarBusca);
