const form = document.getElementById("form");
const buttonRegister = document.getElementById("buttonRegister");
const phrasesTextarea = document.getElementById("phrase");
const phrasesStayHere = document.querySelector(".phrasesStayHere");

buttonRegister.addEventListener("click", function () {
  disableButton();
});

function enableButton() {
  buttonRegister.disabled = true;
  buttonRegister.style.cursor = 'not-allowed';
  buttonRegister.style.backgroundColor = '#5b5f6e';
}

function disableButton() {
  buttonRegister.disabled = false;
  buttonRegister.style.cursor = 'pointer';
  buttonRegister.style.backgroundColor = '#5540cd';
}

phrasesTextarea.addEventListener("keyup", () => {
  if (!phrasesTextarea.value) {
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

  const inputChecked = document.querySelector('input[name="prioridade"]:checked');
  const textarea = document.getElementById("phrase");

  try {
    if (!inputChecked || !textarea.value) {
 
      Swal.fire({
        title: 'Por favor, preencha todos os campos.',
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-custom-button-class',
          title: 'my-custom-title-class'
        }
      });
      return;
    }

    const isPhraseDuplicate = checkDuplicatePhrase(textarea.value);
    if (isPhraseDuplicate) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        title: 'Frase já foi criada!',
        icon: 'warning'
      })
      return;
    }

    const successAlert = displaySuccessAlert();
    createPhrase({
      phrase: textarea.value,
      priority: inputChecked.value,
      successAlert: successAlert
    });

    existingPhrases.push(textarea.value);

    textarea.value = '';
    inputChecked.checked = false;
  } catch (error) {
    console.log('error', error);
  }
});

function displaySuccessAlert() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    title: 'Frase criada com sucesso',
  })
}

const existingPhrases = [];

function checkDuplicatePhrase(phrase) {
  const isDuplicate = existingPhrases.includes(phrase);
  return isDuplicate;
}


