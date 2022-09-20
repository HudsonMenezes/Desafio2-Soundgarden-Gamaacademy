// selecionando onde os eventos irão aparecer
const eventosMuralIndex = document.querySelector('#eventosIndex')
const URL = 'https://xp41-soundgarden-api.herokuapp.com/events'

async function mostrarEventos() {
  try {
    const response = await fetch(URL)
    const data = await response.json()
    const primeirosEventos = data.slice(0, 3)

    primeirosEventos.forEach(evento => {
      // formatando data do evento, pela API ela vem em formato ISO, transformei para o formato local (Br)
      let dataEvento = new Date(evento.scheduled).toLocaleString()

      let html = `
      <article class="evento card p-5 m-3">
      <h2>${evento.name} - ${dataEvento}</h2>
      <h4>${evento.attractions}</h4>
      <p>
        ${evento.description}
      </p>
      <a href="eventos.html" class="btn btn-primary">Reservar Ingresso</a>
      </article>
      `

      eventosMuralIndex.innerHTML += html
    })

    console.log(data.slice(0, 3))
  } catch (error) {
    console.log(error)
  }
}
// Chamando função para listar eventos no DOM
mostrarEventos()
