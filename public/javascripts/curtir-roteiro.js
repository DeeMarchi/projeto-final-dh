const btnsCurtirRoteiro = document.querySelectorAll('[alt="Curtir"]');

async function gostarRoteiroPost(infoBody) {
    if (!infoBody) {
        throw new TypeError('Body não pode ser vazio!');
    }

    const res = await fetch('/curtir/roteiro/' + infoBody.id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(infoBody),
    });
    const msg = await res.text();

    return msg;
}

function exibirMensagem(elementoMsg, elementoPai, atraso) {
    elementoPai.appendChild(elementoMsg);
    setTimeout(function() {
        elementoPai.removeChild(elementoMsg);
    }, atraso);
}

function extrairIdInt(texto='', separador) {
    const i = texto.indexOf(separador);
    if (!texto) {
        throw new TypeError('String para busca está vazia')
    }
    if (i < 0) {
        throw new Error('Separador não encontrado');
    }
    return Number(texto.substr(i + 1));
}

function acharPai(elemento, callback) {
    if (!elemento || !callback) {
        throw new TypeError('Há algum parâmetro faltando');
    }
    if (typeof(callback) !== 'function') {
        throw new TypeError('Callback precisa ser uma função');
    }
    let temp = elemento;

    while (callback(temp)) {
        temp = temp.parentNode;
    }

    return temp;
}

function eventoCurtirRoteiro(event) {
    const ATRASO_MSG = 3000;
    const elementoRoteiro = acharPai(event.target, function(elemento) {
        return elemento && elemento.tagName !== 'SECTION';
    });
    if (!elementoRoteiro) {
        throw new Error('roteiro não encontrado');
    };
    const idRoteiro = extrairIdInt(elementoRoteiro.id, '-');
    if (!Number.isInteger(idRoteiro)) {
        throw new Error('id do roteiro não encontrado');
    };

    const info = {
        id: idRoteiro,
    };
    const divMensagens = elementoRoteiro.querySelector('#curtir-roteiro-msg-' + idRoteiro);
    if (divMensagens.childElementCount === 0) {
        gostarRoteiroPost(info)
            .then(function(msg) {
                const pMensagem = document.createElement('p');
                pMensagem.innerText = msg;
                
                exibirMensagem(pMensagem, divMensagens, ATRASO_MSG);
            });
    }
}

for (let i = 0, len = btnsCurtirRoteiro.length; i < len; ++i) {
    btnsCurtirRoteiro[i].addEventListener('click', eventoCurtirRoteiro);
}
