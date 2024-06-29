const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');
const authMiddleware = require('../controllers/middlewares/authMiddleware'); // Importa el middleware

const tipo_plantilla = 'frontend';

router.get('/', (req, res) => {
    loadAppHtml(tipo_plantilla, 'index',`${process.env.APP_NAME}: Home` , 'Bienvenido al sitio principal', res);
});

router.get('/usuarios', (req, res) => {
    loadAppHtml(tipo_plantilla, 'usuarios', `${process.env.APP_NAME}: Módulo Usuarios`, 'Gestión de usuarios', res);
});

router.get('/clientes', (req, res) => {
    loadAppHtml(tipo_plantilla, 'clientes', `${process.env.APP_NAME}: Módulo Clientes`, 'Gestión de Clientes', res);
});

router.get('/proveedores', (req, res) => {
    loadAppHtml(tipo_plantilla, 'proveedores', `${process.env.APP_NAME}: Módulo Proveedores`, 'Gestión de Proveedores', res);
});
router.get('/objetos',(req, res) => {
    loadAppHtml(tipo_plantilla, 'objetos', `${process.env.APP_NAME}: Módulo Objetos`, 'Gestión de Proveedores', res);
});


module.exports = router;
