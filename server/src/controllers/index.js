const { getJoyasQuery, filtrarJoyasQuery } = require("../querys/index")


// HATEOAS
const prepararHATEOAS = (joyas) => {
    const results = joyas.map((joya) => {
        return {
            nombre: joya.nombre,
            href: `/joyas/${joya.id}`
        };
    });
    const total = joyas.length;
    const HATEOAS = {
        total,
        results,
    };
    return HATEOAS;
};


const getJoyasController = async (req, res) => {
    try {
        const queryString = req.query
        const result = await getJoyasQuery(queryString);
        const HATEOASResult = prepararHATEOAS(result);
        res.json(HATEOASResult);
    } catch (error) {
        res.status(500).json({
            msg: 'Se produjo un error al cargar la data',
            error: error.message
        });
    }

}

const filtrarJoyasController = async (req,res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;
        const result = await filtrarJoyasQuery(precio_max, precio_min, categoria, metal);
        res.json(result);
        // const HATEOASResult = prepararHATEOAS(result);
        // res.json(HATEOASResult);

    } catch (error) {
        res.status(500).json({
            msg: 'Se produjo un error al cargar la data',
            error: error.message
        });

    }
}


module.exports = {
    getJoyasController,
    filtrarJoyasController
}