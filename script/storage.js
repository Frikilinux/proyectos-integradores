// Trayendo cart del usuario
const getUserCart = () => {
  return isObjectEmpty(loggedUser) ? [] : loggedUser.cart
}

let userDb = JSON.parse(localStorage.getItem('userDb')) || []
let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {}
let cart = getUserCart()

const saveUserDbStorage = (userDb) => {
  localStorage.setItem('userDb', JSON.stringify(userDb))
}

const saveLoginStorage = (loggedUser) => {
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
}

const updateUserDb = (loggedUser) => {
  userDb = userDb.map((user) => {
    return user.id === loggedUser.id ? loggedUser : user
  })
}

const updateCartOfLoggedUser = (user) => {
  loggedUser = { ...user, cart: [...cart] }
}
