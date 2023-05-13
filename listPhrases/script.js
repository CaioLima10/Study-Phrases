const openModal = document.querySelector("#openModal")
const containerEditRemove = document.querySelector(".container-edit-remove")
const containerSearchFilter = document.querySelector(".container-search-filter")
const filter = document.querySelector("#open-filter")
const select = document.querySelector(".select");
const optionsList = document.querySelector(".options-list");


async function listPhrases(index){
  
  const phrasesList = document.getElementById("phrasesStayHere");
  
  phrasesList.innerHTML = "";
  
  const minhasFrases = await listPhrase()
  if (minhasFrases.length) {

      for (const item of minhasFrases) {
        const ul = createItem(item)
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

function editPhrases(){

}

document.querySelector("#filter-input").
addEventListener("input", filterListPhrases)

function filterListPhrases(){

    const seachInput = document.querySelector("#filter-input")
    const listPhrases = document.querySelectorAll("li")
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

function deletePhrases(data){
  const  valuePhrase = JSON.parse(localStorage.getItem("phraseBank") || [])

  const index = valuePhrase.findIndex(item => item.frase == data)
  valuePhrase.splice(index , 1)

  localStorage.setItem("phraseBank",JSON.stringify(valuePhrase))

  console.log(valuePhrase)

  listPhrases()
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


function createItem(item) {
  const liItem = document.createElement("li");
  liItem.classList.add("paragraph");
  const ul = document.createElement('ul');
  ul.classList.add('container-flex-phrase')
  const div = document.createElement('div');
  div.classList.add('border-color-phrases');

  liItem.innerHTML += ` 
    <li class="phrases">${item.phrase}
      <div class="settings">
        <i  onclick="showMenu(this)" id="showModal" class="fa-solid fa-ellipsis-vertical"></i>
        <ul class="task-menu">
            <li id="deletePhrase" onclick="deletePhrases(${item.id})"><i class="fa-solid fa-circle-minus"></i>Excluir frase</li><br><br>
            <li id="changeOwner" onclick="changeOwner()"><i class="fa-solid fa-pen-to-square"></i>Mudar proprietario</li><br><br>
            <li id="deletePhrase" onclick="editPhrases(${item.id})"><i class="fa-solid fa-chart-column"></i>Editar</li><br>
        </ul>
      </div>
    </li> 
  `; 
  ul.appendChild(div)
  ul.appendChild(liItem)
  return ul
}