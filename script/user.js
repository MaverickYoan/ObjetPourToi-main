document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Connexion réussie !");
});
