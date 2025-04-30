const params = new URLSearchParams(window.location.search);
const acessoNegado = params.get('level');

if (acessoNegado === 'low') {
    alert("🚫 Acesso negado!\nVocê não tem permissão para essa ação.");
}
