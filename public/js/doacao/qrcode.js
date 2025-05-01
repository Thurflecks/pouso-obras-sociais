
document.getElementById("formulario-pix").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new URLSearchParams(new FormData(form));

    const response = await fetch(form.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    if (response.ok) {
        abrirPopup();
        form.reset(); 
    } else {
        alert("Erro ao enviar a doação.");
    }
});

function abrirPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

