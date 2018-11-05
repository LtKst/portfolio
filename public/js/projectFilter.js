var projects = document.getElementsByClassName("project");

function search(value) {
    if (value !== '') {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].getElementsByClassName('project-title')[0].innerHTML.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                projects[i].style.display = 'block';
            } else {
                projects[i].style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < projects.length; i++) {
            projects[i].style.display = 'block';
        }
    }
}

function filterTags() {
    
}