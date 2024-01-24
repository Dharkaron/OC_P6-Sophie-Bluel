// Initialisation des variables
const Works = await getWorks()
const Categories = await getCategories()

//// Création et affichage des éléments du DOM
const portfolio = document.getElementById("portfolio")
const categoryFilters = document.createElement("article")
  categoryFilters.classList.add("filters")
const gallery = document.createElement("article")
  gallery.classList.add("gallery")

portfolio.appendChild(categoryFilters)
portfolio.appendChild(gallery)



// Récupération des données sur l'API & stockage dans le cache de la session
//// Images/projets du portfolio à afficher
async function getWorks(){ 
  const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
    //// Transformation des pièces en JSON
    let workString = JSON.stringify(works)

      if(!sessionStorage.getItem("works")){
        //// Stockage des informations dans le localStorage
        sessionStorage.setItem("works", workString)
        //// Reconstruction des pièces/objets pour lecture par JS
        return JSON.parse(sessionStorage.getItem("works"))
      } else {
        return JSON.parse(sessionStorage.getItem("works"))
      }
}

//// Catégories du portfolio
async function getCategories(){
  const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json())
  return categories
}



// Affichage des données récupérées sur l'API (Section "Mes Projets")
async function displayWorks(Works) {
  gallery.innerHTML = ""
  //// Création des éléments pour chaque objet de WORKS
  for(let i = 0; i < Works.length; i++){
    const figure = document.createElement("figure")
    const img = document.createElement("img")     
    const figcaption = document.createElement("figcaption")

    img.src = Works[i].imageUrl
    img.alt = Works[i].title
    figcaption.innerText = Works[i].title
    
    //// Ajout des éléments au DOM
    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)

  }

}




//¤ Filtres des éléments affiché dans le portfolio

// Création et affichage des boutons de filtres par catégories
async function displayFilters(){
  //// Par défaut, au premier chargement de la page, afficher l'intégralité de la galerie
  displayWorks(Works) 
  ////  Création du bouton d'affichage par défaut
  const btn0 = document.createElement("button")
    btn0.classList.add("btn")
    btn0.classList.add("btn-selected")
    btn0.id = 0
    btn0.textContent = "Tous"
  categoryFilters.appendChild(btn0)
    //// Action au clic du bouton
    btn0.addEventListener("click", ()=>{
      removeFilterSelected()
      displayWorks(Works)
      btn0.classList.add("btn-selected")
    })
  
  //// Création des boutons selon les catégories de l'API
  for(let i=0; i<Categories.length; i++){    
    const btn = document.createElement("button")

    btn.classList.add("btn")
    btn.id = Categories[i].id
    btn.textContent = Categories[i].name
    categoryFilters.appendChild(btn)
    //// Gestion des actions au clic pour chaque bouton de filtre
    btn.addEventListener("click", ()=>{
      removeFilterSelected()
      const worksFiltered = Works.filter((work)=>{
        return work.categoryId == btn.id
       
      })
      displayWorks(worksFiltered)
      btn.classList.add("btn-selected")
    })
  }  
}
displayFilters() 


// Parcours tout les boutons de filtres, et enlève la sélection
function removeFilterSelected() {
  const allButtons = document.querySelectorAll(".btn")
  allButtons.forEach((button)=>{
    button.classList.remove("btn-selected")
  })
}
