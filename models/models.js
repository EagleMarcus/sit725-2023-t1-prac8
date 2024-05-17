let client = require('../dbConnection');
client.connect();
let collection = client.db().collection('catsAssignment');

async function insertCat(cat){
    return collection.insertOne(cat);
}

async function getAllCats(){
    return collection.find().toArray();
}

module.exports = {insertCat, getAllCats};