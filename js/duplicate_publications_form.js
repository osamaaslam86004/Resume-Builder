let publicationCount = 1

document.addEventListener('DOMContentLoaded', function () {
    const addPublicationsFormButton = document.getElementById('add-publication-form');
    const publicationsFormsContainer = document.getElementById('publications-forms-container');

    addPublicationsFormButton.addEventListener('click', function (event) {
        event.preventDefault()

        const publicationsFormTemplate = document.getElementById('publication-form-template');
        const newForm = publicationsFormTemplate.cloneNode(true);

        // Reset the form fields in the cloned form
        const inputs = newForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.value = '';
        });

        // change id of the clone form
        newForm.id = `publication-form-template-${publicationCount}`
        publicationCount++

        // Append the new form to the container
        publicationsFormsContainer.appendChild(newForm);

    });
})