
// função de filtra 
const filterOpen = document.querySelector("#open-filter");
const filterClose = document.querySelector("#close-filter")
const containerSearchFilter = document.querySelector(".container-search-filter");
const radioInformation = document.querySelector("#radioInformation")
const iconOpenFilter = document.querySelector(".fa-filter")
const iconCloseFiltered = document.querySelector("#close-filter")

// opção deleção documentação
const modal = document.querySelector(".container-modal")
const btnOkDelete = document.querySelector(".btnOk")
const btnClose = document.querySelector(".btnClose")

// opção de edição de documentação
const modalEdit = document.querySelector(".container-modal-edit");
const editBtnConfirm = document.querySelector(".edit-btn-confirm");
const closeContainer = document.querySelector(".close-container");
const inputEdit = document.querySelector(".input-edit");
const containerEditRemove = document.querySelector(".container-edit-remove");
const modalBackgroundBody = document.querySelector(".modal-background");

// navbar
const navbarToggle = document.getElementById('navbar-toggle');
const navbar = document.getElementById('navbar');
const closeIcons = document.querySelectorAll('.fa-times');
const openIcon = document.querySelector(".open-icon")
const closeIcon = document.querySelector(".fa-times")

// slider das frases select
const containerSelect = document.querySelector(".container-select")

navbarToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

closeIcons.forEach((closeIcon) => {
  closeIcon.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});


openIcon.addEventListener("click", () => {
  modalBackgroundBody.style.display = "block"
})

closeIcon.addEventListener("click", () => {
  modalBackgroundBody.style.display = "none"
})

function openFilter(){    
  iconCloseFiltered.classList.add("font-lilac")
  iconOpenFilter.style.display = "none"
  iconCloseFiltered.style.display = "block"
  containerSearchFilter.style.display = "block"
}

function closeFilter(){

  iconCloseFiltered.style.display = "none"
  iconOpenFilter.style.display = "block"
  containerSearchFilter.style.display = "none"
}
function textOpen(){
  iconCloseFiltered.classList.add("font-lilac")
  containerSearchFilter.style.display = "block"
}


function createItem(item) {
  const { id, phrase, priority } = item;

  const liItem = document.createElement("li");
  liItem.classList.add('paragraph');

  
  const div = document.createElement("div");
  div.classList.add("border-color-phrases", `is-${item.priority}`);

  const phraseElement = document.createElement("li");
  phraseElement.classList.add("phrases" , `is-${item.priority}`);
  phraseElement.textContent = item.phrase;

  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("settings");

  const showMenuIcon = document.createElement("i");
  showMenuIcon.classList.add("fa-solid", "fa-ellipsis-vertical");
  showMenuIcon.addEventListener("click", () => showMenu(showMenuIcon));

  const taskMenuUl = document.createElement("ul");
  taskMenuUl.classList.add("task-menu");

  const deletePhraseLi = document.createElement("li");
  deletePhraseLi.addEventListener("click", () => deletePhrase(id));
  deletePhraseLi.innerHTML = `
    <button class="btnDeleteByPhrase"><i class="fa-solid fa-circle-minus"></i>Excluir frase</button>
  `;

  const editPhraseLi = document.createElement("li");
  editPhraseLi.addEventListener("click", () => editPhrase(id , phrase , priority));

  editPhraseLi.innerHTML = `
    <button class="btnEditByPhrase"><i class="fa-solid fa-chart-column"></i>Editar</button>
  `;

  taskMenuUl.appendChild(deletePhraseLi);
  taskMenuUl.appendChild(editPhraseLi);

  settingsDiv.appendChild(showMenuIcon);
  settingsDiv.appendChild(taskMenuUl);

  liItem.appendChild(div);
  liItem.appendChild(phraseElement);
  liItem.appendChild(settingsDiv);

  const ul = document.createElement("ul");
  ul.classList.add("container-flex-phrase");
  ul.appendChild(liItem);

  return ul;
}


