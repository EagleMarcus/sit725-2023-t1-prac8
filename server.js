var express = require('express');
var app = express();
let port = process.env.port ||3000;
let router = require('./routes/routes');

app.use(express.static(__dirname+'/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);


app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
    })
    


app.listen(port,()=>{
console.log("App listening to: "+port)
//run().catch(console.dir);
})
