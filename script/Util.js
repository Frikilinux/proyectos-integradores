import { albumsData } from './Data.js'
import { loggedUser } from './Storage.js'

const burgerBtn = document.querySelector("[data-name='navMenu']")
const linksMenu = document.querySelector('.menu')
const menues = document.querySelectorAll("[data-type='menu']")
const overlay = document.querySelector('.overlay')

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
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

// Oculta todos los menus
export const hideAllMenus = (dataName) => {
  const allSongs = [...document.querySelectorAll('.song')]
  const menus = [...menues]
  menus.forEach((e) => {
    if (e.dataset.menu !== dataName) e.classList.remove('show-menu')
  })
  allSongs.forEach((e) => e.pause())
  overlay.classList.remove('visible2')
  document.body.style.overflowY = 'visible'
  toggleMenuIcon()
}

const toggleMenuIcon = () => {
  linksMenu.classList.contains('show-menu')
    ? burgerBtn.classList.replace('fa-bars', 'fa-x')
    : burgerBtn.classList.replace('fa-x', 'fa-bars')
}

// Muestra u oculta los menus
export const toggleMenus = (name) => {
  const menu = document.querySelector(`[data-menu="${name}"]`)
  hideAllMenus(name)
  menu.classList.toggle('show-menu')
  const menus = [...menues]
  if (menus.some((e) => e.classList.contains('show-menu'))) {
    overlay.classList.add('visible2')
    document.body.style.overflowY = 'hidden'
  } else {
    overlay.classList.remove('visible2')
    document.body.style.overflowY = 'visible'
  }
  toggleMenuIcon()
}

// Añade eventos a los botones de menus
export const btnsMenuEvent = (btnMenues) => {
  const btnsMenu = [...btnMenues]
  btnsMenu.forEach((e) => {
    e.addEventListener('click', (e) => {
      if (e.target.dataset.name === 'cartMenu' && isObjectEmpty(loggedUser)) {
        notLoggedIn()
        return
      }
      toggleMenus(e.target.dataset.name)
    })
  })
}

// Cierra los menus
export const closeMenus = (btnCloseMenu) => {
  const buttons = [...btnCloseMenu]
  buttons.forEach((e) => e.addEventListener('click', hideAllMenus))
}

export const escKeyHandler = (e) => {
  if (e.key === 'Escape') hideAllMenus()
}
