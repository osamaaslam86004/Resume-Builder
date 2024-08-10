
const frontendLanguages = [
    { value: "HTML", text: "HTML" },
    { value: "CSS", text: "CSS" },
    { value: "JavaScript", text: "JavaScript" },
    { value: "TypeScript", text: "TypeScript" },
    { value: "React", text: "React" },
    { value: "Angular", text: "Angular" },
    { value: "Vue.js", text: "Vue.js" }
];

const backendLanguages = [
    { value: "JavaScript (Node.js)", text: "JavaScript (Node.js)" },
    { value: "Python (Django)", text: "Python (Django)" },
    { value: "Python (Flask)", text: "Python (Flask)" },
    { value: "Ruby (Ruby on Rails)", text: "Ruby (Ruby on Rails)" },
    { value: "Java (Spring)", text: "Java (Spring)" },
    { value: "PHP (Laravel)", text: "PHP (Laravel)" },
    { value: "C# (ASP.NET)", text: "C# (ASP.NET)" },
    { value: "Go (GoLang)", text: "Go (GoLang)" },
    { value: "Scala (Play Framework)", text: "Scala (Play Framework)" },
    { value: "Elixir (Phoenix)", text: "Elixir (Phoenix)" }
];

document.addEventListener('DOMContentLoaded', function () {
    const addProgrammingAreaFormButton = document.getElementById('add-programming-area-form');
    const programmingAreaFormsContainer = document.getElementById('programming-area-forms-container');

    addProgrammingAreaFormButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const programmingAreaFormTemplate = document.getElementById('programming-area-form-template');
        const newForm = programmingAreaFormTemplate.cloneNode(true);

        // Reset the form fields in the cloned form
        const inputs = newForm.querySelectorAll('programming_area_name')
        inputs.forEach(input => {
            input.value = '';
        });

        // Append the new form to the container
        programmingAreaFormsContainer.appendChild(newForm);

        // Add event listener to the newly added programming area select field
        const programmingAreaSelect = newForm.querySelector('#programming_area_name');
        const programmingLanguageSelect = newForm.querySelector('#programming_language_name');

        programmingAreaSelect.addEventListener('change', function () {
            updateProgrammingLanguageOptions(programmingAreaSelect, programmingLanguageSelect);
        });
    });

    function updateProgrammingLanguageOptions(areaSelect, languageSelect) {
        const selectedArea = areaSelect.value;
        let options = [];

        if (selectedArea === "FRONTEND") {
            options = frontendLanguages;
        } else if (selectedArea === "BACKEND") {
            options = backendLanguages;
        }

        // Clear current options
        languageSelect.innerHTML = '<option value="">Select Programming Language</option>';

        // Add new options
        options.forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.textContent = option.text;
            languageSelect.appendChild(newOption);
        });
    }

    // Initial setup for the default form
    const initialProgrammingAreaSelect = document.querySelector('#programming_area_name');
    const initialProgrammingLanguageSelect = document.querySelector('#programming_language_name');

    initialProgrammingAreaSelect.addEventListener('change', function () {
        updateProgrammingLanguageOptions(initialProgrammingAreaSelect, initialProgrammingLanguageSelect);
    });
});
