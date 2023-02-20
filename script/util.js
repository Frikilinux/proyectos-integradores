// Feedback Modal
const feedbackModal = document.querySelector('.feedback-modal');

// Mostrar feedback al usuario, tipos (xmark, check, info)
const showFeedback = (type, msg, time = 1500) => {
  feedbackModal.innerHTML = `<i class="fas fa-circle-${type} modal-icon"></i></i> ${msg}`
  feedbackModal.classList.add(`show-feedback-${type}`);
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    time
  );
};

// Chequea si el email es válido
const isEmailValid = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return regex.test(email);
};

// Chequea si exite el usuario
const isMailInDd = (userDb, mail) => {
  return userDb.some((e) => e.email === mail);
};

// Cheque asi el pass es el mismo del usuario
const isUserPass = (userDb, mail, pass) => {
  return userDb.some((e) => e.email === mail && e.pass === pass);
};

// Chequea si el objeto está vacío
const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}
