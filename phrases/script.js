// registro da frases
const form = document.getElementById("form");
const buttonRegister = document.getElementById("buttonRegister");
const phrasesTextarea = document.getElementById("phrase");
const phrasesStayHere = document.querySelector(".phrasesStayHere");

// abrir e fechar modal
const modalBackgroundBody = document.querySelector(".modal-background")
const navbarToggle = document.getElementById('navbar-toggle');
const navbar = document.getElementById('navbar');
const closeIcons = document.querySelectorAll('.fa-times');

// contador de letras
const count = document.querySelector("#count")

// slider das frases select
const containerSelect = document.querySelector(".container-select")

// dark mode
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

phrasesTextarea.addEventListener("input", () => {
  if(phrasesTextarea.value.length < 150){
    count.style.color = '#fff'
    count.innerText = phrasesTextarea.value.length
  }else{
    count.style.color = '#d04a4a'
    count.innerText = 'Max'
    phrasesTextarea.value = phrasesTextarea.value
  }
})


form.addEventListener('submit', async  (event) => {
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

    const existingPhrases = await listPhrase();

    for (let i = 0; i < existingPhrases.length ;i++) {
      if (existingPhrases[i].phrase.toLowerCase() === textarea.value.toLowerCase()) {

            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-right',
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
      loadCounterPhrases()
    }


    const successAlert = displaySuccessAlert();
    createPhrase({
      phrase: textarea.value,
      priority: inputChecked.value,
      successAlert: successAlert
    });

    textarea.value = '';
    inputChecked.checked = false;

    count.innerText = 0
    count.style.color = "#fff"
    
  } catch (error) {
    console.log('error', error);
  }
  loadCounterPhrases()
});

function displaySuccessAlert() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
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
  loadCounterPhrases()
}

const loadCounterPhrases = async () =>{

  const existingPhrases = await listPhrase();

  const countPhrases = document.querySelector(".counter-phrases");

  const localCounter = localStorage.getItem("counter") || 0;
  const currentCounter = parseInt(localCounter);

  const textCounter = document.createElement("span")
  textCounter.classList.add("textCounter")
  textCounter.innerHTML = "Quantidade de frases criadas: "

  countPhrases.innerHTML = `${existingPhrases.length}`

  countPhrases.appendChild(textCounter) 

  if (existingPhrases.length > currentCounter) {
    localStorage.setItem("counter", existingPhrases.length);
  }

}

loadCounterPhrases()
