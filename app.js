// Lista para armazenar os nomes dos amigos
let amigos = [];
let amigosRestantes = []; // Para controle de sorteio sem repetição

// Função para adicionar amigo 
function adicionarAmigo() {
    let input = document.getElementById("nome-amigo");
    let nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    amigosRestantes.push(nome); // também adiciona na lista de sorteio
    input.value = "";
    atualizarLista();
}

// Função para atualizar a lista no HTML
function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo + " ";

        // Botão de remover
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.onclick = function() {
            removerAmigo(index);
        };

        li.appendChild(botaoRemover);
        lista.appendChild(li);

    });
}

// Função para remover um amigo
function removerAmigo(index) {
    let nomeRemovido = amigos[index];

    amigos.splice(index, 1);
    amigosRestantes = amigosRestantes.filter(nome => nome !== nomeRemovido); // Também remove da lista de sorteio

    atualizarLista();
}

// Função para sortear um amigo sem repetir
function sortearAmigo() {
    if (amigosRestantes.length === 0) {
        alert("Todos os amigos já foram sorteados! Reiniciando a lista...");
        amigosRestantes = [...amigos]; // restaura todos para novo sorteio
    }

    if (amigosRestantes.length === 0) {
        alert("Não há amigos para sortear!");
        return;
    }

    let indiceSorteado = Math.floor(Math.random() * amigosRestantes.length);
    let amigoSorteado = amigosRestantes[indiceSorteado];

    // Remove o sorteado da lista de disponíveis
    amigosRestantes.splice(indiceSorteado, 1);

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `🎉 O amigo secreto sorteado foi: <strong>${amigoSorteado}</strong>`;
}
