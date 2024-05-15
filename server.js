var express = require("express");
var app = express();
let port = process.env.port ||3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://studentassignments:admin@clusterstudent.2cssltu.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ClusterStudent";
//mongodb+srv://<username>:<password>@cluster0.scy2vud.mongodb.net/<database-name>?retryWrites=true&w=majority

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run () {
    try {
        await client.connect(); //wait for the connection to be established
        const db = client.db("mongodb"); //access the database
        await db.command({ping: 1}); //ping the deployment
        console.log("Pinged your Deployment. You successfully connected to MongoDB");
    } finally {
        await client.close(); //close the connection
    }
}

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/api/cat', async (req, res) => {
    let cat = req.body;
    let result = await postCat(cat);
    client.close();
    res.json({statusCode: 201, message: 'success', data: result});
});

async function postCat(cat) {
    await client.connect();
    let collection = await client.db().collection('catsAssignment');
    console.log ('Cats Going', cat);
    return collection.insertOne(cat);
}

app.get('/api/cats', async (req, res) => {
    console.log("test2");
    let result = await getAllCats();
    client.close();
    res.json({statusCode:201, message: 'success', data: result});
});

async function getAllCats() {
    await client.connect();
    console.log("test1");
    let collection = await client.db().collection('catsAssignment');
    console.log("own MongoDB Collection", collection);
    return collection.find().toArray();
}


app.listen(port,()=>{
console.log("App listening to: "+port)
run().catch(console.dir);
})
