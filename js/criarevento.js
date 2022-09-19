const criarEventoForm = document.querySelector('#criarEventoForm')
criarEventoForm.addEventListener('submit', novoEvento)

const URL = 'https://xp41-soundgarden-api.herokuapp.com/events'

function redirecionar() {
  // função para redirecionar o usuário para a página admin.html ao terminar
  window.location.href = 'admin.html'
}

async function novoEvento(e) {
  e.preventDefault() // evitar que atualize a página automaticamente após enviar

  //recebendo e armazenando os valores que serão inseridos no formulário
  const nome = document.getElementById('nome').value
  const atracoes = document.getElementById('atracoes').value.split(',')
  const descricao = document.getElementById('descricao').value
  const data = document.getElementById('data').value
  const dataEmObjeto = new Date(data)
  const dataEmISO = dataEmObjeto.toISOString() // tem que enviar para a API a data em formato ISO
  const lotacao = document.getElementById('lotacao').value
  const poster = 'link da imagem'

  // as informações que serão enviadas - depois tem que transformar em JSON para enviar pra API
  const evento = {
    name: nome,
    attractions: atracoes,
    description: descricao,
    poster: poster,
    scheduled: dataEmISO,
    number_tickets: lotacao
  }

  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(evento),
      headers: { 'Content-type': 'application/json' }
    })
    const resposta = await response.json()
    alert('Evento ' + nome + ' cadastrado com Sucesso')
    console.log(resposta)
    redirecionar() // redireciona pra página admin.html após o cadastro
  } catch (error) {
    console.log(error)
  }
}
