
//initialisation des variables
const gallery = document.querySelector(".gallery")
 


//recupération des fichiers sur l'API
async function getWorks(){ 
  //// Vérification du cache de la session en cours
  const sessionCache = sessionStorage.getItem("worksValue")
  
    if(!sessionCache){
      const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
      //// Transformation des pièces en JSON
      let worksString = JSON.stringify(works)
      //// Stockage des informations dans le localStorage
      sessionStorage.setItem("works", worksString)
      //// Affichage dans la console
      console.log(works)
      console.log(worksString)
      //// Reconstruction des pièces/objets pour lecture par JS
      return JSON.parse(worksString)

    } else {
      return JSON.parse(worksString) 
    }

}



// Affichage des données récupérées sur l'API (Section "Mes Projets")
async function displayWorks() {
  ////Récupère le Return de la fonction
  const allWorks = await getWorks()

  //// Création des éléments pour chaque objet de WORKS
  for(let i = 0; i < allWorks.length; i++){
    const figure = document.createElement("figure")
    const img = document.createElement("img")     
    const figcaption = document.createElement("figcaption")
    img.src = allWorks[i].imageUrl
    figcaption.innerText = allWorks[i].title
    
    //// Ajout des éléments au DOM
    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)

  }

}
displayWorks()
