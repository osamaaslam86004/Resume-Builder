// 'static' memory between function calls
var last_userCredentials_value = MyNamespace.getCookieValue('userCredential');
var last_tokens_value = MyNamespace.getCookieValue('tokens');

if (((last_userCredentials_value == null) && (last_userCredentials_value == '')) ||
    (((last_tokens_value == null) || (last_tokens_value == '')))) {
    window.location.href = 'read_user.html'
}

// Initialize a flag for Redirection
var alertClosed = false;

// Periodic Polling 
// To Check Cookies Value Are Not Changed
var checkCookie = function () {

    return function () {

        let current_userCredentials_value = MyNamespace.getCookieValue('userCredential');
        let current_tokens_value = MyNamespace.getCookieValue('tokens');

        if (!(_.isEqual(last_userCredentials_value, current_userCredentials_value))
            && !(_.isEqual(last_tokens_value, current_tokens_value))) {

            alert("You are Logged-Out, Please Login!")
            window.location.href = "read_user.html"
        } else {
            // Update the last known values
            last_userCredentials_value = current_userCredentials_value;
            last_tokens_value = current_tokens_value;
        }
    };
}();
window.setInterval(checkCookie, 5000); // run every 5 sec


document.addEventListener('DOMContentLoaded', () => {

    // Event For Closing The Alert
    let alertButton = document.getElementById('alert-button')
    alertButton.addEventListener('click', redirect_On_Alert_Close);

    document.getElementById('submit-btn-review').addEventListener('click', e => {
        e.preventDefault();
        e.target.disabled = true;

        let getformData = MyNamespace.getPersonalInfoForm();
        getformData = dateInputToEmptyString(getformData);
        console.log('form data settings dates', getformData)

        // Call Backend API to submit the form
        submitPersonalInfoForm(getformData, last_userCredentials_value, last_tokens_value)
            .then(data => {
                // console.log('response data in Submit form', data)
                MyNamespace.alertInfoFunction('Resume Is Created Successfully!')
            })
            .catch(error => {
                console.error('Error details here:', error);
            })
            .finally(() => {
                e.target.disabled = false;  // Re-enable the button after the request is complete
            });
    });
});


function redirect_On_Alert_Close(event, alertClosed) {
    MyNamespace.closeAlert(event);

    alertClosed = true;
    // Redirect to the template page after alert is closed
    window.location.href = 'template.html';
}

function submitPersonalInfoForm(getformData, userData, tokensData) {
    return new Promise((resolve, reject) => {

        // Show the loading spinner
        document.getElementById('loader').style.display = 'block';

        // Prepare the data object
        getformData['user_id'] = userData.id
        console.log('user id in form', getformData['user_id'])

        // Create the Request parameters
        const apiUrl = 'https://osamaaslam.pythonanywhere.com/resume/api/get-personal-info-data/';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokensData.access}`
            },
            body: JSON.stringify(getformData),
        };
        console.log('Authorization ------------ :', requestOptions.Authorization)
        console.log('body ------------ :', requestOptions.body)

        // Call the API
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        reject(new Error('Data not found'));
                    } else if (response.status === 500) {
                        reject(new Error(`Server Error${response.status}`));
                    } else if (response.status === 401) {
                        return response.json().then(data => {
                            reject(new Error(data));
                        });
                    } else {
                        return response.json().then(data => {
                            reject(new Error(data));
                        });
                    }
                }
                return response.json();
            })
            .then(data => {
                // Store the JSON response in a cookie
                console.log('response data before creating Resume cookie-------', data)
                let cookieValue = encodeURIComponent(JSON.stringify(data));
                document.cookie = `resume = ${cookieValue}; path = /; max-age=3600000; secure; SameSite=Strict`;
                resolve(data);  // Resolve the promise with the token data
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            })
            .finally(() => {
                // Hide the loading spinner after processing
                document.getElementById('loader').style.display = 'none';
            });
    });
}


// Set the Date Inputs's in YYYY-MM-DD (server-side format)
function dateInputToEmptyString(getformData) {
    // Check and convert education dates
    for (let education of getformData.education) {
        if (education.education_start_date === 'NaN-NaN-NaN') {
            education.education_start_date = '';
        }
        if (education.education_end_date === 'NaN-NaN-NaN') {
            education.education_end_date = '';
        }
        education = null;
    }

    // Check and convert job dates
    let job = getformData.job;
    if (job.job_start_date === 'NaN-NaN-NaN') {
        job.job_start_date = '';
    }
    if (job.job_end_date === 'NaN-NaN-NaN') {
        job.job_end_date = '';
    }

    return getformData;
}