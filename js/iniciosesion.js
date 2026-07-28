const loginForm = document.querySelector('.login-form');
const isLoginPage = Boolean(loginForm);
const isIndexPage = window.location.pathname.toLowerCase().endsWith('index.html') || document.querySelector('nav') !== null;

function showLoginPopup(message) {
    const existingPopup = document.querySelector('.login-popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }

    const style = document.createElement('style');
    style.textContent = `
        .login-popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        }

        .login-popup {
            background: white;
            border-radius: 16px;
            width: min(90%, 420px);
            padding: 24px;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
            text-align: center;
            animation: popupFade 0.25s ease;
        }

        .login-popup h3 {
            margin: 0 0 10px;
            color: #2f4f5f;
        }

        .login-popup p {
            margin: 0 0 16px;
            color: #4d657c;
            line-height: 1.5;
        }

        .login-popup button {
            background: linear-gradient(135deg, #77cdba, #4d657c);
            border: none;
            color: white;
            padding: 10px 18px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
        }

        @keyframes popupFade {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;

    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'login-popup-overlay';
    overlay.innerHTML = `
        <div class="login-popup">
            <h3>Inicio de sesión exitoso</h3>
            <p>${message}</p>
            <button type="button">Cerrar</button>
        </div>
    `;

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });

    overlay.querySelector('button').addEventListener('click', () => {
        overlay.remove();
    });

    document.body.appendChild(overlay);
}

if (isLoginPage) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuarioInput = document.getElementById('usuario');
        const usuario = usuarioInput && usuarioInput.value.trim()
            ? usuarioInput.value.trim()
            : 'usuario';

        sessionStorage.setItem('loginPopupMessage', `Bienvenido, ${usuario}. Has iniciado sesión correctamente.`);
        sessionStorage.setItem('showLoginPopup', 'true');
        window.location.href = 'index.html';
    });
}

if (isIndexPage) {
    const shouldShowPopup = sessionStorage.getItem('showLoginPopup') === 'true';
    const popupMessage = sessionStorage.getItem('loginPopupMessage');

    if (shouldShowPopup && popupMessage) {
        showLoginPopup(popupMessage);
        sessionStorage.removeItem('showLoginPopup');
        sessionStorage.removeItem('loginPopupMessage');
    }
}
