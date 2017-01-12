//Para podermos usar os helpers do sistema, já damos um require aqui mesmo
var globals_func = require("../includes/globals_func.js");

exports.index = function(sobrenome,id){
	return "Index";
};
exports.teste_post = function(){
	return globals_func.renderView("teste.html","teste de envio");
	//return [{"type":"view","text":"Formulario enviado com sucesso"}];
};
