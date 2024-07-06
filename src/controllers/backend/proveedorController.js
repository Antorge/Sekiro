const fs = require('fs');
const path = require('path');

const Cliente = require('../../models/backend/proveedoresModel');
const  loadAppHtml  = require('../../utils/loadAppHtml');


function ingresarCliente(req, res)
{

    const filePath = path.join(__dirname, '../../views/backend/partials/clientes_form_ingresar.html');

    try {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
    
        loadAppHtml('backend', 'clientes_ingresar', `${process.env.APP_NAME}: Módulo Clientes`, htmlContent, res);

    } catch (err) {
        console.error('Error al leer el archivo HTML:', err);
    }
    
}

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
                    `<td><a class="btn btn-primary" href='/sitio-admin/modulo-editar-cliente/${jefe.id_jefe}'> Editar </a> </td>` +
                    `<td><a class="btn btn-primary" href='/sitio-admin/modulo-eliminar-cliente/${jefe.id_jefe}'> Eliminar </a> </td>` +
                    `</tr>`;
            });
            html += '</table>';
        } else {
            html = '<h3>Sin Jefes</h3>';
        }       

        // Llama a la función para cargar la vista con los clientes listados
        loadAppHtml('backend', 'clientes_listar', `${process.env.APP_NAME}: Módulo Clientes`, html, res);
    } catch (error) {
        console.error('Error al listar clientes en el controlador:', error);
        // Manejo de errores: podrías enviar un mensaje de error o renderizar una página de error
        res.status(500).send('Error al obtener la lista de clientes');
    }
}


async function editarCliente(req, res) {
    const jefeId = req.params.id;
    const jefe = new Cliente(jefeId);  // Renaming 'cliente' to 'jefe' for clarity and consistency
    await jefe.buscarJefe();  // Ensure this function populates the 'jefe' object with data
    const filePath = path.join(__dirname, '../../views/backend/partials/clientes_form_editar.html');
    try {
        // Lee el contenido del archivo HTML
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        htmlContent = htmlContent.replace('{{ id_jefe }}', jefe.id_jefe);
        htmlContent = htmlContent.replace('{{ nombre }}', jefe.nombre);
        htmlContent = htmlContent.replace('{{ fase_combate }}', jefe.fase_combate);
        htmlContent = htmlContent.replace('{{ debilidades }}', jefe.debilidades);
        htmlContent = htmlContent.replace('{{ habilidades_movimientos }}', jefe.habilidades_movimientos);
        htmlContent = htmlContent.replace('{{ tipo_jefe }}', jefe.tipo_jefe);
        htmlContent = htmlContent.replace('{{ recompensas }}', jefe.recompensas);
        htmlContent = htmlContent.replace('{{ dificultad }}', jefe.dificultad);
        htmlContent = htmlContent.replace('{{ historia }}', jefe.historia);
        htmlContent = htmlContent.replace('{{ consejos_combate }}', jefe.consejos_combate);
        loadAppHtml('backend', 'clientes_editar', `${process.env.APP_NAME}: Módulo Jefes`, htmlContent, res);
    } catch (error) {
        console.error('Error al leer el archivo HTML:', error);
    }
}


async function guardarEdicion(req, res) {
    let user = req.session.user;
    const { id_jefe, nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate } = req.body;
    const jefe = new Cliente(id_jefe, nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate);
    const respuesta = await jefe.editarJefe();
    if (respuesta) {
        req.flash('msg', 'Se ha editado');
        res.status(200).json({ message: `Jefe ${nombre} editado correctamente.` });
    } else {
        req.flash('msg', 'No se ha podido editar.');
        res.status(404).json({ message: `No se pudo editar el jefe ${nombre}.` });
    }
}

async function saveNewCliente(req, res)
{
    let user = req.session.user;
    const { id_jefe, nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate } = req.body;
    const jefe = new Cliente(id_jefe, nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate);
    const respuesta = await jefe.agregarJefe();
    if (respuesta) {
        req.flash('msg', 'Se ha agregado');
        res.status(200).json({ message: `Jefe ${nombre} agregado correctamente.` });
    } else {
        req.flash('msg', 'No se ha podido agregar.');
        res.status(404).json({ message: `No se pudo agregar el jefe ${nombre}.` });
    }
}


async function eliminarCliente(req, res) {
    const jefeId = req.params.id;
    const jefe = new Cliente(jefeId);
    const respuesta = await jefe.eliminarJefe();
    if (respuesta) {
        req.flash('msg', 'Se ha eliminado');
        res.redirect('/sitio-admin/modulo-listar-clientes'); // Redirige a la página de listar clientes
    } else {
        req.flash('msg', 'No se ha podido eliminar.');
        res.status(404).json({ message: `No se pudo eliminar el jefe ${jefeId}.` });
    }
}

module.exports = { ingresarCliente,  listarClientes, editarCliente, guardarEdicion, saveNewCliente, eliminarCliente};