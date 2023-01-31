const registerBtn = document.getElementById('send');

const formLogin = document.querySelector('.form-login');
const inputEmail = document.getElementById('mail');
const inputPass = document.getElementById('pass');
const feedbackModal = document.querySelector('.feedback-modal-user');

let userDb = JSON.parse(localStorage.getItem('userDb')) || [];

let loginUser = JSON.parse(localStorage.getItem('loginUser')) || [];

const saveLoginStorage = (loginUser) => {
  localStorage.setItem('loginUser', JSON.stringify(loginUser));
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
    return `<i class="fa-solid fa-triangle-exclamation"></i> ${msg}`;
  if (type === 'info')
    return `<i class="fa-solid fa-circle-info"></i></i> ${msg}`;
};

// Mostrar feedback al usuario
const showFeedback = (type, msg) => {
  feedbackModal.innerHTML = feedbackRelevancy(type, msg);
  feedbackModal.classList.add(`show-feedback-${type}`);
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    1250
  );
};

// Login Section

const checkUserInDb = (userDb) =>
  userDb.find((user) => {
    return user.email === inputEmail.value && user.pass === inputPass.value;
  });

const getUserData = (userDb, mail, pass) => {
  return userDb.filter((e) => e.email === mail && e.pass === pass);
};

const login = (e) => {
  e.preventDefault();
  // user()
  // console.log(loginUser);
  checkUserInDb(userDb)
    ? (showFeedback('info', 'login exitoso'),
      saveLoginStorage(getUserData(userDb, inputEmail.value, inputPass.value)),
      formLogin.reset())
    : showFeedback('alert', 'No se encotró el ussuario');
};

const init = () => {
  formLogin.addEventListener('submit', login);
};

init();
