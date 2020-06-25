var dia = 1;
const opcoes = document.getElementsByClassName('option-coin');

let moedas = [];

for (let i = 0; i < opcoes.length; i++) {
    moedas.push(opcoes[i].outerHTML);
}

function roteiroCampo() {
    if (dia < 30) {
        dia++;
    }
    if (dia >= 30) {
        document.getElementById('adicionarDia').style.visibility = 'hidden';
    }
    var objTo = document.getElementById('roteiro-campos');
    var divtest = document.createElement('div');

    document.getElementById('btnRemover').style.visibility = 'visible';
    if (dia <= 30) {
        document.getElementById('qntDias').innerHTML = contadorDias();
        document.getElementById("dias").value = dia;
    }
    if (dia <= 30) {
        divtest.innerHTML = `<div id="principal" class="shadow mt-2 form-group dynamic-element list-group list-group-item flex-col align-items-start rounded-lg"> <div class="row"> <div class="col-1 "> <div class="col-1 mb-2 mt-n2 "><h3><span class=" shadow badge badge-primary float-left">Dia ${dia}</span></h3></div> </div> </div> <div class="form-group row"> <div class=" col-sm-4 col-lg-6 col-md-5 float-left"> <label><strong>Relatos do dia:</strong></label> <textarea type="text" name="relato${dia}" class="form-control" row="5" placeholder="Descreva como foram os passeios realizados neste dia" required></textarea> <sub class="form-text text-muted"></s> </div> <div class="col-sm-4 col-lg-6 col-md-6 float-left"> <label><strong>Locais por onde passei:</strong></label> <input type="text" data-role="taginput" data-cls-tag-title="text-bold fg-white" data-cls-tag="bg-olive" data-cls-tag-remover="bg-darkOlive fg-white" data-tag-trigger="Comma" data-random-color="true" data-max-tags="5" name="locais${dia}" placeholder="Locais que visitou neste dia" required> <sub class="form-text text-muted">Locais que visitou neste dia</s> </div> </div> <div class="form-group row"> <div class="col-sm-4 col-lg-6 col-md-6 float-left"> <label class="col-form-label"><strong>Média de Gastos:</strong></label> <div class="input-group mb-3"> <div class="input-group-prepend"> <select class="form-control custom select" name="selectMoeda${dia}">${moedas}</select> </div> <input type="number" name="valor${dia}" class="form-control" aria-label="Amount (to the nearest dollar)" required> <div class="input-group-append"> <span class="input-group-text">.00</span> </div> </div> </div> </div> </div>`;

        divtest.setAttribute('class', 'form-group removeclass' + dia);

        objTo.appendChild(divtest);
    }
}

function removerCampoRoteiro() {
    if (dia == 2) {
        document.getElementById('btnRemover').style.visibility = 'hidden';
    }

    $('.removeclass' + dia).remove();
    dia = dia - 1;
    document.getElementById('qntDias').innerHTML = contadorDias();
    document.getElementById("dias").value = dia;

    if (dia < 30) {
        document.getElementById('adicionarDia').style.visibility = 'visible';
    }
}

const contadorDias = () => {
    return 'Quantidade total de dias: ' + dia;
}

document.getElementById('qntDias').innerHTML = contadorDias();
document.getElementById('dias').setAttribute('value', dia);
