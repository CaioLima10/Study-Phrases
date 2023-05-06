const openModal = document.querySelector("#openModal")
const containerEditRemove = document.querySelector(".container-edit-remove")
const containerSearchFilter = document.querySelector(".container-search-filter")
const svgFilter = document.querySelector("#svg-filter")
const select = document.querySelector(".select");
const optionsList = document.querySelector(".options-list");
const containerContentModal = document.querySelector(".container-content-modal")
const options = document.querySelectorAll(".option");
const modalEdit = document.querySelector(".modal-edit");
const containerRadio = document.querySelector(".container-radio");


function listPhrases(index){


  const phrasesList = document.getElementById("phrasesStayHere");
  phrasesList.innerHTML = "";
  
  const minhasFrases = localStorage.getItem("phraseBank")
  if (minhasFrases) {
    const frases = JSON.parse(minhasFrases);
    

  
    for (const frase of frases) {
      const item = document.createElement("div");
      item.classList.add("paragraph");
      item.innerHTML += ` 
    <ul class="container-flex-phrase">
    <div class="border-color-phrases"></div>
    <li class="phrases">${frase}
            <div class="settings">
              <i  onclick="showMenu(this)" id="showModal" class="fa-solid fa-ellipsis-vertical"></i>
              <ul class="task-menu">
                  <li id="deletePhrase" onclick="deleteTask()"><i class="fa-solid fa-circle-minus"></i>Excluir frase</li><br><br>
                  <li id="changeOwner" onclick="changeOwner()"><i class="fa-solid fa-pen-to-square"></i>Mudar proprietario</li><br><br>
                  <li id="deletePhrase" onclick="editTask()"><i class="fa-solid fa-chart-column"></i>Editar</li><br>
              </ul>
           </div>
      </li> 
     </ul>
   `;  

       phrasesList.append(item);
      }
    }
  }

  function showMenu(selectedTask){
  
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show")
    document.addEventListener("click", e => {
        if(e.target != selectedTask){
           taskMenu.classList.remove("show")
        }
    })
    }
  }
}

function removePhrase(data){
  const  valuePhrase = JSON.parse(localStorage.getItem("phraseBank") || [])

  const index = valuePhrase.findIndex(item => item.frase == data)
  valuePhrase.splice(index , 1)
  localStorage.setItem("phraseBank",JSON.stringify(valuePhrase))

  console.log(valuePhrase)

  listPhrases()
}

  function openModalContent(){
        containerContentModal.style.display = "block"
      }

     function openFilter(){
       svgFilter.classList.add("font-lilac")
       containerSearchFilter.style.display = "block"  
     }

     function closeModalApply(){
       svgFilter.classList.remove("font-lilac")
       containerSearchFilter.style.display = "none"  
     }
    function openPropertyPhrases(){
      svgFilter.classList.add("font-lilac")
      containerSearchFilter.style.display = "block" 
    }

function changeOwner(){
  filter.classList.add("font-lilac")
  containerSearchFilter.style.display = "block" 
}

listPhrases()