async function listPhrases() {
  try {
    
    const phrasesList = document.getElementById("phrasesStayHere");
    phrasesList.innerHTML = "";

    const myPhrases = await listPhrase();
    if (myPhrases.length) {
      for (const item of myPhrases) {
        const { id, phrase, priority } = item;
        const ul = createItem({ id, phrase, priority});
        phrasesList.append(ul);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function showMenu(selectedPhrase ){
    const showModal = selectedPhrase.parentElement.lastElementChild;

    showModal.classList.contains("show")
    ?  showModal.classList.remove("show")
    :  showModal.classList.add("show")

    document.addEventListener("click", e => {
    if(e.target != selectedPhrase){
    showModal.classList.remove("show")
    }
  })
}

const backSentences = document.querySelector(".back-sentences")

document.addEventListener("DOMContentLoaded", function() {
  const applyAndFilter = document.querySelector(".applyAndFilter");
  applyAndFilter.addEventListener("click", applyFilters);
  
  function applyFilters() {


    const containerSelect = document.querySelector('.container-select');
    const searchInput = document.querySelector("#filter-input");
    const priorityInputs = document.querySelectorAll('input[name="priority"]:checked');
    
    if( !searchInput.value || !priorityInputs.length){
      Swal.fire({
        title: 'necessario prencher o campo de "Pesquisa" e "Prioridade"',
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-custom-button-class',
          title: 'my-custom-title',
          container: 'my-custom-modal-container'
        }
      });
    }

    if (searchInput.value && priorityInputs.length > 0) {
      filterInput();
      filterPriority();
      checkEmptyResults();
      backSentences.style.display = "block"
      containerSelect.style.display = "none"   
    }
  }

  function checkEmptyResults() {
    const listItems = document.querySelectorAll(".paragraph");
    const containerImg = document.querySelector("#containerImg");
    const btnPractice = document.querySelector("#btn-practice")
    btnPractice.style.display = "none"

    let hasDisplayedItem = false;

    listItems.forEach((item) => {
      if (item.style.display !== "none") {
        hasDisplayedItem = true;
      }
    });

    if (!hasDisplayedItem) {
      containerImg.style.display = "block";
    } else {
      containerImg.style.display = "none";
    }
  }

  function filterInput() {
    const searchInput = document.querySelector("#filter-input");
    const listItems = document.querySelectorAll(".paragraph");
    const containerImg = document.querySelector("#containerImg");
      
    const filter = searchInput.value.toLowerCase();

    let hasDisplayedItem = false;

    listItems.forEach((item) => {
      const text = item.querySelector(".phrases").textContent.toLowerCase();

      if (text.includes(filter)) {
        item.style.display = "";
        hasDisplayedItem = true;
      } else {
        item.style.display = "none";
      }
    });

    if (!hasDisplayedItem) {
      containerImg.style.display = "block";
    } else {
      containerImg.style.display = "none";
    }
  }



  function filterPriority() {
    const priorityInputs = document.querySelectorAll('input[name="priority"]:checked');
    const searchInput = document.querySelector("#filter-input");
    const listItems = document.querySelectorAll(".paragraph");
    const containerImg = document.querySelector("#containerImg");

    const filter = searchInput.value.toLowerCase();
    let hasDisplayedItem = false;

    listItems.forEach((item) => {
      const text = item.querySelector(".phrases").textContent.toLowerCase();
      const priorityChecked = item.querySelector(".border-color-phrases");

      priorityInputs.forEach((input) => {
        if (priorityChecked.classList.contains(`is-${input.value}`) && text.includes(filter)) {
          item.style.display = "";
          hasDisplayedItem = true;
        } else {
          item.style.display = "none";
        }
      });
    });

    if (!hasDisplayedItem) {
      containerImg.style.display = "flex";
      containerSelect.style.display = "none"
    } else {
      containerImg.style.display = "none";
    }
  }
});

const returnPhrases = document.querySelector('#returnPhrases');

returnPhrases.addEventListener("click", () => {
  const priorityInputs = document.querySelectorAll('input[name="priority"]');
  const listItems = document.querySelectorAll(".paragraph");
  const searchInput = document.querySelector("#filter-input");
  const containerImg = document.querySelector("#containerImg");
  const btnPractice = document.querySelector("#btn-practice")


  listItems.forEach((item) => {
    item.style.display = "block";
  });

  priorityInputs.forEach((input) => {
    input.checked = false;
  });

  containerImg.style.display = "none";
  containerSearchFilter.style.display = "none"
  containerSelect.style.display = "flex"
  backSentences.style.display = "none"
  btnPractice.style.display = "block"
  
  searchInput.value = ""
  closeFilter()
  listPhrases()
});


async function editPhrase(id, phrase, priority) {
  modalEdit.classList.add("active-edit");
  modalBackgroundBody.style.display = "block";



  const priorityInputs = document.querySelectorAll(`input[value="${priority}"]`);

  inputEdit.value = phrase;

  priorityInputs.forEach(input => {
      if (input.value === priority) {
        input.checked = true;
      } else {
        input.checked = false;
      }
});

  editBtnConfirm.addEventListener("click", confirmEdit);
    
  function confirmEdit() {

    const listItems = document.querySelectorAll(".phrases");
    const newPhrase = inputEdit.value;


    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].textContent === newPhrase 
          || listItems[i].textContent.toLowerCase() === newPhrase.toLowerCase()) {
          Swal.fire({
            title: "Esta frase já foi cadastrada",
            showCancelButton: false,
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "my-custom-button-class",
              title: "my-custom-title"
          }
        });
        return;
      }
    }
    
    if(inputEdit.value.length < 3){
      Swal.fire({
        title: 'necessario ter no mínimo 3 caracteres',
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-custom-button-class',
          title: 'my-custom-title'
        }
      })
      return
    }
  
    if (!newPhrase) {
      Swal.fire({
        title: '"Para editar, é necessário preencher todos os campos."',
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-custom-button-class',
          title: 'my-custom-title',
          container: 'my-custom-modal-container'
        }
      });
      return;
    }

    const newPriority = document.querySelector(`input[name="priority"]:checked`).value;

    const body = { phrase: newPhrase, priority: newPriority };

    try {
      client({ method: 'PUT', path: `phrase/${id}`, body })
      swal({
        text: `frase atualizada com sucesso`,
        icon: "success",
        timer: 1500, 
        buttons: false, 
        closeOnClickOutside: false,
    })
    } catch (error) {
      console.log(error)
    }

    modalBackgroundBody.style.display = "none";
    editBtnConfirm.removeEventListener("click", confirmEdit);
    modalEdit.classList.remove("active-edit");
    

    listPhrases();
  }

    closeContainer.addEventListener("click", () => {
    modalBackgroundBody.style.display = "none";
    modalEdit.classList.remove("active-edit");
  });
}



