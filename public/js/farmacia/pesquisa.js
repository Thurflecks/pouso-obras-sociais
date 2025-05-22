const inputBusca = document.getElementById('busca');
const listaResultados = document.getElementById('resultados');
const prodnotFound = document.querySelector('.prodnotFound');


inputBusca.addEventListener('input', async () => {
    const termo = inputBusca.value;

    if (termo.length === 0) {
        listaResultados.innerHTML = '';
        return;
    }

    if (termo.length >= 3) {
        try {
            const resposta = await fetch('/admin/farmacia/medicamentos/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ termo })
            });
            const produtos = await resposta.json();

            listaResultados.innerHTML = '';
            if (produtos.length === 0) {
                const anotfound = document.createElement('a');
                anotfound.classList.add('anotfound');
                anotfound.href = '/admin/farmacia/medicamentos/add';
                anotfound.textContent = 'Adicionar mesmo assim.';
                prodnotFound.appendChild(anotfound)
            } else {
                produtos.forEach(produto => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `/admin/farmacia/medicamentos/add/${produto.id}`;
                    a.textContent = produto.NOME_PRODUTO;
                    li.appendChild(a);
                    listaResultados.appendChild(li);
                });
            }
        } catch (erro) {
            console.error('Erro ao buscar produtos:', erro);
        }
    }
});