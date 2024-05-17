let express = require('express');
let model = require('../models/models');

const insertCat = async function(req, res) {
    let cat = req.body;
    console.log ('Cats Going C', cat);
    return model.insertCat(cat);
}

const getAllCats = async function(req, res) {
    return model.getAllCats();
}

module.exports = {insertCat, getAllCats};