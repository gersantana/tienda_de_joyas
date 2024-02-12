const express = require('express');
const { getProducts, getProductsOrder, getProductsPager} = require('../querys/index');
const router = express.Router();

router.get('/products', async (req, res) => {
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

router.get('/products/order', async (req, res) => {
    try {
        const queryString = req.query
        const result = await getProductsOrder(queryString);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

router.get('/products/pager', async (req, res) => {
    try {
        const queryString = req.query
        const result = await getProductsPager(queryString);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
);


module.exports = router;