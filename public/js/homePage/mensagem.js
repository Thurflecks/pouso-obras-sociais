function enviarMensagem(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const email = document.getElementById("email").value;

    const numero = "5598981212573";
    const texto = `Olá! Meu nome é ${nome} e gostaria saber mais sobre o Pouso.\n` +
        `Email: ${email}\n` +
        `Mensagem: ${mensagem || "Nenhuma mensagem adicional."}`;
        
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${numero}?text=${msgFormatada}`;

    console.log(url);
    window.open(url, '_blank');
    setTimeout(() => {
        location.reload();
    }, 1000);
}
