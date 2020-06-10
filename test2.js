const { Usuario, Roteiro, Curtida } = require('./models');

const test = async () => {
    const curtidasUsuario = await Curtida.findAll({
        include: [
            {
                model: Usuario,
                as: 'usuario',
                required: true,
            },
        ],
    });

    console.log(curtidasUsuario);
};

test();