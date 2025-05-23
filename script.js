
document.addEventListener('DOMContentLoaded', function () {
  fetch('opinie.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('opinie-container');
      container.innerHTML = '';

      data.forEach(opinia => {
        const opiniaDiv = document.createElement('div');
        opiniaDiv.classList.add('opinia');

        const gwiazdki = '★'.repeat(opinia.ocena) + '☆'.repeat(5 - opinia.ocena);

        opiniaDiv.innerHTML = `
          <p><strong>${opinia.imie}</strong> – <em>${opinia.data}</em></p>
          <p class="gwiazdki">${gwiazdki}</p>
          <p>${opinia.tresc}</p>
        `;

        container.appendChild(opiniaDiv);
      });
    })
    .catch(error => {
      console.error('Błąd wczytywania opinii:', error);
    });
});
