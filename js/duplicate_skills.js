let skillCount = 1;
document.addEventListener('DOMContentLoaded', function () {
    const addskillFormButton = document.getElementById('add-skill-form');
    const skillFormsContainer = document.getElementById('skill-forms-container');

    addskillFormButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const skillFormTemplate = document.getElementById('skill-form-template');
        const newForm = skillFormTemplate.cloneNode(true);

        // Reset the form fields in the cloned form
        const inputs = newForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = '';
        });

        // change id of the clone form
        newForm.id = `skill-form-template-${skillCount}`
        skillCount++

        // Append the new form to the container
        skillFormsContainer.appendChild(newForm);
    });
});