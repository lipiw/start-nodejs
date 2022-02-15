const express = require("express");
const { randomUUID } = require("crypto");
const { response } = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err){
        console.log(err);
    } else{
        products = JSON.parse(data);
    }
})

/**     --> METODOS CRUD
 * 
 *  POST => Inserção de dados
 *  GET => Consultar um ou mais dados
 *  PUT => Alterar dados
 *  DELETE => Deletar um ou mais dados
 */


/**     --> REQUEST
 * 
 *  BODY => Sempre que quiser enviar dados para minha aplicação
 *  PARAMS => /product/313  -> Parametro de rota (obrigatorio)
 *  QUERY =>  /product?id=2&name=fefo   -> Para filtragens
 */

// Inserindo um produto
app.post("/products", (request, response) =>{

    const {name,price,qtd} = request.body;

    const product = {
        name,
        price,
        qtd,
        id : randomUUID(),
    }

    products.push(product);

    productFile();
    
    return response.json(product);
});

// Listando todos produtos
app.get("/products", (request, response) =>{
    return response.json(products);
})

// Listando apenas um produto
app.get("/products/:id", (request, response) =>{
    const { id } = request.params;
    const product = products.find(product => product.id === id)

    return response.json(product);
})

//Alterando um produto
app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price, qtd } = request.body;

    const productIndex = products.findIndex(product => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
        qtd
    };

    productFile();

    return response.json({message: "Produto alterado com sucesso"})
})


//Removendo um produto
app.delete("/products/:id", (request, response) =>{
    const { id } = request.params;
    const productIndex = products.findIndex(product => product.id === id);

    //Encontre o index que passei e remova uma unidade (ele mesmo).
    products.splice(productIndex, 1);

    return response.json(`Produto com o ID ${id} foi removido!`);
});

function productFile(){
    //Inserindo produtos em um arquivo JSON
    fs.writeFile("products.json", JSON.stringify(products), (e) =>{
        if(e){
            console.log(e)
        }else{
            console.log("Ação realizada com sucesso!")
        }
    })
}

app.listen(4002, () => console.log("Servidor esta rodando!"))