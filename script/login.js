const registerBtn = document.getElementById('send');
const formLogin = document.querySelector('.form-login');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');

// Trae datos del usuario si lo encuentra en la DB
const getUserData = (userDb, mail, pass) => {
  return userDb.find((e) => e.email === mail && e.pass === pass);
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
  const userData = getUserData(userDb, inputEmail.value, inputPass.value);

  isObjectEmpty(userData) // Double Tap
    ? showFeedback('xmark', 'Algo malió sal')
    : (saveLoginStorage(userData),
      formLogin.reset(),
      setTimeout(() => (window.location.href = '/'), 2000),
      showFeedback('check', 'Login exitoso'));
};

const init = () => {
  formLogin.addEventListener('submit', login);
};

init();
