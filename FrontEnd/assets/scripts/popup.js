const pageBody = document.querySelector("body")

const popupBackground = document.createElement("aside")
const popup = document.createElement("div")
const p = document.createElement("p")

  popupBackground.classList.add("popupBackground", "unselectable")
  popup.classList.add("popup")

    popup.appendChild(p)
    popupBackground.appendChild(popup)
    pageBody.appendChild(popupBackground)



// Ouverture et fermeture de la boite Modale
export function alertPopup(message, color){

  p.innerText = message
  popupBackground.style.display = "flex"

  //// Adapte la couleur du texte affiché selon la valeur "vrai ou faux" de "color"
  if(color){
    p.style.color = "rgb(177, 60, 60)"
    popup.style.borderColor = "rgb(177, 60, 60)"
    
    }else if(!color){
      p.style.color = "rgb(60, 177, 70)"
      popup.style.borderColor = "rgb(60, 177, 70)"

    }else {
      console.log("error")
    }

  //// fermeture auto de la popup
   let timeoutHandle = setTimeout(() => {
    popupBackground.style.display = "none"
  }, 3000)

  timeoutHandle

  popupBackground.addEventListener("click", (event)=>{
    if(event.target === popupBackground || event.target === popup){
      event.stopPropagation()
      popupBackground.style.display = "none"
      clearTimeout(timeoutHandle)
    }
  })
}