//Consultas a la base de datos
const pool = require('../config/db');
const format = require('pg-format');



//consulta de todos los productos
// const getProducts = async() =>{
//     const { rows: result } = await pool.query('SELECT * FROM inventario');
//     return result;
// }

//consulta limitada
//el limite se le pasa a la funcion como argumento, y luego a la query. ej:
//luego hay que modificar la url acorde, en routes/routes.js
// const getProducts = async ({ limits = 8 }) => {
//     const { rows: result } = await pool.query('SELECT * FROM inventario LIMIT $1', [limits]);
//     return result;
// }

// //consulta limitada con orden
// const getProductsOrder = async ({ limits = 8, order_by = "stock_DESC" }) => {
//     const [campo, direccion] = order_by.split('_');
//     const formatQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s",
//         campo,
//         direccion,
//         limits
//     );
//     const { rows: result } = await pool.query(formatQuery);
//     return result;
// };

//paginacion
const getJoyasQuery = async ({ limits = 3, page = 1, order_by = "stock_ASC" }) => {
    try {
        const [campo, direccion] = order_by.split('_');
        //calcular el offset o paginas a mostrar
        const offset = (page - 1) * limits;
        const formatQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
            campo,
            direccion,
            limits,
            offset
        );
        const { rows: result } = await pool.query(formatQuery);
        return result;

    } catch (error) {
        error: error.message

    }

}

const filtrarJoyasQuery = async (precio_max, precio_min, categoria, metal) => {
    let query = 'SELECT * FROM inventario WHERE 1=1';
    const values = [];

    if (precio_max) {
        query += ' AND precio <= $' + (values.length + 1);
        values.push(precio_max);
    }

    if (precio_min) {
        query += ' AND precio >= $' + (values.length + 1);
        values.push(precio_min);
    }

    if (categoria) {
        query += ' AND categoria = $' + (values.length + 1);
        values.push(categoria);
    }

    if (metal) {
        query += ' AND metal = $' + (values.length + 1);
        values.push(metal);
    }

    const { rows } = await pool.query(query, values);
    return rows;
}


// url prueba filtros
// http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria =aros&metal=plata


module.exports = {
    getJoyasQuery,
    filtrarJoyasQuery
};