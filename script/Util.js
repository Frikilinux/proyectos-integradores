import { albumsData } from './Data.js'
import { loggedUser, storage } from './Storage.js'

// Desordena los albumes para que sea más divertido ...
export const shuffleAlbums = (arr) => {
  const newAlbumsData = [...arr]
  for (let i = newAlbumsData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newAlbumsData[i], newAlbumsData[j]] = [newAlbumsData[j], newAlbumsData[i]]
  }
  return newAlbumsData
}

// Crea una lista de géneros disponibles
export const getGenres = (data) => {
  const genreList = []
  data.forEach((e) => {
    if (!genreList.some((genre) => genre === e.genre)) genreList.push(e.genre)
  })
  return genreList.sort()
}

// Mostrar feedback al usuario, tipos (xmark, check, info)
export const showFeedback = (type, msg, time = 1500) => {
  const feedbackModal = document.querySelector('.feedback-modal')
  feedbackModal.innerHTML = `<i class="fas fa-circle-${type} modal-icon"></i></i> ${msg}`
  feedbackModal.classList.add(`show-feedback-${type}`)
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    time
  )
}

// Chequea si el email es válido
export const isEmailValid = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
  return regex.test(email)
}

export const isPasswordValid = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return regex.test(password)
}

// Chequea si exite el usuario
export const isMailInDB = (userDb, mail) => userDb.some((e) => e.email === mail)

// Cheque asi el pass es el mismo del usuario
export const isUserPass = (userDb, mail, pass) => {
  return userDb.some((e) => e.email === mail && e.pass === pass)
}

// Chequea si un objeto está vacío
export const isObjectEmpty = (object) => Object.keys(object).length === 0

// Trayendo cart del usuario
export const getUserCart = () => {
  return isObjectEmpty(loggedUser) ? [] : loggedUser.cart
}

// Esto puede ir en data.js <===
export const albumsController = {
  dividedAlbums: [],
  nextAlbumsIndex: 1,
  albumsLimit: 0,
  genreList: getGenres(albumsData),
}

export const notLoggedIn = () => {
  showFeedback(
    'info',
    'Por favor <a href="./pages/login.html" class="modal-login menu__link trans-5">inicia sesión</a> o <a href="./pages/register.html" class="modal-login menu__link trans-5">registrate</a>',
    4000
  )
}
