// função para resgatar as reservas através do parametro ID da URL no browser e mostrar no painel

async function muralReservas() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  const URL = 'https://xp41-soundgarden-api.herokuapp.com/bookings/event/' + id

  //resgatando informações na API
  try {
    const response = await fetch(URL)
    const data = await response.json()
    listaDasReservas(data)
  } catch (error) {
    console.log(error)
  }
}

// função para listar as reservas e criar uma tabela
function listaDasReservas(reservas) {
  const tituloReserva = reservas[0].event.name
  document.getElementById(
    'eventoNome'
  ).innerHTML = `Reservas referentes ao evento <br>${tituloReserva.bold()}`
  reservas.forEach((reserva, index) => {
    const linha = document.createElement('tr')
    linha.innerHTML = `
    <th scope="row">${index + 1}</th>
      <td>${reserva.owner_name}</td>
      <td>${reserva.owner_email}</td>
      <td>${reserva.number_tickets}</td>
      `

    // adicionando o html "linha" como filho da tag tbody
    document.querySelector('tbody').appendChild(linha)
  })
}

muralReservas()
