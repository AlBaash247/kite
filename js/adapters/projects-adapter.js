
import { getUser } from "../constants/my-store.js";
import { API_KEY_ID, API_KEY_AUTHOR_ID, API_KEY_PROJECT_ID, API_KEY_PROJECT_NAME } from "../constants/api.js";
import { fetchTasks } from '../fetching/kite-tasks.js';
import { storeSelectedProjectId, getSelectedProjectId } from "../constants/my-store.js";

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

    listItem.dataset.project_id = project[API_KEY_ID];
    projectTitle.innerText = project[API_KEY_PROJECT_NAME];

    if (index == 0 && getSelectedProjectId() == null) {
        storeSelectedProjectId(listItem.dataset.project_id);
        linkElement.classList.add("active");

        var jsonRequestBody = {};
        jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id;
        jsonRequestBody[API_KEY_PROJECT_ID] = listItem.dataset.project_id;
        fetchTasks(jsonRequestBody);
    }
    else if (getSelectedProjectId() == listItem.dataset.project_id) {
        linkElement.classList.add("active");
        var jsonRequestBody = {};
        jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id;
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
        jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id;
        jsonRequestBody[API_KEY_PROJECT_ID] = listItem.dataset.project_id;
        fetchTasks(jsonRequestBody);
    }

    if (project[API_KEY_AUTHOR_ID] != getUser().id && !projectsContainer.classList.contains('divider-added')) {
        createSideMenuDivider();
    }

    projectsContainer.appendChild(clone);
}

function createSideMenuDivider() {
    const div = document.createElement('div');
    div.classList.add("py-3", "bg-gray");
    projectsContainer.appendChild(div);
    projectsContainer.classList.add('divider-added');
}