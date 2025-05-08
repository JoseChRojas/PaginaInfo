// +Zaldo Survey Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Get survey elements
    const surveyForm = document.getElementById('betaSurvey');
    const steps = document.querySelectorAll('.survey-step');
    const progressBar = document.getElementById('surveyProgress');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const totalSteps = steps.length - 1; // Exclude thank you step
    
    let currentStep = 1;
    
    // Update progress bar
    function updateProgress() {
        const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
    }
    
    // Show specific step
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.style.display = 'none';
        });
        
        document.querySelector(`.survey-step[data-step="${stepNumber}"]`).style.display = 'block';
        currentStep = stepNumber;
        updateProgress();
        
        // Scroll to top of form
        window.scrollTo({
            top: document.querySelector('.survey-header').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Next button event listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Basic validation for current step
            const currentStepElement = document.querySelector(`.survey-step[data-step="${currentStep}"]`);
            const requiredFields = currentStepElement.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (field.type === 'radio') {
                    // For radio buttons, check if any in the group is checked
                    const name = field.name;
                    const radioGroup = currentStepElement.querySelectorAll(`input[name="${name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isChecked) {
                        isValid = false;
                        // Find parent label and add error class
                        const parentLabel = field.closest('.mb-3, .mb-4').querySelector('.form-label');
                        if (parentLabel) {
                            parentLabel.classList.add('text-danger');
                        }
                    }
                } else if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                }
            });
            
            if (isValid) {
                showStep(currentStep + 1);
            } else {
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    });
    
    // Previous button event listeners
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStep(currentStep - 1);
        });
    });
    
    // Form submission
    surveyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your server
        // For this example, we'll just show the thank you step
        
        // Collect all form data
        const formData = new FormData(surveyForm);
        const surveyData = {};
        
        for (let [key, value] of formData.entries()) {
            surveyData[key] = value;
        }
        
        console.log('Survey submitted with data:', surveyData);
        
        // Show thank you step
        showStep(totalSteps + 1);
    });
    
    // Reset validation styling on input
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', function() {
            this.classList.remove('is-invalid');
            const parentLabel = this.closest('.mb-3, .mb-4')?.querySelector('.form-label');
            if (parentLabel) {
                parentLabel.classList.remove('text-danger');
            }
        });
    });
    
    // Initialize first step
    updateProgress();
});
