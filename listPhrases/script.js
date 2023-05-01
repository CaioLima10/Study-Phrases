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
          <div class="container-modal-open">
              <button><i id="openModal" onclick="openModalContent()" class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
          </div>
      </li> 
     </ul>
   `;  

       phrasesList.append(item);

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

     //show & hide options list
    //  select.addEventListener("click", () => {
    //    optionsList.classList.toggle("active");
    //    select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
    //  });
 
     //select option
    //  options.forEach((option) => {
    //    option.addEventListener("click", () => {
    //      options.forEach((option) => {option.classList.remove('selected')});
    //      select.querySelector("span").innerHTML = option.innerHTML;
    //      option.classList.add("selected");
    //      optionsList.classList.toggle("active");
    //      select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
    //    });
    //  });



listPhrases()