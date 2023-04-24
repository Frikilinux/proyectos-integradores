import { isEmailValid, isMailInDB, showFeedback } from './Util.js'
import { saveNewUser, saveUserDbStorage, userDb } from './Storage.js'

const formRegister = document.querySelector('.form-register')
const inputUser = document.getElementById('name')
const inputEmail = document.getElementById('mail')
const inputPass = document.getElementById('pass')
const inputEula = document.getElementById('eula')

const register = (e) => {
  e.preventDefault()
  if (!isEmailValid(inputEmail.value)) {
    showFeedback('xmark', 'El email no es válido')
    return
  }
  if (isMailInDB(userDb, inputEmail.value)) {
    showFeedback('xmark', 'El email ya existe')
    return
  }
  const newUser = {
    name: inputUser.value,
    email: inputEmail.value,
    pass: inputPass.value,
    eula: inputEula.value,
  }
  saveNewUser(newUser)
  saveUserDbStorage()
  showFeedback('check', 'Registro exitoso, inicia sesión')
  formRegister.reset()
  setTimeout(() => (window.location.href = '/pages/login.html'), 2000)
}

const init = () => {
  formRegister.addEventListener('submit', register)
}

init()
