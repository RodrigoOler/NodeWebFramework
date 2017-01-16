'use strict'

const http = require('http');
const helpers = require('./includes/Helpers.js');
const fileSys = require('fs');

http.createServer((req, res) => {
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
					helpers.methodGet(req,res);
					break;
			}
		}
	}catch(error){
		console.log(error);
		res.write(error);
		res.end();
	}
}).listen(3000);
