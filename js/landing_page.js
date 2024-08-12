const userData_cookieValue = MyNamespace.getCookieValue('userCredential');
const tokens_cookieValue = MyNamespace.getCookieValue('tokens');

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function (e) {

    // Attach event listener to the "Build Resume" link
    let build_resume = document.getElementById('get-resume-template');
    build_resume.addEventListener('click', buildResume);

    // Attach event listener to the "Login User" link
    let login_user = document.getElementById('get-request-crud-user')
    login_user.addEventListener('click', event => {
        MyNamespace.LoggedIn(event);
    });

    // Attach event listener to the "Start Building" button
    let start_building = document.getElementById('start-building')
    start_building.addEventListener('click', openCreateUserPage);

    // Attach event listener to the "Sign-up" link
    let sign_up = document.getElementById('post-request-crud-user')
    sign_up.addEventListener('click', openCreateUserPage);
});



async function buildResume(event) {
    event.preventDefault();
    if ((userData_cookieValue == null) || (userData_cookieValue == '')) {
        window.location.href = 'create_user.html';

    } else {
        if (((userData_cookieValue != null) && (userData_cookieValue != ''))) {

            if (((tokens_cookieValue != null) && (tokens_cookieValue != ''))) {

                //  Call The API To List All Resumes For User
                let response = await MyNamespace.getAllResumesForLoggedInUser(userData_cookieValue.id, tokens_cookieValue);
                try {
                    if ((response != null) && (response != '')) {
                        window.location.href = 'template.html'
                    } else {
                        alert('You Have Not Created Resume, Please Create First!')
                    }
                }
                catch (e) {
                    if (e.name == '500') {
                        window.location.href = 'index.html'
                    } else {
                        console.log(e.name, e.message)
                    }
                }

            } else {
                alert("Not Logged-In, Please Logged-In First!")
                window.location.href = 'read_user.html';
            }
        }
    }
};


function openCreateUserPage(event) {
    event.preventDefault();
    // check if 'userCredentials' cookie exists
    if ((userData_cookieValue != null) && (userData_cookieValue != '')) {
        // check if 'tokens' cookie exists
        if ((tokens_cookieValue == null) || (tokens_cookieValue == '')) {
            // create 'tokens' cookie
            return MyNamespace.getTokens(userData_cookieValue)
                .then(response_status_code => {
                    if (response_status_code != '200') {
                        alert('Something went wrong, Please try again!')
                        window.location.href = 'landing_page.html';
                    } else {
                        // Redirect user to Create resume
                        window.location.href = 'personalinfo.html';
                    }
                });
        } else {
            window.location.href = 'personalinfo.html';
        }
    }
    else {
        window.location.href = 'create_user.html';
    }
};




