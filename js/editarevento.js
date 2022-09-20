const form = document.getElementById('editarFormulario')
form.addEventListener('submit', alteraInformacoes)

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
    const infoEvento = await response.json()
    mostrarInformacoes(infoEvento)
  } catch (error) {
    console.log(error)
  }
}

function mostrarInformacoes(data) {
  //transforma a data de ISO para data local
  // let dataEvento = new Date(data.scheduled).toLocaleString()
  let dataEvento = data.scheduled.toLocaleString()

  // pega a informações e atribuem cada uma ao seu respectivo campo por ordem
  document.getElementById('nome').value = data.name
  document.getElementById('banner').value = data.poster
  document.getElementById('atracoes').value = data.attractions
  document.getElementById('descricao').value = data.description
  document.getElementById('data').value = dataEvento.slice(0, -3) // remove os segundos
  document.getElementById('lotacao').value = data.number_tickets

  console.log('Data: ' + dataEvento.slice(0, -3))
}

pegarInformacoes()

async function alteraInformacoes(e) {
  e.preventDefault()

  const nome = document.getElementById('nome').value
  const atracoes = document.getElementById('atracoes').value.split(',')
  const descricao = document.getElementById('descricao').value
  const data = document.getElementById('data').value
  const dataEmObjeto = new Date(data)
  const dataEmISO = dataEmObjeto.toISOString()
  const lotacao = document.getElementById('lotacao').value
  const poster = 'link da imagem'

  const evento = {
    name: nome,
    poster: poster,
    attractions: atracoes,
    description: descricao,
    scheduled: dataEmISO,
    number_tickets: lotacao
  }

  try {
    const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify(evento),
      headers: { 'Content-type': 'application/json' }
    })
    const resposta = await response.json()
    alert('Evento ' + nome + ' alterado com Sucesso')
    console.log(resposta)
    redirecionar() // redireciona pra página admin.html após o cadastro
  } catch (error) {
    alert('Não foi possível alterar, tente de novo!')
    console.log(error)
  }
}
