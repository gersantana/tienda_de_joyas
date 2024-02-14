const express = require('express');
const {getJoyasQuery, filtrarJoyasQuery,getProductsOrder} = require('../querys/index');
const router = express.Router();
const reportRoute = require("../middlewares/index")
const {getJoyasController, filtrarJoyasController} = require("../controllers/index")

//funcion para preparar el HATEOAS (falta adaptar variables y descomentar)
// Función para preparar el HATEOAS


// //metodo get para obtener todos los productos con HATEOAS (falta adaptar variables y descomentar)
// router.get('/products', async (req, res) => {
//     try {
//         const queryString = req.query
//         const result = await getProducts(queryString);
//         const HATEOASResult = prepararHATEOAS(result);
//         res.json(HATEOASResult);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });


// router.get('/products',reportRoute, async (req, res) => {
//     try {
//         //linea adicional con limites:
//         const queryString = req.query
//         //y se le pasa el queryString a la funcion getProducts
//         //luego se puede probar con http://localhost:3000/products?limit=5 por ej.
//         const result = await getProducts(queryString);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });

// router.get('/products/order',reportRoute, async (req, res) => {
//     try {
//         const queryString = req.query
//         const result = await getProductsOrder(queryString);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }

// });

// router.get('/products/pager',reportRoute, async (req, res) => {
//     try {
//         const queryString = req.query
//         const result = await getProductsPager(queryString);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }

// }
// );


//ruta para obtener joyas
router.get('/joyas',reportRoute, getJoyasController);


//filtros
router.get('/joyas/filtros',reportRoute, filtrarJoyasController)

//mensaje si no hay coincidencias con las rutas anteriores
router.get("*", (req, res) => {
    res.status(404).send("La ruta solicitada no existe")
    })
    

module.exports = router;