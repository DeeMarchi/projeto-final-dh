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
 * @returns Retorna o elemento pai de acordo com o critério  
 *  Caso o elemento não puder ser encontrado retorna NULL
 */
function acharPai(elemento, callback) {
    if (!elemento || !callback) {
        throw new TypeError('Há algum parâmetro faltando');
    }
    if (typeof(callback) !== 'function') {
        throw new TypeError('Callback precisa ser uma função');
    }
    let temp = elemento;

    while (temp !== null && callback(temp)) {
        temp = temp.parentNode;
    }

    return temp;
}

/**
 * @param { Node } elementoMsg Elemento para exibir no container pai
 * @param { Node } elementoPai O container onde a mensagem será inserida
 * @param { Number } atraso Um número em milissegundos indicando por quanto tempo a mensagem permanece na tela
 *  O Atraso é opcional
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
