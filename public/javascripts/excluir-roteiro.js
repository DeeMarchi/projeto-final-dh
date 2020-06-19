function eventoExcluirRoteiro(event) {
    const elementoRoteiro = acharPai(event.target, function(elemento) {
        return elemento.tagName !== 'ARTICLE';
    });
    if (!elementoRoteiro) {
        throw new Error('roteiro não encontrado');
    };

    const idRoteiro = extrairIdInt(elementoRoteiro.id, '-');
    if (!Number.isInteger(idRoteiro)) {
        throw new Error('id do roteiro não encontrado');
    };

    const info = JSON.stringify({
        id: idRoteiro,
    });
    


}

function getBotoesExcluirRoteiro() {
    const btnsExcluirRoteiro = document.querySelectorAll('.excluir-icone');

    for (let i = 0, len = btnsExcluirRoteiro.length; i < len; ++i) {
        btnsExcluirRoteiro[i].addEventListener('click', eventoExcluirRoteiro);
    }
}

getBotoesExcluirRoteiro();
