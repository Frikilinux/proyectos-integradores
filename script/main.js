const albumsContainer = document.querySelector('.container--albums');
const genreContainer = document.querySelector('.genres');
const btnLoad = document.querySelector('.btn-load');
const cartBtn = document.querySelector('.cart-label');
// const cartBubble = document.querySelector('.cart-bubble');
const cartMenu = document.querySelector('.cart');
const burgerBtn = document.querySelector('.fa-bars');
const linksMenu = document.querySelector('.menu');
const cartItemsContainer = document.querySelector('.cart-container');
const totalPrice = document.querySelector('.total-price');
const cartItemsQty = document.querySelector('.cart-qty');
const cartBtnContainer = document.querySelector('.cart-btns');
const cartBtns = cartBtnContainer.querySelectorAll('.btn');
const feedbackModal = document.querySelector('.feedback-modal');
const userBtns = document.querySelector('.user');
const userLoginName = document.querySelector('.login-user');
const logoutBtn = document.querySelector('.logout');
const userNameContainer = document.querySelector('.user-name');
const btnUp = document.querySelector('.btn--up');
// const cartBtnBuy = document.querySelector('.btn-buy');
// const cartBtnDelete = document.querySelector('.btn-delete');

// Trayendo cart guardado
let getUserCart = () => {
  return !userDb.length || !loggedUser.length
    ? []
    : userDb.filter((user) => user.id === loggedUser[0].id)[0].cart;
};

// const isLogged = (loggedUser) => {
//   return JSON.stringify(loggedUser) !== '{}';
// };

// let getUserCart2 = () => {
//   return !userDb.length || !isLogged(loggedUser)
//     ? []
//     : userDb.filter((user) => user.id === loggedUser.id)[0].cart;
// };

// let cart = JSON.parse(localStorage.getItem('cart')) || [];
let userDb = JSON.parse(localStorage.getItem('userDb')) || [];
let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || [];
let loggedUser2 = JSON.parse(localStorage.getItem('loggedUser')) || {};
let cart = getUserCart();

// const saveLocalStorage = (cartList) => {
//   localStorage.setItem('cart', JSON.stringify(cartList));
// };

const saveUserDb = (userDb) => {
  localStorage.setItem('userDb', JSON.stringify(userDb));
};

const saveLoginStorage = (loggedUser) => {
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
};

// const updateCartOfLoggedUser = (loggedUser) => {
//   userDb = userDb.map((user) => {
//     return user.id === loggedUser[0].id ? { ...user, cart: [...cart] } : user;
//   });
// };

const updateUserDb = (loggedUser) => {
  userDb = userDb.map((user) => {
    return user.id === loggedUser[0].id ? loggedUser[0] : user;
  });
};

const updateCartOfLoggedUser = (user) => {
  loggedUser = user.map((user) => ({ ...user, cart: [...cart] }));
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

// Añade clase hidden al botón "Ver más"
const toggleBtnLoad = (genre) => {
  !genre ? btnLoad.classList.remove('hidden') : btnLoad.classList.add('hidden');
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
      (productsController.nextAlbumsIndex = 1));
  changeFilterState(e);
};

const albumsLimit = () => {
  return productsController.albumsLimit === productsController.nextAlbumsIndex;
};

// Ver más
const showMoreAlbums = () => {
  renderAlbumsSection(productsController.nextAlbumsIndex);
  productsController.nextAlbumsIndex++;
  if (albumsLimit()) btnLoad.classList.add('hidden');
};

