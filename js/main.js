//VER A DIFERENÇA DE innerHTML e appendChild

//Cria a variável novoItem
const form = document.getElementById("novoItem");

//Cria a variavel lista com o id da UL do html
const lista = document.getElementById("lista")

//Variavel para varificar se já existem itens no local storage e, se não tiver, criar um array vazio
//JSON.parse transforma a string em um objeto JS pra ser manipulado
const itens = JSON.parse(localStorage.getItem("itens")) || []

//Manter os itens já adicionados, armazenados no local storage na tela e chama a função criaElemento
itens.forEach( (elemento) => {
    criaElemento(elemento)
})

//Captura o 'Adicionar' e envia para a função 'criaElemento' o nome e a quantidade digitados para que seja criado o LI
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target['quantidade']

    //Verifica se um item já existe
    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        //Se o item já existir ele só atualiza o elemento
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        //Troca o valor atualizado na string do local storage mantendo o id
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        //Se o elemento não existir ele cria o item, joga no fim do array
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        //Pega o objeto criado
        itens.push(itemAtual)
        
        //Insere o objeto criado no array
        criaElemento(itemAtual)
    }
    
    //Insere o array no local storage para ficar salvo
    //JSON.stringify - transforma objeto em string
    //Local storage só armazena string
    localStorage.setItem("itens", JSON.stringify(itens))

    //Zera o nome e quantidade após adicionar
    nome.value = ""
    quantidade.value = ""
})

//Pega o nome e quantidade e monta o item da lista
function criaElemento (item){

    //cria um elemento LI com uma classe item
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    //Adiciona a quantidade na tag strong dentro do LI com um Data-attribute
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    //Insere dentro do strong da li a quantidade
    novoItem.appendChild (numeroItem)

    //Insere o nome após a quantidade
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    //Adiciona o novoItem na lista
    lista.appendChild(novoItem)


}

//Busca o id da tag strong que contem a quantidade do item adicionado e substitui pela nova quantidade que eu coloquei
function atualizaElemento(item) {
    document.querySelector("[data-id = '"+item.id+"']").innerHTML = item.quantidade
}

//Cria botão de deletar item
function botaoDeleta (id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    //Remove o item em si
    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento (tag, id) {
    tag.remove()

    //Remove item do array no id específico que eu cliquei
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //Reescrever no local storage
    localStorage.setItem("itens", JSON.stringify(itens))
}