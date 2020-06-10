const btnCurtirRoteiro = $('[alt=Curtir]');

function getIdInt(texto='', separador) {
    const i = texto.indexOf(separador);
    if (i >= 0) {
        const id = Number(texto.substr(i + 1));

        return id;
    }
    return null;
}

btnCurtirRoteiro.on('click', function() {
    const idRoteiro = $(this).closest('section').attr('id');
    const idInt = getIdInt(idRoteiro, '-');

    if (Number.isInteger(idInt)) {
        $.ajax({
            url: '/curtir/roteiro/' + idInt,
            method: 'POST',
            data: {
                id: idInt,
            }
        });
    }
});
