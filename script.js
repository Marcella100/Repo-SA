// Array de objetos para armazenar os itens da lista
let listaDeCompras = JSON.parse(localStorage.getItem('lista')) || []

// Elementos da página
const inputNomeItem = document.getElementById('inputNomeItem')
const btnAdicionar = document.getElementById('adicionarTarefa')
const listaUl = document.getElementById('listaCompras')


// Atualiza a lista na tela
function renderizarLista() {
    listaUl.innerHTML = ''

    listaDeCompras.forEach((item, index) => {
        const li = document.createElement('li')

        const span = document.createElement('span')
        span.className = 'textoItem'
        span.textContent = item.nome

        const divBotoes = document.createElement('div')
        
        // Botão de editar
        const btnEditar = document.createElement('button')
        btnEditar.className = 'botaoIcone'
        btnEditar.innerHTML = '<i class="fa fa-pencil"></i>'
        btnEditar.onclick = () => editarItem(index)

        // Botão de excluir
        const btnExcluir = document.createElement('button')
        btnExcluir.className = 'botaoIcone'
        btnExcluir.innerHTML = '<i class="fa fa-trash"></i>'
        btnExcluir.onclick = () => removerItem(index)

        divBotoes.appendChild(btnEditar)
        divBotoes.appendChild(btnExcluir)

        li.appendChild(span)
        li.appendChild(divBotoes)

        listaUl.appendChild(li)
    })
}

// Adiciona novo item
function adicionarItem() {
    const nome = inputNomeItem.value.trim()
    if (nome === '') return

    if(listaDeCompras.some(item => item.nome.toLowerCase() === nome.toLowerCase())) {
        alert("Item já adicionado")
        return
    } 

    listaDeCompras.push({ nome })
    inputNomeItem.value = ''
    alert("Novo item adicionado")
    salvarLista()
    renderizarLista()
}

// Edita item
function editarItem(index) {
    const novoNome = prompt('Editar item:', listaDeCompras[index].nome)
    if (novoNome !== null && novoNome.trim() !== '') {
        listaDeCompras[index].nome = novoNome.trim()
        alert("Item editado")
        salvarLista()
        renderizarLista()
    }
}

// Remove item
function removerItem(index) {
    if (confirm('Tem certeza que deseja remover este item?')) {
        listaDeCompras.splice(index, 1)
        alert("Item excluido")
        salvarLista()
        renderizarLista()
    }
}

// Salva no localStorage
function salvarLista() {
    localStorage.setItem('lista', JSON.stringify(listaDeCompras))
}

// Eventos
btnAdicionar.addEventListener('click', adicionarItem)
inputNomeItem.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') adicionarItem()
})

// Inicializa
renderizarLista()