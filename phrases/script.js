const form = document.getElementById("form");
const buttonRegister = document.getElementById("buttonRegister");
const phrasesTextarea = document.getElementById("phrase");
const phrasesStayHere = document.querySelector(".phrasesStayHere")
const borderColorPhrases = document.querySelector(".border-color-phrases")

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

  const inputChecked = document.querySelector('input[name="prioridade"]:checked')
  const textarea = document.getElementById("phrase")
  try {
    if (!inputChecked || !textarea.value) {
      // error
      alert('por favor digitar todos os campos')
    }
    if (inputChecked) {
      const priority = inputChecked.value;
      getPriorityColor(priority);
    }

  createPhrase({
      phrase: textarea.value,
      priority: document.querySelector('input[name="prioridade"]:checked').value
    })

    textarea.value = ''
    inputChecked.checked = false

    } catch (error) {
      console.log('error', error)
    }

  function getPriorityColor(priority) {
    if(priority === "low"){
      console.log(priority)
    }
    if(priority === "medium"){
      console.log(priority)
    }
    if(priority === "high"){
      console.log(priority)
    }}
  });
