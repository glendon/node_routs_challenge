var http = require('http');
var url = require('url');
var fs = require('fs');

var tratarRequisicao = function(request, response){

	response.writeHead(200, {"Content-Type":"text/html"});

	var result = url.parse(request.url, true);

	if (result.pathname == "/" || result.pathname == "/artigos"){
		response.end(recuperarHtml("/artigos"));
	}else  if (result.pathname == "/contato"){
		response.end(recuperarHtml(result.pathname));
	}else {
		response.end(recuperarHtml('/erro'));
	}
}

var recuperarHtml = function (pathname){
	if (fs.existsSync(__dirname + pathname +'.html')){
		return fs.readFileSync(__dirname + pathname +'.html');
	}

	return "Conteudo nao encontrado";

}

var server = http.createServer(tratarRequisicao);

server.listen(3000, function(){
	console.log('A bagaça está no ar.');
})