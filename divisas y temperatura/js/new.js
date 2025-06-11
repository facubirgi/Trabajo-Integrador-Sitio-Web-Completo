document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '2177301e5b354a9782380d390b9991a1';
  const API_URL = `https://newsapi.org/v2/everything?q=divisas+OR+forex+OR+dolar&language=es&sortBy=publishedAt&apiKey=${API_KEY}`;
  const newsContainer = document.getElementById('newsContainer');

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.articles && data.articles.length > 0) {
        newsContainer.innerHTML = '';
        data.articles.slice(0, 8).forEach(article => {
          const newsCard = `
            <div class="col-md-6">
              <div class="card news-card h-100">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text text-muted">
                    <small>${new Date(article.publishedAt).toLocaleDateString()} | ${article.source.name}</small>
                  </p>
                  <p class="card-text">${article.description || 'Sin descripción disponible'}</p>
                  <a href="${article.url}" target="_blank" class="btn btn-sm btn-primary">Leer más</a>
                </div>
              </div>
            </div>
          `;
          newsContainer.insertAdjacentHTML('beforeend', newsCard);
        });
      } else {
        newsContainer.innerHTML = '<p class="text-center">No se encontraron noticias recientes.</p>';
      }
    })
    .catch(error => {
      console.error("Error al cargar noticias:", error);
      newsContainer.innerHTML = `
        <p class="text-center text-danger">Error al cargar noticias. Usando datos de ejemplo...</p>
        <!-- Noticias de ejemplo (backup) -->
        <div class="col-md-6">
          <div class="card news-card h-100">
            <div class="card-body">
              <h5 class="card-title">El dólar blue sube un 2% en la semana</h5>
              <p class="card-text text-muted"><small>Hace 1 hora | Ámbito Financiero</small></p>
              <p class="card-text">La brecha cambiaria en Argentina supera el 100% tras nuevas medidas económicas.</p>
              <a href="#" class="btn btn-sm btn-primary">Leer más</a>
            </div>
          </div>
        </div>
      `;
    });
});