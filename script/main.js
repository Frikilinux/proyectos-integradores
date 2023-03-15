const albumsContainer = document.querySelector('.container--albums');
const genreContainer = document.querySelector('.genres');
const cartItemsContainer = document.querySelector('.cart-container');
const cartBtnContainer = document.querySelector('.cart-btns');
const cartBtns = cartBtnContainer.querySelectorAll('.btn');
const userNameContainer = document.querySelector('.user-name');
const btnLoad = document.querySelector('.btn-load');
const cartBtn = document.querySelector('.cart-label');
const cartMenu = document.querySelector('.cart');
const burgerBtn = document.querySelector('.fa-bars');
const linksMenu = document.querySelector('.menu');
const totalPrice = document.querySelector('.total-price');
const cartItemsQty = document.querySelector('.cart-qty');
const userBtns = document.querySelector('.user');
const userLoginName = document.querySelector('.login-user');
const logoutBtn = document.querySelector('.logout');
const btnUp = document.querySelector('.btn--up');
const trackPreview = document.querySelector('.track-preview');
const trackPreviewContainer = document.querySelector(
  '.track-preview-container'
);
const previewAlbumName = document.querySelector('.preview-album');
const previewArtistName = document.querySelector('.preview-artist');
const previewbtnBuy = document.querySelector('.preview-buy');
const overlay = document.querySelector('.overlay');
const btnCloseMenu = document.querySelectorAll('.close-menu');
const menues = document.querySelectorAll("[data-type='menu']");
const btnMenues = document.querySelectorAll("[data-type='btnMenu']");

const renderAlbum = (album) => {
  const { id, name, artist, totalTracks, price, albumImg, releaseDate, label } =
    album;
  return `
  <div id="${id}" class="albums__release">
    <div class="back-release">
      <div class="format">
        <button data-id="${id}" data-name="previewMenu" data-type="btnMenu" class="btn-show-preview trans-5">Preview<i class="far fa-circle-play fa-beat" data-name="previewMenu" data-id="${id}"></i></button>
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
`;
};

// Divide albumes en arrays
const divider = (size, albumsList) => {
  let dividedAlbums = [];
  for (let i = 0; i < albumsList.length; i += size) {
    dividedAlbums.push(albumsList.slice(i, i + size));
  }
  return dividedAlbums;
};

// Divide todos los albumes
const divideAllAlbums = (size) => divider(size, shuffleAlbums(albumsData));

// Divide los albunes según la categoría
const divideByGenre = (size, genre) => {
  const albumsByGenre = shuffleAlbums(albumsData).filter((album) => {
    return album.genre === genre;
  });
  return divider(size, albumsByGenre);
};

// Renderizado de albumes
const renderDividedAlbums = (i = 0) => {
  albumsContainer.innerHTML += albumsController.dividedAlbums[i]
    .map(renderAlbum)
    .join('');
};

// Genera el array de albumes y renderiza (size según viewport, en un futuro)
const generateAlbumSection = (index = 0, genre = undefined, size = 6) => {
  !genre
    ? (albumsController.dividedAlbums = divideAllAlbums(size))
    : (albumsController.dividedAlbums = divideByGenre(size, genre));
  albumsController.albumsLimit = albumsController.dividedAlbums.length;
  renderDividedAlbums(index);
};

// Añade clase hidden al botón "Ver más"
const toggleBtnLoad = () => {
  albumsController.albumsLimit !== albumsController.nextAlbumsIndex
    ? btnLoad.classList.remove('hidden2')
    : btnLoad.classList.add('hidden2');
};

// Crea categorías con los géneros
const renderCatGenre = (genre) => {
  return `
    <button class="genre trans-5" data-genre="${genre}">
      ${genre}
    </button>
  `;
};

// Renderiza los botones de géneros
const renderGenreBtns = (genreList) => {
  genreContainer.innerHTML += genreList.map(renderCatGenre).join('');
};

// Añade la clase active al boton de genero
const changeBtnState = (selectedGenre) => {
  const btnGenreList = document.querySelectorAll('.genre');
  const genresList = [...btnGenreList];
  genresList.forEach((genreBtn) => {
    genreBtn.dataset.genre !== selectedGenre
      ? genreBtn.classList.remove('active')
      : genreBtn.classList.add('active');
  });
};

// Cambia el estado de los botones de género
const changeFilterState = (e) => {
  changeBtnState(e.target.dataset.genre);
  toggleBtnLoad();
};

// Botones de género
const applyFilter = (e) => {
  if (e.target.classList.contains('active')) return;
  if (!e.target.classList.contains('genre')) return;
  albumsContainer.innerHTML = '';
  albumsController.nextAlbumsIndex = 1;
  !e.target.dataset.genre
    ? generateAlbumSection()
    : generateAlbumSection(0, e.target.dataset.genre);
  changeFilterState(e);
  window.location.replace('/#albums');
};

