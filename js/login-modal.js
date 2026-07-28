const form = document.getElementById('loginForm');
const statusMessage = document.getElementById('statusMessage');
const modal = document.getElementById('loginModal');
const modalMessage = document.getElementById('modalMessage');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');

function showModal(message, isSuccess = true) {
    modalMessage.textContent = message;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');

    if (isSuccess) {
        modalMessage.style.color = '#0f766e';
    } else {
        modalMessage.style.color = '#b91c1c';
    }
}

function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    if (!usuario || !password) {
        statusMessage.textContent = 'Completa tu usuario y contraseña para continuar.';
        statusMessage.style.color = '#b91c1c';
        showModal('Completa tu usuario y contraseña para continuar.', false);
        return;
    }

    statusMessage.textContent = `Bienvenido, ${usuario}. El acceso institucional está listo para continuar.`;
    statusMessage.style.color = '#0f766e';
    showModal(`Bienvenido, ${usuario}. Tu acceso institucional ha sido validado correctamente.`, true);
});

closeModalBtn.addEventListener('click', closeModal);
modalConfirmBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});
