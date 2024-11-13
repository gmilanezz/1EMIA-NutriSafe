document.getElementById('formularioCalorias').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const genero = document.getElementById('genero').value;
    const atividade = document.getElementById('atividade').value;

    // Verifica se algum dos campos contém valores inválidos (menor ou igual a zero)
    if (peso <= 0 || altura <= 0 || idade <= 0) {
        alert(`Por favor, insira valores válidos`)
        return;
    }

    let tmb; // Taxa Metabólica Basal
    if (genero === 'masculino') {
        tmb = 66.5 + (13.75 * peso) + (5.003 * altura) - (6.75 * idade);
    } else {
        tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    }

    const fatoresAtividade = {
        sedentario: 1.2,
        leve: 1.375,
        moderado: 1.55,
        ativo: 1.725,
        muitoAtivo: 1.9
    };

    const caloriasNecessarias = tmb * fatoresAtividade[atividade];

    document.getElementById('resultado').innerText = `Você precisa de aproximadamente ${Math.round(caloriasNecessarias)} calorias por dia.`;
});

document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.querySelector(".profile");
    const nav = document.querySelector("nav");
    const introText = document.getElementById("intro-text"); // Seleciona o texto "Conheça a NutriSafe!"

    // Verifica se há um usuário logado no armazenamento local
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // Verifica a última letra do nome de usuário
        const ultimaLetra = loggedInUser.charAt(loggedInUser.length - 1).toLowerCase(); // Converte para minúscula para garantir consistência

        // Cria e exibe a mensagem de boas-vindas
        const welcomeMessage = document.createElement("p");
        welcomeMessage.classList.add("welcome-message");

        // Define a mensagem com base na última letra
        if (ultimaLetra === 'a') {
            welcomeMessage.textContent = `Bem-vinda, ${loggedInUser}!`;
        } else {
            welcomeMessage.textContent = `Bem-vindo, ${loggedInUser}!`;
        }

        // Insere a mensagem de boas-vindas antes do ícone de perfil
        nav.insertBefore(welcomeMessage, profileLink);

        // Remove o link de login para impedir novo login
        profileLink.removeAttribute("href");

        // Adiciona um aviso para recarregar a página ao passar o mouse
        const showReloadWarning = () => {
            welcomeMessage.textContent = "Recarregue a página para fazer login novamente.";
        };
        const resetWelcomeMessage = () => {
            if (ultimaLetra === 'a') {
                welcomeMessage.textContent = `Bem-vinda, ${loggedInUser}!`;
            } else {
                welcomeMessage.textContent = `Bem-vindo, ${loggedInUser}!`;
            }
        };
        profileLink.addEventListener("mouseenter", showReloadWarning);
        profileLink.addEventListener("mouseleave", resetWelcomeMessage);
        welcomeMessage.addEventListener("mouseenter", showReloadWarning);
        welcomeMessage.addEventListener("mouseleave", resetWelcomeMessage);

        // Remove o usuário logado do localStorage quando a página é recarregada ou fechada
        window.addEventListener("beforeunload", () => {
            localStorage.removeItem("loggedInUser");
        });

        // Remove o texto "Conheça a NutriSafe!" se o usuário estiver logado
        if (introText) {
            introText.style.display = "none"; // Esconde o elemento
        }
    }
});