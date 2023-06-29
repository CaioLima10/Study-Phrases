
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

//opção edição documentação
const modalEdit = document.querySelector(".container-modal-edit");
const editBtnConfirm = document.querySelector(".edit-btn-confirm");
const closeContainer = document.querySelector(".close-container")
const inputEdit = document.querySelector(".input-edit");
const containerEditRemove = document.querySelector(".container-edit-remove");
const modalBackgroundBody = document.querySelector(".modal-background") 

// navbar
const navbarToggle = document.getElementById('navbar-toggle');
const navbar = document.getElementById('navbar');
const closeIcons = document.querySelectorAll('.fa-times');
const openIcon = document.querySelector(".open-icon")
const closeIcon = document.querySelector(".fa-times")

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

  const liItem = document.createElement("li");
  liItem.classList.add("paragraph");

  const div = document.createElement("div");

  console.log(item.priority)

  div.classList.add('border-color-phrases' , `is-${item.priority}`);

  const phraseElement = document.createElement("li");
  phraseElement.classList.add("phrases");
  phraseElement.textContent = item.phrase;

  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("settings");

  const showMenuIcon = document.createElement("i");
  showMenuIcon.classList.add("fa-solid", "fa-ellipsis-vertical");
  showMenuIcon.addEventListener("click", () => showMenu(showMenuIcon));

  const taskMenuUl = document.createElement("ul");
  taskMenuUl.classList.add("task-menu");

  const deletePhraseLi = document.createElement("li");
  deletePhraseLi.addEventListener("click", () => deletePhrase({ id: item.id }));
  deletePhraseLi.innerHTML = `
    <button class="btnDeleteEditByPhrase"><i class="fa-solid fa-circle-minus"></i>Excluir frase</button>
  `;

  const editPhraseLi = document.createElement("li");
  editPhraseLi.addEventListener("click", () => editPhrase({ id: item.id }));
  editPhraseLi.innerHTML = `
    <button class="btnDeleteEditByPhrase"><i class="fa-solid fa-chart-column"></i>Editar</button>
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
  const phrasesList = document.getElementById("phrasesStayHere");
  
  phrasesList.innerHTML = "";

  const minhasFrases = await listPhrase();
  console.log({ minhasFrases })
  if (minhasFrases.length) {
    for (const item of minhasFrases) {
      const { id, phrase, priority } = item;
      const ul = createItem({ id, phrase, priority });
      phrasesList.append(ul);

    }
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
  const applyAndFilter = document.querySelector("#applyAndFilter");
  applyAndFilter.addEventListener("click", applyFilters);
  
  function applyFilters() {
    const searchInput = document.querySelector("#filter-input");
    const priorityInputs = document.querySelectorAll('input[name="priority"]:checked');
    
    if (searchInput.value && priorityInputs.length > 0) {
      filterInput();
      filterPriority();
      checkEmptyResults();
      backSentences.style.display = "block"
    }
  }

  function checkEmptyResults() {
    const listItems = document.querySelectorAll(".paragraph");
    const containerImg = document.querySelector("#containerImg");

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
      containerImg.style.display = "block";
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

  listItems.forEach((item) => {
    item.style.display = "block";
  });

  priorityInputs.forEach((input) => {
    input.checked = false;
  });

  containerImg.style.display = "none";
  containerSearchFilter.style.display = "none"
  backSentences.style.display = "none"
  searchInput.value = ""
  closeFilter()
  listPhrases()
});

async function editPhrase({ id }) {
  modalEdit.classList.add("active-edit");
  modalBackgroundBody.style.display = "block"

  return new Promise((resolve, reject) => {
    editBtnConfirm.addEventListener("click", confirmEdit);

    async function confirmEdit() {
      const newPhrase = inputEdit.value 
      const newInputChecked = document.querySelector('input[name="prioridade"]:checked').value;

      if(!newPhrase || !newInputChecked){
        alert("para editar precisa prencher todos os campos")
        return
      }
      
      try {
        const response = await client({
          method: 'PUT',
          path: `phrase/${id}`,
          body: { phrase: newPhrase, priority: newInputChecked }
        });
        
        if (response && response.status === 204) {
          console.log('Frase atualizada com sucesso!');
          resolve();
        } else {
          reject(new Error("frase não foi editada"))
        }
      } catch (error) {
        reject(error);
      }
      
      modalBackgroundBody.style.display = "none"
      editBtnConfirm.removeEventListener("click", confirmEdit);
      modalEdit.classList.remove("active-edit");

      listPhrases();
    }

    closeContainer.addEventListener("click", () => {
      modalBackgroundBody.style.display = "none"
      modalEdit.classList.remove("active-edit");
    })
  });
}

async function deletePhrase({ id }) {
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

function showPrevPhrases() {
  const phrasesList = document.getElementById('phrasesStayHere');
  const listItems = phrasesList.querySelectorAll('.paragraph');
  
  listItems.forEach((item) => {
    if (item.style.display !== 'none') {
      item.style.display = 'none';
      return;
    }
    
    if (item.previousElementSibling) {
      item.previousElementSibling.style.display = 'flex';
    }
  });

}

function showNextPhrases() {
  const phrasesList = document.getElementById('phrasesStayHere');
  const listItems = phrasesList.querySelectorAll('.paragraph');
  
  let displayedItemFound = false;
  listItems.forEach((item) => {
    if (displayedItemFound) {
      item.style.display = 'none';
      return;
    }
    
    if (item.style.display !== 'none') {
      displayedItemFound = true;
      item.style.display = 'none';
    }
  });
  
  if (!displayedItemFound) {
    listItems[0].style.display = 'flex';
  }

listPhrases(); 
}

  const select = document.querySelector("select")

  select.addEventListener("change", () => {
    const listItems = document.querySelectorAll(".paragraph");
  
    for (let index = 0; index < listItems.length; index++) {
      if (select.value === "pagFive" && index < 5) {
        listItems[index].style.display = "flex";
      }
        else if (select.value === "pagTen" && index < 10) {
        listItems[index].style.display = "flex";
      } 
        else if (select.value === "pagFifteen" && index < 15) {
        listItems[index].style.display = "flex";      
      }
        else {
        listItems[index].style.display = "none";
      }
    }
  });
  


listPhrases(); 
