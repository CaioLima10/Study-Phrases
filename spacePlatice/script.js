
// abrir e fechar modal
const modalBackgroundBody = document.querySelector(".modal-background")
const navbarToggle = document.getElementById('navbar-toggle');
const navbar = document.getElementById('navbar');
const closeIcons = document.querySelectorAll('.fa-times');

// slider das frases select
const containerSelect = document.querySelector(".container-select")

// carregar frases
const loading = document.querySelector(".loading");

// dark mode
const body = document.querySelector("body");
const header = document.querySelector("header")
const toggle = document.querySelector(".toggle");
const button = document.querySelector("button")
const linkHomePhrases = document.querySelector(".linkHomePhrases")


const getTheme = localStorage.getItem("theme");

if (getTheme === "dark") {
  body.classList.add("dark");
  header.classList.add("dark")
  button.classList.add("dark")
  linkHomePhrases.classList.add("dark")
  toggle.classList.add("active");
  toggle.innerHTML = `<i class="fas fa-moon"></i>`
}else{
  toggle.innerHTML = `<i class="fas fa-sun"></i>`
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  header.classList.toggle("dark")
  button.classList.toggle("dark")
  linkHomePhrases.classList.toggle("dark")
  toggle.classList.toggle("active");
  
  if (body.classList.contains("dark") 
  && header.classList.contains("dark")
  && button.classList.contains("dark")
  ) {
    localStorage.setItem("theme", "dark");
    toggle.innerHTML = `<i class="fas fa-moon"></i>`

  }
  else {
    localStorage.setItem("theme", "light");
    toggle.innerHTML = `<i class="fas fa-sun"></i>`
  }
});

navbarToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

closeIcons.forEach((closeIcon) => {
  closeIcon.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});

const openIcon = document.querySelector(".open-icon")
const closeIcon = document.querySelector(".fa-times")

openIcon.addEventListener("click", () => {
  modalBackgroundBody.style.display = "block"
})

closeIcon.addEventListener("click", () => {
  modalBackgroundBody.style.display = "none"
})


async function getPhraseMotivation(){

  try {
    const purpleText = document.querySelector(".purpleText");
    purpleText.innerHTML = "";

    const myPhrasesMotivation = await phrasesMotivation();

    const motivation = listPhraseMotivation(myPhrasesMotivation)

    if (motivation.length) {
      for (const item of motivation) {
        const { phrase } = item;
        const div = document.createElement("div");
        div.textContent = phrase;
        purpleText.append(div);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function randomIntFromIntervalMotivation(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateRandomPhraseMotivation(list = []) {
  const max = list.length - 1;
  const index = randomIntFromIntervalMotivation(0, max);
  return index;
}

function listPhraseMotivation(listPhrasesMotivation = []) {
  const listaSorteados = [];
  for (let index = 0; index < 1; index++) {
    const indexSorteado = generateRandomPhraseMotivation(listPhrasesMotivation)
    const fraseSorteada = listPhrasesMotivation.splice(indexSorteado, 1);
    listaSorteados.push(fraseSorteada[0]);
  }
  return listaSorteados
}


function loadingRandom() {
  const div = document.createElement("div");
  div.classList.add("loading", "centralize");

  const label = document.createElement("label");
  label.innerHTML = `<div class="custom-loader"></div>`;

  const span = document.createElement("span");
  span.innerHTML = 'carregando...';

  div.appendChild(label);
  label.appendChild(span)
  document.body.appendChild(div);

  setTimeout(() => hideLoadingRandom(), 1000);
}


function hideLoadingRandom() {
  const loadings = document.getElementsByClassName("loading");

  if (loadings.length) {
    loadings[0].remove();
  }
}

const modal = document.querySelector(".container-modal");
const modalBackground = document.querySelector(".modal-background")

let clickCount = 0;
let motivationElement = null;

async function listPhrases() {
  try {
    const phrasesList = document.querySelector("#phrasesStayHere");
    phrasesList.innerHTML = "";

    const myPhrases = await listPhrase();
    const randomPhrases = sortearFrases(myPhrases);

    if (randomPhrases.length) {
      for (const item of randomPhrases) {
        const { id, phrase } = item;
        const li = document.createElement("li");
        li.textContent = phrase;
        phrasesList.append(li);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
async function loadPhrasesTop(){

  const list = await listPhrase()
  const phrasesList = document.querySelector("#phrasesStayHere");

  if(list.length < 6){
    phrasesList.style.display = "none"
    Swal.fire({
      title: 'necessario ter 6 frases cadastradas',
      showCancelButton: false,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'my-custom-button-class',
        title: 'my-custom-title-class'
      }
    });
  }else{
    phrasesList.style.display = "block"
    clickCount++;

    if (clickCount === 6) {
      modal.style.display = "flex";
      modalBackground.style.display = "block"
      
      const purpleText = document.querySelector(".purpleText");

      const motivation = await getPhraseMotivation();
      const div = document.createElement("div");
      div.textContent = motivation;
      purpleText.appendChild(div);


      clickCount = 0;
      motivationElement = div;
      
      setTimeout(() => {
        modal.style.display = "none";
        modalBackground.style.display = "none"
        purpleText.style.display = "flex";
      }, 2000);

        } else if (motivationElement) {
      motivationElement.remove();
      const purpleText = document.querySelector(".purpleText");
      purpleText.style.display = "none";
    }
  }
}



const btnRandomPhrases = document.querySelector("#btnRandomPhrases");
button.addEventListener("click", () => setTimeout(() =>{
  loadPhrasesTop()
  listPhrases()
}, 1000));


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function generateRandomPhrase(list = []) {
    const max = list.length - 1;
    const index = randomIntFromInterval(0, max);
    return index;
  }

function sortearFrases(listPhrases = []) {
  const listaSorteados = [];
  for (let index = 0; index < 3; index++) {
    const indexSorteado = generateRandomPhrase(listPhrases)
    const fraseSorteada = listPhrases.splice(indexSorteado, 1);
    listaSorteados.push(fraseSorteada[0]);
  }
  return listaSorteados
}

listPhraseMotivation()
sortearFrases()