
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("opinie-form");
  const opinieList = document.getElementById("opinie-list");

  const fetchOpinie = () => {
    fetch("opinie.json")
      .then(response => response.json())
      .then(data => {
        opinieList.innerHTML = "";
        data.forEach(opinia => {
          const div = document.createElement("div");
          div.classList.add("opinion");
          div.innerHTML = `
            <strong>${opinia.imie}</strong> – <em>${opinia.data}</em><br>
            <span class="stars">${'★'.repeat(opinia.gwiazdek)}</span>
            <p>${opinia.tekst}</p>
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

  // Opinie lokalne z localStorage
  const savedOpinie = JSON.parse(localStorage.getItem("opinie") || "[]");
  savedOpinie.forEach(opinia => {
    const div = document.createElement("div");
    div.classList.add("opinion");
    div.innerHTML = `
      <strong>${opinia.imie}</strong> – <em>${opinia.data}</em><br>
      <span class="stars">${'★'.repeat(opinia.gwiazdek)}</span>
      <p>${opinia.tekst}</p>
    `;
    opinieList.appendChild(div);
  });
});
