function newsletterEnviar(event) {
    event.preventDefault();
    const input = document.getElementById('email');
    const divMensagem = document.getElementById('footer-msgs');

    const info = JSON.stringify({
        email: input.value,
    });

    if (divMensagem.childElementCount === 0) {
        solicitarPost('/newsletter/inscrever', info)
            .then(function(msg) {
                const ATRASO_MSG = 3000;
                const pMensagem = document.createElement('p');
    
                pMensagem.classList.add('text-center');
                pMensagem.innerText = msg;
    
                exibirMensagem(pMensagem, divMensagem, ATRASO_MSG);
            })
            .finally(function() {
                input.value = '';
            });
    }
}

function getForm() {
    const footer = document.querySelector('footer');
    let form;
    if (footer) {
        form = footer.querySelector('form');
    }
    if (form) {
        footer.addEventListener('submit', newsletterEnviar);
    }
}

getForm();
