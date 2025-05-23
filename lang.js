
document.addEventListener('DOMContentLoaded', function () {
  const langToggle = document.getElementById('lang-toggle');

  langToggle.addEventListener('click', () => {
    const pl = document.querySelectorAll('.lang-pl');
    const nl = document.querySelectorAll('.lang-nl');

    pl.forEach(el => el.style.display = el.style.display === 'none' ? '' : 'none');
    nl.forEach(el => el.style.display = el.style.display === 'none' ? '' : 'none');
  });
});
