const fs = require('fs');
const path = require('path');

const Cliente = require('../../models/frontend/proveedoresModel');
const  loadAppHtml  = require('../../utils/loadAppHtml');


async function listarClientes(req, res) {
    try {
        // Llama a la función estática del modelo para obtener los jefes
        const jefes= await Cliente.listarJefes();
        let html;
        if (jefes.length > 0) {
            html = '<h3>Listado de Jefes</h3>';
            html += '<table class="">' +
                '<tr>' +
                '<th>#</th>' +
                '<th>Nombre</th>' +
                '<th>Fase de Combate</th>' +
                '<th>Debilidades</th>' +
                '<th>Habilidades y Movimientos</th>' +
                '<th>Tipo de Jefe</th>' +
                '<th>Recompensas</th>' +
                '<th>Dificultad</th>' +
                '<th>Historia</th>' +
                '<th>Consejos de Combate</th>' +
                '<th>Operaciones</th>' +
                '<tr>';
            jefes.forEach(jefe => {
                html += `<tr>` +
                    `<td> ${jefe.id_jefe} </td>` +
                    `<td> ${jefe.nombre} </td>` +
                    `<td> ${jefe.fase_combate} </td>` +
                    `<td> ${jefe.debilidades} </td>` +
                    `<td> ${jefe.habilidades_movimientos} </td>` +
                    `<td> ${jefe.tipo_jefe} </td>` +
                    `<td> ${jefe.recompensas} </td>` +
                    `<td> ${jefe.dificultad} </td>` +
                    `<td> ${jefe.historia} </td>` +
                    `<td> ${jefe.consejos_combate} </td>` +
                    `</tr>`;
            });
            html += '</table>';
        } else {
            html = '<h3>Sin Jefes</h3>';
        }       

        // Llama a la función para cargar la vista con los clientes listados
        loadAppHtml('frontend', 'clientes_listar', `${process.env.APP_NAME}: Módulo Clientes`, html, res);
    } catch (error) {
        console.error('Error al listar clientes en el controlador:', error);
        // Manejo de errores: podrías enviar un mensaje de error o renderizar una página de error
        res.status(500).send('Error al obtener la lista de clientes');
    }
}