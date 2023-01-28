const albumsData = [
  {
    id: 1,
    name: 'Punisher',
    artist: 'Phoebe Bridgers',
    totalTracks: 11,
    price: 1600,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273a91b75c9ef65ed8d760ff600',
    releaseDate: '2020-06-18',
    genre: 'alternative',
    label: 'Dead Oceans',
  },
  {
    id: 2,
    name: 'Philharmonics (Deluxe Edition)',
    artist: 'Agnes Obel',
    totalTracks: 27,
    price: 1850,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273ed19f33217bec32cc4029a97',
    releaseDate: '2011-05-02',
    genre: 'sad',
    label: 'Play It Again Sam',
  },
  {
    id: 3,
    name: 'Move Along',
    artist: 'The All-American Rejects',
    totalTracks: 12,
    price: 1150,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273aaf8c068ffe217db825a1945',
    releaseDate: '2005-01-01',
    genre: 'rock',
    label: null,
  },
  {
    id: 4,
    name: 'Surfing The Void',
    artist: 'Klaxons',
    totalTracks: 10,
    price: 1230,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273babbea87ac485679a24b0afa',
    releaseDate: '2010-01-01',
    genre: 'rock',
    label: null,
    time: 228311,
  },
  {
    id: 5,
    name: 'Songs For The Deaf',
    artist: 'Queens of the Stone Age',
    totalTracks: 16,
    price: 1460,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b2739eec33b045d88f87b9b06e67',
    releaseDate: '2002-01-01',
    genre: 'grunge',
    label: null,
    time: 187146,
  },
  {
    id: 6,
    name: 'Inbred',
    artist: 'Ethel Cain',
    totalTracks: 6,
    price: 1420,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b2733e4b009b608c55a30256d85c',
    releaseDate: '2021-04-23',
    genre: 'classic',
    label: 'Daughters of Cain Records',
    time: 271280,
  },
  {
    id: 7,
    name: 'Nostalgia',
    artist: 'Suki Waterhouse',
    totalTracks: 1,
    price: 100,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273285b2a832ecd2db0c87a310d',
    releaseDate: '2022-09-08',
    genre: 'alternative',
    label: 'Sub Pop Records',
  },
  {
    id: 8,
    name: 'Crushing',
    artist: 'Julia Jacklin',
    totalTracks: 10,
    price: 1280,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273b7d35506e6a2b6e524c43814',
    releaseDate: '2019-02-22',
    genre: 'rock',
    label: 'Transgressive',
  },
  {
    id: 9,
    name: 'Surrender',
    artist: 'Maggie Rogers',
    totalTracks: 12,
    price: 1460,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b2730fdfb62956211c999c39a5a3',
    releaseDate: '2022-07-29',
    genre: 'rock',
    label: 'Capitol Records',
  },
  {
    id: 10,
    name: 'Sometimes, Forever',
    artist: 'Soccer Mommy',
    totalTracks: 11,
    price: 1530,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273af4f070d3683d9b5027059ab',
    releaseDate: '2022-06-24',
    genre: 'rock',
    label: 'Loma Vista Recordings',
  },
  {
    id: 11,
    name: 'Fossora',
    artist: 'Björk',
    totalTracks: 13,
    price: 1210,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273961d278ff072bc251b22ae1c',
    releaseDate: '2022-09-30',
    genre: 'rock',
    label: 'One Little Independent Records',
  },
  {
    id: 12,
    name: 'five seconds flat',
    artist: 'Lizzy McAlpine',
    totalTracks: 14,
    price: 1300,
    albumImg:
      'https://i.scdn.co/image/ab67616d0000b273d370fdc4dbc47778b9b667c3',
    releaseDate: '2022-04-08',
    genre: 'rock',
    label: 'Harbour Artists & Music',
  },
];

const splitAbums = (size) => {
  let dividedAlbums = [];
  for (let i = 0; i < albumsData.length; i += size) {
    dividedAlbums.push(albumsData.slice(i, i + size));
  }
  return dividedAlbums;
};

const getGenreBtns = (data) => {
  let genreBtns = []
  data.forEach(e => {
    if (!genreBtns.some(gen => gen === e.genre)) genreBtns.push(e.genre)
  });
  return genreBtns
}

const genreList = getGenreBtns(albumsData)

const productsController = {
  dividedAlbums: splitAbums(6),
  nextAlbumsIndex: 1,
  albumsLimit: splitAbums(6).length,
};
