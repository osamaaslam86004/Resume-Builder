// Add eventListner's to form 'Submit' button
// and 'Create User' link tag in <nav> bar
document.addEventListener('DOMContentLoaded', function (e) {
    // Append EventListener to the Submit button
    const form = document.getElementById('crud-user-form');
    form.addEventListener('submit', event => {
        Get_User_Details_Form(event);
    });

    let create_user_element = document.getElementById('post-request-crud-user');
    create_user_element.addEventListener('click', event => {
        Create_User(event);
    });

    // Since userCredentials is present, get the tokens and redirect the user
    // to Create Resume Builder page
    const userCredentials = MyNamespace.getCookieValue('userCredential');
    getTokensForUser(userCredentials);

});

async function getTokensForUser(userCredentials) {
    // Append EventListener to the Submit button
    if ((userCredentials != null) && (userCredentials != '')) {

        tokenData = MyNamespace.getCookieValue('tokens')

        if ((tokenData == null) && (tokenData == '')) {

            let response_status = await MyNamespace.getTokens(userCredentials);
            if (response_status == '404') {
                alert('You have not created account!')
                window.location.href = 'create_user.html'
            } else if (response_status == '200') {
                // if status 200
                alert('You are Logged-In!');
                window.location.href = 'personalinfo.html'
            } else {
                alert(`${response_status}` + `gettokensForUser`)
            }
        }
    }
};


async function Get_User_Details_Form(event) {
    event.preventDefault();
    event.target.disabled = true;

    // Create the form instance
    let formData = new FormData(event.target);
    // Create a dictionary using form
    let data = Object.fromEntries(formData.entries());
    console.log("form dictionary--------:", data)

    // SEND A API REQUEST TO CREATE A USER
    let apiUrl = 'https://osamaaslam.pythonanywhere.com/api/auth/get-api-user-id-for-user/';

    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        // Call the API
        let response = await fetch(apiUrl, requestOptions);
        let json_response_data = await response.json();

        if (!response.ok) {
            console.log(json_response_data)
            throw new Error(response.status);
        } else {
            // Create user credentials cookie
            MyNamespace.userCredndialsCookie(json_response_data);
            // Create 'tokens' cookie
            await MyNamespace.getTokens(json_response_data);
            alert('You are Log-In!');
            window.location.href = 'personalinfo.html';
        }
    } catch (error) {
        if (error.message == '404') {
            alert('You have not created account!')
            window.location.href = 'create_user.html'
        } else if (error.message == '400') {
            alert('Enter Correct Credentials!')
        } else {
            alert(`${error.message}` + 'something went wrong! Plaese try again')
        }
    }
};



function Create_User(event) {
    event.preventDefault();
    let userData = MyNamespace.getCookieValue('userCredential');

    if ((userData == null) || (userData == '')) {
        window.location.href = 'create_user.html'
    } else {
        alert('Your Have Already Created An Account!')
    }
};


// const data = {

//     email: 'johndoe@example.com',
//     username: 'John Doe',
//     password: 'doe1122334455!'
// };

// Redirect the user back to the referring page
// if (document.referrer) {
//     window.location.href = document.referrer;
// } else {
//     console.error('No referrer found');
// }