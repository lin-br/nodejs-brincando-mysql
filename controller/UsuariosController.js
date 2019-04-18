const router = require('express').Router();
const UsuariosService = require('../service/UsuariosService');

router.post('/', (request, response) => {
    let {usuario, senha} = request.body;

    UsuariosService.cadastrarUsuario(usuario, senha)
        .then((lastId) => response
            .header('Location', request.originalUrl.concat(lastId))
            .status(201)
            .send())
        .catch(erro => {
            console.log(erro);
            response.status(500).send();
        });
});

router.get('/:id', (request, response) => {
    let id = request.params.id;

    UsuariosService.consultarUsuario(id)
        .then(usuario => {
            if (usuario)
                response.send(usuario);
            response.status(404).send();
        })
        .catch(erro => {
            console.log(erro);
            response.status(500).send();
        })
});

module.exports = router;