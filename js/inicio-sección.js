document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const btnInfo = document.querySelector('.btn-info');
    const tarjetas = document.querySelectorAll('.tarjeta');

    if (banner) {
        const titulo = banner.querySelector('h1');
        if (titulo) {
            titulo.insertAdjacentHTML('afterend', '<p class="mensaje-home">Tu futuro empieza hoy con una educación integral.</p>');
        }
    }

    if (btnInfo) {
        btnInfo.addEventListener('click', (event) => {
            event.preventDefault();

            const textoOriginal = btnInfo.textContent;
            btnInfo.textContent = '¡Gracias! Pronto te contactaremos.';
            btnInfo.style.background = '#0f766e';
            btnInfo.style.transform = 'scale(1.03)';

            setTimeout(() => {
                btnInfo.textContent = textoOriginal;
                btnInfo.style.background = '';
                btnInfo.style.transform = '';
                window.location.href = btnInfo.getAttribute('href');
            }, 1600);
        });
    }

    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.transform = 'translateY(-6px)';
        });

        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.transform = '';
        });
    });
});
