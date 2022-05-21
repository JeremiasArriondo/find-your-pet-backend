const mongoose = require('mongoose');
const createResponse = require('../helpers/createResponse');
const User = require('../models/user.model');
const Publication = require('../models/publication.model');
const { request } = require('express');
const { response } = require('express');

const newPublication = async (res = response, req = request) => {
    try {
        const {description, images} = req.body;
        //Usuario que realiza la publicacion
        const user = req.usuario;
        res.status(201).json({
            description,
            images,
            user
        })
        // const publication = new Publication({description, images, user})
        // return createResponse(res, 201, publication)
    } catch (error) {
        createResponse(res, 500, null, 'Error al crear la publicación');
    }
};


module.exports = {
    newPublication
}