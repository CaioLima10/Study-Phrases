const openModal = document.querySelector("#openModal");
const containerEditRemove = document.querySelector(".container-edit-remove");
const containerSearchFilter = document.querySelector(".container-search-filter");
const filter = document.querySelector("#open-filter");
const select = document.querySelector(".select");
const optionsList = document.querySelector(".options-list");

// opção deleção documentação
const modal = document.querySelector(".container-modal")
const btnOkDelete = document.querySelector(".btnOk")
const btnClose = document.querySelector(".btnClose")

//opção edição documentação
const modalEdit = document.querySelector(".container-modal-edit");
const editBtnConfirm = document.querySelector(".edit-btn-confirm");
const inputEdit = document.querySelector(".input-edit");



function openFilter(){   
  filter.classList.add("font-lilac")
  containerSearchFilter.style.display = "block"  
}

function closeModalApply(){
  filter.classList.remove("font-lilac")
  containerSearchFilter.style.display = "none"  
}

async function listPhrases() {
  const phrasesList = document.getElementById("phrasesStayHere");
  
  phrasesList.innerHTML = "";

  const minhasFrases = await listPhrase();

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


document.querySelector("#filter-input").addEventListener("input", 
filterListPhrases);

function filterListPhrases(){
  
  const seachInput = document.querySelector("#filter-input")
  const listPhrases = document.querySelectorAll(".phrases")
  const checkedValue = document.querySelectorAll('input[name="prioridade"]:checked').value;
  const filter = seachInput.value.toLowerCase()

  listPhrases.forEach((item) => {
    const text = item.textContent
    const isChecked = (checkedValue === 'all' || item.textContent.priority === checkedValue);

    if (text.includes(filter) && isChecked) {
      item.style.display = "";
    } 
   else{
      item.style.display = 'none'
      
    }
  })
}

function filterCheckedPhrases(){
  
}

function openFilter(){
  
  filter.classList.add("font-lilac")
  containerSearchFilter.style.display = "block"  

}

  function closeModalApply(){
    filter.classList.remove("font-lilac")
    containerSearchFilter.style.display = "none"  
  }
  function openPropertyPhrases(){
    filter.classList.add("font-lilac")
    containerSearchFilter.style.display = "block" 
  }

function changeOwner(){
  filter.classList.add("font-lilac")
  containerSearchFilter.style.display = "block" 
}


async function editPhrase({ id }) {
  modalEdit.classList.add("active-edit");

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

      editBtnConfirm.removeEventListener("click", confirmEdit);
      modalEdit.classList.remove("active-edit");

      listPhrases();
    }
  });
}

async function deletePhrase({ id }) {
    modal.classList.add("active")

      return new Promise((resolve) => {
        btnOkDelete.addEventListener("click" , confirmDelete)
        btnClose.addEventListener("click" , cancelDelete)

      function cancelDelete(){
        modal.classList.remove("active")
        btnOkDelete.addEventListener("click" , confirmDelete)
        btnClose.addEventListener("click" , cancelDelete)

        resolve(false)
      }
      
      function confirmDelete(){
        modal.classList.remove("active")
        btnClose.removeEventListener("click" , cancelDelete)
        btnOkDelete.removeEventListener("click" , confirmDelete)

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

listPhrases(); 

function createItem(item) {
  const liItem = document.createElement("li");
  liItem.classList.add("paragraph");

  const div = document.createElement("div");
  div.classList.add("border-color-phrases");

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