async function deletePhrase( id ) {
  modal.classList.add("active")
  modalBackgroundBody.style.display = "block"

  return new Promise((resolve) => {
    btnOkDelete.addEventListener("click" , confirmDelete)
    btnClose.addEventListener("click" , cancelDelete)
    
    function cancelDelete(){
    modal.classList.remove("active")
    btnOkDelete.addEventListener("click" , confirmDelete)
    btnClose.addEventListener("click" , cancelDelete)
    modalBackgroundBody.style.display = "none"


    resolve(false)
  }
  
  function confirmDelete(){
    modal.classList.remove("active")
    btnClose.removeEventListener("click" , cancelDelete)
    btnOkDelete.removeEventListener("click" , confirmDelete)
    modalBackgroundBody.style.display = "none"

    resolve(true)

    }
    }).then((confirmDelete) => {
      if (confirmDelete) {
        try {
          const response = client({ method: 'DELETE', path: `phrase/${id}` });
          if (response && (response.status === 200 || response.status === 404)) {
          }else{
            swal({
              text: `frase deltada com sucesso`,
              icon: "success",
              timer: 1500, 
              buttons: false, 
              closeOnClickOutside: false,
          })
          }
        } catch (error) {
          console.error(error);
        }    
        listPhrases()
      }
    });
  }

  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');


  
  prevButton.addEventListener('click', showPrevPhrases);
  nextButton.addEventListener('click', showNextPhrases);


  
  function showNextPhrases() {
    const phrasesList = document.getElementById('phrasesStayHere');
    const listItems = phrasesList.querySelectorAll('.paragraph');
    prevButton.style.display = "flex"

    
    let startSlide = 0;
    let countPhrasesSlide = 0;
    let isNonePhrases = false;
    
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].style.display === 'flex') {
        startSlide = i + 1;
        countPhrasesSlide--;
        console.log(listItems[i])
        listItems[i].style.display = 'none';
        isNonePhrases = false
      }
    }
    if (select.value === "pagThree"){
      for (let i = startSlide; i < startSlide + 3 && i < listItems.length; i++) {
        if (listItems[i]) {
          listItems[i].style.display = 'flex';
          countPhrasesSlide--;
          isNonePhrases = true
        }
      }
    }

  if (select.value === "pagFive"){
    for (let i = startSlide; i < startSlide + 5 && i < listItems.length; i++) {
      if (listItems[i]) {
        listItems[i].style.display = 'flex';
        countPhrasesSlide--;
        isNonePhrases = true
      }
    }
  }
  if(select.value === "pagTen"){
    for (let i = startSlide; i < startSlide + 10 && i < listItems.length; i++) {
      if (listItems[i]) {
        listItems[i].style.display = 'flex';
        countPhrasesSlide--;
        isNonePhrases = true
      }
    }
  }
  if(select.value === "pagFifteen"){
    for (let i = startSlide; i < startSlide + 15 && i < listItems.length; i++) {
      if (listItems[i]) {
        listItems[i].style.display = 'flex';

        countPhrasesSlide--;
        isNonePhrases = true
      }
    }
  }
  if(select.value === "pagTwenty"){
    for (let i = startSlide; i < startSlide + 20 && i < listItems.length; i++) {
      if (listItems[i]) {
        listItems[i].style.display = 'flex';

        countPhrasesSlide--;
        isNonePhrases = true
      }
    }
  }
    if (countPhrasesSlide === 0 && listItems.length > 0) {
      listItems[0].style.display = 'flex';
    }
    if (!isNonePhrases) {
      nextButton.style.display = "none";
    } else{
      nextButton.style.display = "block";
    } 
  }

  
  function showPrevPhrases() {
    const phrasesList = document.getElementById('phrasesStayHere');
    const listItems = phrasesList.querySelectorAll('.paragraph');
    const select = document.querySelector("select");
    nextButton.style.display = "flex"
  
    let startSlide = 0;
    let countPhrasesSlide = 0;
    let isNonePhrases = false;
  
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].style.display === 'flex') {
        startSlide = i + 1;
        countPhrasesSlide++;
        console.log(listItems[i])
        listItems[i].style.display = 'none';
        isNonePhrases = false;
      }
    }
  
    if (select.value === "pagThree") {
      for (let i = startSlide; i < startSlide + 3 && i < listItems.length; i++) {
        if (listItems[i]) {
          listItems[i].style.display = 'flex';
          countPhrasesSlide++;
          isNonePhrases = true;
        }
      }
    }
    if (select.value === "pagFive") {
      for (let i = startSlide; i < startSlide + 5 && i < listItems.length; i++) {
        if (listItems[i]) {
          listItems[i].style.display = 'flex';
          countPhrasesSlide++;
          isNonePhrases = true;
        }
      }
    } else if (select.value === "pagTen") {
      for (let i = startSlide; i < startSlide + 10 && i < listItems.length; i++) {
        if (listItems[i]) {
          listItems[i].style.display = 'flex';
          countPhrasesSlide++;
          isNonePhrases = true;

        }
      }
    } else if (select.value === "pagFifteen") {
      for (let i = startSlide; i < startSlide + 15 && i < listItems.length; i++) {
        if (listItems[i]) {
          listItems[i].style.display = 'flex';
          countPhrasesSlide++;
          isNonePhrases = true;

        }
      }
    }
    else if (select.value === "pagTwenty") {
      for (let i = startSlide; i < startSlide + 20 && i < listItems.length; i++) {
        if (listItems[i]) {
          listItems[i].style.display = 'flex';
          countPhrasesSlide++;
          isNonePhrases = true;

        }
      }
    }
  
    if (countPhrasesSlide === 0 && listItems.length > 0) {
      listItems[0].style.display = 'flex';
    }
    if (!isNonePhrases) {
      prevButton.style.display = "none";
    } else{
      prevButton.style.display = "block";
    } 
  }
  
        prevButton.style.display = "none";
        nextButton.style.display = "none";
  
  const select = document.querySelector("select");
  
  select.addEventListener("change", () => {
    const listItems = document.querySelectorAll(".paragraph");


    for (let index = 0; index < listItems.length; index++) {
      if (select.value === "pagThree" && index < 3) {
        listItems[index].style.display = "flex";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        
      }
      else if(select.value === "pagFive" && index < 5) {
        listItems[index].style.display = "flex";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      } 
      else if (select.value === "pagTen" && index < 10) {
        listItems[index].style.display = "flex";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      } 
      else if (select.value === "pagFifteen" && index < 15) {
        listItems[index].style.display = "flex";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      } 
      else if (select.value === "pagTwenty" && index < 20) {
        listItems[index].style.display = "flex";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      } 
      else {
        listItems[index].style.display = "none";
        prevButton.style.display = "flex";
        nextButton.style.display = "flex";
      }
    }
  });

