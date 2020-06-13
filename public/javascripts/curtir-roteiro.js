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

/**
 * @param { Node } elementoMsg Elemento para exibir no container pai
 * @param { Node } elementoPai O container onde a mensagem será inserida
 * @param { Number } atraso Um número em milissegundos indicando por quanto tempo a mensagem permanece na tela
 * O Atraso é opcional
 */
function exibirMensagem(elementoMsg, elementoPai, atraso=0) {
    if (!elementoMsg || !elementoPai) {
        throw new TypeError('Está faltando alguns dos elementos');
    }
    elementoPai.appendChild(elementoMsg);
    setTimeout(function() {
        elementoPai.removeChild(elementoMsg);
    }, atraso);
}

/**
 * Tenta extrair um número de uma string através de um separador
 * 
 * @param { String } texto Uma string qualquer
 * @param { String } separador Um caractere
 * 
 * @example extrairIdInt('teste-5', '-')
 * return 5
 * 
 * @example extrairIdInt('teste-outro-teste-5', '-')
 * return NaN
 * 
 * @returns Retorna um número, pode retornar NaN caso a string depois do separador não formar um número
 */
function extrairIdInt(texto='', separador) {
    const i = texto.indexOf(separador);
    if (!texto) {
        throw new TypeError('String para busca está vazia')
    }
    if (i < 0) {
        throw new Error('Separador não encontrado');
    }
    if (i + 1 === texto.length) {
        throw new Error('Não há nada após o separador');
    }
    return Number(texto.substr(i + 1));
}

/**
 * Encontra um elemento pai no DOM 
 *  a partir de um elemento filho
 *  
 * A implementação do callback dita como será o critério de busca
 * 
 * @param { Node } elemento O elemento HTML
 * @param { Function } callback A função de busca(deve retornar um booleano)
 * 
 * @returns Retorna o elemento pai de acordo com o critério  Caso o elemento não puder ser encontrado retorna NULL
 */
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
                const ATRASO_MSG = 3000;
                const pMensagem = document.createElement('p');
                pMensagem.innerText = msg;
                
                exibirMensagem(pMensagem, divMensagens, ATRASO_MSG);
            });
    }
}

for (let i = 0, len = btnsCurtirRoteiro.length; i < len; ++i) {
    btnsCurtirRoteiro[i].addEventListener('click', eventoCurtirRoteiro);
}
