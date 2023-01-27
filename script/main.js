const albumsContainer = document.querySelector('.container--albums');
const genreContainer = document.querySelector('.genres');
const btnLoad = document.querySelector('.btn-load');
const cartBtn = document.querySelector('.cart-label');
const cartBubble = document.querySelector('.cart-bubble');
const cartMenu = document.querySelector('.cart');
const burgerBtn = document.querySelector('.navbar__label');
const linksMenu = document.querySelector('.menu');
const cartItemsContainer = document.querySelector('.cart-container');
const totalPrice = document.querySelector('.total-price');
const cartItemsQty = document.querySelector('.cart-bubble');
const cartBtnContainer = document.querySelector('.cart-btns');
const cartBtns = cartBtnContainer.querySelectorAll('.btn');
// const cartBtnBuy = document.querySelector('.btn-buy');
// const cartBtnDelete = document.querySelector('.btn-delete');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem('cart', JSON.stringify(cartList));
};

const renderAlbum = (album) => {
  const {
    id,
    name,
    artist,
    totalTracks,
    price,
    albumImg,
    releaseDate,
    genre,
    label,
  } = album;
  return `<div class="albums__release">
  <img src="${albumImg}" class="release-img" alt="Album image">
  <div class="format">
    <div class="img-select trans-5">
      <img src="./assets/img/dsd_logo.svg" alt="" class="format-img">
    </div>
    <div class="img-select trans-5">
      <img src="./assets/img/flac_logo.svg" alt="" class="format-img">
    </div>
    <div class="img-select trans-5">
      <img src="./assets/img/mqa_logo.svg" alt="" class="format-img">
    </div>
  </div>
  <div class="release__info">
    <div class="release__data">
      <p class="album-name">${name}</p>
      <p class="artist">${artist}</p>
      <p class="tracks">${totalTracks} pistas</p>
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
        data-tracks="${totalTracks}">
          Comprar
      </button>
    </div>
  </div>
</div>`;
};

// Renderizado de albumes
const renderDividedAlbums = (i = 0) => {
  albumsContainer.innerHTML += productsController.dividedAlbums[i]
    .map(renderAlbum)
    .join('');
};

const renderFilteredAlbum = (genre) => {
  const albumList = albumsData.filter((album) => {
    return album.genre === genre;
  });
  albumsContainer.innerHTML = albumList.map(renderAlbum).join('');
};

const renderAlbumsSection = (index = 0, genre = undefined) => {
  !genre ? renderDividedAlbums(index) : renderFilteredAlbum(genre);
};

// Añade clase hiddenal botón "Ver más"
const toggleBtnLoad = (genre) => {
  !genre
    ? btnLoad.classList.remove('hidden')
    : btnLoad.classList.add('hidden');
};

// Crea categorías géneros

const renderCatGenre = (genre) => {
  return `<button class="genre" data-genre="${genre}">${genre}</button>`;
};

const renderGenreBtns = (genreList) => {
  genreContainer.innerHTML += genreList.map(renderCatGenre).join('');
};

// Añade la clase active al boton de genero
const changeBtnState = (selectedGenre) => {
  const btnGenreList = document.querySelectorAll('.genre');
  const genresList = [...btnGenreList];
  genresList.forEach((genreBtn) => {
    console.log(genreBtn.dataset.genre !== selectedGenre);
    genreBtn.dataset.genre !== selectedGenre
      ? genreBtn.classList.remove('active')
      : genreBtn.classList.add('active');
  });
};

const changeFilterState = (e) => {
  toggleBtnLoad(e.target.dataset.genre);
  changeBtnState(e.target.dataset.genre);
};

const applyFilter = (e) => {
  if (!e.target.classList.contains('genre')) return;
  !e.target.dataset.genre
    ? ((albumsContainer.innerHTML = ''), renderAlbumsSection())
    : (renderAlbumsSection(0, e.target.dataset.genre),
      (productsController.nextAbumsIndex = 1));
  changeFilterState(e);
};

const albumsLimit = () => {
  return productsController.albumsLimit === productsController.nextAlbumsIndex;
};

// Ver más
const showMoreAlbums = () => {
  renderAlbumsSection(productsController.nextAlbumsIndex);
  productsController.nextAlbumsIndex++;
  albumsLimit() ? btnLoad.classList.add('hidden') : '';
};

const toggleMenus = (e) => {
  console.log(e);
  if (
    e.target.parentNode.classList.contains('cart-label') ||
    e.target.classList.contains('cart-label')
  ) {
    cartMenu.classList.toggle('toggle_menu');
    linksMenu.classList.remove('toggle_menu');
  } else if (e.target.classList.contains('fa-bars')) {
    linksMenu.classList.toggle('toggle_menu');
    cartMenu.classList.remove('toggle_menu');
  }
};



// Carrito

const renderItem = (cartItem) => {
  const { id, artist, name, price, img, tracks, quantity } = cartItem;
  return `<div class="cart-item">
  <div class="item-info">
    <img src="${img}" alt="Imagen del album" />
    <div class="album-data">
      <p class="item-album">${name}</p>
      <p class="item-artist">${artist}</p>
      <p class="item-tracks">${tracks} Tracks</p>
    </div> 
  </div>
    <div class="item-handler">
      <span class="item-price">$ ${price}</span>
      <div class="quantity-container">
        <span>Qty</span>
        <button class="quantity-handler down btn" data-id="${id}"> - </button>
        <span class="item-quantity"> ${quantity} </span>
        <button class="quantity-handler up btn" data-id="${id}"> + </button>
        <button class="delete-item trash btn" data-id="${id}"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
</div>`;
};

