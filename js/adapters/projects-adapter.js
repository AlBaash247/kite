
const projectListItemTemplate = document.querySelector('#projectListItemTemplate');
const projectsContainer = document.querySelector('#projectsContainer');

export function adapter(projects) {

    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = projectListItemTemplate.content.cloneNode(true);

    const listItem = clone.querySelector('#listItem');
    const linkElement = clone.querySelector('#linkElement');
    const projectTitle = clone.querySelector('#projectTitle');

    listItem.dataset.project_id = project.id;
    projectTitle.innerText = project.project_name;

    index == 0 ? linkElement.classList.add("active") : null;

    projectsContainer.appendChild(clone);

}