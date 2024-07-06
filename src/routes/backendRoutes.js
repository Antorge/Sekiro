const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');
const authMiddleware = require('../controllers/middlewares/authMiddleware'); // Importa el middleware
const { dashboard } = require('../controllers/backend/dashboardController');
const { ingresarCliente, listarClientes, editarCliente, guardarEdicion, saveNewCliente, eliminarCliente } = require('../controllers/backend/proveedorController');


const tipo_plantilla = 'backend';

router.get('/dashboard', authMiddleware, dashboard);


router.get('/modulo-usuarios', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'usuarios', `${process.env.APP_NAME}: Módulo Usuarios`, 'Gestión de usuarios', res);
});

router.get('/modulo-clientes', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'clientes', `${process.env.APP_NAME}: Módulo Clientes`, 'Gestión de Clientes', res);
});

router.get('/modulo-proveedores', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'proveedores', `${process.env.APP_NAME}: Módulo Proveedores`, 'Gestión de Proveedores', res);
});
router.get('/modulo-objetos', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'objetos', `${process.env.APP_NAME}: Módulo Objetos`, 'Gestión de Proveedores', res);
});


router.get('/modulo-ingresar-clientes', authMiddleware, ingresarCliente);
router.get('/modulo-listar-clientes', authMiddleware, listarClientes);
router.get('/modulo-editar-cliente/:id', authMiddleware, editarCliente);
router.post('/modulo-editar-cliente', authMiddleware, guardarEdicion);
router.post('/modulo-ingresar-clientes', authMiddleware, saveNewCliente);
router.get('/modulo-eliminar-cliente/:id', authMiddleware, eliminarCliente);
router.post('/modulo-eliminar-cliente', authMiddleware, eliminarCliente);


module.exports = router;


