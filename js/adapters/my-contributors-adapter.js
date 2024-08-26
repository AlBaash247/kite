import { storeSelectedProjectId, getSelectedProjectId } from "../constants/my-store.js";

const myContributorsTemplate = document.querySelector('#myContributorsTemplate');
const myContributorsRowContainer = document.querySelector('#myContributorsRowContainer');

export function adapterContributors(projects) {
    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = myContributorsTemplate.content.cloneNode(true);

    const myContributorsIndex = clone.querySelector('#myContributorsIndex');
    const myContributorsProjectName = clone.querySelector('#myContributorsProjectName');
    const myContributorsName = clone.querySelector('#myContributorsName');
    const myContributionsEmail = clone.querySelector('#myContributionsEmail');
    const myContributorsBtnRemoveContributor = clone.querySelector('#myContributorsBtnRemoveContributor');

    myContributorsIndex.innerText = (index + 1);
    myContributorsProjectName.innerText = project.project_name;
    myContributorsName.innerText = project.contributor_name;
    myContributionsEmail.innerText = project.contributor_email;

    myContributorsBtnRemoveContributor.onclick = function () {
        alert(project.project_id);
    }

    myContributorsRowContainer.appendChild(clone);

}