// dark mode

const body = document.querySelector("body");
const header = document.querySelector("header")
const button = document.querySelector("button")
const toggle = document.querySelector(".toggle");
const practiceBtn = document.querySelector("#practice-btn")
const btnPractice = document.querySelector("#btn-practice")

const getTheme = localStorage.getItem("theme");

if (getTheme === "dark") {
  body.classList.add("dark");
  header.classList.add("dark")
  button.classList.add("dark")
  select.classList.add("dark")
  prevButton.classList.add("dark")
  nextButton.classList.add("dark")
  returnPhrases.classList.add("dark")
  btnPractice.classList.add("dark")


  toggle.classList.add("active");
  toggle.innerHTML = `<i class="fas fa-moon"></i>`
  openFilter()
}else{
  toggle.innerHTML = `<i class="fas fa-sun"></i>`
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  header.classList.toggle("dark")
  button.classList.toggle("dark")
  select.classList.toggle("dark")
  prevButton.classList.toggle("dark")
  nextButton.classList.toggle("dark")
  returnPhrases.classList.toggle("dark")
  btnPractice.classList.toggle("dark")
  
  

  toggle.classList.toggle("active");
  
  if (body.classList.contains("dark") 
      && header.classList.contains("dark") 
      && button.classList.contains("dark")
      && prevButton.classList.contains("dark")
      && nextButton.classList.contains("dark")
      && returnPhrases.classList.contains("dark")
      && select.classList.contains("dark")
      && btnPractice.classList.contains("dark")

   
      ) {
    localStorage.setItem("theme", "dark");
    toggle.innerHTML = `<i class="fas fa-moon"></i>`
  }
  else {
    localStorage.setItem("theme", "light");
    toggle.innerHTML = `<i class="fas fa-sun"></i>`
  }
});

listPhrases(); 
