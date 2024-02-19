import {getWorks, getCategories} from "./api.js"

// Initialisation des variables Générales
const Works = await getWorks()
const Categories = await getCategories()
const isToken = sessionStorage.getItem("token")



//// Création et affichage des éléments du DOM
const portfolio = document.getElementById("portfolio")
const categoryFilters = document.createElement("article")
  categoryFilters.classList.add("filters")
const gallery = document.createElement("article")
  gallery.classList.add("gallery")

portfolio.appendChild(categoryFilters)
portfolio.appendChild(gallery)





// Affichage des données récupérées sur l'API (Section "Mes Projets")
export function displayWorks(array) {
  gallery.innerHTML = ""

  //// Création des éléments pour chaque objet
  for(let i = 0; i < array.length; i++){
    const figure = document.createElement("figure")
    const img = document.createElement("img")     
    const figcaption = document.createElement("figcaption")

    img.src = array[i].imageUrl
    img.alt = array[i].title
    figcaption.innerText = array[i].title
    
    //// Ajout des éléments au DOM
    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
  }
}





// Création et affichage des boutons de filtres par catégories
async function displayCategoryFilters(array){
  //// Par défaut, au premier chargement de la page, afficher l'intégralité de la galerie
  displayWorks(array) 
  ////  Création du bouton d'affichage par défaut
  const btn0 = document.createElement("button")
    btn0.classList.add("btn","btn-category","unselectable","btn-selected")
    btn0.id = 0
    btn0.textContent = "Tous"
  categoryFilters.appendChild(btn0)
    //// Action au clic du bouton
    btn0.addEventListener("click", ()=>{
      removeFilterSelected()
      displayWorks(array)
      btn0.classList.add("btn-selected")
    })
  
  //// Création des boutons selon les catégories de l'API
  for(let i=0; i<Categories.length; i++){    
    const btn = document.createElement("button")

    btn.classList.add("btn","btn-category","unselectable")
    btn.id = Categories[i].id
    btn.textContent = Categories[i].name
    categoryFilters.appendChild(btn)
    //// Gestion des actions au clic pour chaque bouton de filtre
    btn.addEventListener("click", ()=>{
      removeFilterSelected()
      const worksFiltered = array.filter((work)=>{
        return work.categoryId == btn.id
       
      })
      displayWorks(worksFiltered)
      btn.classList.add("btn-selected")
    })
  }
  
  //// Cacher les boutons de filtres si l'utilisateur est connecté
  if(isToken){
    const allbtn = document.querySelectorAll(".btn-category")
    allbtn.forEach((btn)=>{
      btn.classList.add("hidden")
    })
  } 
}
displayCategoryFilters(Works) 


// Parcours tout les boutons de filtres, et enlève la sélection
function removeFilterSelected() {
  const allButtons = document.querySelectorAll(".btn-category")
  allButtons.forEach((button)=>{
    button.classList.remove("btn-selected")
  })
}




//gestion du formulaire de contact = empêcher le rechargement de la page
function contactForm(){
  const submit = document.querySelector("#contact form")
  submit.addEventListener("submit", (e)=>{
    e.preventDefault()
  })
}contactForm()





// Affichage des éléments modale si l'utilisateur est connecté
function adminMode(){
  //// Récup de tout les elements modal à afficher
  const modalBar = document.querySelector(".modale_bar")
  const modalBtn = document.querySelector(".open-modal")
  const loginBtn = document.getElementById("login")
  const logoutBtn = document.getElementById("logout")
  
  if (isToken) {
    modalBar.style.display = "flex"
    logoutBtn.classList.remove("hidden")
    modalBtn.classList.remove("hidden")
    loginBtn.classList.add("hidden")
  } else {
    console.log("non connecté")
  } 

  //// Gestion de la déconnexion
  logoutBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("token")
  })
}
adminMode()