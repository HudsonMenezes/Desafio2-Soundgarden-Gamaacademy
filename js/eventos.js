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
            <a href="#" class="btn btn-primary">reservar ingresso</a>
            </article>
      `

      //concatenando para que cada evento seja adicionado na variável e apareça na página
      muralDeEventos.innerHTML += html
    })
  } catch (error) {
    console.log(error)
  }
}

verTodosEventos()
