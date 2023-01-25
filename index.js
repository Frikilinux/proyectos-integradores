const albumsContainer = document.querySelector('.container--albums');
const genreConatainer = document.querySelector('.genres');
const btnGenreList = document.querySelectorAll('.genre');
const btnLoad = document.querySelector('.btn-load');
const cartBtn = document.querySelector('.cart__label');
const cartMenu = document.querySelector('.cart');
const burgerBtn = document.querySelector('.navbar__label');
const linksMenu = document.querySelector('.menu');
const cartItemsContainer = document.querySelector('.cart-container');
const totalPrice = document.querySelector('.total-price');
const cartItemsQty = document.querySelector('.cart-bubble');
const cartBtns = document.querySelectorAll('.cart-btns > .btn');
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
const toggleBtnLoad = (category) => {
  !category
    ? btnLoad.classList.remove('hidden')
    : btnLoad.classList.add('hidden');
};

// Añade la clase active al boton de genero
const changeBtnState = (selectedGenre) => {
  const genresList = [...btnGenreList];
  genresList.forEach((genreBtn) => {
    genreBtn.dataset.genre !== selectedGenre
      ? genreBtn.classList.remove('active')
      : genreBtn.classList.add('active');
  });
};

const changeFilterState = (e) => {
  const selectedGenre = e.target.dataset.genre;
  toggleBtnLoad(selectedGenre);
  changeBtnState(selectedGenre);
};

// Aplicar filtro de géneros
const applyFilter = (e) => {
  e.target.classList.contains('genre')
    ? !e.target.dataset.genre
      ? ((albumsContainer.innerHTML = ''), renderAlbumsSection())
      : (changeFilterState(e),
        renderAlbumsSection(0, e.target.dataset.genre),
        (productsController.nextAbumsIndex = 1))
    : false;
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
    e.target.classList.contains('cart-icon') ||
    e.target.parentNode.classList.contains('cart-icon')
  ) {
    cartMenu.classList.toggle('toggle_menu');
    linksMenu.classList.remove('toggle_menu');
    // console.log('cartttttt');
  } else if (e.target.classList.contains('fa-bars')) {
    linksMenu.classList.toggle('toggle_menu');
    cartMenu.classList.remove('toggle_menu');
    // console.log('menuuuuuu');
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
        <span class="quantity-handler down" data-id="${id}"> - </span>
        <span class="item-quantity"> ${quantity} </span>
        <span class="quantity-handler up data-id="${id}""> + </span>
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
    ? btns.forEach((e) => e.classList.add('btn-disabled'))
    : btns.forEach((e) => e.classList.remove('btn-disabled'));
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

  albumAdded(album)
    ? sumAddedAlbums(album)
    : createAlbumItem(album)

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

const createAlbumItem = (item) =>
  (cart = [...cart, { ...item, quantity: 1 }]);

// Inicialización como Rodri manda

const init = () => {
  renderAlbumsSection();
  genreConatainer.addEventListener('click', applyFilter);
  btnLoad.addEventListener('click', showMoreAlbums);
  cartBtn.addEventListener('click', toggleMenus);
  burgerBtn.addEventListener('click', toggleMenus);
  document.addEventListener('DOMContentLoaded', renderCartItems);
  document.addEventListener('DOMContentLoaded', renderTotalPrice);
  document.addEventListener('DOMContentLoaded', renderCartBubble);
  disableBtns(cartBtns);
  albumsContainer.addEventListener('click', addAlbum)
};

init();
