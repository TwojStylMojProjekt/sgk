// Ustawienie języka
function setLang(lang) {
  document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.lang.' + lang).forEach(el => el.style.display = 'block');
}

// Domyślny język: NL
document.addEventListener('DOMContentLoaded', () => {
  setLang('nl');

  const form = document.getElementById('opinie-form');
  const list = document.getElementById('opinie-list');

  // Załaduj przykładowe opinie z pliku JSON (lokalna symulacja)
  fetch('opinie.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(opinia => renderOpinion(opinia));
    });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const [name, date, rating, message] = form.elements;
    const opinia = {
      name: name.value,
      date: date.value,
      rating: rating.value,
      message: message.value
    };
    renderOpinion(opinia);
    form.reset();
  });
});

// Renderowanie opinii
function renderOpinion({ name, date, rating, message }) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const div = document.createElement('div');
  div.innerHTML = `
    <p><strong>${name}</strong> (${date})</p>
    <p>${stars}</p>
    <p>${message}</p>
    <hr>
  `;
  document.getElementById('opinie-list').prepend(div);
}
