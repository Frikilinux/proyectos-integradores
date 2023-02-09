const registerBtn = document.getElementById('send');
const formLogin = document.querySelector('.form-login');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');

// Trae todos los datos del usuario en un array
const getUserData = (userDb, mail, pass) => {
  return userDb.filter((e) => e.email === mail && e.pass === pass);
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
  console.log(userData);
  !userData.length // Double Tap
    ? showFeedback('xmark', 'Algo malió sal')
    : (showFeedback('check', 'Login exitoso'),
      saveLoginStorage(userData),
      formLogin.reset(),
      setTimeout(() => (window.location.href = '/'), 2000));
};

const init = () => {
  formLogin.addEventListener('submit', login);
};

init();
