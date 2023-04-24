export const storage = {
  userDb: JSON.parse(localStorage.getItem('userDb')) || [],
  loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || {},
  // cart: getUserCart(),
}

export let { loggedUser, userDb } = storage

// let userDb = JSON.parse(localStorage.getItem('userDb')) || []
// let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {}

// Crea un nuevo usuario
export const saveNewUser = ({ name, email, pass, eula }) => {
  userDb = [
    ...userDb,
    {
      id: userDb.length + 1,
      name,
      email,
      pass,
      eula,
      cart: [],
    },
  ]
}

export const saveUserDbStorage = () => {
  localStorage.setItem('userDb', JSON.stringify(userDb))
}

export const saveLoginStorage = (user = '{}') => {
  localStorage.setItem('loggedUser', JSON.stringify(user))
}

export const updateUserDb = () => {
  userDb = userDb.map((user) => {
    return user.id === loggedUser.id ? loggedUser : user
  })
}

export const updateCartOfLoggedUser = ({ cart }) => {
  loggedUser = { ...loggedUser, cart: [...cart] }
}
