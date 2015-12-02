var _ = require("underscore")
	,express = require('express')
	fs = require('fs');

var router = express.Router();

router.get('/ping', function(req,res){
  	res.send('OK');
});

router.get('/info', function(req,res){
	fs.readFile('./package.json', 'utf8', function (err,data) {
	    if (err) {
	      res.status(500);
	      res.format({
	      	'application/json': function(){
    			res.send({ message: err });
  			}
	      });
	    }else{
	      res.status(200);
	      res.format({
	      	'application/json': function(){
    			res.send(data);
  			}
	      });  
	    }
	});
});

module.exports = router;
