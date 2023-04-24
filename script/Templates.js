export const albumCardTemplate = ({
  id,
  name,
  artist,
  totalTracks,
  price,
  albumImg,
  releaseDate,
  label,
}) => {
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

export const cartItemTemplate = ({
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