// const albumsLimit = () => {
//   return albumsController.albumsLimit === albumsController.nextAlbumsIndex;
// };

// Ver más
const showMoreAlbums = () => {
  renderDividedAlbums(albumsController.nextAlbumsIndex);
  albumsController.nextAlbumsIndex++;
  toggleBtnLoad()
  // if (albumsLimit()) btnLoad.classList.add('hidden2');
};

const showBtnUp = () => {
  scrollY < 500
    ? (btnUp.style.transform = 'translateY(150%)')
    : (btnUp.style.transform = 'translateY(0%)');
};

// Carrito
const renderItem = (cartItem) => {
  const { id, artist, name, price, img, tracks, quantity, date, label } =
    cartItem;
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
  `;
};

const renderCartItems = () => {
  !cart.length
    ? (cartItemsContainer.innerHTML = `
        <p class="empty-cart-msg">Nada para comprar<p>
        <i class="far fa-face-sad-tear"></i>
      `)
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
  !cart.length || isObjectEmpty(loggedUser)
    ? (btns.forEach((e) => e.classList.add('btn-disabled')),
      cartBtn.classList.remove('show-qty'))
    : (btns.forEach((e) => e.classList.remove('btn-disabled')),
      cartBtn.classList.add('show-qty'));
};

// Chequeo del carrito para cada acción
const checkCartStatus = () => {
  if (!isObjectEmpty(loggedUser)) {
    updateCartOfLoggedUser(loggedUser);
    saveLoginStorage(loggedUser);
  }
  renderCartItems();
  renderTotalPrice();
  disableBtns(cartBtns);
  renderCartQty();
};

// Añade el album
const addAlbum = (e) => {
  if (!e.target.classList.contains('btn--buy')) {
    return;
  }
  if (isObjectEmpty(loggedUser)) {
    notLoggedIn();
    return;
  }
  const { id, artist, name, price, img, tracks, date, label } =
    e.target.dataset;
  const album = { id, artist, name, price, img, tracks, date, label };
  albumAdded(album)
    ? sumAddedAlbums(album)
    : (createAlbumItem(album), showFeedback('check', 'Nuevo album añadido'));
  checkCartStatus();
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
    confirmDelete(itemExist);
  } else {
    decItemQty(itemExist);
  }
};

// Borra un album directamente de la lista
const deleteCartAlbum = (id) => {
  const itemExist = cart.find((item) => item.id === id);
  if (itemExist) confirmDelete(itemExist);
};

// Confirma si se elimina un album del carrito
const confirmDelete = (item) => {
  if (window.confirm('¿Elimino el album?')) {
    deleteCartItem(item), showFeedback('info', 'Album Eliminado');
  }
};

// Actualiza el array del carrito
const deleteCartItem = (itemExist) => {
  cart = cart.filter((item) => itemExist.id !== item.id);
  checkCartStatus();
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
  checkCartStatus();
};

// Compra y borrado de carrito
const resetCart = () => {
  cart = [];
  checkCartStatus();
};

const confirmCartAction = (confirmMsg, feedbackMsg, type) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) resetCart(), showFeedback(type, feedbackMsg);
};

const buyCart = () => {
  confirmCartAction('¿Desea comprar todo?', 'Carrito comprado!', 'check');
};

const emptyCart = () => {
  confirmCartAction('¿Desea borrar todo?', 'Carrito eliminado!', 'info');
};

const cartBtnAction = (e) => {
  if (e.target.classList.contains('btn-buy')) buyCart();
  if (e.target.classList.contains('btn-delete')) emptyCart();
};

// Login stuff
const notLoggedIn = () => {
  showFeedback(
    'info',
    'Por favor <a href="./pages/login.html" class="modal-login menu__link trans-5">inicia sesión</a> o <a href="./pages/register.html" class="modal-login menu__link trans-5">registrate</a>',
    4000
  );
};

const checkIfLoggedIn = () => {
  if (isObjectEmpty(loggedUser)) {
    userBtns.classList.remove('hidden');
    userLoginName.classList.add('hidden');
  } else {
    userNameContainer.textContent = `Hola, ${loggedUser.name}`;
    userBtns.classList.add('hidden');
    userLoginName.classList.remove('hidden');
  }
};

const logout = () => {
  cartMenu.classList.remove('show-menu');
  updateUserDb(loggedUser);
  saveUserDbStorage(userDb);
  loggedUser = {};
  cart = [];
  saveLoginStorage(loggedUser);
  showFeedback('info', 'Sesion cerrada');
  checkIfLoggedIn();
  checkCartStatus();
};

// Tracks preview

// Constructor
class TrackPreview {
  constructor(name, url, img) {
    this.createTrackPreview(name, url, img);
  }
  createTrackPreview(name, url, trackNumber) {
    const div = document.createElement('div');
    div.classList.add('track', 'trans-5');

    const trackName = document.createElement('p');
    trackName.classList.add('track-preview-name');
    trackName.textContent = `${trackNumber
      .toString()
      .padStart(2, 0)} | ${name}`;

    const btnPlayPause = document.createElement('i');
    btnPlayPause.classList.add('play-pause', 'fa-regular', 'fa-circle-play');

    const audioTrack = document.createElement('audio');
    audioTrack.classList.add('song');
    audioTrack.src = url;

    trackPreviewContainer.append(div);
    div.append(btnPlayPause, trackName, audioTrack);

    const togglePlay = () => {
      const allSongs = [...document.querySelectorAll('.song')];
      if (audioTrack.paused) {
        allSongs.forEach((e) => (e.pause(), (e.currentTime = 0)));
        audioTrack.play();
      } else {
        audioTrack.pause();
      }
    };

    // btnPlayPause.addEventListener('click', togglePlay);
    div.addEventListener('click', togglePlay);

    audioTrack.onplaying = () => {
      div.classList.add('playing');
      btnPlayPause.classList.add('fa-circle-pause');
      btnPlayPause.classList.remove('fa-circle-play');
    };
    audioTrack.onpause = () => {
      div.classList.remove('playing');
      btnPlayPause.classList.add('fa-circle-play');
      btnPlayPause.classList.remove('fa-circle-pause');
    };
  }
}

// Busca el álbum y retorna su objeto
const getAlbumData = (id) => albumsData.find((e) => e.id === id);

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
  } = album;
  trackPreview.style.background = `url(${albumImg}) no-repeat center/cover`;
  previewAlbumName.textContent = name;
  previewArtistName.textContent = artist;
  trackPreviewContainer.textContent = '';
  tracks.forEach((track) => {
    new TrackPreview(track.name, track.url, track.number);
  });
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
  `;
};