const renderCartItems = () => {
  !cart.length
    ? (cartItemsContainer.innerHTML =
        '<p class="empty-cart-msg">No hay albumes para comprar<p>')
    : (cartItemsContainer.innerHTML = cart.map(renderItem).join(''));
};

const totalItemsPrice = () =>
  cart.reduce((acc, e) => acc + Number(e.price) * e.quantity, 0);

const renderTotalPrice = () => {
  totalPrice.innerHTML = `$ ${totalItemsPrice().toFixed(2)}`;
};

const renderCartBubble = () => {
  // cartItemsQty.textContent = cart.length;
  cartItemsQty.textContent = cart.reduce((acc, e) => acc + e.quantity, 0);
};

// reccibe un NodeList como parámetro
const disableBtns = (btns) => {
  btns = [...btns];
  !cart.length
    ? (btns.forEach((e) => e.classList.add('btn-disabled')),
      cartBubble.classList.remove('show-bubble'),
      cartBtn.classList.remove('show-bubble'))
    : (btns.forEach((e) => e.classList.remove('btn-disabled')),
      cartBubble.classList.add('show-bubble'),
      cartBtn.classList.add('show-bubble'));
};

// Chequeo del carrito para cada acción
const cartStateCheck = () => {
  saveLocalStorage(cart);
  renderCartItems();
  renderTotalPrice();
  disableBtns(cartBtns);
  renderCartBubble();
};

const addAlbum = (e) => {
  console.log(e.target.dataset);
  if (!e.target.classList.contains('btn--buy')) {
    return;
  }

  const { id, artist, name, price, img, tracks } = e.target.dataset;

  const album = albumData(id, artist, name, price, img, tracks);

  albumAdded(album) ? sumAddedAlbums(album) : createAlbumItem(album);

  cartStateCheck();
};

// Creo un objeto con album añadido
const albumData = (id, artist, name, price, img, tracks) => {
  return { id, artist, name, price, img, tracks };
};

// Chequea si ya está el album añadido
const albumAdded = (item) => cart.find((album) => album.id === item.id);

// Suma si ya existe, sino lo agrega
const sumAddedAlbums = (item) => {
  cart = cart.map((cartItem) => {
    return cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem;
  });
};

// Mostrar feedback al usuario
const showFeedback = (msg) => {
  feedbackModal.textContent = msg;
  feedbackModal.classList.add('active-feedback');
  setTimeout(() => feedbackModal.classList.remove('active-feedback'), 2000);
};

// Crear cart

const createAlbumItem = (item) => (cart = [...cart, { ...item, quantity: 1 }]);

// Botones - y +

const itemBtnPlus = (id) => {
  const itemExist = cart.find((item) => item.id === id);
  sumAddedAlbums(itemExist);
};

const itemBtnMinus = (id) => {
  const itemExist = cart.find((item) => item.id === id);
  itemExist.quantity === 1
    ? window.confirm('¿Elimino el album?')
      ? deleteCartItem(itemExist)
      : false
    : decItemQty(itemExist);
};

// Borra un album directamente del la lista
const deleteCartAlbum = (id) => {
  const itemExist = cart.find((item) => item.id === id);
  if (itemExist) {
    if (window.confirm('¿Elimino el album?')) deleteCartItem(itemExist);
  }
};

const deleteCartItem = (itemExist) => {
  cart = cart.filter((item) => itemExist.id !== item.id);
  cartStateCheck();
};

const decItemQty = (itemExist) => {
  cart = cart.map((item) => {
    return item.id === itemExist.id
      ? { ...item, quantity: Number(item.quantity) - 1 }
      : item;
  });
};

const setItemQty = (e) => {
  if (e.target.classList.contains('down')) itemBtnMinus(e.target.dataset.id);
  if (e.target.classList.contains('up')) itemBtnPlus(e.target.dataset.id);
  if (
    e.target.classList.contains('fa-trash-can') ||
    e.target.classList.contains('trash')
  )
    deleteCartAlbum(e.target.dataset.id);

  cartStateCheck();
};

// Compra y borrado de carrito

const resetCart = () => {
  cart = [];
  cartStateCheck();
};

const confirmCartAction = (confirmMsg, feedbackMsg) => {
  cart.length
    ? window.confirm(confirmMsg)
      ? (resetCart(), alert(feedbackMsg))
      : false
    : false;
};

const buyCart = () => {
  confirmCartAction('¿Desea comprar todo?', 'Todo comprado');
};

const emptyCart = () => {
  confirmCartAction('¿Desea borrar todo?', 'Todo comprado');
};

const cartBtnAction = (e) => {
  console.log(e);
  e.target.classList.contains('btn-buy')
    ? buyCart()
    : e.target.classList.contains('btn-delete')
    ? emptyCart()
    : false;
};

// Inicialización como Rodri manda

const init = () => {
  renderAlbumsSection();
  btnLoad.addEventListener('click', showMoreAlbums);
  cartBtn.addEventListener('click', toggleMenus);
  burgerBtn.addEventListener('click', toggleMenus);
  genreContainer.addEventListener('click', applyFilter);
  albumsContainer.addEventListener('click', addAlbum);
  cartItemsContainer.addEventListener('click', setItemQty);
  cartBtnContainer.addEventListener('click', cartBtnAction);
  document.addEventListener('DOMContentLoaded', () => {
    cartStateCheck();
    renderGenreBtns(genreList);
  });
  // document.addEventListener('DOMContentLoaded', renderTotalPrice);
  // document.addEventListener('DOMContentLoaded', renderCartBubble);
  // disableBtns(cartBtns);
};

init();
