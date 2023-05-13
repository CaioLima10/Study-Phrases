
const form = document.getElementById("form");
const buttonRegister = document.getElementById("buttonRegister");
const phrasesTextarea = document.getElementById("phrase");

buttonRegister.addEventListener("click", function () {
  disableButton();
});

function enableButton() {
  // buttonRegister.disabled = false;
  buttonRegister.style.cursor = "pointer";
}

function disableButton() {
  // buttonRegister.disabled = true;
  buttonRegister.style.cursor = "not-allowed";
}

phrasesTextarea.addEventListener("keyup",  () => {
  if (phrasesTextarea.value) {
    enableButton();
  } else {
    disableButton();
  }
});


phrasesTextarea.addEventListener('input', () => {
  phrasesTextarea.value = phrasesTextarea.value
    ? phrasesTextarea.value.trimStart()
    : '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  createPhrase({ phrase: phrasesTextarea.value })
});

let arr = [];

function newPhrase() {

  
  if (localStorage.phraseBank) {
    arr = JSON.parse(localStorage.getItem("phraseBank"));
  }
  let phrase = document.getElementById("phrase").value.toLowerCase();
  
  const itemAlreadyExists = arr.find((item) => item == phrase);
  
  
  if (itemAlreadyExists) {
  } else {
    arr.push(phrase);
  }

  document.getElementById("phrase").value = "";
  localStorage.phraseBank = JSON.stringify(arr);
  
}

const alertSuccessPhrase = document.querySelector(".alert-success-phrase");

const msg = "frase criada  ✔";

function ativar(msg) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.innerText = msg;
  alertSuccessPhrase.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}
