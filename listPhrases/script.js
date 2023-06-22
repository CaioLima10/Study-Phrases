const openModal = document.querySelector("#openModal");
const containerEditRemove = document.querySelector(".container-edit-remove");
const containerSearchFilter = document.querySelector(".container-search-filter");
const filter = document.querySelector("#open-filter");
const select = document.querySelector(".select");
const optionsList = document.querySelector(".options-list");


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

function showMenu(selectedPhrase){
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


document.querySelector("#filter-input").
addEventListener("input", filterListPhrases)

function filterListPhrases(){
    
    const seachInput = document.querySelector("#filter-input")
    const listPhrases = document.querySelectorAll(".phrases")
    const filter = seachInput.value.toLowerCase()

    listPhrases.forEach((item) => {
      const text = item.textContent
      if(text.toLowerCase().includes(filter.toLowerCase())){
        item.style.display = ''
      }else{
        item.style.display = 'none'
      }
    })
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

listPhrases()

async function deletePhrase({ id }) {
  // Exibir modal de confirmação
  const confirmed = confirm("Tem certeza de que deseja excluir esta frase?");

  if (!confirmed) {
    return undefined
  }
  
  try {
    const response = await client({ method: 'DELETE', path: `phrase/${ id }` });
    if (response && response.status === 204) {
      console.log('Frase excluída com sucesso!');
      listPhrases();
    } else {
      console.error(response);
    }
  } catch (error) {
    console.error(error);
  }
}


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
  deletePhraseLi.addEventListener("click", () => deletePhrase({ id: item.id}));
  deletePhraseLi.innerHTML = `
    <i class="fa-solid fa-circle-minus"></i>Excluir frase
  `;

  const changeOwnerLi = document.createElement("li");
  changeOwnerLi.addEventListener("click", changeOwner);
  changeOwnerLi.innerHTML = `
    <i class="fa-solid fa-pen-to-square"></i>Mudar proprietário
  `;

  const editPhraseLi = document.createElement("li");
  editPhraseLi.addEventListener("click", () => editPhrases(item.id));
  editPhraseLi.innerHTML = `
    <i class="fa-solid fa-chart-column"></i>editar
  `;

  taskMenuUl.appendChild(deletePhraseLi);
  taskMenuUl.appendChild(changeOwnerLi);
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
