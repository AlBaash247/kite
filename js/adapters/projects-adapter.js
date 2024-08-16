
import { API_KEY_PROJECT_ID } from "../constants/api.js";
import { fetchTasks } from '../handlers/kite-tasks.js';
import { storeSelectedProjectId } from "../constants/store-keys.js";

const projectListItemTemplate = document.querySelector('#projectListItemTemplate');
const projectsContainer = document.querySelector('#projectsContainer');
const projectListItems = document.getElementsByClassName('nav-link');

export function adapter(projects) {
    projectsContainer.innerHTML = "";
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

    if (index == 0) {
        storeSelectedProjectId(listItem.dataset.project_id);
        linkElement.classList.add("active");
        var jsonRequestBody = {};
        jsonRequestBody[API_KEY_PROJECT_ID] = listItem.dataset.project_id;
        fetchTasks(jsonRequestBody);
    }


    listItem.onclick = function () {
        storeSelectedProjectId(listItem.dataset.project_id);

        // we cannot use foreach here directly because, projectListItems is a collection!!!
        Array.prototype.forEach.call(projectListItems, i => {
            console.log(i.id);
            i.classList.remove('active')
        });
        linkElement.classList.add("active");
        var jsonRequestBody = {};
        jsonRequestBody[API_KEY_PROJECT_ID] = listItem.dataset.project_id;
        fetchTasks(jsonRequestBody);
    }

    projectsContainer.appendChild(clone);

}