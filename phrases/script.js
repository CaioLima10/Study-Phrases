const form = document.getElementById("form");
const buttonRegister = document.getElementById("buttonRegister");
const phrasesTextarea = document.getElementById("phrase");
const phrasesStayHere = document.querySelector(".phrasesStayHere");
// abrir e fechar modal
const modalBackgroundBody = document.querySelector(".modal-background")
const navbarToggle = document.getElementById('navbar-toggle');
const navbar = document.getElementById('navbar');
const closeIcons = document.querySelectorAll('.fa-times');

// slider das frases select
const containerSelect = document.querySelector(".container-select")

const body = document.querySelector("body");
const header = document.querySelector("header")
const toggle = document.querySelector(".toggle");

const getTheme = localStorage.getItem("theme");
if (getTheme === "dark") {
  body.classList.add("dark");
  header.classList.add("dark")
  buttonRegister.classList.add("dark")
  toggle.classList.add("active");
  toggle.innerHTML = `<i class="fas fa-moon"></i>`
}else{
  toggle.innerHTML = `<i class="fas fa-sun"></i>`
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  header.classList.toggle("dark")
  buttonRegister.classList.toggle("dark")
  toggle.classList.toggle("active");
  
  if (body.classList.contains("dark") 
  && header.classList.contains("dark")
  && buttonRegister.classList.contains("dark")
      ) {
    localStorage.setItem("theme", "dark");
    toggle.innerHTML = `<i class="fas fa-moon"></i>`
  }
  else {
    localStorage.setItem("theme", "light");
    toggle.innerHTML = `<i class="fas fa-sun"></i>`
  }
});


function enableButton() {
  buttonRegister.disabled = true;
  buttonRegister.style.cursor = 'not-allowed';
}

function disableButton() {
  buttonRegister.disabled = false;
  buttonRegister.style.cursor = 'pointer';
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

buttonRegister.addEventListener("click", function () {
  disableButton();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputChecked = document.querySelector('input[name="prioridade"]:checked');
  const textarea = document.getElementById("phrase");

  try {

    if(textarea.value.length < 3){
      Swal.fire({
        title: 'necessario ter no mínimo 3 caracteres',
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-custom-button-class',
          title: 'my-custom-title-class'
        }
      });

      textarea.value = ""

      return 
    }

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
const lowerCasePhrase = phrase.toLowerCase();
const isDuplicate = existingPhrases.some(existingPhrase => existingPhrase.toLowerCase() === lowerCasePhrase);
return isDuplicate;
}


