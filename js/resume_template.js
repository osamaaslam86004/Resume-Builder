// Initialize Array
var resumeStorage = []

document.addEventListener('DOMContentLoaded', async function () {
    // Ensure resume is populated before proceeding
    try {
        // Wait for the resume data to be fetched and rendered
        const user_data = MyNamespace.getCookieValue('userCredential');
        const tokens_data = MyNamespace.getCookieValue('tokens');

        if ((user_data != null) && (user_data != '')) {

            // Check the tokens and then render the resume
            if ((tokens_data != null) && (tokens_data != '')) {

                resumeStorage = await renderResume(user_data, tokens_data);
            }

        } else {
            window.location.href = 'read_user.html';
            return; // Exit early to prevent further code execution
        }

        if ((resumeStorage != null) && (resumeStorage != '')) {

            let id = 0; let resume_index = 0;
            resumeStorage.forEach((resume, index) => {

                if (resume.id > id) {
                    id = resume.id
                    resume_index = index
                }
            });

            // Render Only Latest Created Resume
            renderResumeHelper(resumeStorage[resume_index]);


        } else {
            console.log('resume Data in eventListener', resumeStorage);
            renderResumeHelper(resumeStorage);
        }

    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
});

// Get All Resume For User From API
async function renderResume(user_data, tokens_data) {

    console.log('resumeData:', resumeStorage);

    if ((resumeStorage == null) || (resumeStorage == '')) {
        // Call Backend API to Get data for user's Resume
        let data = await getAllResumeForUser(user_data, tokens_data);
        if (data) {

            // Create the Resume Storage
            resumeDataStorage(data);
        }
        return data; // Return the fetched resume data

    } else if (resumeStorage) {

        console.log('resumeStorage already exist:', resumeStorage);
        return;

    } else {
        window.location.href = 'personalinfo.html';
    }
}

// Call API To Collect Data 
async function getAllResumeForUser(user_data, tokens_data) {

    // Create the Request parameters
    const apiUrl = `https://osamaaslam.pythonanywhere.com/resume/get-personal-info-data-for-user/?user_id=${user_data.id}`;
    let requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${tokens_data.access}`
        },
    };
    // console.log('request options', requestOptions)

    // Call the API
    let response = await fetch(apiUrl, requestOptions)
    try {
        if (!response.ok) {
            if (response.status === 404) {
                new Error('Not Found /resume/get-personal-info-data-for-user/');
            } else if (response.status === 500) {
                return response.json().then(data => {
                    throw new Error(`${data} for /resume/get-personal-info-data-for-user/`);
                });
            } else if (response.status === 401) {
                return response.json().then(data => {
                    throw new Error(`${data} for /resume/get-personal-info-data-for-user/`);
                });
            } else {
                return response.json().then(data => {
                    throw new Error(`${data} for /resume/get-personal-info-data-for-user/`);
                });
            }
        }
        let data = await response.json();
        console.log('response data in Submit form', data)
        return data
    }
    catch (error) {
        console.error(error);
    };
}

// Store Resume data From API in variable resumeStorage
function resumeDataStorage(data) {

    // Check if data contains only one object
    if (data.length === 1) {

        resumeStorage = data[0];

    } else {

        for (resume of data) {
            resumeStorage.push(resume);
        }
    }
}

// Convert Skill Levels to Percentage
function getskillLevel(skillLevel) {
    if (skillLevel === 'Beginner') {
        return '25'
    } else if (skillLevel === 'Intermediate') {
        return '50'
    } else if (skillLevel === 'Advanced') {
        return '75'
    } else if (skillLevel === 'Expert') {
        return '100'
    } else {
        return '0'
    }
}

// Get URL path name
function geturlPath(urlString) {

    // Create a new URL object
    let url = new URL(urlString);

    // Get the pathname part of the URL
    let path = url.pathname;
    return path
}

// Render the Template by Inserting the Resume Data
function renderResumeHelper(resumeData) {
    // console.log('resumeData inside Helper', resumeData)

    if ((resumeData.first_name && resumeData.last_name) || resumeData.middle_name) {
        let fullNamefromCookie = resumeData.first_name + ' ' + resumeData.last_name + ' ' + resumeData.middle_name
        let fullName = document.getElementById("first-middle-last-name");
        fullName.innerHTML = fullNamefromCookie;
    }

    if (resumeData.locality || resumeData.region) {
        let localityRegion = document.getElementById("locality-region");
        localityRegion.innerHTML = resumeData.locality + ' ' + resumeData.region;
    }

    if (resumeData.facebook && resumeData.github && resumeData.linkedin && resumeData.email && resumeData.twittername) {
        let facebookId = document.getElementById("facebook-id-path-name");
        facebookId.innerHTML = geturlPath(resumeData.facebook);

        let githubId = document.getElementById("github-id-path-name");
        githubId.innerHTML = geturlPath(resumeData.github);

        let gmailId = document.getElementById("gmail-id-path-name");
        gmailId.innerHTML = resumeData.email;

        let twitterId = document.getElementById("twitter-id-path-name");
        twitterId.innerHTML = geturlPath(resumeData.twittername);

        let linkedinId = document.getElementById("linkedin-id-path-name");
        linkedinId.innerHTML = geturlPath(resumeData.linkedin);
    }


    let programmingArea = resumeData.programming_area || [];
    // console.log(programmingArea)
    let list_front_end_languages = []
    let list_backend_languages = []

    // use forEach / for .. of..
    programmingArea.forEach(programming_area => {
        if (programming_area.programming_area_name == 'FRONTEND') {
            list_front_end_languages.push(programming_area.programming_language_name);
        } else {
            list_backend_languages.push(programming_area.programming_language_name);
        }
    });

    // console.log('Frontend Languages:', list_front_end_languages);
    // console.log('Backend Languages:', list_backend_languages);

    let front_end_languages_p_tag = document.getElementById('list-front-end-languages');
    let backend_languages_p_tag = document.getElementById('list-backend-languages');

    front_end_languages_p_tag.innerHTML = list_front_end_languages;
    backend_languages_p_tag.innerHTML = list_backend_languages;

    let skill = resumeData.skill;
    console.log('skills------', skill)
    skill.forEach((skill, index) => {

        if (index == 0) {
            let skill_text = document.getElementById('skill-text');
            skill_text.innerHTML = skill.text;

            // Map Skill Level To Percentage
            let skillLevel = getskillLevel(skill.skill_level);
            let progressBar = document.getElementById('progress-bar');
            // Set the Width and innerHTML To Percentage
            // progressBar.style.width = skillLevel;
            // progressBar.innerHTML = skillLevel
            progressBar.value = skillLevel;
            progressBar.innerHTML = skillLevel

        }
        else {
            let skillClone = document.getElementById('skill').cloneNode(true);

            let skilltextClone = skillClone.querySelector('#skill-text');
            skilltextClone.innerHTML = skill.text;
            skilltextClone.id = `skill-text+${index}`

            progressBarClone = skillClone.querySelector('#progress-bar');
            progressBarClone.id = `progress-bar+${index}`

            let skillLevelClone = getskillLevel(skill.skill_level);
            // progressBarClone.style.width = skillLevelClone
            // progressBarClone.innerHTML = skillLevelClone
            progressBar.value = skillLevelClone
            progressBar.innerHTML = skillLevelClone

            document.getElementById('skills-container').append(skillClone)
        }
    });

    let companyName_pTag = document.getElementById('company-name');
    let companylocation_pTag = document.getElementById('company-location');
    let startDate_pTag = document.getElementById('company-start-date');
    let endDate_pTag = document.getElementById('company-end-date');
    let accomplishment = document.getElementById('accomplishment');

    companyName_pTag.innerHTML = resumeData.job.company;
    companylocation_pTag.innerHTML = resumeData.job.location;
    startDate_pTag.innerHTML = resumeData.job.job_start_date;
    endDate_pTag.innerHTML = resumeData.job.job_end_date;

    accomplishment.innerHTML = resumeData.job.accomplishment.job_accomplishment;



    let projects = resumeData.projects;
    projects.forEach((project, index) => {

        if (index == 0) {
            let projectName = document.getElementById('project-name');
            projectName.innerHTML = project.project_name;

            let projectURL = document.getElementById('project-url');
            projectURL.innerHTML = project.link;

            let projectshortDescription = document.getElementById('short-description');
            projectshortDescription.innerHTML = project.short_description;
        }
        else {
            let projectClone = document.getElementById('projects-container').cloneNode(true);

            let projectName = projectClone.querySelector('#project-name');
            projectName.innerHTML = project.project_name;
            projectName.id = `project-name+${index}`

            let projectURL = projectClone.querySelector('#project-url');
            projectURL.innerHTML = project.link;
            projectURL.id = `project-url+${index}`

            let projectshortDescription = projectClone.querySelector('#short-description');
            projectshortDescription.innerHTML = project.short_description;
            projectshortDescription.id = `short-description+${index}`

            document.getElementById('projects-container').append(projectClone)
        }
    });


    let educations = resumeData.education;
    educations.forEach((education, index) => {

        if (index === 0) {
            let educationDetails = document.getElementById('education-degree-name-start-end-date');
            educationDetails.innerHTML = education.degree
                + '   |  ' + education.name + '   |  ' + education.education_start_date + '  -  ' + education.education_end_date;

        }
        else {
            let educationClone = document.getElementById('education-template-container').cloneNode(true);
            // Updating the id of Template Container
            educationClone.id = `education-template-container+${index}`;

            // Updating the id of <p> inside the Template Container
            let educationDetailsClone = educationClone.querySelector('#education-degree-name-start-end-date');
            educationClone.id = `education-degree-name-start-end-date+${index}`;

            educationDetailsClone.innerHTML = education.degree
                + '   |  ' + education.name + '   |  ' + education.education_start_date + '  -  ' + education.education_end_date;

            document.getElementById('education-template-container').append(educationClone)
            educationDetailsClone = null;
        }
    });



    let publications = resumeData.publications;
    publications.forEach((publication, index) => {
        console.log(publication)

        if (index == 0) {
            let publicationName = document.getElementById('publication-title');
            publicationName.innerHTML = publication.title;

            let publicationJournal = document.getElementById('publication-journal');
            publicationJournal.innerHTML = publication.journal;

            let publicationYear = document.getElementById('publication-year');
            publicationYear.innerHTML = publication.year;

            let publicationAuthor = document.getElementById('publication-name');
            publicationAuthor.innerHTML = publication.authors;

            let publicationUrl = document.getElementById('publication-url');
            publicationUrl.href = publication.link;
            publicationUrl.innerHTML = publication.title;
        }
        else {
            let publicationClone = document.getElementById('publications-template-container').cloneNode(true);
            publicationClone.id = `publications-template-container+${index}`;

            let publicationCloneName = publicationClone.querySelector('#publication-title');
            publicationCloneName.innerHTML = publication.title;
            publicationCloneName.id = `publication-title+${index}`;

            let publicationCloneJournal = publicationClone.querySelector('#publication-journal');
            publicationCloneJournal.innerHTML = publication.journal;
            publicationCloneJournal.id = `publication-journal+${index}`;

            let publicationCloneYear = publicationClone.querySelector('#publication-year');
            publicationCloneYear.innerHTML = publication.year;
            publicationCloneYear.id = `publication-year+${index}`;

            let publicationCloneAuthor = publicationClone.querySelector('#publication-name');
            publicationCloneAuthor.innerHTML = publication.authors;
            publicationCloneAuthor.id = `publication-name+${index}`;

            let publicationCloneURL = publicationClone.querySelector('.publication-url a');
            publicationCloneURL.href = publication.link;
            publicationCloneURL.innerHTML = publication.title;
            publicationCloneURL.id = `publication-url+${index}`;

            document.getElementById('publications-template-container').append(publicationClone)

        }
    });

}

