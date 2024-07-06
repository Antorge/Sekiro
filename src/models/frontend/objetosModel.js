const DataBase = require('../conexionModel');

class Objeto {
    constructor(id_objeto, nombre, descripcion, efecto, precio) {
        this.id_objeto = id_objeto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.efecto = efecto;
        this.precio = precio;
    }

    static async listarJefes() {
        const db = DataBase.getInstance(); // Obtiene una instancia de la conexión a la base de datos
        try {
            // Ejemplo de consulta SQL para listar todos los jefes
            const query = 'SELECT * FROM jefes_sekiro';
            const jefes = await db.ejecutarQuery(query);
            console.log('Jefes encontrados:', jefes);
            return jefes;
        } catch (error) {
            console.error('Error al listar jefes:', error);
            throw error;
        }
    }

}
module.exports = Objeto;