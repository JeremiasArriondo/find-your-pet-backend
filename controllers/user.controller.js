const { response } = require('express');

const userGet = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const userPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'Post API - controller',
        body
    });
}

module.exports = {
    userGet,
    userPost
}