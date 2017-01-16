var fileSys = require('fs');
var queryString = require('querystring');
var path = require('path')
//Arquivo com helpers usados apenas pelo sistema
//Funcoes com controle de Controller, chamada de Rota, etc

//Função que renderiza toda uma view
exports.renderView = function(view_name,vars){

}

//Função que chama um novo controller a partir da rota
exports.callController = function(controller,func,vars){
	if (!fileSys.existsSync(path.join(__dirname, "../Controllers/"+controller+".js"))){
		return "Pagina não encontrada";
	}
	var append_controller = require("../Controllers/"+controller+".js");
	if (append_controller[func] == undefined){
		console.log("Não encontrou funcao");
		return "Pagina não encontrada";
	}
	else{
		var retController = append_controller[func](vars);
		var readView = "";
		var typeReturn = typeof(retController) ;
		var current_item = retController;
		switch (current_item["type"]) {
			case "view":
				//Retorna a view com os parametros
				readView = fileSys.readFileSync(path.join(__dirname,'../Views/'  + current_item['path']), 'utf8');
				console.log(readView);
				return readView;
				break;
			default:
			//Retorna apenas um texto
			return readView;
			break;
		}
	}
}

//Função que renderiza um texto para JSON
exports.renderJSON = function(view_name,vars){

}
//Função que recebe um POST e trata o controller/vars corretamente
exports.methodPost = function (req, res){
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
		var calLController = exports.callController(controller,func,request_vars);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(calLController);
		res.end();
	});
}

//Função que recebe um GET e trata o controller/vars corretamente
exports.methodGet = function (req,res){
	console.log(req['url']);
	if((req['url'].match(/.css/g)) || (req['url'].match(/.js/g))){
		var tipoImport = "";
		switch (req['url'].match(/.css/g)) {
			case true:
				tipoImport = 'text/css'
				break;
			case false:
				tipoImport = 'application/javascript'
				break;
			default:
				tipoImport = 'text/css'
		}

		if(fileSys.existsSync(__dirname, "../" + req['url'])){
			var itemStatic = path.join(__dirname, "../" + req['url']);
			var arquivoImport = fileSys.readFileSync(itemStatic);
			res.writeHead(200, {'Content-Type': tipoImport});
			res.write(arquivoImport);
		}
		else{
			res.writeHead(404, {'Content-Type': tipoImport});
			res.write("Arquivo não encontrado");
		}
		res.end();
	}
	else{
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
		var call_controller = exports.callController(controller,func,request_vars);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(call_controller);
		res.end()
	}
}

//Seta uma func default para o controller (Apenas caso a URL venha vazia)
function default_func(func,controller){
	if((func == undefined) || (func == ""))
		func = "index";
	return func;
}

//Seta um controller default (Apenas caso a URL venha vazia)
function default_controller(controller){
	if((controller == undefined) || (controller == ""))
		controller = "index";
	return controller;
}
