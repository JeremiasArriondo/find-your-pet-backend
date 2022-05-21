const { response } = require("express");

const buscar = (req, res = response) => {
    res.json({
        msg: 'Buscar....'
    })
}


module.exports = {
    buscar
}