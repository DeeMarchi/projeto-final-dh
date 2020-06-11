const btnCurtirRoteiro = $('[alt=Curtir]');

function getIdInt(texto='', separador) {
    const i = texto.indexOf(separador);
    if (i >= 0) {
        const id = Number(texto.substr(i + 1));

        return id;
    }
    return null;
}

function exibirMensagem(msg, elemento, atraso) {
    $(elemento).append(msg);
    setTimeout(function() {
        $(elemento).empty();
    }, atraso);
}

function embrulharMensagem(tag, msg) {
    return '<' + tag + '>' + msg + '</' + tag + '>';
}

btnCurtirRoteiro.on('click', function() {
    const elemRoteiro = $(this).closest('section')
    const idRoteiro = elemRoteiro.attr('id');
    const idInt = getIdInt(idRoteiro, '-');
    const divMensagens = elemRoteiro.find('#curtir-roteiro-msg-' + idInt);
    const ATRASO_MENSAGEM = 4000;

    if (Number.isInteger(idInt)) {
        $.ajax({
            url: '/curtir/roteiro/' + idInt,
            method: 'POST',
            data: {
                id: idInt,
            },
            success: function(data, textStatus, jqXHR) {
                const mensagem = $().add(embrulharMensagem('p', data));

                exibirMensagem(mensagem, divMensagens, ATRASO_MENSAGEM);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                const mensagem = $().add(embrulharMensagem('p', jqXHR.responseText));

                exibirMensagem(mensagem, divMensagens, ATRASO_MENSAGEM);
            },
        });
    }
});
