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

// DOM Elements landing page
const modalbg = document.querySelector(".bground"); //Capture de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); //Capture des boutons
const formData = document.querySelectorAll(".formData"); //Capture des éléments du formulaire

// DOM Elements Modale
const firstNameInput = document.getElementById("first"); //Capture champ prénom
const lastNameInput = document.getElementById("last"); // Capture champ nom
const emailInput = document.getElementById("email"); //Capture champ email
const birthdateInput = document.getElementById("birthdate"); //Capture champ email

const quantityInput = document.getElementById("quantity"); // Capture Quantité de tournois
// const radioInput = document.querySelector('input[name="location"]:checked'); // Bouton radio qui est coché (=null s'il n'y en a pas)

const checkbox1Input = document.getElementById("checkbox1"); // Capture validation conditions d'utilisation
const checkbox2Input = document.getElementById("checkbox2"); // Capture notification evenements

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

  formIsValid.style.display = "none";

  clearError(); // Vide les erreurs du formulaire
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  birthdateInput.value = "";
  quantityInput.value = "";
  checkbox1Input.checked = false;
  checkbox2Input.checked = false;
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

// Test de la localisation (ville des tournois)
function checkLocation() {
  const radioErrorMessage = document.querySelector(".radioErrorMessage");
  const radioInput = document.querySelector('input[name="location"]:checked'); // Bouton radio qui est coché (=null s'il n'y en a pas)

  // test s'il y a un bouton radio de coché
  if (!radioInput) {
    // addError(radioInput, "Veuillez choisir un tournoi.");

    radioErrorMessage.parentElement.setAttribute("data-error", true);
    radioErrorMessage.parentElement.setAttribute("data-error-visible", true);
    radioErrorMessage.textContent = "Veuillez choisir un tournoi.";
    return false;
  } else {
    radioErrorMessage.parentElement.setAttribute("data-error", false);
    radioErrorMessage.parentElement.setAttribute("data-error-visible", false);
    radioErrorMessage.textContent = "";
    clearError(radioInput);
    return radioInput.value;
  }
}

function checkCheckBox1() {
  if (!checkbox1Input.checked) {
    addError(checkbox1Input, "Veuillez accepter les conditions d'utilisation.");
    return false;
  } else {
    clearError(checkbox1Input);
    return checkbox1Input.checked;
  }
}

function checkCheckBox2() {
  let valCheckbox2 = "NOT Checked"; // Valeur par défaut de checkbox2
  if (document.querySelector('input[id="checkbox2"]:checked')) {
    valCheckbox2 = "Checked"; // On change la valeur
  }
  return valCheckbox2; // On retourne la valeur
}

// Gestion des erreurs
// Ajout erreurd
function addError(input, message) {
  const formData = input.parentElement;
  // const errorMessage = formData.querySelector(".errorMessage");
  formData.setAttribute("data-error-visible", true);
  formData.setAttribute("data-error", message);
  // errorMessage.textContent = message;
}

// Suppression erreur
function clearError(input) {
  const formData = input.parentElement;
  formData.setAttribute("data-error-visible", false);
  // const errorMessage = formData.querySelector(".errorMessage");
  // errorMessage.textContent = "";
}

// Soumission formulaire
// Capture formulaire
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
}
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

btnCloseModalFormIsValid.addEventListener("click", closeModalValid);
function closeModalValid() {
  formValid.style.display = "none";
  modalbg.style.display = "none";
  /* reload for empty form */
  document.location.reload();
}
