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

        const parsedPrecioMax = parseFloat(precio_max);
        const parsedPrecioMin = parseFloat(precio_min);

        if (!precio_max || !precio_min || !categoria || !metal) {
            return res.status(400).json({
                msg: 'Todos los parámetros son obligatorios',
            });
        }

        if (typeof parsedPrecioMax !== 'number' || typeof parsedPrecioMin !== 'number') {
            return res.status(400).json({
                msg: 'Los valores de precio_max y precio_min deben ser números',
            });
        }
        if (parsedPrecioMax < 0 || parsedPrecioMin < 0 || parsedPrecioMax < parsedPrecioMin) {
            return res.status(400).json({
                msg: 'Los valores de precio_max y precio_min deben ser mayores o iguales a cero, y precio_max debe ser mayor o igual a precio_min',
            });
        }

        const result = await filtrarJoyasQuery(precio_max, precio_min, categoria, metal);
       if(result.length > 0){

        res.json(result);
        // const HATEOASResult = prepararHATEOAS(result);
        // res.json(HATEOASResult);
       }else{
            res.status(200).json({
                msg: 'No hay coincidencias para tu busqueda',
            })
       }

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