import { albumsData } from './Data.js'
import {
  albumsController,
  isObjectEmpty,
  notLoggedIn,
  showFeedback,
  shuffleAlbums,
} from './Util.js'
import {
  loggedUser,
  saveLoginStorage,
  saveUserDbStorage,
  storage,
  updateCartOfLoggedUser,
  updateUserDb,
} from './Storage.js'
import { addToCart, checkCartStatus, initCart, resetCart } from './Cart.js'

const header = document.querySelector('.header')
const albumsContainer = document.querySelector('.container--albums')
const genreContainer = document.querySelector('.genres')
const userNameContainer = document.querySelector('.user-name')
const btnLoad = document.querySelector('.btn-load')
const cartMenu = document.querySelector('.cart')
const burgerBtn = document.querySelector("[data-name='navMenu']")
const linksMenu = document.querySelector('.menu')
const userBtns = document.querySelector('.user')
const userLoginName = document.querySelector('.login-user')
const logoutBtn = document.querySelector('.logout')
const btnUp = document.querySelector('.btn--up')
const trackPreview = document.querySelector('.track-preview')
const trackPreviewContainer = document.querySelector('.track-preview-container')
const previewAlbumName = document.querySelector('.preview-album')
const previewArtistName = document.querySelector('.preview-artist')
const previewbtnBuy = document.querySelector('.preview-buy')
const overlay = document.querySelector('.overlay')
const btnCloseMenu = document.querySelectorAll('.close-menu')
const menues = document.querySelectorAll("[data-type='menu']")
const btnMenues = document.querySelectorAll("[data-type='btnMenu']")

const albumCardTemplate = (album) => {
  const { id, name, artist, totalTracks, price, albumImg, releaseDate, label } =
    album
  return `
    <div id="${id}" class="albums__release">
      <div class="back-release">
        <div class="format">
          <button
            data-id="${id}"
            data-name="previewMenu"
            data-type="btnMenu"
            class="btn-show-preview
            trans-5">
            Preview
            <i class="far fa-circle-play fa-beat"
              data-name="previewMenu"
              data-id="${id}">
            </i>
          </button>
          <div class="img-select trans-5">
          <p>Disponible en</p>
          <img src="./assets/img/dsd_logo.svg" alt="" class="format-img">
          <img src="./assets/img/flac_logo.svg" alt="" class="format-img">
          <img src="./assets/img/mqa_logo.svg" alt="" class="format-img">
          </div>
        </div>  
        <img src="${albumImg}" class="release-img trans-5" alt="Album image">
      </div>
      <div class="release__info">
        <div class="release__data">
          <p class="album-name">${name}</p>
          <p class="artist">${artist}</p>
          <p class="tracks">${totalTracks} pistas - Release ${releaseDate}</p>
        </div>
        <div class="release__price">
          <p class="price">$ ${price}</p>
          <button
            class="btn--buy btn"
            data-id="${id}"
            data-artist="${artist}"
            data-name="${name}"
            data-price="${price}"
            data-img="${albumImg}"
            data-tracks="${totalTracks}"
            data-date="${releaseDate}"
            data-label="${label}">
              Comprar
          </button>
        </div>
      </div>
    </div>
  `
}

// Divide albumes en arrays
const divider = (size, albumsList) => {
  const dividedAlbums = []
  for (let i = 0; i < albumsList.length; i += size) {
    dividedAlbums.push(albumsList.slice(i, i + size))
  }
  return dividedAlbums
}

// Divide todos los albumes
const divideAllAlbums = (size) => divider(size, shuffleAlbums(albumsData))

// Divide los albunes según la categoría
const divideByGenre = (size, genre) => {
  const albumsByGenre = shuffleAlbums(albumsData).filter((album) => {
    return album.genre === genre
  })
  return divider(size, albumsByGenre)
}

// Renderizado de albumes
const renderDividedAlbums = (i = 0) => {
  albumsContainer.innerHTML += albumsController.dividedAlbums[i]
    .map(albumCardTemplate)
    .join('')
}

// Genera el array de albumes y renderiza (size según viewport, en un futuro)
const generateAlbumSection = (index = 0, genre = undefined, size = 6) => {
  !genre
    ? (albumsController.dividedAlbums = divideAllAlbums(size))
    : (albumsController.dividedAlbums = divideByGenre(size, genre))
  albumsController.albumsLimit = albumsController.dividedAlbums.length
  renderDividedAlbums(index)
}

// Añade clase hidden al botón "Ver más"
const toggleBtnLoad = () => {
  albumsController.albumsLimit !== albumsController.nextAlbumsIndex
    ? btnLoad.classList.remove('hidden2')
    : btnLoad.classList.add('hidden2')
}

// Crea categorías con los géneros
const renderCatGenre = (genre) => {
  return `
    <button class="genre trans-5" data-genre="${genre}">
      ${genre}
    </button>
  `
}

// Renderiza los botones de géneros
const renderGenreBtns = (genreList) => {
  genreContainer.innerHTML += genreList.map(renderCatGenre).join('')
}

// Añade la clase active al boton de genero
const changeBtnState = (selectedGenre) => {
  const btnGenreList = document.querySelectorAll('.genre')
  const genresList = [...btnGenreList]
  genresList.forEach((genreBtn) => {
    genreBtn.dataset.genre !== selectedGenre
      ? genreBtn.classList.remove('active')
      : genreBtn.classList.add('active')
  })
}

// Cambia el estado de los botones de género
const changeFilterState = (e) => {
  changeBtnState(e.target.dataset.genre)
  toggleBtnLoad()
}

