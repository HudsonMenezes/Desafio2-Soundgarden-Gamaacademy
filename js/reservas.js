// lista reservas de um evento

function getReservas() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  const url = 'https://xp41-soundgarden-api.herokuapp.com/bookings/event/' + id
  fetch(url)
    .then(response => response.json())
    .then(data => listarReservas(data))
    .catch(err => console.log(err))
}

function listarReservas(reservas) {
  const titulo = reservas[0].event.name
  document.getElementById(
    'eventoNome'
  ).innerHTML = `Reservas referentes ao evento ${titulo.bold()}`
  reservas.forEach((reserva, index) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<th scope="row">${index + 1}</th>
        <td>${reserva.owner_name}</td>
        <td>${reserva.owner_email}</td>
        <td>${reserva.number_tickets}</td>`

    document.querySelector('table tbody').appendChild(tr)
  })
}

// chamando a function

getReservas()
