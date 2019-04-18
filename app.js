const express = require('express');
const UsuariosController = require('./controller/UsuariosController');

const app = express();

app.use(express.json());
app.use('/usuarios/', UsuariosController);

app.listen('3000', function () {
    console.log(`Servidor WEB ligado na porta: ${this.address().port}`);
});