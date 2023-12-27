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

// DOM Elements landing page //
const modalbg = document.querySelector(".bground"); //Capture de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); //Capture des boutons
const formData = document.querySelectorAll(".formData"); //Capture des éléments du formulaire

// DOM Elements Modale

// Gestion de la modale //
//ouverture modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // launch modal event

function launchModal() {
  modalbg.style.display = "block"; // launch modal form
}

// Fermeture de la modale
const closeModal = document.querySelector(".close"); //Capture de la croix
closeModal.addEventListener("click", resetModal); //evenement clique sur la croix pour fermeture modale

// Reset du formulaire
function resetModal() {
  clearAllErrors(); // On supprime toutes les erreurs
  document.forms["reserve"].reset(); // On reset le formulaire
  modalbg.style.display = "none"; // On rend invisible la modale
}

// Suppression de toutes les erreurs
function clearAllErrors() {
  const errorAllMessage = document.querySelectorAll("input"); // Sélection de tous les input
  errorAllMessage.forEach((msg) => {
    msg.parentElement.setAttribute("data-error", false); // modif de l'attribut
    msg.parentElement.setAttribute("data-error-visible", false); // Modif de l'attribut
    msg.textContent = ""; // Suppression des messages d'erreurs
    clearRadioError();
  });
}

// Tests des champs //
// Test du prénom
const firstNameInput = document.getElementById("first"); //Capture champ prénom
function checkFirstName() {
  const prenomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  if (!prenomRegex.test(firstNameInput.value.trim())) {
    // en cas d'erreur ont ajoute un message
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
const lastNameInput = document.getElementById("last"); // Capture champ nom
function checkLastName() {
  const nomRegex = /^[a-zA-Z]{2,}$/; // Condition pour au moins 2 caractères alphabétiques
  if (!nomRegex.test(lastNameInput.value.trim())) {
    addError(
      lastNameInput,
      "Entrer au moins 2 caractères alphabétiques pour le nom."
    );
    return false;
  } else {
    clearError(lastNameInput);
    return lastNameInput.value;
  }
}

// Test email
const emailInput = document.getElementById("email"); //Capture champ email
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

// Test date de naissance
const birthdateInput = document.getElementById("birthdate"); //Capture champ email
function checkBirthDate() {
  // const birthDateRegex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/; // Condition pour un date valide
  // Test si la date est vide
  if (birthdateInput.value == "") {
    addError(
      birthdateInput,
      "Veuillez entrer une date valide pour la date de naissance."
    );
    return false;
  } else {
    clearError(birthdateInput);
    return birthdateInput.value;
  }
}

// Test nombre de tournois de l'utilisateur
const quantityInput = document.getElementById("quantity"); // Capture Quantité de tournois
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

// Test de la localisation des tournois
function checkLocation() {
  // const radioErrorMessage = document.querySelector(".radioErrorMessage");
  const radioInput = document.querySelector('input[name="location"]:checked'); // Bouton radio qui est coché (=null s'il n'y en a pas)

  // test s'il y a un bouton radio de coché
  if (!radioInput) {
    addRadioError();
    return false;
  } else {
    clearRadioError();
    return radioInput.checked;
  }
}

function addRadioError() {
  const radioErrorMessage = document.querySelector(".radioErrorMessage");
  radioErrorMessage.parentElement.setAttribute("data-error", true);
  radioErrorMessage.parentElement.setAttribute("data-error-visible", true);
  radioErrorMessage.textContent = "Veuillez choisir un tournoi.";
}
function clearRadioError() {
  const radioErrorMessage = document.querySelector(".radioErrorMessage");
  radioErrorMessage.parentElement.setAttribute("data-error", false);
  radioErrorMessage.parentElement.setAttribute("data-error-visible", false);
  radioErrorMessage.textContent = "";
}

// Test condition d'utilisation
const checkbox1Input = document.getElementById("checkbox1"); // Capture validation conditions d'utilisation
function checkCheckBox1() {
  if (!checkbox1Input.checked) {
    addError(checkbox1Input, "Veuillez accepter les conditions d'utilisation.");
    return false;
  } else {
    clearError(checkbox1Input);
    return checkbox1Input.checked;
  }
}

// Test prevenir d'autres evenements
const checkbox2Input = document.getElementById("checkbox2"); // Capture notification evenements
function checkCheckBox2() {
  let valCheckbox2 = "NOT Checked"; // Valeur par défaut de checkbox2
  if (document.querySelector('input[id="checkbox2"]:checked')) {
    valCheckbox2 = "Checked"; // On change la valeur
  }
  return valCheckbox2; // On retourne la valeur
}

// Gestion des erreurs //
// Ajout des erreurs
function addError(input, message) {
  const formData = input.parentElement;
  formData.setAttribute("data-error-visible", true);
  formData.setAttribute("data-error", message);
}

// Suppression des erreurs
function clearError(input) {
  const formData = input.parentElement;
  formData.setAttribute("data-error-visible", false);
}

// Soumission du formulaire //
const submitForm = document.querySelector('form[name="reserve"]');
submitForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

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
  modalValid();
}

// validation du formulaire
function modalValid() {
  if (
    checkFirstName() &&
    checkLastName() &&
    checkEmail() &&
    checkBirthDate() &&
    checkQuantity() &&
    checkLocation() &&
    checkCheckBox1()
  ) {
    formValid.style.display = "block";
  } else {
    formValid.style.display = "none";
  }
}

//Close modal valid BTN
const formValid = document.getElementById("formValid");
const btnCloseModalValid = document.querySelector(".btn__closeModal");

btnCloseModalValid.addEventListener("click", closeModalValid);
function closeModalValid() {
  formValid.style.display = "none";
  modalbg.style.display = "none";
  /* reload for empty form */
  document.location.reload();
}
