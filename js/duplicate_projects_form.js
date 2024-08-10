let projectCount = 1

document.addEventListener('DOMContentLoaded', function () {
    const addProjectFormButton = document.getElementById('add-project-form');
    const projectsFormsContainer = document.getElementById('projects-forms-container');

    addProjectFormButton.addEventListener('click', function (event) {
        event.preventDefault()

        const projectFormTemplate = document.getElementById('project-form-template');
        const newForm = projectFormTemplate.cloneNode(true);

        // Reset the form fields in the cloned form
        const inputs = newForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.value = '';
        });

        // change id of the clone form
        newForm.id = `project-form-template-${projectCount}`
        projectCount++

        // Append the new form to the container
        projectsFormsContainer.appendChild(newForm);
    });
});
