const pageBody = document.querySelector("body")

const popupBackground = document.createElement("aside")
const popup = document.createElement("div")
const p = document.createElement("p")
const check = document.createElement("i")
const stop = document.createElement("i")

  
  check.classList.add("fa-solid", "fa-circle-check", "fa-2xl")
  stop.classList.add("fa-solid", "fa-triangle-exclamation", "fa-2xl")

  popupBackground.classList.add("popupBackground", "unselectable")
  popup.classList.add("popup")

    popup.appendChild(check)
    popup.appendChild(stop)
    popup.appendChild(p)
    popupBackground.appendChild(popup)
    pageBody.appendChild(popupBackground)



// Ouverture et fermeture de la boite Modale
export function alertPopup(message, color){
  check.classList.remove("hidden")
  stop.classList.remove("hidden")
  check.classList.add("hidden")
  stop.classList.add("hidden")

  p.innerText = message
  popupBackground.style.display = "flex"

  //// Adapte la couleur du texte affiché selon la valeur "vrai ou faux" de "color"
  if(color){
    p.style.color = "rgb(177, 60, 60)" //// color Red
    popup.style.borderColor = "rgb(177, 60, 60)"

    stop.style.color = "rgb(177, 60, 60)" 
    stop.classList.remove("hidden")
    
    }else if(!color){
      p.style.color = "rgb(60, 177, 70)"  //// color green
      popup.style.borderColor = "rgb(60, 177, 70)"

      check.style.color = "rgb(60, 177, 70)" 
      check.classList.remove("hidden")

    }else {
      console.log("error")
    }

  //// fermeture auto de la popup
   let timeoutHandle = setTimeout(() => {
    popupBackground.style.display = "none"
  }, 2000)

  timeoutHandle

  popupBackground.addEventListener("click", (event)=>{
    if(event.target === popupBackground || event.target === popup){
      popupBackground.style.display = "none"
      clearTimeout(timeoutHandle)
    }
  })
}