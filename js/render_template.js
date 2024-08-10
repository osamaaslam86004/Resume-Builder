

// Calling the function: openReadUserWindow
document.getElementById('get-request-crud-user').addEventListener('click', openReadUserWindow);

// Function definition
function openReadUserWindow() {
    // Open a new window or tab
    var newWindow = window.open('', '_blank');

    // Load the read_user.html document in the new window
    newWindow.location.href = 'read_user.html';
}