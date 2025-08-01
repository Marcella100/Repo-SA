// Array de objetos para armazenar os itens da lista
let listaDeCompras = JSON.parse(localStorage.getItem('lista')) || []

// Elementos da página
const inputNomeItem = document.getElementById('inputNomeItem')
const btnAdicionar = document.getElementById('adicionarTarefa')
const listaUl = document.getElementById('listaCompras')

// Atualiza a lista na tela


// Adiciona novo item
function adicionarItem() {
    const nome = inputNomeItem.value.trim()
    if (nome === '') return

    listaDeCompras.push({ nome })
    inputNomeItem.value = ''
    salvarLista()
    renderizarLista()
}

// Edita item
function editarItem(index) {
    const novoNome = prompt('Editar item:', listaDeCompras[index].nome)
    if (novoNome !== null && novoNome.trim() !== '') {
        listaDeCompras[index].nome = novoNome.trim()
        salvarLista()
        renderizarLista()
    }
}

// Remove item
function removerItem(index) {
    if (confirm('Tem certeza que deseja remover este item?')) {
        listaDeCompras.splice(index, 1)
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