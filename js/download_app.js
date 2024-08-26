document.addEventListener('DOMContentLoaded', function () {
    const androidApp = document.getElementById('download-android-app');
    const windowsApp = document.getElementById('download-windows-app');

    androidApp.addEventListener('click', function () {
        downloadAPK(androidApp)
    });
    windowsApp.addEventListener('click', function () {
        downloadWindowsApp(windowsApp)
    });

});

function downloadAPK(androidApp) {

    androidApp.setAttribute('download', '')

}

function downloadWindowsApp(windowsApp) {

    windowsApp.setAttribute('download', '')

}