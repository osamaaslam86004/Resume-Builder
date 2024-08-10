document.addEventListener('DOMContentLoaded', function () {
    // Attach the event listener to the body for delegation

    const FormContainer = document.getElementById('personal-info-form');
    // Select all child elements of the container
    let childElements = FormContainer.querySelectorAll('*');

    // Iterate over each child element
    childElements.forEach(element => {
        element.addEventListener('focus', function (e) {

            if (!element.classList.contains('submit-btn')) {

                const personalInfoContainer = document.getElementById('personal-info-container');
                const overviewContainer = document.getElementById('overview-container');
                const educationContainer = document.getElementById('education-container');
                const jobContainer = document.getElementById('job-container');
                const accomplishmentContainer = document.getElementById('job-accomplishment-container');
                const skillContainer = document.getElementById('skill-and-skill-level-container');
                const programmingAreaContainer = document.getElementById('programming-area-and-language-container');
                const projectsContainer = document.getElementById('projects-form-container');
                const publicationsContainer = document.getElementById('publication-container');


                const TrackingContainer = document.getElementById('tracking');


                if (overviewContainer.contains(e.target)) {
                    const overviewTrackingDiv = TrackingContainer.querySelector('#tracking-overview:not(.completed)');
                    addClassList(overviewTrackingDiv);
                }
                else if (personalInfoContainer.contains(e.target)) {
                    const personalinfoTrackingDiv = TrackingContainer.querySelector('#tracking-personal-info:not(.completed)');
                    addClassList(personalinfoTrackingDiv);
                }
                else if (educationContainer.contains(e.target)) {
                    const educationTrackingDiv = TrackingContainer.querySelector('#tracking-education:not(.completed)');
                    addClassList(educationTrackingDiv);
                }
                else if (jobContainer.contains(e.target)) {
                    const jobTrackingDiv = TrackingContainer.querySelector('#tracking-job:not(.completed)');
                    addClassList(jobTrackingDiv);
                }
                else if (accomplishmentContainer.contains(e.target)) {
                    const accomplishmentTrackingDiv = TrackingContainer.querySelector('#tracking-accomplishment:not(.completed)');
                    addClassList(accomplishmentTrackingDiv);
                }
                else if (programmingAreaContainer.contains(e.target)) {
                    const programmingAreaTrackingDiv = TrackingContainer.querySelector('#tracking-programming-area:not(.completed)');
                    addClassList(programmingAreaTrackingDiv);
                }
                else if (projectsContainer.contains(e.target)) {
                    const projectsTrackingDiv = TrackingContainer.querySelector('#tracking-projects:not(.completed)');
                    addClassList(projectsTrackingDiv);
                }
                else if (publicationsContainer.contains(e.target)) {
                    const publicationsTrackingDiv = TrackingContainer.querySelector('#tracking-publications:not(.completed)');
                    addClassList(publicationsTrackingDiv);
                }
                else {
                    skillContainer.contains(e.target)
                    const skillTrackingDiv = TrackingContainer.querySelector('#tracking-skill:not(.completed)');
                    addClassList(skillTrackingDiv);
                }
            }
        });
    });
});



function addClassList(elementTrackingDiv) {

    // Get the first child
    childTrackingDiv = elementTrackingDiv.querySelector('.order-tracking')

    if (childTrackingDiv) {
        childTrackingDiv.classList.add('completed');
    }
}