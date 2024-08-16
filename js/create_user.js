document.addEventListener('DOMContentLoaded', function (e) {
    // Attach event listener to the ""Log-In" link in <nav> bar
    let logIn = document.getElementById('get-request-crud-user');

    logIn.addEventListener('click', event => {
        // Function to check if user is logged-in
        MyNamespace.LoggedIn(event);
    });

    // Append EventListener to the Submit button
    let form = document.getElementById('crud-user-form');
    form.addEventListener('submit', e => {
        Submit_User_Creation_Form(e);
    });

    // Event For Closing The Alert
    let alertButton = document.getElementById('alert-button')
    alertButton.addEventListener('click', event => {
        MyNamespace.closeAlert(event);
    });
});


async function Submit_User_Creation_Form(e) {
    e.preventDefault();  // Prevent the default action if necessary
    e.target.disabled = true;

    // Show the loading spinner
    document.getElementById('loader').style.display = 'block';

    // Create the form instance
    let formData = new FormData(e.target);
    // Create a dictionary using form
    let data = Object.fromEntries(formData.entries());
    console.log("form dictionary--------:", data);

    let apiUrl = 'https://osamaaslam.pythonanywhere.com/api/auth/crud-user/';

    // Create the Request parameters
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    console.log("json data---------:", requestOptions.body);

    try {
        // Call the API
        let response = await fetch(apiUrl, requestOptions);
        let json_response_data = await response.json();

        if (!response.ok) {
            throw new Error(response.status);

        } else {
            // Store the JSON response in a cookie
            MyNamespace.userCredndialsCookie(json_response_data);
            // Render Alert
            MyNamespace.alertInfoFunction('Your Account is created, Please Log-In');
            // window.location.href = 'read_user.html';
        }
    } catch (error) {

        console.error(error.message);

        if (error.message = '400') {
            MyNamespace.alertInfoFunction("Already Have Account! Please Login")
            // window.location.href = "read_user.html"

        } else {
            MyNamespace.alertInfoFunction("Something went wrong! Try Again")
        }
    } finally {
        e.target.disabled = false;

        // Hide the loading spinner after processing
        document.getElementById('loader').style.display = 'none';

    }
};
