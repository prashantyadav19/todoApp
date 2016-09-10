// include all modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/demo');
mongoose.connection.on('error',function(){
   console.log('mongodb connection Error. please make sure that mongodb is running.');
});

//express
var app = express();


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var testSchema = new mongoose.Schema({
    email: String

});


mongoose.model('Test', testSchema);
var Test = mongoose.model('Test');

app.post('/test',function(req,res){
    console.log(req.body.todotext);
    var test = new Test({email:req.body.todotext});
    test.save(function(error,test){
        if(!error)
            res.send(test);
        else
            res.send(error);
    });
});

app.get('/allData',function(req,res){
    Test.find({}, function(err, result) {
        if (!err){
            res.send(result);
        } else {}
    });
});


/*app.get('/test1', function(req , res){
    res.send("welcome to habileSoft India Pvt. Ltd.1");
});*/

app.use(express.static(__dirname + '/public'));

app.listen(80, function(){
   console.log('Listen Sever Port 80');
});