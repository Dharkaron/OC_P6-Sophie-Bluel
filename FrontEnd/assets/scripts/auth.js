// Variables globales Login
const message = document.querySelector("#log-in form p")
  message.textContent = ""
  

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
        displayMessage("connexion réussie!", false)
         setTimeout(() => {
          location.href = "index.html"
        }, 1000); 
        
        
      }else{
        displayMessage("email ou mot de passe invalide", true)
      }
  } catch (error) {
    let content = "Erreur de connexion, réessayer"
    displayMessage(content, true)
    console.error("Error:", error.message);
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
      displayMessage("Veuillez remplir tout les champs", true)
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