// utils.js
const MyNamespace = {

    getPersonalInfoForm: function () {

        const personalinfoContainer = document.getElementById('personal-info-container');
        const overviewContainer = document.getElementById('overview-form-container');
        const educationContainer = document.getElementById('education-forms-container');
        const jobContainer = document.getElementById('job-container');
        const accomplishmentContainer = document.getElementById('job-accomplishment-container');
        const skillContainer = document.getElementById('skill-forms-container');
        const programmingareaContainer = document.getElementById('programming-area-forms-container');
        const projectsContainer = document.getElementById('projects-forms-container');
        const publicationsContainer = document.getElementById('publications-forms-container');

        // Create the form instance
        const form = document.getElementById('personal-info-form');
        form.disabled = true;

        let formData = {};
        const inputs = personalinfoContainer.querySelectorAll('input, textarea')
        inputs.forEach(input => {
            if (input.name == 'linkedin') {
                formData[input.name] = `https://www.linkedin.com/in/${input.value}/`
            } else if (input.name == 'facebook') {
                formData[input.name] = `https://www.facebook.com/${input.value}`
            } else if (input.name == 'github') {
                formData[input.name] = `https://github.com/${input.value}/`
            } else if (input.name == 'twittername') {
                formData[input.name] = `https://x.com/${input.value}`
            }
            else {
                formData[input.name] = input.value;
            }
        });

        // Add the textarea value to the formData under the "overview" dictionary
        const overviewformData = {};
        const overviewText = overviewContainer.querySelector('textarea');
        overviewformData[overviewText.name] = overviewText.value;
        formData['overview'] = overviewformData;

        // Add the input,textarea value to the formData under the "education" dictionary
        let educationArray = []
        let educationformData = {};
        for (educationTemplate of educationContainer.children) {

            let educationformInputs = educationTemplate.querySelectorAll('input, textarea')
            educationformInputs.forEach(input => {
                if (input.type === 'date') {
                    educationformData[input.name] = formatDate(input.value);
                } else {
                    educationformData[input.name] = input.value;
                }
            });

            educationArray.push(educationformData)
            console.log('education form data----------', educationformData)
            educationformInputs = null;
            educationformData = {}
        };
        formData['education'] = educationArray


        // Add the input,textarea value to the formData under the "education" dictionary
        let jobformData = {};
        const jobformInputs = jobContainer.querySelectorAll('input, textarea')
        jobformInputs.forEach(input => {
            if (input.type === 'date') {
                jobformData[input.name] = formatDate(input.value);
            } else {
                jobformData[input.name] = input.value;
            }
        });
        formData['job'] = jobformData


        // Add the textarea value to the formData under the "accomplishment" dictionary
        let accomplishmentformData = {}
        let accomplishmentText = accomplishmentContainer.querySelector('textarea');
        accomplishmentformData[accomplishmentText.name] = accomplishmentText.value;
        formData['job']['accomplishment'] = accomplishmentformData;


        // Add the input,textarea value to the formData under the "skill" dictionary
        let skillArray = []
        let skillformData = {};

        for (skillTemplate of skillContainer.children) {
            // Get the 'input' field value
            let skillformInput = skillTemplate.querySelector('#text')
            skillformData[skillformInput.name] = skillformInput.value;
            // Get the 'Select' field value  
            let skillformSelect = skillTemplate.querySelector('#skill_level')
            skillformData[skillformSelect.name] = skillformSelect.value;

            skillArray.push(skillformData)
            skillformData = {};
            skillformInput = null;
            skillformSelect = null;
        }
        formData['skill'] = skillArray


        // Add the input,textarea value to the formData under the "programming_area" dictionary
        let programmingArray = []
        let programmingformData = {};

        for (programmingTemplate of programmingareaContainer.children) {
            let programmingInputs = programmingTemplate.querySelectorAll('select')
            programmingInputs.forEach(input => {
                programmingformData[input.name] = input.value;
            });
            programmingArray.push(programmingformData)
            programmingformData = {};
            programmingInputs = null;
        }
        formData['programming_area'] = programmingArray


        // Add the input,textarea value to the formData under the "projects" dictionary
        let projectsArray = []
        let projectsformData = {};

        for (projectTemplate of projectsContainer.children) {
            let projectsInputs = projectTemplate.querySelectorAll('input, textarea')
            projectsInputs.forEach(input => {
                projectsformData[input.name] = input.value;
            });
            projectsArray.push(projectsformData)
            projectsformData = {};
            projectsInputs = null;
        }
        formData['projects'] = projectsArray


        // Add the input,textarea value to the formData under the "publications" dictionary
        let publicationsArray = []
        let publicationsformData = {};

        for (publicationTemplate of publicationsContainer.children) {
            let publicationsInputs = publicationTemplate.querySelectorAll('input, textarea')
            publicationsInputs.forEach(input => {
                publicationsformData[input.name] = input.value;
            });
            publicationsArray.push(publicationsformData)
            publicationsformData = {};
            publicationsInputs = null;
        }
        formData['publications'] = publicationsArray



        // Log the formData contents for debugging
        console.log("form dictionary--------:", JSON.stringify(formData),);
        return formData;
    },

    // Clone Of Entire Form With Input Values
    // To Display As A Preview
    getClonePersonalInfoForm: function () {
        const personalinfoContainer = document.getElementById('personal-info-container');
        const overviewContainer = document.getElementById('overview-container');
        const educationContainer = document.getElementById('education-container');
        const jobContainer = document.getElementById('job-container');
        const accomplishmentContainer = document.getElementById('job-accomplishment-container');
        const skillContainer = document.getElementById('skill-and-skill-level-container');
        const programmingareaContainer = document.getElementById('programming-area-and-language-container');
        const projectsContainer = document.getElementById('projects-form-container');
        const publicationsContainer = document.getElementById('publication-container');

        //  Get the Review container for appending data for Preview 
        let review_List = document.getElementById('review-list');

        // Clone and append Personal-Info-form-Container, disable inputs of all types
        review_List.append(personalinfoContainer.cloneNode(true));
        let personalinfoInputs = review_List.querySelectorAll('input, textarea')
        personalinfoInputs.forEach(input => {
            input.disabled = true
        });

        // Clone and append Overview form, disable inputs of all types
        let overviewInputs = null;
        review_List.append(overviewContainer.cloneNode(true));
        overviewInputs = review_List.querySelectorAll('textarea')
        overviewInputs.forEach(input => {
            input.disabled = true
        });

        // Clone and append Education-form, disable inputs of all types
        let educationInputs = null;
        review_List.append(educationContainer.cloneNode(true));
        educationInputs = review_List.querySelectorAll('input')
        educationInputs.forEach(input => {
            input.disabled = true
        });
        educationInputs = null;
        educationInputs = review_List.querySelectorAll('textarea')
        educationInputs.forEach(input => {
            input.disabled = true
        });

        // Clone and append Job-form, disable inputs of all types
        let jobformInputs = null;
        review_List.append(jobContainer.cloneNode(true));
        jobformInputs = review_List.querySelectorAll('input')
        jobformInputs.forEach(input => {
            input.disabled = true
        });
        jobformInputs = null;
        jobformInputs = review_List.querySelectorAll('textarea')
        jobformInputs.forEach(input => {
            input.disabled = true
        });

        // Clone and append Job-Accomplishment-form, disable textarea input
        let accomplishmentInputs = null;
        review_List.append(accomplishmentContainer.cloneNode(true));
        accomplishmentInputs = review_List.querySelectorAll('textarea')
        accomplishmentInputs.forEach(input => {
            input.disabled = true
        });

        // Clone and append Skill-form, disable inputs of all types
        let skillformInputs = null;
        let clone_skill_container = skillContainer.cloneNode(true);
        let skillformcontainer = document.getElementById('skill-forms-container');
        let skillformcontainerClone = clone_skill_container.querySelector('#skill-forms-container');
        let skillformcontainerCloneChilrenArray = [];

        // Add child elements of cloned skill-form 
        for (children of skillformcontainerClone.children) {
            skillformcontainerCloneChilrenArray.push(children)
        }

        // Pick the input's value from all children's of Orignal Skill form and
        // store in corresponding input's value for all children's of cloned Skill-form
        // for the purpose of Preview 
        let count = 0;
        for (let container of skillformcontainer.children) {
            skillformcontainerCloneChilrenArray[count].querySelector("#skill_level").value = container.querySelector("#skill_level").value;
            count++
        };

        review_List.append(clone_skill_container);
        skillformInputs = review_List.querySelectorAll('select')
        skillformInputs.forEach(input => {
            input.disabled = true
        });
        count = null;


        // Clone and append Programming-form, disable inputs of all types
        let programmingInputs = null;
        let clone_programming_container = programmingareaContainer.cloneNode(true);
        let programmingformcontainer = document.getElementById('programming-area-forms-container');
        let programmingformcontainerClone = clone_programming_container.querySelector('#programming-area-forms-container');
        let programmingformcontainerCloneChilrenArray = [];

        // Add child elements of cloned Programming-form 
        for (children of programmingformcontainerClone.children) {
            programmingformcontainerCloneChilrenArray.push(children)
        }

        // Pick the input's value from all children's of Orignal Programming form and
        // store in corresponding input's value for all children's of cloned Programming-form
        // for the purpose of Preview
        count = 0;
        for (let container of programmingformcontainer.children) {
            programmingformcontainerCloneChilrenArray[count].querySelector("#programming_area_name").value = container.querySelector("#programming_area_name").value;
            programmingformcontainerCloneChilrenArray[count].querySelector("#programming_language_name").value = container.querySelector("#programming_language_name").value;
            count++
        };


        review_List.append(clone_programming_container);
        programmingInputs = review_List.querySelectorAll('select')
        programmingInputs.forEach(input => {
            input.disabled = true
        });


        // Clone and append Projects-form, disable inputs of all types
        let projectsInputs = null;
        review_List.append(projectsContainer.cloneNode(true));
        projectsInputs = review_List.querySelectorAll('input')
        projectsInputs.forEach(input => {
            input.disabled = true
        });
        projectsInputs = null;
        projectsInputs = review_List.querySelectorAll('textarea')
        projectsInputs.forEach(input => {
            input.disabled = true
        });


        // Clone and append Publication-form, disable inputs of all types
        let publicationsInputs = null;
        review_List.append(publicationsContainer.cloneNode(true));
        publicationsInputs = review_List.querySelectorAll('textarea')
        publicationsInputs.forEach(input => {
            input.disabled = true
        });
        publicationsInputs = null;
        publicationsInputs = review_List.querySelectorAll('input')
        publicationsInputs.forEach(input => {
            input.disabled = true
        });

        console.log("review_list append personalInfo clone--------:", review_List);

    },

    getTokens: function (userData) {
        // Prepare the data object
        let data = {
            email: userData.email,
            password: 'doe1122334455!'
        };

        // Create the Request parameters
        let apiUrl = 'https://osamaaslam.pythonanywhere.com/api/auth/token/';
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        // Call the API
        return fetch(apiUrl, requestOptions)
            .then(response => {
                return response.json().then(tokens_json_response => {
                    if (!response.ok) {
                        return Promise.reject(response.status);
                    } else {
                        // Store the JSON response in a cookie
                        MyNamespace.tokensCookie(tokens_json_response);
                        return Promise.resolve(response.status);
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
                return Promise.reject(error);
            });
    },


    tokensCookie: function (tokens) {
        // Store the JSON response in a cookie
        let cookieValue = encodeURIComponent(JSON.stringify(tokens));
        document.cookie = `tokens=${cookieValue}; path=/; max-age=3600000; SameSite=Strict`;
    },

    userCredndialsCookie: function (data) {
        const cookieValue = encodeURIComponent(JSON.stringify(data));
        document.cookie = `userCredential=${cookieValue}; path=/;  max-age=360000; SameSite=Strict`;
    },

    resumeCookie: function (data) {
        console.log('data in cookie', data)

        // Check if data contains only one object
        if (data.length === 1) {
            let resumeCookieValue = encodeURIComponent(JSON.stringify(data[0]));
            document.cookie = `resume=${resumeCookieValue}; path=/; max-age=3600000; SameSite=Strict`;
        } else {
            // Store each object in a separate cookie
            console.log('data type of', typeof (data))

            for (resume of data) {
                let resumeCookieValue = encodeURIComponent(JSON.stringify(resume));
                document.cookie = `resume_${resume.id}=${resumeCookieValue}; path=/; max-age=3600000; SameSite=Strict`;
            }
        }
    },


    getCookieValue: function (name) {
        // Get all cookies as a single string
        let allCookies = document.cookie;

        // Split the string into individual cookies
        let cookiesArray = allCookies.split('; ');

        // Loop through each cookie
        for (let cookie of cookiesArray) {
            // Split each cookie into [name, value]
            let [cookieName, cookieValue] = cookie.split('=');

            // Check if the cookie name matches the name we are looking for
            if (cookieName === name) {
                try {
                    let decodedValue = decodeURIComponent(cookieValue);
                    if (decodedValue === 'undefined' || decodedValue === '') {
                        return null;
                    }
                    // Return the decoded cookie value
                    return JSON.parse(decodedValue);
                } catch (e) {
                    console.error('Error parsing JSON from cookie:', e);
                    return null;
                }
            }
        }
        // Return null if the cookie is not found
        return null;
    },

    // Function to check if user is logged-in
    LoggedIn: function (event) {

        MyNamespace.check_user_LoggedIn(event).then(([user, tokens]) => {

            if ((user !== null) && (tokens != null)) {
                alert("You are already logged-in")
                // window.location.href = 'personalinfo.html'
            } else {
                console.log(`Cookie with name "userCredentials" not found.`);
                alert("Please Log-In")
                window.location.href = 'read_user.html'
            }
        });
    },

    check_user_LoggedIn: function (event) {
        if (event) {
            event.preventDefault();
        }
        // // Extract the cookie value
        let cookieName = 'userCredential';
        let userData = MyNamespace.getCookieValue(cookieName);
        // Extract the tokens cookie value
        let tokensData = MyNamespace.getCookieValue('tokens');

        return new Promise((resolve, reject) => {

            if ((userData != null) && (userData != '')) {
                console.log("user data-------:", userData);

                if ((tokensData == null) || (tokensData == '')) {
                    // Get the JWT tokens and Store in 'tokens' Cookie
                    return MyNamespace.getTokens(userData)
                        .then(response => {
                            if (response.ok) {
                                tokensData = MyNamespace.getCookieValue('tokens');
                                resolve([userData, tokensData])
                            } else {
                                reject([userData, null])
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            reject(error);
                        });
                } else {
                    resolve([userData, tokensData])
                }
            } else {
                resolve([null, null])
            }
        });
    },

    getAllResumesForLoggedInUser: async function (user_id, tokens_data) {

        // Create the Request parameters
        const apiUrl = `https://osamaaslam.pythonanywhere.com/resume/get-personal-info-data-for-user/?user_id=${user_id}`;
        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${tokens_data.access}`
            },
        };

        // Call the API
        let response = await fetch(apiUrl, requestOptions)
        let data = await response.json();
        try {
            if (!response.ok) {
                let e = new Error();
                e.name = response.status.toString();
                e.message = data
                throw e
            }
            console.log('response data', data)
            return data
        }
        catch (error) {
            console.error(error);
            throw error
        };
    },
};




function formatDate(date) {
    // Helper function to format a Date object to YYYY-MM-DD
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


// areCookiesValid: function (current_userCredentials_value, current_tokens_value) {
//     // Here you might want to add additional checks like expiration validation
//     // Assuming tokens include expiry time, and checking if the tokens are expired
//     const tokensData = JSON.parse(tokens);
//     const now = new Date();
//     const expiryTime = new Date(tokensData.expiry); // Assuming the token has an 'expiry' field
//     if (expiryTime > now) {
//         return true;
//     } else {
//         return false;
//     }
// },