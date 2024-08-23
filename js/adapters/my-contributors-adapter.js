import { storeSelectedProjectId, getSelectedProjectId } from "../constants/my-store.js";

const myContributorsTemplate = document.querySelector('#myContributorsTemplate');
const myContributorsProjectCard = document.querySelector('#myContributorsProjectCard');

export function adapterContributors(projects) {
    projects.forEach((project, index) => {
        createListItem(project, index);
    });
}

function createListItem(project, index) {

    const clone = myContributorsTemplate.content.cloneNode(true);

    const myContributorsAccordionBtnProjectTitle = clone.querySelector('#myContributorsAccordionBtnProjectTitle');
    const myContributorsCollapsePanelContributors = clone.querySelector('#myContributorsCollapsePanelContributors');
    const myContributorsBtnAddContributor = clone.querySelector('#myContributorsBtnAddContributor');


    myContributorsBtnAddContributor.onclick = function () {
        storeSelectedProjectId(index);
        alert(getSelectedProjectId());
    }

    // Change the id
    myContributorsCollapsePanelContributors.id = 'myContributorsCollapsePanelContributors_' + index;

    // Change the data-bs-target attribute
    myContributorsAccordionBtnProjectTitle.setAttribute('data-bs-target', '#myContributorsCollapsePanelContributors_' + index);

    // Change the aria-controls attribute
    myContributorsAccordionBtnProjectTitle.setAttribute('aria-controls', 'myContributorsCollapsePanelContributors_' + index);

    myContributorsProjectCard.appendChild(clone);



}