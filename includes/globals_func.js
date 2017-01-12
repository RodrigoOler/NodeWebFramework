var fileSys = require('fs');
var path = require('path')

//cria o caminho completo para a rota renderizar a view corretamente com seus parametros
exports.renderView = function(view, params){
	var itemReturn = [];
	itemReturn.push({"path":view,"params":params});
	return itemReturn;
}
