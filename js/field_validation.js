const form = document.getElementById('personal-info-form');
const inputs = form.querySelectorAll('input');
const textareaInputs = form.querySelectorAll('textarea');
const selectInputs = form.querySelectorAll('select');
const submitBtn = document.getElementById('submit-btn');
const reviewContainer = document.getElementById('review-container');
const reviewList = document.getElementById('review-list');
const editBtn = document.getElementById('edit-btn');
const submitBtnReview = document.getElementById('submit-btn-review');
const progressBar = document.getElementById("progress-bar");


inputs.forEach(input => {
    input.addEventListener("focus", () => {
        const requirementsList = input.parentElement.querySelector("#input-requirements");
        if (requirementsList) {
            requirementsList.style.display = "block";
        }
    });

    input.addEventListener("input", () => {
        // Remove whitespaces before/left of input value
        input.value = input.value ? input.value.trimStart() : ''
        // Validate Each input
        validateField(input);
        updateProgressBar();
    });


    input.addEventListener("blur", () => {
        const requirementsList = input.parentElement.querySelector("#input-requirements");
        if (requirementsList && validateField(input)) {
            requirementsList.style.display = "none";
        }
    });
});

textareaInputs.forEach(textarea_input => {
    textarea_input.addEventListener("change", () => {
        // Remove whitespaces before/left of input value
        textarea_input.value = textarea_input.value ? textarea_input.value.trimStart() : ''
        // Validate Each input
        validateField(textarea_input);
        updateProgressBar();
    });
});


selectInputs.forEach(select_input => {
    select_input.addEventListener("select", () => {
        // Remove whitespaces before/left of input value
        select_input.value = select_input.value ? select_input.value.trimStart() : ''
        // Validate Each input
        validateField(select_input);
        updateProgressBar();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Update the review list when the user clicks on the submit button
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();   // prevents form submission
        let isFormValid = true;

        inputs.forEach((input) => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            console.log('form valid-----------', isFormValid)
            // Display the Form in Preview
            MyNamespace.getClonePersonalInfoForm();
            form.style.display = 'none';
            reviewContainer.style.display = 'block';
        } else {
            alert('Please ensure all fields meet the requirements before submitting.');
        }
    });

    // Go back to edit when the user clicks on the edit button
    submitBtnReview.addEventListener('click', () => {
        reviewContainer.style.display = 'none';
        form.style.display = 'block';
    });
    // Go back to edit when the user clicks on the edit button
    editBtn.addEventListener('click', () => {
        reviewContainer.style.display = 'none';
        form.style.display = 'block';
    });

});


const validateField = (input) => {
    const fieldName = input.id;
    const fieldRequirements = requirements[fieldName];
    const requirementsList = input.parentElement.querySelector("#input-requirements");
    let isValid = true;

    if (fieldRequirements) {
        const reqItems = requirementsList.querySelectorAll("li");

        if (fieldName === "site") {
            // For "site", check if any one regex is valid
            const anyValid = fieldRequirements.some(req => req.regex.test(input.value));
            reqItems.forEach((item, index) => {
                if (anyValid) {
                    item.classList.add("valid");
                    item.classList.remove("invalid");
                    isValid = true;
                } else {
                    item.classList.add("invalid");
                    item.classList.remove("valid");
                    isValid = false;
                }
            });
        } else {
            // For other fields, check each regex individually
            reqItems.forEach((item, index) => {
                const requirement = fieldRequirements[index];
                if (requirement.regex.test(input.value)) {
                    item.classList.add("valid");
                    item.classList.remove("invalid");
                } else {
                    item.classList.add("invalid");
                    item.classList.remove("valid");
                    isValid = false;
                }
            });
        }
    }
    else {
        // If there are no requirements, check the HTML/Form validation
        console.log('check default input validatity', isValid)
        isValid = input.checkValidity();
    }

    console.log('if form not valid', isValid)
    return isValid;
};

const updateProgressBar = () => {
    const totalInputs = inputs.length;
    console.log('total inputs', totalInputs)
    let validInputs = 0;

    inputs.forEach(input => {
        if (validateField(input)) {
            validInputs += 1;
            console.log('valid inputs', validInputs)
        }
    });

    const progress = Math.round((validInputs / totalInputs) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress}%`;
};



const requirements = {
    "first_name": [
        { regex: /^.{3,}$/, message: "At least 3 characters long" },
        { regex: /^[a-zA-Z0-9]+$/, message: "Must only contain letters and numbers (no special characters)" }
    ],
    "last_name": [
        { regex: /^.{3,}$/, message: "At least 3 characters long" },
        { regex: /^[a-zA-Z0-9]+$/, message: "Must only contain letters and numbers (no special characters)" }
    ],
    "twittername": [
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "At least 3 characters long" },
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "Letters, Numbers, Period, Hyphen, Underscore" }
    ],
    "linkedin": [
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "At least 3 characters long" },
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "Letters, Numbers, Period, Hyphen, Underscore" }
    ],
    "facebook": [
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "At least 3 characters long" },
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "Letters, Numbers, Period, Hyphen, Underscore" }
    ],
    "github": [
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "At least 3 characters long" },
        { regex: /^[a-zA-Z0-9._-]{3,20}$/, message: "Letters, Numbers, Period, Hyphen, Underscore" }
    ],
    "site": [
        { regex: /^(https:\/\/www\.[a-zA-Z0-9]+\.com\/?)$/, message: "https://www.example.com/" },
        { regex: /^(https:\/\/www\.[a-zA-Z0-9]+\.com\/\?id=[0-9]+)$/, message: "https://www.example.com/?id=1" }
    ],
    "email": [
        { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "example@example.com" }
    ]
};