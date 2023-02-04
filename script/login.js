const registerBtn = document.getElementById('send');

const formLogin = document.querySelector('.form-login');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');
const feedbackModal = document.querySelector('.feedback-modal');

let userDb = JSON.parse(localStorage.getItem('userDb')) || [];

let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || [];

const saveLoginStorage = (loggedUser) => {
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
};

// const user = () => {
//   loginUser = {
//     pass: inputPass.value,
//     email: inputEmail.value,
//   };
// };

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

// Login Section

const checkUserInDb = (userDb) =>
  userDb.find((user) => {
    return user.email === inputEmail.value && user.pass === inputPass.value;
  });

// Trae todos los datos del usuario
const getUserData = (userDb, mail, pass) => {
  return userDb.filter((e) => e.email === mail && e.pass === pass);
};

// Check usuario
const isMailInDd = (userDb, mail) => {
  return userDb.find((e) => e.email === mail);
};

// check password
const isUserPass = (userDb, mail, pass) => {
  return userDb.find((e) => e.email === mail && e.pass === pass);
};

// Check email
const isEmailValid = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return regex.test(email);
};

const login = (e) => {
  e.preventDefault();
  if (!isEmailValid(inputEmail.value)) {
    showFeedback('alert', 'El email no es válido', 2000);
    return;
  }
  if (!isMailInDd(userDb, inputEmail.value)) {
    showFeedback('alert', 'Usuario no encontrado', 2000);
    return;
  }
  if (!isUserPass(userDb, inputEmail.value, inputPass.value)) {
    showFeedback('alert', 'Password incorrecto', 2000);
    return;
  }
  checkUserInDb(userDb)
    ? (showFeedback('info', 'Login exitoso', 3500),
      saveLoginStorage(getUserData(userDb, inputEmail.value, inputPass.value)),
      formLogin.reset(),
      setTimeout(() => (window.location.href = '/'), 4000))
    : showFeedback('alert', 'No se encontró el usuario');
};

const init = () => {
  formLogin.addEventListener('submit', login);
};

init();
