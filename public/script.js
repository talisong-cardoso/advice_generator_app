const btnGenerate = document.getElementById("btn-generate");
const idAdvice = document.getElementsByClassName("id_advice")[0];
const cardText = document.getElementsByClassName("card-text")[0];
const selectLanguage = document.getElementById("select-language");
const btnSelectLanguage = document.getElementById("switch-language");
let selectedLanguage = "en";

btnSelectLanguage.onclick = function () {
  selectLanguage.style.display = "inline";
};

selectLanguage.onchange = function () {
  selectedLanguage = selectLanguage.options[selectLanguage.selectedIndex].value;
  console.log(selectedLanguage);
  selectLanguage.style.display = "none";
};

window.addEventListener("DOMContentLoaded", genereteAdvice);
btnGenerate.addEventListener("click", genereteAdvice);

function genereteAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (selectedLanguage !== "en") {
        translate({ text: data.slip.advice, lang: selectedLanguage });
        return;
      }
      idAdvice.innerHTML = `#${data.slip.id}`;
      cardText.innerHTML = `"${data.slip.advice}"`;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function translate(options) {
  const url = window.location.href;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: options.text,
      lang: options.lang,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      cardText.innerHTML = `"${data.text}"`;
    })
    .catch((error) => console.log(error));
}
