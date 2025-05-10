/**
 * Sistema de backup para suscripciones +Zaldo
 * Este script permite exportar las suscripciones guardadas en localStorage
 */

class SubscriptionBackup {
  constructor() {
    this.subscribers = this.getSubscribers();
  }
  
  // Obtener suscriptores de localStorage
  getSubscribers() {
    try {
      return JSON.parse(localStorage.getItem('subscribers') || '[]');
    } catch (e) {
      console.error('Error al recuperar suscriptores:', e);
      return [];
    }
  }
  
  // Exportar suscriptores como CSV
  exportCSV() {
    if (this.subscribers.length === 0) {
      alert('No hay suscriptores para exportar.');
      return;
    }
    
    // Crear cabecera del CSV
    let csv = 'Email,Fecha\n';
    
    // Añadir cada suscriptor
    this.subscribers.forEach(sub => {
      const formattedDate = new Date(sub.date).toLocaleString();
      csv += `${sub.email},"${formattedDate}"\n`;
    });
    
    // Crear y descargar el archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'suscriptores_zaldo.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Contar suscriptores
  getCount() {
    return this.subscribers.length;
  }
  
  // Limpiar suscriptores (función para administradores)
  clearSubscribers() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los suscriptores guardados localmente?')) {
      localStorage.removeItem('subscribers');
      this.subscribers = [];
      alert('Suscriptores eliminados correctamente.');
    }
  }
}

// Ejecutar si estamos en la página de administración
if (window.location.pathname.includes('admin')) {
  document.addEventListener('DOMContentLoaded', function() {
    const backup = new SubscriptionBackup();
    
    // Mostrar conteo
    const counterElement = document.getElementById('subscriber-count');
    if (counterElement) {
      counterElement.textContent = backup.getCount();
    }
    
    // Configurar botón de exportación
    const exportBtn = document.getElementById('export-subscribers');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => backup.exportCSV());
    }
    
    // Configurar botón de limpieza
    const clearBtn = document.getElementById('clear-subscribers');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => backup.clearSubscribers());
    }
  });
}
