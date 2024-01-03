// Gestion du menu //
// Affichage du menu déroulant lors du click sur l'icone de la navbar en mode tablette et mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Gestion de la modale //
//ouverture modale
const modalbg = document.querySelector(".bground"); 
const modalBtn = document.querySelectorAll(".btn-signup"); 
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); 

function launchModal() {
  modalbg.style.display = "block"; 
}

// Fermeture de la modale
const closeModal = document.querySelector(".close"); 
closeModal.addEventListener("click", resetModal); 

// Reset du formulaire
function resetModal() {
  clearAllErrors(); // Suppression de toutes les erreurs
  document.forms["reserve"].reset(); // Reset du formulaire
  modalbg.style.display = "none"; // Rend modale invisible
}

// Suppression de toutes les erreurs
function clearAllErrors() {
  const errorAllMessage = document.querySelectorAll("input"); 
  errorAllMessage.forEach((msg) => {
    msg.parentElement.setAttribute("data-error", false); 
    msg.parentElement.setAttribute("data-error-visible", false); 
    msg.textContent = "";
  });
}

// Tests des champs //
// Test du prénom
const firstNameInput = document.getElementById("first"); 
function checkFirstName() {
  const prenomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  
  if (!prenomRegex.test(firstNameInput.value.trim())) {
    addError(firstNameInput, "Entrez au moins 2 caractères pour le prénom."); 
    return false;
  } else {
    clearError(firstNameInput);
    return firstNameInput.value; 
  }
}

// Test du Nom
const lastNameInput = document.getElementById("last"); 
function checkLastName() {
  const nomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  
  if (!nomRegex.test(lastNameInput.value.trim())) {
    addError(lastNameInput, "Entrez au moins 2 caractères pour le nom."); 
    return false;
  } else {
    clearError(lastNameInput); 
    return lastNameInput.value; 
  }
}

// Test email
const emailInput = document.getElementById("email"); 
function checkEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Condition pour un email valide
  
  if (!emailRegex.test(emailInput.value.trim())) {
    addError(emailInput, "Entrez une adresse email valide."); 
    return false;
  } else {
    clearError(emailInput); 
    return emailInput.value; 
  }
}

// Test date de naissance
const birthdateInput = document.getElementById("birthdate"); 
function checkBirthDate() {
  // Test si la date est vide
  if (birthdateInput.value == "") {
    addError(birthdateInput, "Entrez une date de naissance valide."); 
    return false;
  } else {
    clearError(birthdateInput); 
    return birthdateInput.value; 
  }
}

// Test nombre de tournois de l'utilisateur
const quantityInput = document.getElementById("quantity"); 
function checkQuantity() {
  const quantityRegex = /^[0-9]+$/; // Condition pour un nombre positif
  
  if (!quantityRegex.test(quantityInput.value.trim())) {
    addError(quantityInput, "Entrez un nombre valide pour les tournois."); 
    return false;
  } else {
    clearError(quantityInput); 
    return quantityInput.value;
  }
}

// Test de la localisation des tournois
function checkLocation() {
  const radioInput = document.querySelector('input[name="location"]');
  const radioInputChecked = document.querySelector(
    'input[name="location"]:checked'
  ); // Bouton radio qui est coché (=null s'il n'y en a pas)

  if (!radioInputChecked) {
    addError(radioInput, "Choisissez un tournoi."); 
    return false;
  } else {
    clearError(radioInput); 
    return radioInputChecked.checked;
  }
}

// Test condition d'utilisation
const checkbox1Input = document.getElementById("checkbox1"); 
function checkCheckBox1() {
  
  if (!checkbox1Input.checked) {
    addError(checkbox1Input, "Merci d'accepter les conditions d'utilisation."); 
    return false;
  } else {
    clearError(checkbox1Input); 
    return checkbox1Input.checked; 
  }
}

// Test prevenir d'autres evenements
const checkbox2Input = document.getElementById("checkbox2"); 
function checkCheckBox2() {
  let valCheckbox2 = "NOT Checked"; // Valeur par défaut de checkbox2
  
  if (document.querySelector('input[id="checkbox2"]:checked')) {
    valCheckbox2 = "Checked"; // On change la valeur
  }
  return valCheckbox2; 
}

// Gestion des erreurs //
const formData = document.querySelectorAll(".formData"); 

// Ajout des erreurs en recuperant l'input concerné et le message correspondant
function addError(input, message) {
  const formData = input.parentElement; 
  formData.setAttribute("data-error-visible", true); 
  formData.setAttribute("data-error", message); //Ajout de l'attribut data-error avec le message au formData
}

// Suppression des erreurs en recuperant l'input concerné
function clearError(input) {
  const formData = input.parentElement; 
  formData.setAttribute("data-error-visible", false); 
}

// Soumission du formulaire //
const submitForm = document.querySelector('form[name="reserve"]'); 
submitForm.addEventListener("submit", onSubmit); 

function onSubmit(event) {
  event.preventDefault(); 

  //controle de la validiter des champs du formulaire
  let resultCheckInput = {
    firstname: checkFirstName(),
    lastname: checkLastName(),
    email: checkEmail(),
    birthdate: checkBirthDate(),
    quantity: checkQuantity(),
    location: checkLocation(),
    checkbox1: checkCheckBox1(),
    checkbox2: checkCheckBox2(),
  };
  modalValid(); //Déclenchement de la fonction modalValid si tous les champs sont remplis
}

// Validation du formulaire
function modalValid() {
  //Vérification que toutes les conditions sont valident
  if (
    checkFirstName() &&
    checkLastName() &&
    checkEmail() &&
    checkBirthDate() &&
    checkQuantity() &&
    checkLocation() &&
    checkCheckBox1()
  ) {
    formValid.style.display = "block"; //Affichage du formulaire validé
  } else {
    formValid.style.display = "none"; //Non Affichage du formulaire validé si les conditions sont invalides
  }
}

//Close modal valid
const formValid = document.getElementById("formValid"); //Capture du formulaire validé
const btnCloseModalValid = document.querySelector(".btn-closeModal"); // Capture le bouton de fermeture du formulaire validé

btnCloseModalValid.addEventListener("click", closeModalValid); //Ecoute le click sur le bouton de fermeture et déclenchement de la fonction closeModalValid
function closeModalValid() {
  formValid.style.display = "none"; //Effacement du formulaire validé
  modalbg.style.display = "none"; //Effacement de la modale
  resetModal(); //Reset de tous les champs du formulaire d'inscription
}
