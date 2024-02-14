const express = require('express');
const { getProducts, getProductsOrder, getProductsPager} = require('../querys/index');
const router = express.Router();
const reportRoute = require("../middlewares/index")

//funcion para preparar el HATEOAS (falta adaptar variables y descomentar)
// const prepararHATEOAS = (medicamentos) => {
//     const results = medicamentos.map((m) => {
//         return {
//             name: m.nombre,
//             href: `/medicamentos/medicamento/${m.id}`,
//         }
//     }).slice(0, 4)
//     const total = medicamentos.length
//     const HATEOAS = {
//         total,
//         results
//     }
//     return HATEOAS
// }


//metodo get para obtener todos los productos con HATEOAS (falta adaptar variables y descomentar)
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


router.get('/products',reportRoute, async (req, res) => {
    try {
        //linea adicional con limites:
        const queryString = req.query
        //y se le pasa el queryString a la funcion getProducts
        //luego se puede probar con http://localhost:3000/products?limit=5 por ej.
        const result = await getProducts(queryString);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

router.get('/products/order',reportRoute, async (req, res) => {
    try {
        const queryString = req.query
        const result = await getProductsOrder(queryString);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

router.get('/products/pager',reportRoute, async (req, res) => {
    try {
        const queryString = req.query
        const result = await getProductsPager(queryString);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
);

//mensaje si no hay coincidencias con las rutas anteriores
router.get("*", (req, res) => {
    res.status(404).send("La ruta solicitada no existe")
    })
    

module.exports = router;