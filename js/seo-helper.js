/**
 * SEO Helper para +Zaldo
 * Este script mejora el SEO y monitorea interacciones para análisis
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Añadir atributos alt a imágenes sin él (mejora SEO)
  document.querySelectorAll('img:not([alt])').forEach(img => {
    const parentSection = img.closest('section');
    const sectionId = parentSection ? parentSection.id : 'general';
    img.alt = '+Zaldo - ' + (sectionId || 'imagen');
  });

  // Mejorar los enlaces para SEO
  document.querySelectorAll('a').forEach(link => {
    // Añadir atributo title si no existe
    if (!link.title && link.textContent.trim()) {
      link.title = link.textContent.trim();
    }
    
    // Añadir rel="noopener" para enlaces externos por seguridad
    if (link.hostname !== window.location.hostname && link.getAttribute('target') === '_blank') {
      link.rel = 'noopener noreferrer';
    }
  });

  // Monitorear tiempo en página para analytics
  let startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    const timeSpent = (Date.now() - startTime) / 1000;
    
    // Si tienes Google Analytics configurado
    if (window.gtag) {
      gtag('event', 'time_on_page', {
        'event_category': 'Engagement',
        'event_label': document.title,
        'value': Math.round(timeSpent)
      });
    }
  });

  // Monitorear clics en CTAs para análisis
  document.querySelectorAll('.btn-primary, .btn-xl, .cta-small').forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      
      if (window.gtag) {
        gtag('event', 'cta_click', {
          'event_category': 'Engagement',
          'event_label': buttonText,
          'value': 1
        });
      }
    });
  });
  
  // Función para detectar si la página se está viendo desde un motor de búsqueda
  function detectSearchEngine() {
    const referrer = document.referrer;
    const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'ecosia', 'baidu'];
    
    return searchEngines.some(engine => referrer.includes(engine));
  }
  
  // Si el visitante viene de un buscador, mostrar banner de bienvenida
  if (detectSearchEngine()) {
    setTimeout(() => {
      const seoWelcome = document.createElement('div');
      seoWelcome.className = 'seo-welcome animate__animated animate__fadeInUp';
      seoWelcome.innerHTML = `
        <div class="container py-2 px-3 bg-primary text-white text-center rounded">
          <p class="mb-0">¡Bienvenido a +Zaldo! <strong>Únete a nuestra beta</strong> y mejora tus finanzas personales.</p>
        </div>
      `;
      document.body.appendChild(seoWelcome);
      
      // Ocultar después de 8 segundos
      setTimeout(() => {
        seoWelcome.classList.add('animate__fadeOutDown');
        setTimeout(() => seoWelcome.remove(), 1000);
      }, 8000);
    }, 2000);
  }
});
