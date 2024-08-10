document.addEventListener('DOMContentLoaded', function (e) {

    const tipsContainer = document.querySelectorAll('#tips-container');
    const showTips = document.querySelectorAll('#show-tips')

    tipsContainer.forEach(tipsContainer => {
        tipsContainer.addEventListener('click', function (event) {
            event.preventDefault();

            const overviewContainer = document.getElementById('overview-container');
            const educationContainer = document.getElementById('education-container');
            const jobContainer = document.getElementById('job-container');
            const skillContainer = document.getElementById('skill-and-skill-level-container');

            if (overviewContainer.contains(event.target)) {
                tips_container(overviewContainer);
            }
            else if (educationContainer.contains(event.target)) {
                tips_container(educationContainer);
            }
            else if (jobContainer.contains(event.target)) {
                tips_container(jobContainer);
            }
            else {
                skillContainer.contains(event.target)
                tips_container(skillContainer);
            }


            showTips.forEach(showTips => {
                showTips.addEventListener('mouseout', function (e) {
                    showTips.style.display = 'none';
                });
            });

            showTips.forEach(showTips => {
                showTips.addEventListener('mouseover', function (event) {

                    if (overviewContainer.contains(event.target)) {
                        tips_container(overviewContainer);
                    }
                    else if (educationContainer.contains(event.target)) {
                        tips_container(educationContainer);
                    }
                    else if (jobContainer.contains(event.target)) {
                        tips_container(jobContainer);
                    }
                    else {
                        skillContainer.contains(event.target)
                        tips_container(skillContainer);
                    }
                });
            });
        });
    });
});



function tips_container(parentParentContainer) {
    console.log(" container", parentParentContainer)

    if (parentParentContainer) {
        parentParentContainer.style.position = 'relative';
        parentParentContainer.style.zIndex = '-1';

        const showTips = parentParentContainer.querySelectorAll('#show-tips');
        console.log("show tips", showTips)
        showTips.forEach(tip => {
            tip.style.display = 'block';
        });
    }
    parentParentContainer.style.zIndex = '1';
}









