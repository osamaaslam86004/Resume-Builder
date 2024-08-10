const userData_cookieValue = MyNamespace.getCookieValue('userCredential');
const tokens_cookieValue = MyNamespace.getCookieValue('tokens');

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function (e) {

    // Attach event listener to the "Build Resume" link
    let build_resume = document.getElementById('post-resume');
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



function buildResume(event) {
    event.preventDefault();
    if ((userData_cookieValue == null) || (userData_cookieValue == '')) {
        window.location.href = 'create_user.html';
    } else if (((userData_cookieValue != null) && (userData_cookieValue == '')) && ((tokens_cookieValue != null) && (tokens_cookieValue == ''))) {
        MyNamespace.getTokens(userData_cookieValue).then(response_status_code => {
            if (response_status_code == '200') {
                window.location.href = 'personalinfo.html';
            } else if (response_status_code == '401') {
                window.location.href = 'read_user.html';
            } else {
                alert('Something Went Wrong, Try Again!')
            }
        });
    } else {
        window.location.href = "personalinfo.html"
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




