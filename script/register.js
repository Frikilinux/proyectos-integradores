const registerBtn = document.getElementById('send');
const formRegister = document.querySelector('.form-register');
const inputUser = document.getElementById('name');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');
const inputEula = document.getElementById('eula');
const feedbackModal = document.querySelector('.feedback-modal');

let userDb = JSON.parse(localStorage.getItem('userDb')) || [];

const saveLocalStorage = (userDb) => {
  localStorage.setItem('userDb', JSON.stringify(userDb));
};

const dbSave = () => {
  userDb = [
    ...userDb,
    {
      id: userDb.length + 1,
      name: inputUser.value,
      email: inputEmail.value,
      pass: inputPass.value,
      eula: inputEula.value,
    },
  ];
};

// Check email
const isEmailValid = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return regex.test(email);
};

const emailExist = (email) => userDb.some((user) => user.email === email);

// Mostrar según la importancia
const feedbackRelevancy = (type, msg) => {
  if (type === 'alert')
    return `<i class="fa-solid fa-triangle-exclamation fback-icon"></i> ${msg}`;
  if (type === 'info')
    return `<i class="fa-solid fa-circle-info fback-icon"></i></i> ${msg}`;
};

// Mostrar feedback al usuario
const showFeedback = (type, msg, time = 1500) => {
  feedbackModal.innerHTML = feedbackRelevancy(type, msg);
  feedbackModal.classList.add(`show-feedback-${type}`);
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    time
  );
};

const register = (e) => {
  e.preventDefault();
  if (!isEmailValid(inputEmail.value)) {
    showFeedback('alert', 'El email no es válido', 2000);
    return;
  }
  if (emailExist(inputEmail.value)) {
    showFeedback('alert', 'El email ya existe, probá con otro', 2000);
    return;
  }
  dbSave();
  saveLocalStorage(userDb);
  showFeedback(
    'info',
    'Registro exitoso, redirecccionando para iniciar sesión',
    3500
  );
  formRegister.reset();
  setTimeout(() => (window.location.href = '/pages/login.html'), 4000);
};

const init = () => {
  formRegister.addEventListener('submit', register);
};

init();