// Botones de género
const applyFilter = (e) => {
  if (e.target.classList.contains('active')) return
  if (!e.target.classList.contains('genre')) return
  albumsContainer.innerHTML = ''
  albumsController.nextAlbumsIndex = 1
  !e.target.dataset.genre
    ? generateAlbumSection()
    : generateAlbumSection(0, e.target.dataset.genre)
  changeFilterState(e)
  window.location.replace('/#albums')
}

// Ver más
const showMoreAlbums = () => {
  renderDividedAlbums(albumsController.nextAlbumsIndex)
  albumsController.nextAlbumsIndex++
  toggleBtnLoad()
}

const showBtnUp = () => {
  scrollY < 500
    ? (btnUp.style.transform = 'translateY(150%)')
    : (btnUp.style.transform = 'translateY(0%)')
}

const addGenresShadow = () => {
  if (genreContainer.offsetTop < 100) {
    genreContainer.classList.remove('shadow')
    header.classList.add('shadow')
  } else {
    genreContainer.classList.add('shadow')
    header.classList.remove('shadow')
  }
}

// Login stuff

const checkIfLoggedIn = () => {
  if (isObjectEmpty(loggedUser)) {
    userBtns.classList.remove('hidden')
    userLoginName.classList.add('hidden')
  } else {
    userNameContainer.textContent = `Hola, ${loggedUser.name}`
    userBtns.classList.add('hidden')
    userLoginName.classList.remove('hidden')
  }
}

const logout = () => {
  cartMenu.classList.remove('show-menu')
  updateUserDb()
  saveUserDbStorage()
  saveLoginStorage()
  showFeedback('info', 'Sesion cerrada')
  checkIfLoggedIn()
  resetCart()
}

// Tracks preview

// Constructor
class TrackPreview {
  constructor(name, url, img) {
    this.createTrackPreview(name, url, img)
  }

  createTrackPreview(name, url, trackNumber) {
    const div = document.createElement('div')
    div.classList.add('track', 'trans-5')

    const trackName = document.createElement('p')
    trackName.classList.add('track-preview-name')
    trackName.textContent = `${trackNumber.toString().padStart(2, 0)} | ${name}`

    const btnPlayPause = document.createElement('i')
    btnPlayPause.classList.add('play-pause', 'fa-regular', 'fa-circle-play')

    const audioTrack = document.createElement('audio')
    audioTrack.classList.add('song')
    audioTrack.src = url

    trackPreviewContainer.append(div)
    div.append(btnPlayPause, trackName, audioTrack)

    const togglePlay = () => {
      const allSongs = [...document.querySelectorAll('.song')]
      if (audioTrack.paused) {
        allSongs.forEach((e) => {
          e.pause()((e.currentTime = 0))
        })
        audioTrack.play()
      } else {
        audioTrack.pause()
      }
    }

    // btnPlayPause.addEventListener('click', togglePlay);
    div.addEventListener('click', togglePlay)

    audioTrack.onplaying = () => {
      div.classList.add('playing')
      btnPlayPause.classList.replace('fa-circle-play', 'fa-circle-pause')
    }
    audioTrack.onpause = () => {
      div.classList.remove('playing')
      btnPlayPause.classList.replace('fa-circle-pause', 'fa-circle-play')
    }
  }
}

// Busca el álbum y retorna su objeto
const getAlbumData = (id) => albumsData.find((e) => e.id === id)

// Crea la lista de canciones
const createPreviewList = (album) => {
  const {
    id,
    artist,
    name,
    price,
    albumImg,
    totalTracks,
    releaseDate,
    label,
    tracks,
  } = album
  trackPreview.style.background = `url(${albumImg}) no-repeat center/cover`
  previewAlbumName.textContent = name
  previewArtistName.textContent = artist
  trackPreviewContainer.textContent = ''
  tracks.forEach((track) => {
    new TrackPreview(track.name, track.url, track.number)
  })
  previewbtnBuy.innerHTML = `
    <button
      class="btn--buy btn"
      data-id="${id}"
      data-artist="${artist}"
      data-name="${name}"
      data-price="${price}"
      data-img="${albumImg}"
      data-tracks="${totalTracks}"
      data-date="${releaseDate}"
      data-label="${label}">
      Comprar
    </button>
  `
}

// Genera la lista de canciones y abre el menu lateral
const showPreview = (e) => {
  if (e.target.dataset.name !== 'previewMenu') {
    return
  }
  createPreviewList(getAlbumData(e.target.dataset.id))
  toggleMenus(e.target.dataset.name)
}

// Oculta todos los menus
const hideAllMenus = (dataName) => {
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
const toggleMenus = (name) => {
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
const btnsMenuEvent = () => {
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
const closeMenus = (btnCloseMenu) => {
  const buttons = [...btnCloseMenu]
  buttons.forEach((e) => e.addEventListener('click', hideAllMenus))
}

const escKeyHandler = (e) => {
  if (e.key === 'Escape') hideAllMenus()
}

// Inicialización como Rodri manda
const init = () => {
  renderGenreBtns(albumsController.genreList)
  generateAlbumSection()
  document.addEventListener('DOMContentLoaded', () => {
    checkIfLoggedIn()
    btnsMenuEvent()
    closeMenus(btnCloseMenu)
    btnLoad.addEventListener('click', showMoreAlbums)
    window.addEventListener('scroll', () => {
      hideAllMenus()
      showBtnUp()
      addGenresShadow()
    })
    overlay.addEventListener('click', hideAllMenus)
    genreContainer.addEventListener('click', applyFilter)
    albumsContainer.addEventListener('click', (e) => {
      addToCart(e)
      showPreview(e)
    })
    previewbtnBuy.addEventListener('click', addToCart)
    logoutBtn.addEventListener('click', logout)
    document.addEventListener('keydown', escKeyHandler)
  })
  initCart()
}

init()
