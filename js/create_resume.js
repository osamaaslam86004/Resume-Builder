// 'static' memory between function calls
let last_userCredentials_value = MyNamespace.getCookieValue('userCredential');
let last_tokens_value = MyNamespace.getCookieValue('tokens');

// Periodic Polling 
// To Check Cookies Value Are Not Changed
var checkCookie = function () {

    return function () {

        let current_userCredentials_value = MyNamespace.getCookieValue('userCredential');
        let current_tokens_value = MyNamespace.getCookieValue('tokens');

        if (!(_.isEqual(last_userCredentials_value, current_userCredentials_value))
            && !(_.isEqual(last_tokens_value, current_tokens_value))) {
            console.log(last_tokens_value);
            console.log(last_userCredentials_value)

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
    document.getElementById('submit-btn-review').addEventListener('click', e => {
        e.preventDefault();
        e.target.disabled = true;

        let userData = MyNamespace.getCookieValue('userCredentials');
        let tokensData = MyNamespace.getCookieValue('tokens');

        let getformdata = MyNamespace.getPersonalInfoForm();
        // Call Backend API to submit the form
        submitPersonalInfoForm(getformdata, userData, tokensData)
            .then(data => {
                console.log('response data in Submit form', data)
            })
            .catch(error => {
                console.error('Error details here:', error);
            })
            .finally(() => {
                e.target.disabled = false;  // Re-enable the button after the request is complete
            });
    });
});




function submitPersonalInfoForm(getformData, userData, tokensData) {
    return new Promise((resolve, reject) => {
        // Prepare the data object
        getformData['user_id'] = userData.id

        // Create the Request parameters
        const apiUrl = 'https://osamaaslam.pythonanywhere.com/resume/api/get-personal-info-data/';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": `Bearer ${tokensData.access}`
            },
            body: JSON.stringify(getformData),
        };
        console.log('request parameneter ------------ :', requestOptions)
        console.log('Authorization ------------ :', requestOptions.headers.Authorization)

        // Call the API
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        reject(new Error('Data not found /resume/api/get-personal-info-data/'));
                    } else if (response.status === 500) {
                        reject(new Error('Server error for /resume/api/get-personal-info-data/'));
                    } else if (response.status === 401) {
                        return response.json().then(data => {
                            reject(new Error(`${data} for /resume/api/get-personal-info-data/`));
                        });
                    } else {
                        return response.json().then(data => {
                            reject(new Error(`${data} for /resume/api/get-personal-info-data/`));
                        });
                    }
                }
                return response.json();
            })
            .then(data => {
                // Store the JSON response in a cookie
                console.log('response data before creating Resume cookie-------', data)
                let cookieValue = encodeURIComponent(JSON.stringify(data));
                document.cookie = `resume=${cookieValue}; path=/; max-age=3600000; secure; SameSite=Strict`;
                console.log('Document cookie after setting:', document.cookie);
                resolve(data);  // Resolve the promise with the token data
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}



