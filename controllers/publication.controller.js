const { response, request } = require('express');
const User = require('../models/user.model');
const Publication = require('../models/publication.model');
const createResponse = require('../helpers/createResponse');

/**
 * Endpoint encargado de crear una nueva publicación
 * 
 */

const newPublication = async (req = request, res = response) => {

    const { description, typePublication } = req.body;
    
    res.json({
        msg: 'Post API - controller',
        description
    });
}

const getPublication = async (req, res) => {
    const { id } = req.params;
};

const getAllPublications = async (req, res) => {
    const { limit= 10, from = 0 } = req.query;
    // const query = { state: true }

    const [total, publications] = await Promise.all([
        Publication.countDocuments({state: true}),
        Publication.find({state: true})
            .skip(Number(from))
            .limit(Number(limit))
    ])
    return createResponse(res, 200, {total, publications})
}

const deletePublication = async (req, res) => {
    const { id } = req.params;
    const publication = await Publication.findByIdAndUpdate(id, { state: false }, {new: true});
    //Crear response
}

module.exports = {
    newPublication,
    getPublication,
    getAllPublications,
    // updatePublication,
    deletePublication
}