// Genera la lista de canciones y abre el menu lateral
const showPreview = (e) => {
  if (e.target.dataset.name !== 'previewMenu') {
    return;
  }
  let id = e.target.dataset.id;
  createPreviewList(getAlbumData(id));
  toggleMenus(e.target.dataset.name);
};

// Oculta todos los menus
const hideAllMenus = (dataName) => {
  const allSongs = [...document.querySelectorAll('.song')];
  const menus = [...menues];
  menus.forEach((e) => {
    if (e.dataset.menu !== dataName) e.classList.remove('show-menu');
  });
  allSongs.forEach((e) => e.pause());
  overlay.classList.remove('visible2');
  document.body.style.overflowY = 'visible';
};

// Muestra u oculta los menus
const toggleMenus = (name) => {
  let menu = document.querySelector(`[data-menu="${name}"]`);
  hideAllMenus(name);
  menu.classList.toggle('show-menu');
  const menus = [...menues];
  menus.some((e) => e.classList.contains('show-menu'))
    ? (overlay.classList.add('visible2'),
      (document.body.style.overflowY = 'hidden'))
    : (overlay.classList.remove('visible2'),
      (document.body.style.overflowY = 'visible'));
};

// Añade eventos a los botones de menus
const btnsMenuEvent = () => {
  const btnsMenu = [...btnMenues];
  btnsMenu.forEach((e) => {
    e.addEventListener('click', (e) => {
      if (e.target.dataset.name === 'cartMenu' && isObjectEmpty(loggedUser)) {
        notLoggedIn();
        return;
      }
      toggleMenus(e.target.dataset.name);
    });
  });
};

// Cierra los menus
const closeMenus = (btnCloseMenu) => {
  buttons = [...btnCloseMenu];
  buttons.forEach((e) => e.addEventListener('click', hideAllMenus));
};

// Inicialización como Rodri manda
const init = () => {
  renderGenreBtns(albumsController.genreList);
  generateAlbumSection();
  document.addEventListener('DOMContentLoaded', () => {
    checkIfLoggedIn();
    checkCartStatus();
    btnsMenuEvent();
    closeMenus(btnCloseMenu);
    btnLoad.addEventListener('click', showMoreAlbums);
    window.addEventListener('scroll', () => {
      hideAllMenus();
      showBtnUp();
    });
    overlay.addEventListener('click', hideAllMenus);
    genreContainer.addEventListener('click', applyFilter);
    albumsContainer.addEventListener('click', (e) => {
      addAlbum(e), showPreview(e);
    });
    previewbtnBuy.addEventListener('click', addAlbum);
    cartItemsContainer.addEventListener('click', setItemQty);
    cartBtnContainer.addEventListener('click', cartBtnAction);
    logoutBtn.addEventListener('click', logout);
  });
};

init();
