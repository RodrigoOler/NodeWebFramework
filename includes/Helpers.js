var fileSys = require('fs');
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
		var teste = append_controller[func](vars);
		return teste;
	}
}

//Função que renderiza um texto para JSON
exports.renderJSON = function(view_name,vars){

}
//Função que renderiza um texto plano
exports.renderText = function(view_name,vars){

}
