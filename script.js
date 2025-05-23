
// Przełączanie języka
function setLang(lang) {
  document.querySelectorAll('.lang').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.lang.' + lang).forEach(el => {
    el.style.display = 'block';
  });
  localStorage.setItem('lang', lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('lang') || 'pl';
  setLang(savedLang);

  // Obsługa opinii
  const form = document.getElementById("opinie-form");
  const opinieList = document.getElementById("opinie-list");

  const fetchOpinie = () => {
    fetch("opinie.json")
      .then(response => response.json())
      .then(data => {
        opinieList.innerHTML = "";
        data.forEach(opinia => {
          const div = document.createElement("div");
          div.innerHTML = `
            <strong>${opinia.imie}</strong> – <em>${opinia.data}</em><br>
            ${'★'.repeat(opinia.gwiazdek)}<br>
            <p>${opinia.tekst}</p>
            <hr>
          `;
          opinieList.appendChild(div);
        });
      });
  };

  fetchOpinie();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const imie = form.querySelector("input[type='text']").value;
    const data = form.querySelector("input[type='date']").value;
    const gwiazdek = form.querySelector("select").value;
    const tekst = form.querySelector("textarea").value;

    const newOpinion = { imie, data, gwiazdek, tekst };
    const localOpinie = JSON.parse(localStorage.getItem("opinie") || "[]");
    localOpinie.unshift(newOpinion);
    localStorage.setItem("opinie", JSON.stringify(localOpinie));
    fetchOpinie();
    form.reset();
  });

  // Dodanie zapisanych lokalnie opinii
  const savedOpinie = JSON.parse(localStorage.getItem("opinie") || "[]");
  savedOpinie.forEach(opinia => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${opinia.imie}</strong> – <em>${opinia.data}</em><br>
      ${'★'.repeat(opinia.gwiazdek)}<br>
      <p>${opinia.tekst}</p>
      <hr>
    `;
    opinieList.appendChild(div);
  });

  // Automatyczny slider
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  setInterval(() => {
    slides.forEach((slide, index) => {
      slide.style.display = (index === currentSlide) ? "block" : "none";
    });
    currentSlide = (currentSlide + 1) % slides.length;
  }, 4000);
});
