import { addToCart } from './Cart.js'
import { albumsData } from './Data.js'
import { toggleMenus } from './Util.js'

const trackPreview = document.querySelector('.track-preview')
const trackPreviewContainer = document.querySelector('.track-preview-container')
const previewAlbumName = document.querySelector('.preview-album')
const previewArtistName = document.querySelector('.preview-artist')
const previewbtnBuy = document.querySelector('.preview-buy')
// Constructor
class TrackPreview {
  constructor(name, url, trackNumber) {
    this.createTrackPreview(name, url, trackNumber)
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
          e.pause()
          e.currentTime = 0
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
const createPreviewList = ({
  id,
  artist,
  name,
  price,
  albumImg,
  totalTracks,
  releaseDate,
  label,
  tracks,
}) => {
  trackPreview.style.background = `url(${albumImg}) no-repeat center/cover`
  previewAlbumName.textContent = name
  previewArtistName.textContent = artist
  trackPreviewContainer.textContent = ''
  tracks.forEach(({ name, url, number }) => {
    new TrackPreview(name, url, number)
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
export const showPreview = (e) => {
  if (e.target.dataset.name !== 'previewMenu') {
    return
  }
  createPreviewList(getAlbumData(e.target.dataset.id))
  toggleMenus(e.target.dataset.name)
}

export const initPreview = () => {
  previewbtnBuy.addEventListener('click', addToCart)
}
