//      --------- BASE DO NODE ---------

const http = require("http");

http.createServer((request, response) =>{
    response.writeHead(200, {"Content-Type":"application/json"});

    if(request.url === "/produtos"){
        response.end(
            JSON.stringify(
                Produtos={
                    Nome:"Caneta",
                    Valor:3.00,
                    Quantidade:15
                },
            )
        );
    }

    if(request.url === "/clientes"){
        response.end(
            JSON.stringify(
                Clientes={
                    Nome:"Felipe",
                    Idade:21,
                }
            )
        )
    }

    //QUALQUER OUTRA ROTA
    response.end("Consolidando conhecimentos basicos sobre node.");


}).listen(4001, () => console.log("Servidor iniciado na porta 4001!"))