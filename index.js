let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem('cart', JSON.stringify(cartList));
};

const init = () => {};

init();
