// Feedback Modal
const feedbackModal = document.querySelector('.feedback-modal');

// Mostrar feedback al usuario tipos (xmark, check)
const showFeedback = (type, msg, time = 1500) => {
  feedbackModal.innerHTML = `<i class="fas fa-circle-${type} modal-icon"></i></i> ${msg}`
  feedbackModal.classList.add(`show-feedback-${type}`);
  setTimeout(
    () => feedbackModal.classList.remove(`show-feedback-${type}`),
    time
  );
};
