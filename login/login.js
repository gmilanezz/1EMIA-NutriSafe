document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário

        localStorage.setItem("loggedInUser", usernameInput.value);
        window.location.href = "../index.html";
    });
});
