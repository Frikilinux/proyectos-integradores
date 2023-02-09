// Trayendo cart del usuario
let getUserCart = () => {
  return !loggedUser.length ? [] : loggedUser[0].cart;
};

let userDb = JSON.parse(localStorage.getItem('userDb')) || [];
let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || [];
let cart = getUserCart();

const saveUserDbStorage = (userDb) => {
  localStorage.setItem('userDb', JSON.stringify(userDb));
};

const saveLoginStorage = (loggedUser) => {
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
};

const updateUserDb = (loggedUser) => {
  userDb = userDb.map((user) => {
    return user.id === loggedUser[0].id ? loggedUser[0] : user;
  });
};

const updateCartOfLoggedUser = (user) => {
  loggedUser = user.map((user) => ({ ...user, cart: [...cart] }));
};
