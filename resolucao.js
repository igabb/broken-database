//https://acervolima.com/como-ler-e-escrever-um-arquivo-json-usando-node-js/
const fs = require("fs");
const { json } = require("stream/consumers");

let jsonData = []
function lerArquivo() {
    jsonData = require('./broken-database.json');
    if (jsonData.length > 0) {
        console.log('Arquivo lido com sucesso!')
    } else {
        console.log('[ERRO] Arquivo não encontrado!')
    }
}

function manipularJson() {
    jsonData = jsonData.map(item => {
        item.price = Number(item.price)
        item.name = corrigirNomes(item.name)
        if (item.quantity == undefined) {
            return {
                ...item,
                quantity: 0
            }
        }
        return item;
    })
}

function gravarArquivo(obj) {
    fs.writeFile("saida.json", JSON.stringify(obj), err => {
        if (err) throw err;
        console.log("Done writing"); 
    });
}

function corrigirNomes(str) {
    str = str.replaceAll('æ', 'a');
    str = str.replaceAll('¢', 'c');
    str = str.replaceAll('ø', 'o');
    str = str.replaceAll('ß', 'b');
    return str
}
//https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
function ordenarId() {
    jsonData = jsonData.sort(function (x,y){
        return x.id - y.id
    })
}
//https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
function ordenarCategoria() {
    jsonData = jsonData.sort(function (x,y){
        if (x.category > y.category) return 1;
        if (x.category < y.category) return -1;
        return 0
    })
}

function somarCategoria() {
    let somaAcessorios = 0
    let somaEletrodomesticos = 0
    let somaEletronicos = 0
    let somaPanelas = 0
    
    for(let i = 0; i < jsonData.length; i++) {
        const auxiliar = jsonData[i].price * jsonData[i].quantity
        switch(jsonData[i].category) {
            case 'Acessórios':
                somaAcessorios += auxiliar
                break
            case 'Eletrodomésticos':
                somaEletrodomesticos += auxiliar
                break
            case 'Eletrônicos':
                somaEletronicos += auxiliar
                break
            case 'Panelas':
                somaPanelas += auxiliar
                break

        }
    }
    
    console.log(somaAcessorios, somaEletrodomesticos, somaEletronicos, somaPanelas)

}

lerArquivo();
ordenarId();
ordenarCategoria();
manipularJson();
gravarArquivo(jsonData);

somarCategoria()