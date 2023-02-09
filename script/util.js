// Feedback Modal
const feedbackModal = document.querySelector('.feedback-modal');

// Mostrar feedback al usuario, tipos (xmark, check, info)
const showFeedback = (type, msg, time = 1500) => {
  feedbackModal.innerHTML = `<i class="fas fa-circle-${type} modal-icon"></i></i> ${msg}`
  feedbackModal.classList.add(`show-feedback-${type}`);
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    time
  );
};

// Check email
const isEmailValid = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return regex.test(email);
};
