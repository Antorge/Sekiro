const DataBase = require('../conexionModel');

class Jefe {
    constructor(id_jefe, nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate) {
        this.id_jefe = id_jefe;
        this.nombre = nombre;
        this.fase_combate = fase_combate;
        this.debilidades = debilidades;
        this.habilidades_movimientos = habilidades_movimientos;
        this.tipo_jefe = tipo_jefe;
        this.recompensas = recompensas;
        this.dificultad = dificultad;
        this.historia = historia;
        this.consejos_combate = consejos_combate;
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