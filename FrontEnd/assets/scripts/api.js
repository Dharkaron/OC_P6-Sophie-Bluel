// Récupération des données sur l'API & stockage dans le cache de la session
//// Images/projets du portfolio à afficher
export async function getWorks(){ 
  const response = await fetch("http://localhost:5678/api/works")
  const works = response.json()
    return works
  
  /* //// Transformation des pièces en JSON
    let workString = JSON.stringify(works)

      if(!localStorage.getItem("works")){
        //// Stockage des informations dans le localStorage
        localStorage.setItem("works", workString)
        //// Reconstruction des pièces/objets pour lecture par JS
        return JSON.parse(localStorage.getItem("works"))
      } else {
        return JSON.parse(localStorage.getItem("works"))
      } */
}

//// Catégories du portfolio
export async function getCategories(){
  const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json())

  let catString = JSON.stringify(categories)

  if(!sessionStorage.getItem("categories")){
    //// Stockage des informations dans le localStorage
    sessionStorage.setItem("categories", catString)
    //// Reconstruction des pièces/objets pour lecture par JS
    return JSON.parse(sessionStorage.getItem("categories"))
  } else {
    return JSON.parse(sessionStorage.getItem("categories"))
  }
}