document.addEventListener('DOMContentLoaded', () => {
  // API Key de ExchangeRate-API (¡Regístrate para obtener una gratis!)
  const API_KEY = '47429184c2c5f2aafa88fb09'; // Reemplaza esto
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  // Elementos del DOM
  const dolarValueElement = document.getElementById('dolarValue');
  const conversionForm = document.getElementById('conversionForm');
  const resultElement = document.getElementById('result');
  const conversionResultElement = document.getElementById('conversionResult');

  // 1. Obtener valor del dólar
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        const rates = data.conversion_rates;
        dolarValueElement.innerHTML = `
          <h3 class="display-4">1 USD = ${rates.ARS.toFixed(2)} ARS</h3>
          <p class="text-muted">* Tasa de cambio actual</p>
        `;
        
        // 2. Manejar conversión
        if (conversionForm) {
          conversionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('amount').value);
            const currency = document.getElementById('currency').value;
            
            if (amount && currency) {
              const usdValue = amount / rates[currency];
              conversionResultElement.textContent = `${usdValue.toFixed(2)} USD`;
              resultElement.style.display = 'block';
            }
          });
        }
      }
    })
    .catch(error => {
      dolarValueElement.innerHTML = `
        <p class="text-danger">Error al obtener datos. Usando tasa de cambio fija (1 USD = 4000 COP)</p>
      `;
      console.error('Error con la API:', error);
    });
});