const registerBtn = document.getElementById('send');
const formRegister = document.querySelector('.form-register');
const inputUser = document.getElementById('name');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');
const inputEula = document.getElementById('eula');

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
      cart: [],
    },
  ];
};

const emailExist = (email) => userDb.some((user) => user.email === email);

const register = (e) => {
  e.preventDefault();
  if (!isEmailValid(inputEmail.value)) {
    showFeedback('xmark', 'El email no es válido');
    return;
  }
  if (emailExist(inputEmail.value)) {
    showFeedback('xmark', 'El email ya existe, probá con otro');
    return;
  }
  dbSave();
  saveLocalStorage(userDb);
  showFeedback('check', 'Registro exitoso, inicia sesión');
  formRegister.reset();
  setTimeout(() => (window.location.href = '/pages/login.html'), 2000);
};

const init = () => {
  formRegister.addEventListener('submit', register);
};

init();
