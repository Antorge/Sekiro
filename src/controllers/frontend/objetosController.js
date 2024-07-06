const fs = require('fs');
const path = require('path');

const Objeto = require('../../models/frontend/objetosModel'); // Asegúrate de que la ruta sea correcta
const loadAppHtml = require('../../utils/loadAppHtml');


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
                    `</tr>`;
            });
            html += '</table>';
        } else {
            html = '<h3>Sin Objetos</h3>';
        }

        loadAppHtml('frontend', 'objetos_listar', `${process.env.APP_NAME}: Módulo Objetos`, html, res);
    } catch (error) {
        console.error('Error al listar objetos en el controlador:', error);
        res.status(500).send('Error al obtener la lista de objetos');
    }
}
module.exports = {listarObjetos};