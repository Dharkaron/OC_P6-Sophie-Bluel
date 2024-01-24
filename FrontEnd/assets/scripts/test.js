// Initialisation des variables Générales
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




// fetch des données de l'API
async function getWorks(){
  const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
  return works
}getWorks()

// fetch des catégories
async function getCategories(){
  const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json())
  console.log(categories)
  return categories
}




// Création et ajout des travaux
async function displayWorks(Works){ 
  gallery.innerHTML = ""

  for(let i=0; i<Works.length; i++){
    const figure = document.createElement("figure")
    const img = document.createElement("img")
      img.src = Works[i].imageUrl
      img.alt = Works[i].title
    const figcaption = document.createElement("figcaption")
     figcaption.innerText = Works[i].title
    
    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
  } 
}


async function displayCategoryFilter(){
  displayWorks(Works)
//Ajout d'eventListener sur chaque bouton

const btn0 = document.createElement("button")
  btn0.classList.add("btn")
  btn0.classList.add("btn-selected")
  btn0.innerText = "Tous"
  btn0.id = 0
categoryFilters.appendChild(btn0)
btn0.addEventListener("click", ()=>{
  removeFilterSelected()
  displayWorks(Works)
  btn0.classList.add("btn-selected")
})

for(let i=0; i<Categories.length; i++){
  const btn = document.createElement("button")

    btn.classList.add("btn")
    btn.innerText = Categories[i].name
    btn.id = Categories[i].id
  categoryFilters.appendChild(btn)

  btn.addEventListener("click", ()=>{
    removeFilterSelected()    
    const workfiltered = Works.filter((work)=>{
        return work.categoryId == btn.id
    })
    displayWorks(workfiltered)   
    btn.classList.add("btn-selected")
  })
}

}displayCategoryFilter()


function removeFilterSelected(){
const allButtons = document.querySelectorAll(".btn")
allButtons.forEach((button)=>{
  button.classList.remove("btn-selected")
})
}