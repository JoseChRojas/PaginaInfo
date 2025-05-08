/**
 * +Zaldo - Main Scripts
 * Mejoras de UX/UI para dispositivos móviles
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Ajustar el navbar al hacer scroll
  const mainNav = document.getElementById('mainNav');
  
  if (mainNav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        mainNav.classList.add('navbar-scrolled');
      } else {
        mainNav.classList.remove('navbar-scrolled');
      }
    });
  }

  // Cerrar el menú móvil al hacer clic en un enlace
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (!navbarToggler.classList.contains('collapsed')) {
          navbarToggler.click();
        }
      }
    });
  });

  // Scroll suave para enlaces internos
  document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetID = this.getAttribute('href');
      const targetElement = document.querySelector(targetID);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mejorar interacción con imágenes en móvil
  if (window.innerWidth < 768) {
    const appScreenshots = document.querySelectorAll('.app-screenshot, .app-showcase-image');
    
    appScreenshots.forEach(function(image) {
      image.addEventListener('click', function() {
        // Simular el efecto hover al tocar en dispositivos móviles
        if (this.classList.contains('app-screenshot')) {
          this.style.transform = 'perspective(600px) rotateY(0)';
          
          setTimeout(() => {
            this.style.transform = '';
          }, 2000);
        } else {
          this.style.transform = 'translateY(-10px)';
          
          setTimeout(() => {
            this.style.transform = '';
          }, 2000);
        }
      });
    });
  }
});
