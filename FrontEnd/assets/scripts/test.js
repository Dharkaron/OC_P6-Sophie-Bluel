// Variables Générales
const portfolio = document.getElementById("portfolio")
const allWorks = await getWorks()
const allCategories = await getCategories()

// Récupération des données de l'API -> Conversion en tableau json
async function getWorks(){
  const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
  return works
}

// Récupération des catégories dans l'API
async function getCategories(){
  const categories = await fetch('http://localhost:5678/api/categories').then(categories => categories.json())
  return categories
}




// Création des balises du Portfolio
const filters = document.createElement("article")
  filters.classList.add("filters")
const gallery = document.createElement("div")
  gallery.classList.add("gallery")

portfolio.appendChild(filters)
portfolio.appendChild(gallery)



// Création et Affichage des éléments dans le DOM
function displayWorks(allWorks){
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""

  allWorks.forEach(work => {
    const figure = document.createElement("figure")
  const img = document.createElement("img")
    img.src = work.imageUrl
  const figcaption = document.createElement("figcaption")
    figcaption.innerText = work.title

  gallery.appendChild(figure)
  figure.appendChild(img)
  figure.appendChild(figcaption)
  });

}





//¤ Boutons de Filtres 

// Création et affichage des boutons de filtres par catégories
async function displayFilters(){
  //// On récupère les données JSON
  const allCategories = await getCategories()

   //// Création du bouton d'affichage par défaut
    const btn0 = document.createElement("button")
    btn0.classList.add("btn")
    btn0.classList.add("btn-selected")
    btn0.id = 0
    btn0.textContent = "Tous"
    filters.appendChild(btn0)
  //// Création des boutons selon les catégories de l'API
  allCategories.forEach((category) =>{
    const btn = document.createElement('button')
    btn.classList.add("btn")
    btn.id = category.id
    btn.textContent = category.name
    filters.appendChild(btn)
  })  
}
displayFilters() 


// Filtre au clic des boutons par catégories

async function categoryFilter(){
  displayWorks(allWorks)

  const Works = await getWorks()
  const buttons = document.querySelectorAll(".btn")
  
  //// Boucle sur tout les boutons
  for(let i=0; i<buttons.length; i++){
    const btn = buttons[i]
    //// Gestion des actions au clic pour chaque bouton de filtre
    btn.addEventListener("click", (event) => {
     const btnId = event.currentTarget.id
          
      if (btnId !== '0'){
        removeFilterClass()
        const workfiltered = Works.filter((work)=>{
        return work.categoryId == btnId
        })
          displayWorks(workfiltered)
          event.currentTarget.classList.add("btn-selected")
      } else {
        removeFilterClass()
        displayWorks(Works)
        event.currentTarget.classList.add("btn-selected")
      }

    console.log(btnId)
    })
  }
}
categoryFilter()


function removeFilterClass() {
  const allButtons = document.querySelectorAll(".btn")
  allButtons.forEach((button)=>{
    button.classList.remove("btn-selected")
  })
}