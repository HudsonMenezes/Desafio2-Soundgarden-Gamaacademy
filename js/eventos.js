// Recebendo as variáveis
const muralDeEventos = document.querySelector('#muralDeEventos')
const URL = 'https://xp41-soundgarden-api.herokuapp.com/events'

//função que renderiza todos os eventos na página "Todos os Eventos"
async function verTodosEventos() {
  try {
    const response = await fetch(URL)
    const listaEventos = await response.json()
    console.log(listaEventos)

    listaEventos.forEach(evento => {
      // formatando data do evento, pela API ela vem em formato ISO, transformei para o formato local (Br)
      let dataEvento = new Date(evento.scheduled).toLocaleString()

      // para que cada evento na API apareça na página
      let html = `
      <article class="evento card p-5 m-3">
            <h2>${evento.name} - ${dataEvento}</h2>
            <h4>${evento.attractions}</h4>
            <p>
              ${evento.description}
            </p>
            <button class="btn btn-primary" id=${evento._id} onclick='abrirModal()'>Reservar Ingresso</button>
          </article>
      `

      //concatenando para que cada evento seja adicionado na variável e apareça na página
      muralDeEventos.innerHTML += html
    })
  } catch (error) {
    console.log(error)
  }
}

// Chamando função para listar eventos no DOM
verTodosEventos()

// MODAL

// função para redirecionar o usuário para a página eventos.html ao terminar
function redirecionar() {
  window.location.href = 'eventos.html'
}

const modal = document.querySelector('#telaModal')

function abrirModal() {
  event.preventDefault()
  modal.style.display = 'block'
  modal.setAttribute('id_evento', event.target.id)
}

// reserva ingresso para evento onsubmit

const form = document.querySelector('#telaModal form')
form.addEventListener('submit', fazerReservaIngresso)

async function fazerReservaIngresso() {
  event.preventDefault()
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const ingressos = document.getElementById('qtdIngresso').value
  const id = modal.getAttribute('id_evento')

  const URL_RESERVA = 'https://xp41-soundgarden-api.herokuapp.com/bookings'

  const reserva = {
    owner_name: nome,
    owner_email: email,
    number_tickets: ingressos,
    event_id: id
  }

  try {
    const response = await fetch(URL_RESERVA, {
      method: 'POST',
      body: JSON.stringify(reserva),
      headers: { 'Content-type': 'application/json' }
    })

    if (response.ok) {
      alert('Reserva Efetuada! Divirta-se no evento!')
      redirecionar()
    } else {
      console.log(response)
      throw new Error(`${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (err) {
    if (err.message === '400') alert('Deu ruim! Chama o batman!')
    console.log(err)
  }
}

// fecha o modal ao clicar

const closeBtn = document.querySelector('#closeBtn')
closeBtn.onclick = function () {
  modal.style.display = 'none'
}

// fecha o modal qdo alguem clica fora

window.onclick = function (event) {
  if (event.target == modal) modal.style.display = 'none'
}
