const registerBtn = document.getElementById('send');

const formLogin = document.querySelector('.form-login');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');

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
    showFeedback('xmark', 'El email no es válido');
    return;
  }
  if (!isMailInDd(userDb, inputEmail.value)) {
    showFeedback('xmark', 'Usuario no encontrado');
    return;
  }
  if (!isUserPass(userDb, inputEmail.value, inputPass.value)) {
    showFeedback('xmark', 'Password incorrecto');
    return;
  }
  checkUserInDb(userDb)
    ? (showFeedback('check', 'Login exitoso'),
      saveLoginStorage(getUserData(userDb, inputEmail.value, inputPass.value)),
      formLogin.reset(),
      setTimeout(() => (window.location.href = '/'), 2000))
    : showFeedback('xmark', 'No se encontró el usuario');
};

const init = () => {
  formLogin.addEventListener('submit', login);
};

init();
