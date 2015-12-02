var assert = require("assert")
	,_ = require("underscore")
	,should = require("should")
	,superagent = require('superagent')
	,fs = require('fs')
	,sys = require('sys')
	,app = require('../bin/www');

// rethinkdb lifecycle management

// Test data
function setTestData(store){
	fs.readFile('./test/sample-data/info.json', 'utf8', function (err,data) {
	    if (err) done(err);
	    store.info = data;
	});
};


describe("Testing info, ping endpoints",function(){

	var testData = {};
	var port = 3001;

	before(function(done){
		this.timeout(10000);
		setTestData(testData);

		setInterval(function(){
			superagent.get('http://localhost:'+port+'/ping')
			.end(function(e,res){
				should.strictEqual(null, e);
				should.strictEqual(200, res.status);
				done();
			});
		},3000);

	});

	after(function(done){
		superagent.get('http://localhost:'+port+'/quit')
			.end(function(e,res){
				should.strictEqual(null, e);
				should.strictEqual(200, res.status);
				should(res.body).have.property('exit', true);
				done();				
			});
	});

	it("should sucessfully call info operational endpoint", function(done){
		superagent.get('http://localhost:'+port+'/info')
			.end(function(e,res){
				should.strictEqual(null, e);
				should.strictEqual(200, res.status);
				should(res.body).have.property('name', 'example-mocha-project');
				res.body.should.have.property('version').which.is.a.String;             
				done();
		});
	});

	it("should assert version is 1.0.0", function(done){
		superagent.get('http://localhost:'+port+'/info')
			.end(function(e,res){
				should.strictEqual(null, e);
				done();
		});
	});

});

