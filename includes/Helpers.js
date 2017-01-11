//Arquivo com helpers usados apenas pelo sistema
//Funcoes com controle de Controller, chamada de Rota, etc

//Função que renderiza toda uma view
exports.renderView = function(view_name,vars){

}

//Função que chama um novo controller a partir da rota
exports.callController = function(controller,func,vars){
	if (!fileSys.existsSync("./Controllers/"+controller+".js")){
		throw("Pagina não encontrada");
	}
	var append_controller = require("./Controllers/"+controller+".js");
	if (append_controller[func] == undefined){
		throw("Pagina não encontrada");
	}
	else{
		append_controller[func](request_vars);
	}
}

//Função que renderiza um texto para JSON
exports.renderJSON = function(view_name,vars){

}
//Função que renderiza um texto plano
exports.renderText = function(view_name,vars){

}
