import { storeSelectedProjectId, getSelectedProjectId } from "../constants/my-store.js";

const myContributortionsTemplate = document.querySelector('#myContributortionsTemplate');
const myContributionsRowContainer = document.querySelector('#myContributionsRowContainer');

export function adapterContribution(projects) {
    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = myContributortionsTemplate.content.cloneNode(true);

    const myContributionsProjectIndex = clone.querySelector('#myContributionsProjectIndex');
    const myContributionsProjectAuthor = clone.querySelector('#myContributionsProjectAuthor');
    const myContributionsProjectName = clone.querySelector('#myContributionsProjectName');
    const myContributionsProjectBtnExitProject = clone.querySelector('#myContributionsProjectBtnExitProject');

    myContributionsProjectIndex.innerText = (index+1);
    myContributionsProjectAuthor.innerText = project.author_name;
    myContributionsProjectName.innerText = project.project_name;

    myContributionsProjectBtnExitProject.onclick = function () {
        storeSelectedProjectId(index);
        alert(getSelectedProjectId());
    }

    myContributionsRowContainer.appendChild(clone);
}