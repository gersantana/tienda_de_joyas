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
const getProducts = async({limit = 8}) =>{
    const { rows: result } = await pool.query('SELECT * FROM inventario LIMIT $1', [limit]);
    return result;
}

//consulta limitada con orden
const getProductsOrder = async({limit = 8, order_by = "stock_DESC"}) =>{
    const [campo, direccion] = order_by.split('_');
    const formatQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s",
    campo,
    direccion,
    limit
    );
    const { rows: result } = await pool.query(formatQuery);
    return result;
};


//paginacion
const getProductsPager = async({limit = 2, page = 0, order_by="precio_DESC"}) =>{
    const [campo, direccion] = order_by.split('_');
    //calcular el offset o paginas a mostrar
    const offset = page * limit;
    const formatQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limit,
    offset
    );
    const { rows: result } = await pool.query(formatQuery);
    return result;

}




module.exports = { 
    getProducts,
    getProductsOrder,
    getProductsPager
};