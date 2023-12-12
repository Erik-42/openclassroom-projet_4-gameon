// Gestion du menu
// Affichage du menu déroulant lors du click sur l'icone de la navbar en mode tablette et mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements lnading page
const modalbg = document.querySelector(".bground"); //Capture de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); //Capture des boutons
const formData = document.querySelectorAll(".formData"); //Capture des éléments du formulaire


// DOM Elements Modale
const firstNameInput = document.getElementById("first"); //Capture champ prénom
const lastNameInput = document.getElementById("last"); // Capture champ nom
const emailInput = document.getElementById("email"); //Capture champ email
const birthdateInput = document.getElementById("birthdate"); //Capture champ email
const quantityInput = document.getElementById("quantity"); // Capture Quantité de tournois
const checkbox1Input = document.getElementById("checkbox1"); // Capture validation conditions d'utilisation

const closeModal = document.querySelector(".close"); //Capture de la croix

// Gestion de la modale
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

//Tests des champs
// Test du prénom
function checkFirstName() {
  const prenomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  if (!prenomRegex.test(firstNameInput.value.trim())) {
    addError(
      firstNameInput,
      "Entrer au moins 2 caractères alphabétiques pour le prénom."
    );
    return false;
  } else {
    clearError(firstNameInput);
    return firstNameInput.value;
  }
}

// Test du Nom
function checkLastName() {
  const nomRegex = /^[a-zA-Z]$/; // Condition pour au moins 2 caractères alphabétiques
  if (!nomRegex.test(lastNameInput.value.trim())) {
    addError(
      lastNameInput,
      "Entrer au moins 1 caractères alphabétiques pour le nom."
    );
    return false;
  } else {
    clearError(lastNameInput);
    return lastNameInput.value;
  }
}

// Test email
function checkEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Condition pour un email valide
  if (!emailRegex.test(emailInput.value.trim())) {
    addError(emailInput, "Veuillez entrer une adresse email valide.");
    return false;
  } else {
    clearError(emailInput);
    return emailInput.value;
  }
}

// Test nombre de tournois de l'utilisateur
function checkQuantity() {
  const quantityRegex = /^[0-9]+$/; // Condition pour un nombre positif
  if (!quantityRegex.test(quantityInput.value.trim())) {
    addError(
      quantityInput,
      "Veuillez entrer un nombre valide pour les tournois."
    );
    return false;
  } else {
    clearError(quantityInput);
    return quantityInput.value;
  }
}


// Gestion des erreurs
// Ajout erreur
function addError(input, message) {
  const formData = input.parentElement;
  const errorMessage = formData.querySelector(".errorMessage");
  formData.setAttribute("data-error-visible", true);
  errorMessage.textContent = message;
}

// Suppression erreur
function clearError(input) {
  const formData = input.parentElement;
  formData.setAttribute("data-error-visible", false);
  const errorMessage = formData.querySelector(".errorMessage");
  errorMessage.textContent = "";
}


// Soumission formulaire
// Capture formulaire
const submitForm = document.querySelector('form[name="reserve"]');
submitForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const resultObject = {
    firstname: checkFirstName(),
    lastname: checkLastName(),
    email: checkEmail(),
    quantity: checkQuantity(),
  };
}