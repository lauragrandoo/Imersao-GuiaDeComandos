let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let botaoBusca = document.querySelector("header button"); 
let mensagemInicial = document.querySelector(".mensagem-inicial");
let tituloPrincipal = document.getElementById("titulo-principal");

let modal = document.getElementById("modal");
let modalContent = document.querySelector(".modal-content");
let closeModal = document.querySelector(".close");
let dados = [];

tituloPrincipal.addEventListener('click', function() {
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
            console.error("Falha ao buscar dados:", error);
            return; 
        }
    }

    const dadosFiltrados = dados.filter(dado => {
        const exemplosEmMinuscula = (dado.exemplos || []).map(ex => ex.toLowerCase()).join(" ");
        
        const textoCompleto = [
            dado.nome,
            dado.descricao,
            dado.uso,
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
        <span class="close">&times;</span>
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
    modalContent.querySelector('.close').addEventListener('click', fecharModal);
}

function fecharModal() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal();
    }
}

botaoBusca.addEventListener('click', iniciarBusca);
campoBusca.addEventListener('keyup', iniciarBusca);