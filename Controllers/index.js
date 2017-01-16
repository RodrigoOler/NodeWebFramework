//Para podermos usar os helpers do sistema, já damos um require aqui mesmo
var globals_func = require("../includes/globals_func.js");

exports.index = function(sobrenome,id){
	return globals_func.renderView("teste.html");
};

exports.teste_post = function(){
	return globals_func.renderView("teste2.html","teste de envio");
};
