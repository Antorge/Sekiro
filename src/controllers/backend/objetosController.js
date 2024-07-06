const fs = require('fs');
const path = require('path');

const Objeto = require('../../models/backend/objetosModel'); // Asegúrate de que la ruta sea correcta
const loadAppHtml = require('../../utils/loadAppHtml');

function ingresarObjeto(req, res) {
    const filePath = path.join(__dirname, '../../views/backend/partials/objetos_form_ingresar.html');
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        loadAppHtml('backend', 'objetos_ingresar', `${process.env.APP_NAME}: Módulo Objetos`, htmlContent, res);
    } catch (err) {
        console.error('Error al leer el archivo HTML:', err);
    }
}
async function listarObjetos(req, res) {
    try {
        const objetos = await Objeto.listarObjetos();
        let html;
        if (objetos.length > 0) {
            html = '<h3>Listado de Objetos</h3>';
            html += '<table class="">' +
                '<tr>' +
                '<th>#</th>' +
                '<th>Nombre</th>' +
                '<th>Descripción</th>' +
                '<th>Efecto</th>' +
                '<th>Precio</th>' +
                '<th>Operaciones</th>' +
                '</tr>';
            objetos.forEach(objeto => {
                html += `<tr>` +
                    `<td> ${objeto.id_objeto} </td>` +
                    `<td> ${objeto.nombre} </td>` +
                    `<td> ${objeto.descripcion} </td>` +
                    `<td> ${objeto.efecto} </td>` +
                    `<td> ${objeto.precio} </td>` +
                    `<td><a class="btn btn-primary" href='/sitio-admin/modulo-editar-objeto/${objeto.id_objeto}'> Editar </a> </td>` +
                    `<td><a class="btn btn-primary" href='/sitio-admin/modulo-eliminar-objeto/${objeto.id_objeto}'> Eliminar </a> </td>` +
                    `</tr>`;
            });
            html += '</table>';
        } else {
            html = '<h3>Sin Objetos</h3>';
        }

        loadAppHtml('backend', 'objetos_listar', `${process.env.APP_NAME}: Módulo Objetos`, html, res);
    } catch (error) {
        console.error('Error al listar objetos en el controlador:', error);
        res.status(500).send('Error al obtener la lista de objetos');
    }
}
     

async function editarObjeto(req, res) {
    const idObjeto= req.params.id;
    const objeto = new Objeto(idObjeto);
    await objeto.buscarObjeto();
    const filePath = path.join(__dirname, '../../views/backend/partials/objetos_form_editar.html');
    try {
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        htmlContent = htmlContent.replace('{{ id_objeto }}', objeto.id_objeto);
        htmlContent = htmlContent.replace('{{ nombre }}', objeto.nombre);
        htmlContent = htmlContent.replace('{{ descripcion }}', objeto.descripcion);
        htmlContent = htmlContent.replace('{{ efecto }}', objeto.efecto);
        htmlContent = htmlContent.replace('{{ precio }}', objeto.precio);
        loadAppHtml('backend', 'objetos_editar', `${process.env.APP_NAME}: Módulo Objetos`, htmlContent, res);
    } catch (error) {
        console.error('Error al leer el archivo HTML:', error);
    }
}

async function guardarEdicion_objeto(req, res) {
    let user = req.session.user;
    const { id_objeto, nombre, descripcion, efecto, precio } = req.body;
    const objeto = new Objeto(id_objeto, nombre, descripcion, efecto, precio);
    const respuesta = await objeto.editarObjeto();
    if (respuesta) {
        req.flash('msg', 'Se ha editado');
        res.status(200).json({ message: `Objeto ${nombre} editado correctamente.` });
    } else {
        req.flash('msg', 'No se ha podido editar.');
        res.status(404).json({ message: `No se pudo editar el objeto ${nombre}.` });
    }
}

async function saveNewObjeto(req, res) {
    let user = req.session.user;
    const { id_objeto, nombre, descripcion, efecto, precio } = req.body;
    const objeto = new Objeto(id_objeto,nombre, descripcion, efecto, precio);
    const respuesta = await objeto.agregarObjeto();
    if (respuesta) {
        req.flash('msg', 'Se ha agregado');
        res.status(200).json({ message: `Objeto ${nombre} agregado correctamente.` });
    } else {
        req.flash('msg', 'No se ha podido agregar.');
        res.status(404).json({ message: `No se pudo agregar el objeto ${nombre}.` });
    }
}

async function eliminarObjeto(req, res) {
    const id_objeto = req.params.id;
    const objeto = new Objeto(id_objeto);
    const respuesta = await objeto.eliminarObjeto();
    if (respuesta) {
        req.flash('msg', 'Se ha eliminado');
        res.redirect('/sitio-admin/modulo-listar-objetos'); // Redirige a la página de listar objetos
    } else {
        req.flash('msg', 'No se ha podido eliminar.');
        res.status(404).json({ message: `No se pudo eliminar el objeto ${id_objeto}.` });
    }
}

module.exports = { ingresarObjeto, listarObjetos, editarObjeto, guardarEdicion_objeto, saveNewObjeto, eliminarObjeto };
