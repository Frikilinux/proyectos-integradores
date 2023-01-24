const albumsContainer = document.querySelector('.container--albums');
const genreConatainer = document.querySelector('.genres');
const btnGenreList = document.querySelectorAll('.genre');
const btnLoad = document.querySelector('.btn-load');

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
        data-bid="${price}"
        data-img="${albumImg}">
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
  e.target.classList.contains('genre') ? changeFilterState(e) : false;

  !e.target.dataset.genre
    ? ((albumsContainer.innerHTML = ''), renderAlbumsSection())
    : (renderAlbumsSection(0, e.target.dataset.genre),
      (productsController.nextAbumsIndex = 1));
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

const init = () => {
  renderAlbumsSection();
  genreConatainer.addEventListener('click', applyFilter);
  btnLoad.addEventListener('click', showMoreAlbums);
};

init();
