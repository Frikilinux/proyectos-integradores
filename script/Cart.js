import { isObjectEmpty, notLoggedIn, showFeedback } from './Util.js'
import {
  loggedUser,
  saveLoginStorage,
  updateCartOfLoggedUser,
} from './Storage.js'

const cartItemsContainer = document.querySelector('.cart-container')
const cartBtnContainer = document.querySelector('.cart-btns')
const cartBtns = cartBtnContainer.querySelectorAll('.btn')
const cartBtn = document.querySelector('.cart-label')
const totalPrice = document.querySelector('.total-price')
const cartItemsQty = document.querySelector('.cart-qty')

let cart = JSON.parse(localStorage.getItem('loggedUser')).cart || []

// Carrito
const cartItemTemplate = ({
  id,
  artist,
  name,
  price,
  img,
  tracks,
  quantity,
  date,
  label,
}) => {
  return `
    <div class="cart-item">
      <div class="item-info">
        <img src="${img}" alt="Imagen del album" />
        <div class="album-data">
          <p class="item-album">${name}</p>
          <p class="item-artist">${artist}</p>
          <p class="item-data">${tracks} Pistas</p>
          <p class="item-data"><i class="far fa-calendar"></i>${date}</p>
          <p class="item-data"><i class="fas fa-record-vinyl"></i>${label}</p>
        </div> 
      </div>
      <div class="item-handler">
        <span class="item-price">$ ${price}</span>
        <div class="quantity-container">
          <span>Qty</span>
          <button class="quantity-handler down btn" data-id="${id}"> - </button>
          <span class="item-quantity"> ${quantity} </span>
          <button class="quantity-handler up btn" data-id="${id}"> + </button>
          <i class="trash delete-item fas fa-xmark" data-id="${id}"></i>
        </div>
      </div>
    </div>
  `
}

const renderCartItems = () => {
  !cart.length
    ? (cartItemsContainer.innerHTML = `
        <p class="empty-cart-msg">Nada para comprar<p>
        <i class="far fa-face-sad-tear"></i>
      `)
    : (cartItemsContainer.innerHTML = cart.map(cartItemTemplate).join(''))
}

const totalItemsPrice = () =>
  cart.reduce((acc, e) => acc + Number(e.price) * e.quantity, 0)

const renderTotalPrice = () => {
  totalPrice.innerHTML = `$ ${totalItemsPrice().toFixed(2)}`
}

const renderCartQty = () => {
  // cartItemsQty.textContent = cart.length;
  cartItemsQty.textContent = cart.reduce((acc, e) => acc + e.quantity, 0)
}

// reccibe un NodeList como parámetro
const disableBtns = (btns) => {
  btns = [...btns]
  if (!cart.length || isObjectEmpty(loggedUser)) {
    btns.forEach((e) => e.classList.add('btn-disabled'))
    cartBtn.classList.remove('show-qty')
  } else {
    btns.forEach((e) => e.classList.remove('btn-disabled'))
    cartBtn.classList.add('show-qty')
  }
}

// Chequeo del carrito para cada acción
export const checkCartStatus = () => {
  if (!isObjectEmpty(loggedUser)) {
    updateCartOfLoggedUser(cart)
    saveLoginStorage(loggedUser)
  }
  renderCartItems()
  renderTotalPrice()
  disableBtns(cartBtns)
  renderCartQty()
}

// Añade el album
export const addToCart = (e) => {
  if (!e.target.classList.contains('btn--buy')) {
    return
  }
  if (isObjectEmpty(loggedUser)) {
    notLoggedIn()
    return
  }
  const { id, artist, name, price, img, tracks, date, label } = e.target.dataset
  const album = { id, artist, name, price, img, tracks, date, label }
  if (albumAdded(album)) {
    sumAddedAlbums(album)
  } else {
    createAlbumItem(album)
    showFeedback('check', 'Nuevo album añadido')
  }
  checkCartStatus()
}

// Chequea si ya está el album añadido
const albumAdded = (item) => cart.find((album) => album.id === item.id)

// Suma si ya existe, sino lo agrega
const sumAddedAlbums = (item) => {
  cart = cart.map((cartItem) => {
    return cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  })
}

// Crear cart
const createAlbumItem = (item) => (cart = [...cart, { ...item, quantity: 1 }])

// Botones - y +
const itemBtnPlus = (id) => {
  const itemExist = cart.find((item) => item.id === id)
  sumAddedAlbums(itemExist)
}

const itemBtnMinus = (id) => {
  const itemExist = cart.find((item) => item.id === id)
  if (itemExist.quantity === 1) {
    confirmDelete(itemExist)
  } else {
    decItemQty(itemExist)
  }
}

// Borra un album directamente de la lista
const deleteCartAlbum = (id) => {
  const itemExist = cart.find((item) => item.id === id)
  if (itemExist) confirmDelete(itemExist)
}

// Confirma si se elimina un album del carrito
const confirmDelete = (item) => {
  if (window.confirm('¿Elimino el album?')) {
    deleteCartItem(item)
    showFeedback('info', 'Album Eliminado')
  }
}

// Actualiza el array del carrito
const deleteCartItem = (itemExist) => {
  cart = cart.filter((item) => itemExist.id !== item.id)
  checkCartStatus()
}

const decItemQty = (itemExist) => {
  cart = cart.map((item) => {
    return item.id === itemExist.id
      ? { ...item, quantity: Number(item.quantity) - 1 }
      : item
  })
}

export const setItemQty = (e) => {
  const itemId = e.target.dataset.id
  if (e.target.classList.contains('down')) itemBtnMinus(itemId)
  if (e.target.classList.contains('up')) itemBtnPlus(itemId)
  if (e.target.classList.contains('trash')) deleteCartAlbum(itemId)
  checkCartStatus()
}

// Compra y borrado de carrito
export const resetCart = () => {
  cart = []
  checkCartStatus()
}

const confirmCartAction = (confirmMsg, feedbackMsg, type) => {
  if (!cart.length) return
  if (window.confirm(confirmMsg)) {
    resetCart()
    showFeedback(type, feedbackMsg)
  }
}

const buyCart = () => {
  confirmCartAction('¿Desea comprar todo?', 'Carrito comprado!', 'check')
}

const emptyCart = () => {
  confirmCartAction('¿Desea borrar todo?', 'Carrito eliminado!', 'info')
}

export const cartBtnAction = (e) => {
  if (e.target.classList.contains('btn-buy')) buyCart()
  if (e.target.classList.contains('btn-delete')) emptyCart()
}

export const initCart = () => {
  checkCartStatus()
  cartItemsContainer.addEventListener('click', setItemQty)
  cartBtnContainer.addEventListener('click', cartBtnAction)
}