const toggleMenus = (e) => {
  console.log(e);
  if (e.type === 'scroll') {
    if (scrollY < 500) {
      btnUp.style.transform = 'translateY(150%)';
    } else {
      btnUp.style.transform = 'translateY(0%)';
    }
    linksMenu.classList.remove('show-menu');
    cartMenu.classList.remove('show-menu');
  } else if (e.target.dataset.name === 'cart-btn' && loggedUser.length) {
    cartMenu.classList.toggle('show-menu');
    linksMenu.classList.remove('show-menu');
  } else if (e.target.classList.contains('fa-bars')) {
    linksMenu.classList.toggle('show-menu');
    cartMenu.classList.remove('show-menu');
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
        <i class="trash delete-item fa-solid fa-trash-can" data-id="${id}"></i>
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

const renderCartQty = () => {
  // cartItemsQty.textContent = cart.length;
  cartItemsQty.textContent = cart.reduce((acc, e) => acc + e.quantity, 0);
};

// reccibe un NodeList como parámetro
const disableBtns = (btns) => {
  btns = [...btns];

  !cart.length || !loggedUser.length
    ? (btns.forEach((e) => e.classList.add('btn-disabled')),
      // cartBubble.classList.remove('show-qty'),
      cartBtn.classList.remove('show-qty'))
    : (btns.forEach((e) => e.classList.remove('btn-disabled')),
      // cartBubble.classList.add('show-qty'),
      cartBtn.classList.add('show-qty'));
};

// Chequeo del carrito para cada acción
const cartStateCheck = () => {
  // saveLocalStorage(cart);
  loggedUser.length && updateCartOfLoggedUser(loggedUser);
  renderCartItems();
  renderTotalPrice();
  disableBtns(cartBtns);
  renderCartQty();
};

const addAlbum = (e) => {
  if (!e.target.classList.contains('btn--buy')) {
    return;
  }

  if (!loggedUser.length) {
    notLoggedIn();
    return;
  }

  const { id, artist, name, price, img, tracks } = e.target.dataset;

  const album = albumData(id, artist, name, price, img, tracks);

  albumAdded(album)
    ? sumAddedAlbums(album)
    : (createAlbumItem(album), showFeedback('info', 'Nuevo album añadido'));

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

// Mostrar según la importancia
const feedbackRelevancy = (type, msg) => {
  if (type === 'alert')
    return `<i class="fa-solid fa-triangle-exclamation fback-icon"></i> ${msg}`;
  if (type === 'info')
    return `<i class="fa-solid fa-circle-info fback-icon"></i></i> ${msg}`;
};

// Mostrar feedback al usuario
const showFeedback = (type, msg, time = 1500) => {
  feedbackModal.innerHTML = feedbackRelevancy(type, msg);
  feedbackModal.classList.add(`show-feedback-${type}`);
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    time
  );
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
  if (itemExist.quantity === 1) {
    if (window.confirm('¿Elimino el album?')) {
      deleteCartItem(itemExist), showFeedback('alert', 'Album Eliminado');
    }
  } else {
    decItemQty(itemExist);
  }
};

// Borra un album directamente del la lista
const deleteCartAlbum = (id) => {
  const itemExist = cart.find((item) => item.id === id);
  if (itemExist) {
    if (window.confirm('¿Elimino el album?')) {
      deleteCartItem(itemExist), showFeedback('alert', 'Album Eliminado');
    }
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
  if (e.target.classList.contains('trash'))
    deleteCartAlbum(e.target.dataset.id);
  cartStateCheck();
};

// Compra y borrado de carrito

const resetCart = () => {
  cart = [];
  cartStateCheck();
};

const confirmCartAction = (confirmMsg, feedbackMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg))
    resetCart(), showFeedback('alert', feedbackMsg);
};

const buyCart = () => {
  confirmCartAction('¿Desea comprar todo?', 'Carrito comprado!');
};

const emptyCart = () => {
  confirmCartAction('¿Desea borrar todo?', 'Carrito eliminado!');
};

const cartBtnAction = (e) => {
  if (e.target.classList.contains('btn-buy')) buyCart();
  if (e.target.classList.contains('btn-delete')) emptyCart();
};

// Login stuff

const notLoggedIn = () => {
  showFeedback(
    'alert',
    'Por favor <a href="./pages/login.html" class="menu__link trans-5">inicia sesión</a> o <a href="./pages/register.html" class="menu__link trans-5">registrate</a>',
    4000
  );
};

const checkIfLogin = () => {
  if (!loggedUser.length) {
    console.log('NO HAY');
    userBtns.classList.remove('hidden');
    userLoginName.classList.add('hidden');
  } else {
    console.log('HAY');
    userNameContainer.textContent = `Hola, ${loggedUser[0].name}`;
    userBtns.classList.add('hidden');
    userLoginName.classList.remove('hidden');
  }
};

const logout = () => {
  cartMenu.classList.remove('show-menu');
  updateUserDb(loggedUser);
  saveUserDb(userDb);
  loggedUser = [];
  cart = [];
  // localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  showFeedback('alert', 'Sesion cerrada');
  checkIfLogin();
  cartStateCheck();
};

// Inicialización como Rodri manda

const init = () => {
  renderAlbumsSection();
  btnLoad.addEventListener('click', showMoreAlbums);
  cartBtn.addEventListener('click', toggleMenus);
  burgerBtn.addEventListener('click', toggleMenus);
  window.addEventListener('scroll', toggleMenus);
  genreContainer.addEventListener('click', applyFilter);
  albumsContainer.addEventListener('click', addAlbum);
  cartItemsContainer.addEventListener('click', setItemQty);
  cartBtnContainer.addEventListener('click', cartBtnAction);
  document.addEventListener('DOMContentLoaded', () => {
    cartStateCheck();
    renderGenreBtns(genreList);
    checkIfLogin();
  });
  logoutBtn.addEventListener('click', logout);
  // document.addEventListener('DOMContentLoaded', renderTotalPrice);
  // document.addEventListener('DOMContentLoaded', renderCartQty);
  // disableBtns(cartBtns);
};

init();
