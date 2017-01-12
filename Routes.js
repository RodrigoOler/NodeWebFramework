var http = require('http');
var helpers = require('./includes/Helpers.js');
var fileSys = require('fs');
http.createServer(function(req, res){
	try{
		res.setHeader('Access-Controll-Allow-Origin','*');
		//Resolvendo o bug do favicon.ico
		if (req.url === '/favicon.ico') {
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
			res.end(/* icon content here */);
		}else{
			switch (req['method']) {
				case "GET":
					helpers.methodGet(req,res);
					break;
				case "POST":
					helpers.methodPost(req,res);
					break;
				default:
			}
		}
	}catch(error){
		console.log(error);
		res.write(error);
		res.end();
	}
}).listen(3000);
