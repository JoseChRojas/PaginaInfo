document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Navbar scroll effect
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        mainNav.classList.add('navbar-scrolled');
      } else {
        mainNav.classList.remove('navbar-scrolled');
      }
    });
  }

  // Cerrar menú móvil al hacer clic
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 992) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (!navbarToggler.classList.contains('collapsed')) {
          navbarToggler.click();
        }
      }
    });
  });

  // Scroll suave
  document.querySelectorAll('a.js-scroll-trigger[href^="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetID = this.getAttribute('href');
      const target = document.querySelector(targetID);
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }
    });
  });

  // Simulador de tarjeta
  const nameInput = document.querySelector('input[placeholder="Nombre completo"]');
  const cardInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
  const expInput = document.querySelector('input[placeholder="MM/AA"]');

  const previewNumber = document.querySelector('.card-number');
  const previewName = document.querySelector('.card-holder');
  const previewExp = document.querySelector('.card-expiry');

  if (nameInput && previewName) {
    nameInput.addEventListener('input', (e) => {
      previewName.textContent = e.target.value || 'Tu nombre';
    });
  }

  if (cardInput && previewNumber) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').slice(0, 16);
      let formatted = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = formatted;
      previewNumber.textContent = formatted.padEnd(19, '•');
    });
  }

  if (expInput && previewExp) {
    expInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
      let month = val.slice(0, 2);
      if (month.length === 1 && parseInt(month) > 1) month = '0' + month;
      if (month.length === 2 && (parseInt(month) < 1 || parseInt(month) > 12)) month = '12';
      let year = val.slice(2, 4);
      let result = year.length > 0 ? `${month}/${year}` : month;
      e.target.value = result;
      previewExp.textContent = result || 'MM/AA';
    });
  }

  // Simulación de conexión
  const simulateBtn = document.getElementById('simulate-btn');
  const messageBox = document.getElementById('connection-message');
  if (simulateBtn && messageBox) {
    simulateBtn.addEventListener('click', () => {
      simulateBtn.disabled = true;
      simulateBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Conectando...`;

      setTimeout(() => {
        simulateBtn.innerHTML = `Simular Conexión`;
        simulateBtn.disabled = false;

        messageBox.innerHTML = `
          <div class="alert alert-success animate__animated animate__fadeInDown" role="alert">
            ✅ “Así de fácil es conectar tus cuentas bancarias con +Zaldo” <strong>+Zaldo</strong>.
          </div>
        `;
        messageBox.style.display = 'block';
      }, 2000);
    });
  }

  // Efecto "hover" en móviles al tocar imágenes
  if (window.innerWidth < 768) {
    document.querySelectorAll('.app-screenshot, .app-showcase-image').forEach(image => {
      image.addEventListener('click', function () {
        this.style.transform = this.classList.contains('app-screenshot')
          ? 'perspective(600px) rotateY(0)'
          : 'translateY(-10px)';

        setTimeout(() => {
          this.style.transform = '';
        }, 2000);
      });
    });
  }

  // Mejorar alineación de icon-circle en móviles
  if (window.innerWidth <= 768) {
    // Asegurar que todos los elementos icon-circle están correctamente alineados
    document.querySelectorAll('.app-showcase-content .d-flex').forEach(item => {
      // Añadir clase para identificar fácilmente en modo móvil
      item.classList.add('mobile-flex-item');
      
      // Verificar la altura de los elementos y ajustar si es necesario
      const iconCircle = item.querySelector('.icon-circle');
      const textContent = item.querySelector('.ms-3');
      
      if (iconCircle && textContent) {
        // Si el texto es muy alto, ajustar la posición del icono
        if (textContent.offsetHeight > 65) {
          iconCircle.style.top = '8px';
        }
      }
    });
  }
});
