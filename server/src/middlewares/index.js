

const reportarConsulta = async (req, res, next) => {
    const parametros = req.query
    const url = req.url
    const method = req.method

    if (Object.keys(parametros).length > 0) {
        console.log(`
Hoy ${new Date()}
Se ha recibido una consulta en la ruta ${url}
Con el metodo ${method}
con los parámetros:
        `)
console.table(parametros)
        next()
    }else{
        console.log(`
Hoy ${new Date()}
Se ha recibido una consulta en la ruta ${url}
Con el metodo ${method}`
)
        next()
    }
}



module.exports = reportarConsulta