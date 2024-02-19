import { alertPopup } from "./popup.js";

// Variables globales Login
let content

////const message = document.querySelector("#log-in form p")
  ////message.textContent = ""
  

// Lancement de la fonction de Login
loginAuth()



//Communication avec l'API
async function postLogin(loginData) {
  //// Test fetch API -> erreur si fetch n'abouti pas
  try {
    const loginPost = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(loginData)
    })
       
      //// Vérification avec l'API, si les données de connexion son correctes
      if(loginPost.ok){
        const response = await loginPost.json()
          console.log(response.userId)

        //// Stockage du token de connexion dans le cache de la session
        sessionStorage.setItem("token", response.token)
        
        //// Message de connexion établie, délai, et lien vers la page index.html
        content = "connexion réussie!"
        alertPopup(content, false)
         setTimeout(() => {
          location.href = "index.html"
        }, 1000); 
        
        
      }else{
        content = `email ou mot de passe invalide`
        //displayMessage(content, true)
        alertPopup(content, true)
      }
  } catch (error) {
    content = "Erreur de connexion, réessayer"
    alertPopup(content, true)
  }
}


// Validation du bouton
function loginAuth() {
  const loginForm = document.querySelector("#log-in form")
  //// Écouteur d'événement pour le bouton du formulaire de login
  loginForm.addEventListener("submit", (event)=>{
    event.preventDefault()

    const email = document.getElementById("mail")
    const password = document.getElementById("password")
        let mailValue = email.value.trim()
        let passValue = password.value.trim()
   
    if(mailValue === "" || passValue === ""){
      ////message d'erreur si l'un des champs est vide (ou les deux)
      content = `Veuillez remplir tout les champs`
      alertPopup(content, true)
    }else{   
      let userLoginData = {
        email: mailValue,
        password: passValue
      }     
      postLogin(userLoginData)
    }
  }) 
}


// Gestion des messages d'erreur du formulaire
function displayMessage(content, color){
  message.textContent = content
  //// Adapte la couleur du texte affiché selon la valeur "vrai ou faux" de "color"
    if(color){
    message.style.color = "#b13c3c"
    }else if(!color){
      message.style.color = "#3cb146"
    }else {
      console.log("error");
    }
}