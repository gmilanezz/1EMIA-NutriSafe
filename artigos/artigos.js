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