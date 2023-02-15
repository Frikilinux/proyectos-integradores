const registerBtn = document.getElementById('send');
const formRegister = document.querySelector('.form-register');
const inputUser = document.getElementById('name');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');
const inputEula = document.getElementById('eula');

// Crea un nuevo usuario
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

const register = (e) => {
  e.preventDefault();
  if (!isEmailValid(inputEmail.value)) {
    showFeedback('xmark', 'El email no es válido');
    return;
  }
  if (isMailInDd(userDb, inputEmail.value)) {
    showFeedback('xmark', 'El email ya existe');
    return;
  }
  dbSave();
  saveUserDbStorage(userDb);
  showFeedback('check', 'Registro exitoso, inicia sesión');
  formRegister.reset();
  setTimeout(() => (window.location.href = '/pages/login.html'), 2000);
};

const init = () => {
  formRegister.addEventListener('submit', register);
};

init();
