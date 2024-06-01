let express = require('express');
let app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let port = process.env.port || 3000;
let router = require('./routes/routes');

app.use(express.static(__dirname+'/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*4));
    }, 900000); //900000
  });


app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
    })
    


http.listen(port, () => {
    console.log('server started');
});
