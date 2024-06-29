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

    async agregarJefe() {
        const db = DataBase.getInstance(); // Obtiene una instancia de la conexión a la base de datos
        try {
            // Ejemplo de consulta SQL para insertar un nuevo jefe
            const query = 'INSERT INTO jefes (nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const params = [this.nombre, this.fase_combate, this.debilidades, this.habilidades_movimientos, this.tipo_jefe, this.recompensas, this.dificultad, this.historia, this.consejos_combate];
            const resultado = await db.ejecutarQuery(query, params);
            console.log('Jefe agregado correctamente:', resultado);
            return resultado;
        } catch (error) {
            console.error('Error al agregar jefe:', error);
            throw error;
        }
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

    async buscarJefe() {
        const db = DataBase.getInstance(); // Obtiene una instancia de la conexión a la base de datos
        try {
            const query = 'SELECT * FROM jefes_sekiro WHERE id_jefe=?';
            const jefe = await db.ejecutarQuery(query, [this.id_jefe]);
            console.log('Jefe encontrado:', jefe);
            // Asignar los datos del jefe encontrado a los atributos del objeto
            if (jefe.length > 0) {
                const { id_jefe, nombre, fase_combate, debilidades, habilidades_movimientos, tipo_jefe, recompensas, dificultad, historia, consejos_combate } = jefe[0];
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
            return jefe;
        } catch (error) {
            console.error('Error al buscar el jefe:', error);
            throw error;
        }
    }

    async editarJefe() {
        const db = DataBase.getInstance();
        try {
            const query = 'UPDATE jefes_sekiro SET nombre=?, fase_combate=?, debilidades=?, habilidades_movimientos=?, tipo_jefe=?, recompensas=?, dificultad=?, historia=?, consejos_combate=? WHERE id_jefe=?';
            const resultado = await db.ejecutarQuery(query, [
                this.nombre, 
                this.fase_combate, 
                this.debilidades, 
                this.habilidades_movimientos, 
                this.tipo_jefe, 
                this.recompensas, 
                this.dificultad, 
                this.historia, 
                this.consejos_combate, 
                this.id_jefe
            ]);
            // Verificar si se modificó el registro
            if (resultado.affectedRows > 0) {
                console.log('Jefe actualizado con éxito');
                return true;
            } else {
                console.log('No se encontró el jefe con el ID especificado o no hubo cambios en los datos');
                return false;
            }
        } catch (error) {
            console.error('Error al editar el jefe:', error);
            throw error;
        }
    }
}

module.exports = Jefe;
