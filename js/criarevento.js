const criarEventoForm = document.querySelector('#criarEventoForm')
criarEventoForm.addEventListener('submit', novoEvento)

const URL = 'https://xp41-soundgarden-api.herokuapp.com/events'

async function novoEvento(e) {
  e.preventDefault() // evitar que atualize a página automaticamente após enviar

  //recebendo e armazenando os valores que serão inseridos no formulário
  const nome = document.getElementById('nome').value
  const atracoes = document.getElementById('atracoes').value.split(',')
  const descricao = document.getElementById('descricao')
  const data = document.getElementById('data').value
  const dataObj = new Date(data)
  const isoDate = dataObj.toISOString() // tem que enviar para a API a data em formato ISO
  const lotacao = document.getElementById('lotacao').value
  const poster = document.getElementById('poster').value

  // as informações que serão enviadas - depois tem que transformar em JSON para enviar pra API
  const evento = {
    name: nome,
    attractions: atracoes,
    description: descricao,
    poster: poster,
    scheduled: isoDate,
    number_tickets: lotacao
  }

  // try {
  //   const response = await fetch(URL, {
  //     method: "POST",
  //     body:
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
}
