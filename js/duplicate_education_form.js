let educationCount = 1

document.addEventListener('DOMContentLoaded', function () {
    const addEducationFormButton = document.getElementById('add-education-form');
    const educationFormsContainer = document.getElementById('education-forms-container');

    addEducationFormButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const educationFormTemplate = document.getElementById('education-form-template');
        const newForm = educationFormTemplate.cloneNode(true);

        // Reset the form fields in the cloned form
        const inputs = newForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.value = '';
        });

        // change id of the clone form
        newForm.id = `education-form-template-${educationCount}`
        educationCount++

        // Append the new form to the container
        educationFormsContainer.appendChild(newForm);
    });
});