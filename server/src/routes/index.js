const express = require('express');
const router = express.Router();
const reportRoute = require("../middlewares/index")
const { getJoyasController, filtrarJoyasController } = require("../controllers/index")

//ruta para obtener joyas
router.get('/joyas', reportRoute, getJoyasController);

//filtros
router.get('/joyas/filtros', reportRoute, filtrarJoyasController)

//mensaje si no hay coincidencias con las rutas anteriores
router.get("*", (req, res) => {
    res.status(404).send("La ruta solicitada no existe")
})


module.exports = router;