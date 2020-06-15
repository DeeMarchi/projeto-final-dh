function eventoCurtirRoteiro(event) {
    const elementoRoteiro = acharPai(event.target, function(elemento) {
        return elemento.tagName !== 'SECTION';
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
    const divMensagens = elementoRoteiro.querySelector('#curtir-roteiro-msg-' + idRoteiro);
    if (divMensagens.childElementCount === 0) {
        solicitarPost('/curtir/roteiro/' + idRoteiro, info)
            .then(function(msg) {
                const ATRASO_MSG = 3000;
                const pMensagem = document.createElement('p');
                pMensagem.innerText = msg;
                
                exibirMensagem(pMensagem, divMensagens, ATRASO_MSG);
            });
    }
}

function getBotoesCurtirRoteiro() {
    const btnsCurtirRoteiro = document.querySelectorAll('[alt="Curtir"]');

    for (let i = 0, len = btnsCurtirRoteiro.length; i < len; ++i) {
        btnsCurtirRoteiro[i].addEventListener('click', eventoCurtirRoteiro);
    }
}

getBotoesCurtirRoteiro();
