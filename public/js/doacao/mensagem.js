function enviarMensagem(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeOutrasDoacoes").value;
    const mensagem = document.getElementById("mensagem").value;
    const telefoneOutrasDoacoes = document.getElementById("telefoneOutrasDoacoes").value;
    const endereco = document.getElementById("endereco").value;
    const dataDisponibilidade = document.getElementById("data").value;

    const dataHora = new Date(dataDisponibilidade);
    const dataFormatada = `${dataHora.toLocaleDateString('pt-BR')} às ${dataHora.toLocaleTimeString('pt-BR')}`;


    const numero = "5598981212573";
    const texto =
        `Olá! Meu nome é ${nome} e gostaria de fazer uma doação para o Pouso.\n\n` +
        `Data da doação: ${dataFormatada}\n` +
        `Endereço: ${endereco}\n` +
        `Telefone: ${telefoneOutrasDoacoes}\n` +
        `Mensagem: ${mensagem || "Nenhuma mensagem adicional."}`;

    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${numero}?text=${msgFormatada}`;

    console.log(url);
    window.open(url, '_blank');
    setTimeout(() => {
        location.reload();
    }, 1000);
}