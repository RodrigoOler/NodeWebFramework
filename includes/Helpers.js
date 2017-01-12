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
	console.log("Controller : " + path.join(__dirname , "../Controllers/"+controller+".js"));
	if (!fileSys.existsSync(path.join(__dirname, "../Controllers/"+controller+".js"))){
		console.log("Não encontrou controller");
		return "Pagina não encontrada";
	}
	var append_controller = require("../Controllers/"+controller+".js");
	if (append_controller[func] == undefined){
		console.log("Não encontrou funcao");
		return "Pagina não encontrada";
	}
	else{
		var retController = append_controller[func](vars);

		var typeReturn = typeof(retController) ;
		switch (typeReturn){
			case "object":
				console.log("e um objeto : " + retController);
				for(var i = 0; i < retController.length; i++){
					var current_item = retController[i];
					switch ("view" in current_item) {
						case true:
							//Retorna a view com os parametros
							break;

						default:
						//Retorna apenas um texto
					}
				}
			break;
		}
		return retController;
	}
}

//Função que renderiza um texto para JSON
exports.renderJSON = function(view_name,vars){

}
//Função que renderiza um texto plano
exports.renderText = function(view_name,vars){

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
		var call_controller = exports.callController(controller,func,request_vars);
		console.log(call_controller);
		res.write(JSON.stringify(call_controller));
		res.end();
	});
}

//Função que recebe um GET e trata o controller/vars corretamente
exports.methodGet = function (req,res){
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
	res.write(call_controller);
	res.end()
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
