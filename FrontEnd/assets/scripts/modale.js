// Variables Générales
const btnAdmin = document.querySelector(".open-modal")
const modal = document.getElementById("modal")
const closeModal = document.querySelector(".fa-xmark")

  console.log(btnAdmin, modal, closeModal)



// Ouverture de la boite Modale
btnAdmin.addEventListener("click", ()=> {
  modal.style.display = "flex"
})

// Fermeture de la boite Modale
closeModal.addEventListener("click", (event) => {
  if (event.currentTarget === closeModal) {
    //// Alors on cache la popup
    modal.style.display = "none"
  }
})
