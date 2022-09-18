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
            <h4>Arctic Monkeys, The Kooks, Hiatus Kaiyote</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              aperiam sunt quo similique, dolorum consectetur inventore ipsam,
              officiis neque natus eius harum alias quidem. Possimus nobis in
              inventore tenetur asperiores.
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

/* 
async function lastNews() {
  try {
    const response = await fetch(LASTNEWS_URL, {
      headers: {
        Authorization: 'cd37d34fb2924cc78b9770955529a746'
      }
    })
    const listNews = await response.json()

    listNews.articles.forEach(news => {
      html = `
      <article class="col-6">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src=${news.urlToImage}
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                  ${news.title}
                  </h5>
                  <p class="card-text">
                  ${news.description}
                  </p>
                  <a
                    href=${news.url}
                    class="btn btn-primary"
                    >Ir para noticia</a
                  >
                </div>
              </div>
            </div>
          </div>
        </article>
      `

      articleSection.innerHTML += html
    })

    // console.log(listNews.articles)
    console.log('Last News executado')
  } catch (error) {
    console.log(error)
  }
}
*/
