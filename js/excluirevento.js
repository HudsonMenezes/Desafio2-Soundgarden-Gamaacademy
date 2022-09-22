const form = document.getElementById('excluirFormulario')
form.addEventListener('submit', excluirInformacoes)

// armazena o ID da URL na variável id através do URLSearchParams
const searchBar = window.location.search
const parametroURL = new URLSearchParams(searchBar)
const id = parametroURL.get('id')
const URL = 'https://xp41-soundgarden-api.herokuapp.com/events/' + id

function redirecionar() {
  // função para redirecionar o usuário para a página admin.html ao terminar
  window.location.href = 'admin.html'
}

// pega as informações da API e joga dentro da função
async function pegarInformacoes() {
  try {
    const response = await fetch(URL)
    const dataEvento = await response.json()
    mostrarInformacoes(dataEvento)
  } catch (error) {
    console.log(error)
  }
}

function mostrarInformacoes(data) {
  //transforma a data de ISO para data local
  // let eventDate = new Date(data.scheduled).toLocaleString()
  let dataEvento = data.scheduled.toLocaleString()

  // pega a informações e atribuem cada uma ao seu respectivo campo por ordem
  document.getElementById('nome').value = data.name
  document.getElementById('banner').value = data.poster
  document.getElementById('atracoes').value = data.attractions
  document.getElementById('descricao').value = data.description
  document.getElementById('data').value = dataEvento.slice(0, -3) // remove os segundos
  document.getElementById('lotacao').value = data.number_tickets
}

pegarInformacoes()

async function excluirInformacoes(e) {
  e.preventDefault()

  const nome = document.getElementById('nome').value
  const atracoes = document.getElementById('atracoes').value.split(',')
  const descricao = document.getElementById('descricao').value
  const data = document.getElementById('data').value
  const lotacao = document.getElementById('lotacao').value
  const poster = 'link da imagem'

  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    alert('✅ Evento "' + nome + '" deletado com Sucesso ✅')
    redirecionar() // redireciona pra página admin.html após o cadastro
  } catch (error) {
    console.log(error)
  }
}
