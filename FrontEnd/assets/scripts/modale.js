import { getWorks, getCategories, deleteWork, uploadWork } from "./api.js";
import { alertPopup } from "./popup.js";



// Initialisation des variables Générales
const modalGallery = document.querySelector(".modal-gallery")
const modalTitle = document.querySelector(".modal-wrapper h3")
const uploadForm = document.querySelector(".upload-works")
const goPageOne = document.querySelector(".fa-arrow-left")
const goPageTwo = document.querySelector(".btn-modal")
const modalContainer = document.getElementById("modal-container")

const inputImg = document.getElementById("input-img")
const categoryList = document.getElementById("addCat")
const formSubmit = document.getElementById("upload-form-submit")
const title = document.getElementById("addTitle")
const maxFileSize = 4*1024*1024 ////4194304 octet = 4Mo




// Ouverture et fermeture de la boite Modale
function displayModal(){
  const openModalBox = document.querySelector(".open-modal")
  const closeModalBox = document.querySelector(".fa-xmark")

  openModalBox.addEventListener("click", ()=>{
    modalContainer.style.display = "flex"
      //// Affiche la première page
      modalPageOne()
  })

  closeModalBox.addEventListener("click", ()=>{
      modalContainer.style.display = "none"
  })

  modalContainer.addEventListener("click", (event)=>{
    if(event.target === modalContainer){
      event.stopPropagation()
      modalContainer.style.display = "none"
    }
  })
}
displayModal()




// Affichage de la page 1
async function modalPageOne(){
  modalGallery.style.display = "grid"
  uploadForm.style.display = "none"
  goPageTwo.style.display = "flex"

  goPageOne.style.display = "none"
  modalTitle.innerText = "Galerie photo"

  //// Envoi vers la deuxième page Modale
    goPageTwo.addEventListener("click", ()=>{
      modalGallery.style.display = "none"
      uploadForm.style.display = "flex"
      goPageTwo.style.display = "none"
      goPageOne.style.display = "block"
      modalTitle.innerText = "Ajout Photo"

    modalPageTwo()
    })

  //// Affiche la galerie dans la modale
  let modalWorks = await getWorks()
  displayModalGallery(modalWorks)
}






// Affichage de la page 2 (formulaire pour ajouter une image)
function modalPageTwo(){
  //// Retour à la galerie modale (page 1)
  goPageOne.addEventListener("click", ()=>{
    modalGallery.style.display = "grid"
    uploadForm.style.display = "none"
    goPageTwo.style.display = "flex"

    goPageOne.style.display = "none"
    modalTitle.innerText = "Galerie photo"
  })

  //// On vide le formulaire à l'ouverture de la page
  //clearForm()

  //// Gestion de l'image à ajouter, et de la liste des catégories
  displayImg()
  displayModalCategories()


  //// Activation du bouton submit à l'ajout d'une image
  inputImg.addEventListener("input", ()=>{
    if(inputImg.files[0] !== null){

      formSubmit.classList.replace("btn-grey", "btn-green")
      formSubmit.removeAttribute('disabled')
      formSubmit.style.cursor = "pointer"
    }
  })


  //// Ajout de photo à la galerie = envoi du formulaire
  uploadForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    event.stopPropagation()

    //// Vérification (taille image, format image, présence d'un titre et d'une catégorie)
    if(!inputImg.files[0] || !title.value || categoryList.value === "0"){
      //// Message d'erreur popup
      let content = "Un ou plusieurs des champs sont vide. \nComplétez le formulaire avant de l'envoyer"
      alertPopup(content, true)
      
    }else if(inputImg.files[0].size > maxFileSize){
      //// Message d'erreur popup
      let content = `Votre image pèse ${(inputImg.files[0].size/1024/1024).toFixed(3)} Mo \nLe poids du fichier doit être inférieur à 4Mo`
      alertPopup(content, true)

    }else if(inputImg.files[0].type !== "image/png" && inputImg.files[0].type !== "image/jpg"){
      //// Message d'erreur popup
      let content = "Mauvais format de fichier. \nSélectionnez une image au format jpg ou png"
      alertPopup(content, true)

    }else{
      
      //// On désactive le bouton pour empécher plusieurs clic/envoi du formulaire
      formSubmit.setAttribute('disabled', true)

      console.log("le fichier à été envoyé")

      const formData = new FormData()
      formData.append("title", title.value)
      formData.append("category", categoryList.value)
      formData.append("image", inputImg.files[0])
      console.log(formData)

      //// Appel à la fonction d'envoi du formulaire
      uploadWork(formData)
      //// Message
      let content = "Ajout de la photo à la galerie"
      alertPopup(content, false)

      //// On affiche la première page modale à l'ajout d'une photo
      setTimeout(() => {                   
        modalPageOne()
      }, 2000)
      
    }
  })
}




// Vide les champs du formulaire, et désactive le bouton submit
function clearForm(){
  formSubmit.classList.replace("btn-green", "btn-grey")
  formSubmit.setAttribute('disabled', true)
  formSubmit.style.cursor = "default"

  inputImg.value = ""
  title.value = ""
  categoryList.value = "0"
}





// Création/Affichage de la galerie Modale
export function displayModalGallery(array){
  //// On vide la galerie modale à l'appel de la fonction
  modalGallery.innerHTML = ""

  //// affichage des travaux depuis l'API
  array.forEach((work)=>{
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const trashBtn = document.createElement("span")

      img.src = work.imageUrl
      img.alt = work.title   
      trashBtn.classList.add("bin-container")
      trashBtn.id = work.id
      trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`

      //// Ajout des éléments à la modale
      figure.appendChild(img)
      figure.appendChild(trashBtn)
      modalGallery.appendChild(figure)

    //// Gestion de la suppression des travaux = appel à la fonction Delete
    trashBtn.addEventListener("click", (event)=>{
      event.preventDefault()
      let workId = work.id
      deleteWork(workId)
      console.log("suppression de l'image")
    })
  })
}



// Affichage de l'image à ajouter au formulaire
function displayImg(){
  
  const image = document.querySelector(".upload-img img")
  const svg = document.querySelector(".upload-img svg")
  const p = document.querySelector(".upload-img p")
  const btnUpload = document.querySelector(".upload-img label")

  inputImg.value = ""
    svg.style.display = "block"
    p.style.display = "block"
    btnUpload.style.display = "block"
    image.style.display = "none"

  inputImg.addEventListener("change", () => {
    svg.style.display = "none"
    p.style.display = "none"
    btnUpload.style.display = "none"
    image.style.display = "block"
    image.src = URL.createObjectURL(inputImg.files[0])
  })
}





// Affichage de la liste des catégories depuis l'API
async function displayModalCategories(){
  let modalCategories = await getCategories()

  categoryList.innerHTML = ""
  
  const option0 = document.createElement("option")
  option0.value = "0"
  option0.innerText = "Choississez une catégorie"
  option0.selected = true
  option0.disabled = true
  categoryList.appendChild(option0)

  modalCategories.forEach((category) => {
    const option = document.createElement("option")
    option.value = category.id
    option.innerText = category.name
    categoryList.appendChild(option)
  })
}
      
