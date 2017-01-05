var http = require('http');
//var Controller = require("./Controllers.js")
http.createServer(function(req, res){
	try{
		res.setHeader('Access-Controll-Allow-Origin','*');
		//Resolvendo o bug do favicon.ico
		if (req.url === '/favicon.ico') {
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
			res.end(/* icon content here */);
		}else{
			var url = req['url'].replace(/\s\n/g, '').split('/');
			var controller = url[1];
			var func = url[2];
			var params = {};
			var request_vars = {};
			//Monta a URL para o controller. Tratando inclusive os parametros
			if(url[2] != undefined){
				params = func.split(/[&,?]+/);
				func = params[0];
				//Tratamento de URLs para montar um request até o controller
				params.forEach(function(item_params){
					if(item_params != func){
						var objParams = item_params.split("=");
						request_vars[objParams[0]] = objParams[1];
					}
				});
			}
			//Chamada do Controller passando os parametros 
			var append_controller = require("./Controllers/"+controller+".js");
			res.write(append_controller[func]());
		}
	}catch(error){
		console.log(error);
	}
	res.end();
}).listen(3000);
