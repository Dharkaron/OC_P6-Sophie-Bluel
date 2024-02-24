import { displayWorks } from "./index.js";
import { displayModalGallery } from "./modale.js";
import { alertPopup } from "./popup.js";

// Récupération des données sur l'API & stockage dans le cache de la session
//// Images/projets du portfolio à afficher
export async function getWorks(){ 
  
  try{
  let works = await fetch("http://localhost:5678/api/works").then(works => works.json())

    const workString = JSON.stringify(works)
    sessionStorage.setItem("works", workString)

  }catch(err) {
    console.error(err.message)
    let content = "Erreur de connexion avec l'API"
    alertPopup(content, true)
  }

  return JSON.parse(sessionStorage.getItem("works"))
}



//// Catégories du portfolio
export async function getCategories(){
  
  try{
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
  }catch(err) {
    console.error(err.message)
    let content = "Erreur de connexion avec l'API"
    alertPopup(content, true)
  }
}



// Fonction pour envoyer le formulaire d'ajout de photo à l'API
export async function uploadWork(data){

  try {
    const response = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    },
    body: data
  })
  if(response.ok){
    const updatedWorks = await getWorks()
    displayWorks(updatedWorks)
    displayModalGallery(updatedWorks)
    
  }else{
    console.log("erreur")
  }
  }catch(err){
    console.error(err.message)
    let content = "Erreur de connexion avec l'API"
    alertPopup(content, true)
  }
}




// Fonction pour supprimer une photo de la galerie
export async function deleteWork(id){
  const token = sessionStorage.getItem("token")

  try{
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(response.ok){
      let updatedWorks = await getWorks()
      displayWorks(updatedWorks)
      displayModalGallery(updatedWorks)
    }
  }catch(err){
    console.error(err.message)
    let content = "Erreur de connexion avec l'API"
    alertPopup(content, true)
  }
}

