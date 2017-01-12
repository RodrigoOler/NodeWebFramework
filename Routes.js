var http = require('http');
var queryString = require('querystring');
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
					methodGet(req,res);
					break;
				case "POST":
					methodPost(req,res);
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

function methodGet(req,res){
	var url = req['url'].replace(/\s\n/g, '').split('/');
	var controller = url[1];
	var func = url[2];
	var params = {};
	var request_vars = {};
	//Monta a URL para o controller. Tratando inclusive os parametros
	if(url[2] != undefined){
		params = func.split(/[&,?]+/);
		//Tratamento de URLs para montar um request até o controller
		params.forEach(function(item_params){
			if(item_params != func){
				var objParams = item_params.split("=");
				request_vars[objParams[0]] = objParams[1];
			}
		});
	}
	//Chamada do Controller passando os parametros
	controller = default_controller(controller);
	func = default_controller(func);
	var call_controller = helpers.callController(controller,func,request_vars);
	res.write(call_controller);
	res.end()
}

function methodPost(req, res){
	//var teste = req.client.parser['2'];
	var corpo_msg = "";
	req.on('data',function(chunk){
		corpo_msg += chunk;
	});
	req.on('end',function(){
		var request_vars = queryString.parse(corpo_msg);
		var url = req['url'].replace(/\s\n/g, '').split('/');
		var controller = url[1];
		var func = url[2];
		//Montagem do Controller/Function
		controller = default_controller(controller);
		func = default_controller(func);
		var call_controller = helpers.callController(controller,func,request_vars);
		console.log(call_controller);
		res.write(call_controller);
		res.end();
	});
}

function default_func(func,controller){
	if((func == undefined) || (func == ""))
		func = "index";
	return func;
}

function default_controller(controller){
	if((controller == undefined) || (controller == ""))
		controller = "index";
	return controller;
}
