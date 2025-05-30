document.addEventListener('DOMContentLoaded', () => {
    const secoes = document.querySelectorAll('.secao');
    let secaoAtual = 0;

    const mostrarSecao = (index) => {
        secoes.forEach((secao, i) => {
            secao.style.display = i === index ? 'block' : 'none';
            secao.classList.toggle('ativa', i === index);
        });
    };

    window.proximaSecao = () => {
        if (secaoAtual < secoes.length - 1) {
            secaoAtual++;
            mostrarSecao(secaoAtual);
        } else {
            // Quando chegar na última seção (Seção 12), vai para a Seção 13 (Finalizar)
            if (secaoAtual === 11) {  // Seção 12 tem índice 11
                validarSecao12();  // Valida a Seção 12
            }
        }
    };

    window.voltarSecao = () => {
        if (secaoAtual > 0) {
            secaoAtual--;
            mostrarSecao(secaoAtual);
        }
    };

    // Limpeza de mensagens de erro
    const limparErros = () => {
        document.querySelectorAll('.erro').forEach(erro => {
            erro.textContent = '';
            erro.style.display = 'none';
        });
    };


    const mostrarErro = (input, mensagem) => {
        const erro = input.nextElementSibling;
        erro.textContent = mensagem;
        erro.style.display = 'block';
    };

    const alertaCampos = () => alert("Campos obrigatórios faltando.");

    // Seção 1
    window.validarSecao1 = () => {
        limparErros();
        const campos = [
            { id: "nome", msg: "Preencha o nome." },
            { id: "dataNascimento", msg: "Informe a data de nascimento." },
            { id: "telefone", msg: "Informe o telefone." },
            { id: "cpf", msg: "Informe o CPF." },
            { id: "identidade", msg: "Informe a identidade." }
        ];

        let valido = true;

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            const valor = input.value.trim();

            if (!valor) {
                mostrarErro(input, campo.msg);
                valido = false;
            }
        });

        valido ? proximaSecao() : alertaCampos();
    };

    // Seção 2
    window.validarSecao2 = () => {
        limparErros();
        const campos = [
            { id: "endereco", msg: "Preencha o endereço." },
            { id: "bairro", msg: "Preencha o bairro." },
            { id: "cep", msg: "Preencha o CEP." },
            { id: "cidade", msg: "Preencha a cidade." },
            { id: "uf", msg: "Selecione o estado (UF)." }
        ];

        let valido = true;

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            const valor = input.value.trim();

            if (!valor) {
                mostrarErro(input, campo.msg);
                valido = false;
            }
        });

        valido ? proximaSecao() : alertaCampos();
    };

    // Seção 3
    window.validarSecao3 = () => {
        const campos = [
            { id: "local_trabalho", msg: "Informe o local de trabalho." },
            { id: "profissao", msg: "Informe a profissão." }
        ];

        let valido = true;

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            const erro = input.nextElementSibling;
            const valor = input.value.trim();

            erro.style.display = "none";

            if (!valor) {
                erro.textContent = campo.msg;
                erro.style.display = "block";
                valido = false;
            }
        });

        valido ? proximaSecao() : alertaCampos();
    };

    // Seção 4
    window.validarSecao4 = () => {
        let valido = true;

        // Faixa Etária
        const faixaEtaria = document.getElementsByName("faixa_etaria");
        const erroFaixa = faixaEtaria[0].closest(".opcoes").nextElementSibling;
        erroFaixa.style.display = "none";
        const faixaSelecionada = [...faixaEtaria].some(opcao => opcao.checked);
        if (!faixaSelecionada) {
            erroFaixa.style.display = "block";
            valido = false;
        }

        // Grau de Instrução
        const grauInstrucao = document.getElementsByName("grau_instrucao");
        const erroGrau = grauInstrucao[0].closest(".opcoes").nextElementSibling;
        erroGrau.style.display = "none";
        const grauSelecionado = [...grauInstrucao].some(opcao => opcao.checked);
        if (!grauSelecionado) {
            erroGrau.style.display = "block";
            valido = false;
        }

        valido ? proximaSecao() : alertaCampos();
    };

    // Seção 5
    window.validarSecao5 = () => {
        limparErros();

        const formacao = document.querySelector("[name=formacao_tecnica]");
        const numPessoas = document.getElementById("num_pessoas"); // Número total de pessoas
        const numCriancas = document.getElementById("num_criancas"); // Número de crianças
        const etnias = document.querySelectorAll("[name=etnia]");

        let valido = true;

        // Validação da formação técnica
        if (!formacao.value.trim()) {
            mostrarErro(formacao, "Informe a formação técnica (ou escreva 'Não').");
            valido = false;
        }

        // Validação do número total de pessoas
        if (!numPessoas.value.trim()) {
            mostrarErro(numPessoas, "Informe a quantidade de membros da família.");
            valido = false;
        }

        // Validação do número de crianças
        if (!numCriancas.value.trim()) {
            mostrarErro(numCriancas, "Informe quantos são menores de idade.");
            valido = false;
        }

        // Verifica se o número de crianças não é maior que o número total de pessoas
        const totalPessoas = parseInt(numPessoas.value.trim(), 10);
        const totalCriancas = parseInt(numCriancas.value.trim(), 10);
        if (totalCriancas > totalPessoas) {
            alert("O número de crianças não pode ser maior que o número total de pessoas na residência.");
            valido = false;
        }

        // Validação de etnia (pelo menos uma opção deve ser selecionada)
        if (![...etnias].some(opcao => opcao.checked)) {
            const erro = etnias[0].closest(".opcoes").nextElementSibling;
            erro.textContent = "Selecione uma opção de etnia.";
            erro.style.display = "block";
            valido = false;
        }

        // Se a validação foi bem-sucedida, prossegue para a próxima seção
        if (valido) {
            proximaSecao();
        } else {
            alertaCampos();
        }
    };

    // Seção 6
    window.validarSecao6 = () => {
        limparErros();
        const moradias = document.querySelectorAll("[name=tipo_moradia]");
        const selecionadas = [...moradias].filter(opcao => opcao.checked);
        const erro = moradias[0].closest(".opcoes").nextElementSibling;

        if (selecionadas.length >= 1 && selecionadas.length <= 2) {
            proximaSecao();
        } else {
            erro.textContent = "Selecione até 2 tipos de moradia.";
            erro.style.display = "block";
            alertaCampos();
        }
    };

    // Seção 7
    window.validarSecao7 = () => {
        limparErros();
        const opcoes = document.getElementsByName("situacao_moradia");
        const erro = document.querySelector(".secao.ativa .erro");

        if (![...opcoes].some(opcao => opcao.checked)) {
            erro.textContent = "Selecione uma opção.";
            erro.style.display = "block";
            alertaCampos();
        } else {
            proximaSecao();
        }
    };

    // Seção 8
    window.validarSecao8 = () => {
        limparErros();
        const transporte = document.getElementsByName("meio_transporte");
        const erro = document.querySelector(".secao.ativa .erro");

        if (![...transporte].some(opcao => opcao.checked)) {
            erro.textContent = "Selecione um meio de transporte.";
            erro.style.display = "block";
            alertaCampos();
        } else {
            proximaSecao();
        }
    };

    // Seção 9
    window.validarSecao9 = () => {
        limparErros();
        const opcoes = document.getElementsByName("participacao_economica");
        const erro = document.querySelector(".secao.ativa .erro");

        if (![...opcoes].some(opcao => opcao.checked)) {
            erro.textContent = "Selecione uma opção.";
            erro.style.display = "block";
            alertaCampos();
        } else {
            proximaSecao();
        }
    };

    // Seção 10
    const radiosTrabalhista = document.querySelectorAll('input[name="situacao_trabalhista"]');
    const outroDescricaoContainer = document.getElementById('outroDescricaoContainer');
    const descricaoOutro = document.getElementById('descricao_outro');

    radiosTrabalhista.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'outro' && radio.checked) {
                outroDescricaoContainer.style.display = 'block';
            } else if (radio.checked) {
                outroDescricaoContainer.style.display = 'none';
                descricaoOutro.value = '';
            }
        });
    });

    window.validarSecao10 = () => {
        let valido = true;

        const radios = document.getElementsByName("situacao_trabalhista");
        const erroRadio = document.querySelector("#secao10 .erro");
        if (erroRadio) erroRadio.style.display = "none";

        const selecionado = [...radios].find(r => r.checked);
        if (!selecionado) {
            if (erroRadio) {
                erroRadio.textContent = "Selecione uma opção.";
                erroRadio.style.display = "block";
            }
            valido = false;
        }

        const outroDescricaoContainer = document.getElementById("outroDescricaoContainer");
        const descricaoOutro = document.getElementById("descricao_outro");
        const erroOutro = descricaoOutro?.nextElementSibling;
        if (erroOutro) erroOutro.style.display = "none";

        if (selecionado?.value === "outro") {
            if (!descricaoOutro?.value.trim()) {
                if (erroOutro) {
                    erroOutro.textContent = "Descreva a situação trabalhista.";
                    erroOutro.style.display = "block";
                }
                valido = false;
            }
        }

        valido ? proximaSecao() : alertaCampos();
    };


    // Seção 11
    window.validarSecao11 = () => {
        limparErros();
        const opcoes = document.getElementsByName("renda_percapta");
        const erro = document.querySelector(".secao.ativa .erro");

        if (![...opcoes].some(opcao => opcao.checked)) {
            erro.textContent = "Selecione a renda per capita.";
            erro.style.display = "block";
            alertaCampos();
        } else {
            proximaSecao();
        }
    };

    // Seção 12
    function validarSecao12() {
        limparErros();  // Limpa erros anteriores

        const beneficio = document.getElementsByName("beneficio_social");
        const qualBeneficio = document.getElementById("qual_beneficio");
        const cadastro = document.getElementById("cadastro_unico");
        const necessidades = document.getElementsByName("necessidades_especiais");
        const descricaoNecessidade = document.getElementById("descricao_necessidade");
        const medicacaoCont = document.getElementsByName("medicacao_continua");

        let valido = true;

        // Validação do benefício social
        if (![...beneficio].some(opcao => opcao.checked)) {
            const erroBeneficio = beneficio[0].closest(".opcoes").querySelector(".erro");
            erroBeneficio.textContent = "Selecione uma opção sobre benefício social.";
            erroBeneficio.style.display = "block";  // Exibe erro
            valido = false;
        }

        // Validação do nome do benefício (se "Sim" foi escolhido)
        if ([...beneficio].some(opcao => opcao.checked && opcao.value === "sim") && !qualBeneficio.value.trim()) {
            const erroQualBeneficio = qualBeneficio.nextElementSibling;
            erroQualBeneficio.textContent = "Preencha o nome do benefício social.";
            erroQualBeneficio.style.display = "block";  // Exibe erro
            valido = false;
        }

        // Validação do Cadastro Único
        if (!cadastro.value.trim()) {
            const erroCadastro = cadastro.closest(".secao").querySelector(".erro");
            erroCadastro.textContent = "Informe se tem Cadastro Único.";
            erroCadastro.style.display = "block";  // Exibe erro
            valido = false;
        }

        // Validação das necessidades especiais
        if (![...necessidades].some(opcao => opcao.checked)) {
            const erroNecessidades = necessidades[0].closest(".opcoes").querySelector(".erro");
            erroNecessidades.textContent = "Informe se há pessoas com necessidades especiais.";
            erroNecessidades.style.display = "block";  // Exibe erro
            valido = false;
        }

        // Validação da descrição da necessidade especial (se "Sim" foi escolhido)
        if ([...necessidades].some(opcao => opcao.checked && opcao.value === "sim") && !descricaoNecessidade.value.trim()) {
            const erroDescricaoNecessidade = descricaoNecessidade.nextElementSibling;
            erroDescricaoNecessidade.textContent = "Preencha a descrição da necessidade especial.";
            erroDescricaoNecessidade.style.display = "block";  // Exibe erro
            valido = false;
        }

        // Validação sobre medicação contínua
        if (![...medicacaoCont].some(opcao => opcao.checked)) {
            const erroMedicacao = medicacaoCont[0].closest(".opcoes").querySelector(".erro");
            erroMedicacao.textContent = "Informe se há necessidade de medicação contínua.";
            erroMedicacao.style.display = "block";  // Exibe erro
            valido = false;
        }

        valido ? alert("Formulário enviado!") : alertaCampos();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const secoes = document.querySelectorAll('.secao');
    const etapas = document.querySelectorAll('.etapa');
    let secaoAtual = 0;

    const mostrarSecao = (index) => {
        secoes.forEach((secao, i) => {
            secao.style.display = i === index ? 'block' : 'none';
            secao.classList.toggle('ativa', i === index);
        });

        atualizarProgresso(index);
    };

    const atualizarProgresso = (index) => {
        const idSecao = secoes[index].id;

        etapas.forEach(etapa => {
            if (etapa.dataset.secao === idSecao) {
                etapa.classList.add('ativa');
            } else {
                etapa.classList.remove('ativa');
            }
        });
    };

    window.proximaSecao = () => {
        if (secaoAtual < secoes.length - 1) {
            secaoAtual++;
            mostrarSecao(secaoAtual);
        }
    };

    window.voltarSecao = () => {
        if (secaoAtual > 0) {
            secaoAtual--;
            mostrarSecao(secaoAtual);
        }
    };

    // Atalho opcional: clique em uma etapa da barra de progresso para ir direto a ela
    etapas.forEach(etapa => {
        etapa.addEventListener('click', () => {
            const idDestino = etapa.dataset.secao;
            const index = [...secoes].findIndex(secao => secao.id === idDestino);
            if (index !== -1) {
                secaoAtual = index;
                mostrarSecao(index);
            }
        });
    });

    mostrarSecao(secaoAtual);
});

const atualizarProgresso = (indexAtual) => {
    const idSecao = secoes[indexAtual].id;

    etapas.forEach((etapa, i) => {
        const idEtapa = etapa.dataset.secao;
        const indexSecao = [...secoes].findIndex(secao => secao.id === idEtapa);

        etapa.classList.remove('ativa', 'completa');

        if (indexSecao < indexAtual) {
            etapa.classList.add('completa');
        } else if (indexSecao === indexAtual) {
            etapa.classList.add('ativa');
        }
    });
};

