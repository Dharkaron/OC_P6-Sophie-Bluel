//initialisation des variables
const gallery = document.querySelector(".gallery")


//recupération des fichiers sur l'API
const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
console.log(works)


// Affichage des projets depuis l'API
for (let i = 0; i < works.length; i++){
    const figure = document.createElement("figure")
    const img = document.createElement("img")     
    const figcaption = document.createElement("figcaption")
    img.src = works[i].imageUrl
    figcaption.innerText = works[i].title
    
    
    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)
}

/* allWorks.forEach((work) => {  
      const figure = document.createElement("figure")
      const img = document.createElement("img")     
      const figcaption = document.createElement("figcaption")
      img.src = work.imageUrl
      figcaption.innerText = work.title
      
      
      gallery.appendChild(figure)
      figure.appendChild(img)
      figure.appendChild(figcaption)
      
  })  */
  