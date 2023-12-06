// Affichage du menu déroulant lors du click sur l'icone de la navbar en mode tablette et mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); //Capture de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); //Capture des boutons
const formData = document.querySelectorAll(".formData"); //Capture des éléments du formulaire

const closeModal = document.querySelector(".close"); //Capture de la croix

const firstNameInput = document.getElementById("first"); //Capture champ prénom
const lastNameInput = document.getElementById("last"); // Capture champ nom
const emailInput = document.getElementById("email"); //Capture champ email
const birthdateInput = document.getElementById("birthdate"); //Capture champ email

const quantityInput = document.getElementById("quantity"); // Capture Quantité de tournois
const checkbox1Input = document.getElementById("checkbox1"); // Capture validation conditions d'utilisation

const showResult = document.getElementById("show-result"); // Texte du résultat

//ouverture modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // launch modal event

function launchModal() {
  modalbg.style.display = "block"; // launch modal form
}

// Fermeture de la modale
closeModal.addEventListener("click", modalClose); //evenement clique pour fermeture modale

function modalClose() {
  modalbg.style.display = "none"; // cache modale
}

// Injection message erreur
// const formDataError = document.querySelectorAll(".formData input")
const spanError = document.createElement("span");
spanError.innerText = addError
// formData.appendChild(spanError)

console.log(formData)

console.log(spanError)

// Fonction erreur
function addError(input, message) {
  formData = input.parentElement //Selection parent
  const errorMessage = formData.querySelector('.errorMessage'); //capture parent
  formData.setAttribute("data-error", true); //Ajout attribut
  errorMessage.textContent = message; //message erreur
}

// Suppression erreur
function clearError(input) {
  formData = input.parentElement; //selection parent
  const errorMessage = formData.querySelector('.errorMessage'); //capture parent
  formData.setAttribute("data-error", false); //suppression attribut
  errorMessage.textContent = ""; //Suppression message erreur
}


// Test du prénom
function checkFirstName() {
  const prenomRegex = /^[a-zA-Z]+$/; // Contrôle prénom valide
  // Test validité prénom
  if (prenomRegex.test(firstNameInput.value.trim().length < 2)) {
    addError(firstNameInput, "Entrer au moins 2 caractères sans chiffre pour le prénom."); // message d'erreur si mauvaise saisie
    return false; // et renvoi false
  } else {
    clearError(firstNameInput); // On supprime l'erreur
    return firstNameInput.value; // valeur champs prénom
  }
}


// Test du Nom
function checkLastName() {
  const nomRegex = /^[a-zA-Z]+$/; // Contrôle nom valide
  //  Test validité nom
  if (nomRegex.test(lastNameInput.value.trim().length < 2)) {
    addError(lastNameInput, "Entrer au moins 2 caractères sans chiffre pour le nom."); // message d'erreur si oui
    return false; // et renvoi false
  } else {
    clearError(lastNameInput); // On supprime l'erreur
    return lastNameInput.value; // valeur champs nom
  }
}



// Test email
function checkEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]$/; // Contrôle email valide
  // Vérifie si email erreur
  if (!emailRegex.test(emailInput.value.trim())) {
    addError(emailInput, "Veuillez entrer une adresse email valide."); // Message si erreur
    return false; // et renvoi false
  } else {
    // Test si email existe déjà
    if (emails.includes(emailInput.value)) {
      addError(emailInput, "Cette adresse email est déjà utilisée."); // Message d'erreur si oui
      return false; // Renvoie état false
    } else {
      clearError(emailInput); // On supprime l'erreur
      return emailInput.value; // Renvoie valeur champs email
    }
  }
}


// Test nombre de tournois de user
function checkQuantity() {
  const quantityRegex = /^[0-9]+$/; // Contrôle email valide
  // Test champs vide
  if (quantityRegex.test(quantityInput.value == "")) {
    addError(quantityInput, "Veuillez entrer un nombre de tournoi."); // On affiche le message d'erreur
    return false; // et renvoi false
  } else {
    clearError(quantityInput); // On supprime l'erreur
    return quantityInput.value; // renvoie valeur champs nombre de tournois
  }
}


// Capture formulaire
const submitForm = document.querySelector('.reserve'); //capture formulaire
submitForm.addEventListener('submit', onSubmit); // soumission formulaire

function onSubmit(event) {
  event.preventDefault(); // Empêche soumission formulaire

  // Création de l'objet contenant les données de l'utilisateur ou les erreurs
  resultObject = {
    firstname: checkFirstName(),
    lastname: checkLastName(),
    email: checkEmail(),
    quantity: checkQuantity(),
  }

  // On vérifie que l'objet ne contient pas d'erreur
  if (!Object.values(resultObject).includes(false)) {
    showObj(resultObject); // On affiche le résultat dans le HTML
  }
}

// On affiche l'objet dans le HTML
function showObj(obj) {
  showResult.innerHTML = "firstname: " + obj.firstname;
  showResult.innerHTML += "<br>lastname: " + obj.lastname;
  showResult.innerHTML += "<br>email: " + obj.email;
  showResult.innerHTML += "<br>quantity: " + obj.quantity;
}