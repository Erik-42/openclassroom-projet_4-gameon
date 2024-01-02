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
const modalbg = document.querySelector(".bground"); //Capture de la modale
const modalBtn = document.querySelectorAll(".btn-signup"); //Capture des boutons
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // launch modal event

function launchModal() {
  modalbg.style.display = "block"; // launch modal form
}

// Fermeture de la modale
const closeModal = document.querySelector(".close"); //Capture de la croix
closeModal.addEventListener("click", resetModal); //Evenement clique sur la croix pour fermeture modale

// Reset du formulaire
function resetModal() {
  clearAllErrors(); // Suppression de toutes les erreurs
  document.forms["reserve"].reset(); // Reset du formulaire
  modalbg.style.display = "none"; // Rend modale invisible
}

// Suppression de toutes les erreurs
function clearAllErrors() {
  const errorAllMessage = document.querySelectorAll("input"); // Sélection de tous les input
  errorAllMessage.forEach((msg) => {
    msg.parentElement.setAttribute("data-error", false); // Modif de l'attribut
    msg.parentElement.setAttribute("data-error-visible", false); // Modif de l'attribut
    msg.textContent = ""; // Suppression des messages d'erreurs
  });
}

// Tests des champs //
// Test du prénom
const firstNameInput = document.getElementById("first"); //Capture champ prénom
function checkFirstName() {
  const prenomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  // Test si le champ respect l'expression régulière
  if (!prenomRegex.test(firstNameInput.value.trim())) {
    addError(firstNameInput, "Entrez au moins 2 caractères pour le prénom."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(firstNameInput); // si la condition est remplie ont efface le message d'erreur
    return firstNameInput.value; // ont retourne la valeur du champ
  }
}

// Test du Nom
const lastNameInput = document.getElementById("last"); // Capture champ nom
function checkLastName() {
  const nomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  // Test si le champ respect l'expression régulière
  if (!nomRegex.test(lastNameInput.value.trim())) {
    addError(lastNameInput, "Entrez au moins 2 caractères pour le nom."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(lastNameInput); // si la condition est remplie ont efface le message d'erreur
    return lastNameInput.value; // ont retourne la valeur du champ
  }
}

// Test email
const emailInput = document.getElementById("email"); //Capture champ email
function checkEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Condition pour un email valide
  // Test si le champ respect l'expression régulière
  if (!emailRegex.test(emailInput.value.trim())) {
    addError(emailInput, "Entrez une adresse email valide."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(emailInput); // si la condition est remplie ont efface le message d'erreur
    return emailInput.value; // ont retourne la valeur du champ
  }
}

// Test date de naissance
const birthdateInput = document.getElementById("birthdate"); //Capture champ date anniversaire
function checkBirthDate() {
  // Test si la date est vide
  if (birthdateInput.value == "") {
    addError(birthdateInput, "Entrez une date de naissance valide."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(birthdateInput); // si la condition est remplie ont efface le message d'erreur
    return birthdateInput.value; // ont retourne la valeur du champ
  }
}

// Test nombre de tournois de l'utilisateur
const quantityInput = document.getElementById("quantity"); // Capture Quantité de tournois
function checkQuantity() {
  const quantityRegex = /^[0-9]+$/; // Condition pour un nombre positif
  // Test si le champ respect l'expression régulière
  if (!quantityRegex.test(quantityInput.value.trim())) {
    addError(quantityInput, "Entrez un nombre valide pour les tournois."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(quantityInput); // si la condition est remplie ont efface le message d'erreur
    return quantityInput.value; // ont retourne la valeur du champ
  }
}

// Test de la localisation des tournois
function checkLocation() {
  const radioInput = document.querySelector('input[name="location"]');
  const radioInputChecked = document.querySelector(
    'input[name="location"]:checked'
  ); // Bouton radio qui est coché (=null s'il n'y en a pas)

  // test s'il y a un bouton radio de coché
  if (!radioInputChecked) {
    addError(radioInput, "Choisissez un tournoi."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(radioInput); // si la condition est remplie ont efface le message d'erreur
    return radioInputChecked.checked; // ont affiche le bouton validé
  }
}

// Test condition d'utilisation
const checkbox1Input = document.getElementById("checkbox1"); // Capture checkbox des conditions d'utilisation
function checkCheckBox1() {
  // test si le bouton est coché
  if (!checkbox1Input.checked) {
    addError(checkbox1Input, "Merci d'accepter les conditions d'utilisation."); // en cas d'erreur ont ajoute le message
    return false;
  } else {
    clearError(checkbox1Input); // si la condition est remplie ont efface le message d'erreur
    return checkbox1Input.checked; // ont affiche le bouton validé
  }
}

// Test prevenir d'autres evenements
const checkbox2Input = document.getElementById("checkbox2"); // Capture de la checkbox des notifications evenements
function checkCheckBox2() {
  let valCheckbox2 = "NOT Checked"; // Valeur par défaut de checkbox2
  // test si le bouton est coché
  if (document.querySelector('input[id="checkbox2"]:checked')) {
    valCheckbox2 = "Checked"; // On change la valeur
  }
  return valCheckbox2; // On retourne la valeur
}

// Gestion des erreurs //
const formData = document.querySelectorAll(".formData"); //Capture des éléments du formulaire

// Ajout des erreurs en recuperant l'input concerné et le message correspondant
function addError(input, message) {
  const formData = input.parentElement; // Récupération du formData parent de l'input
  formData.setAttribute("data-error-visible", true); // Ajout de l'attribut data-error-visible avec la valeur true au formData
  formData.setAttribute("data-error", message); //Ajout de l'attribut data-error avec le message au formData
}

// Suppression des erreurs
// Suppression des erreurs en recuperant l'input concerné
function clearError(input) {
  const formData = input.parentElement; // Récupération du formData parent de l'input
  formData.setAttribute("data-error-visible", false); //Modification de l'attribut data-error-visible du formData avec la valeur false
}

// Soumission du formulaire //
const submitForm = document.querySelector('form[name="reserve"]'); // Capture du formulaire avec son nom
submitForm.addEventListener("submit", onSubmit); //Ecoute de l'évenement submit et déclenchement de la fonction onSubmit

function onSubmit(event) {
  event.preventDefault(); //Blocage du fonctionnement par défaut de l'événement

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
  modalValid(); //Déclenchement de la fonction modalValid
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
