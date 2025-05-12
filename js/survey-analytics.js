/**
 * Script para rastrear eventos de Google Analytics en la página de encuesta de +Zaldo
 * Configurado para Google Analytics 4 (GA4) ID: G-Z3SL0E5GPJ
 */

// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables para rastreo
    let formStarted = false;
    let formSubmitted = false;
    let currentStep = 0;
    let timeOnPage = Date.now();
    
    // Rastrear visualización de la página
    sendAnalyticsEvent('page_view', 'Survey', 'View Survey Page');
    
    // Detectar si el iframe se ha cargado correctamente
    const surveyIframe = document.querySelector('.iframe-container iframe');
    if (surveyIframe) {
        surveyIframe.addEventListener('load', function() {
            sendAnalyticsEvent('form_load', 'Survey', 'Survey Form Loaded');
        });
        
        // Intentar detectar errores de carga del iframe
        surveyIframe.addEventListener('error', function() {
            sendAnalyticsEvent('form_error', 'Survey', 'Survey Form Load Error');
        });
    }
    
    // Rastrear clics en el botón de formulario externo
    const externalFormButton = document.querySelector('.survey-alt-link a');
    if (externalFormButton) {
        externalFormButton.addEventListener('click', function() {
            sendAnalyticsEvent('external_form', 'Survey', 'External Form Button Click');
        });
    }
    
    // Rastrear cuando el usuario abandona la página
    window.addEventListener('beforeunload', function() {
        // Calcular tiempo en la página
        const timeSpent = Math.round((Date.now() - timeOnPage) / 1000);
        
        // Enviar evento solo si ha pasado tiempo significativo
        if (timeSpent > 5) {
            sendAnalyticsEvent('time_on_page', 'Survey', 'Survey Page Time', timeSpent);
        }
        
        // Verificar si el usuario abandonó sin completar el formulario
        if (formStarted && !formSubmitted) {
            sendAnalyticsEvent('form_abandon', 'Survey', 'Survey Form Abandoned', currentStep);
        }
    });
    
    // Función para enviar eventos a Google Analytics
    function sendAnalyticsEvent(action, category, label, value = null) {
        // Enviar a Google Analytics si está disponible
        if (window.gtag) {
            const eventParams = {
                'event_category': category,
                'event_label': label
            };
            
            // Añadir valor si existe
            if (value !== null) {
                eventParams.value = value;
            }
            
            // Enviar al ID específico de GA4
            gtag('event', action, {
                'send_to': 'G-Z3SL0E5GPJ',
                ...eventParams
            });
        }
        
        // Enviar a Google Tag Manager si está disponible
        if (window.dataLayer) {
            const dataLayerEvent = {
                'event': 'survey_' + action,
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label
            };
            
            // Añadir valor si existe
            if (value !== null) {
                dataLayerEvent.eventValue = value;
            }
            
            window.dataLayer.push(dataLayerEvent);
        }
        
        // Registrar en consola para depuración
        console.log(`Analytics Event: ${action}, Category: ${category}, Label: ${label}, Value: ${value}`);
    }
    
    // Intentar monitorear postMessages del iframe de Google Forms (limitado por seguridad)
    window.addEventListener('message', function(event) {
        // Verificar si el mensaje proviene de Google Forms
        if (event.origin.includes('google.com') && event.data) {
            try {
                // Intentar interpretar el mensaje
                if (typeof event.data === 'string' && event.data.includes('submitted')) {
                    formSubmitted = true;
                    sendAnalyticsEvent('form_submit', 'Survey', 'Survey Form Submitted');
                }
            } catch (error) {
                console.error('Error procesando mensaje del iframe:', error);
            }
        }
    });
});
