import { getUser } from "../constants/my-store.js";
import { API_KEY_AUTHOR_ID, API_KEY_PROJECT_ID, API_KEY_CONTRIBUTORS } from "../constants/api.js";
import { fetchProjects, fetchStoreContributors } from "../fetching/kite-contributors.js";
const modalContributorSelectContributorListItemTemplate = document.querySelector('#modalContributorSelectContributorListItemTemplate');
const modalContributorSelectContributorContainer = document.querySelector('#modalContributorSelectContributorContainer');

const modalContributorInputProjectName = document.getElementById('modalContributorInputProjectName');

const modalContributorSelectContributor = document.getElementById('searchInput');
const modalContributorRowTemplate = document.getElementById('modalContributorRowTemplate');
const modalContributorSelectedItemsContainer = document.getElementById('modalContributorSelectedItemsContainer');
const modalContributorBtnAddContributor = document.getElementById('modalContributorBtnAddContributor');

const selectedProjectId = getSelectedProjectId();


export function adapterUsersList(users) {
    users.forEach((user, index) => {
        createListItem(user, index);
    });

    init();
}

function init() {
    var jsonRequestBody = {};
    jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id
    fetchProjects(jsonRequestBody);

    enableContributorSearch();
    createEmptyRow();
    modalContributorBtnAddContributor.onclick = function () { addContributors(); }
}

function createListItem(user, index) {
    const clone = modalContributorSelectContributorListItemTemplate.content.cloneNode(true);

    const contributorItemLink = clone.querySelector('#contributorItemLink');
    contributorItemLink.dataset.id = user.id;
    contributorItemLink.innerText = user.name + " | " + user.email;

    contributorItemLink.onclick = function () {
        removeEmptyRow();
        selectItem(this, user);
    }

    modalContributorSelectContributorContainer.appendChild(clone);
}

function enableContributorSearch() {
    modalContributorSelectContributor.addEventListener('keyup', function () {
        let filter = this.value.toUpperCase();

        let items = document.querySelectorAll('.dropdown-item');
        items.forEach(function (item) {
            if (item.textContent.toUpperCase().indexOf(filter) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function selectItem(element, user) {
    const clone = modalContributorRowTemplate.content.cloneNode(true);

    const modalContributorRow = clone.getElementById('modalContributorRow');
    const modalContributorName = clone.getElementById('modalContributorName');
    const modalContributorEmail = clone.getElementById('modalContributorEmail');
    const modalContributorRemoveContributor = clone.getElementById('modalContributorRemoveContributor');

    modalContributorRow.dataset.id = user.id;
    modalContributorName.innerText = user.name;
    modalContributorEmail.innerText = user.email;

    modalContributorRemoveContributor.onclick = function () {
        //remove element from modalContributorSelectedItemsContainer
        modalContributorSelectedItemsContainer.removeChild(modalContributorRow);

        // move element back to modalContributorSelectContributorContainer & make it visible
        element.classList.remove('d-none');
        modalContributorSelectContributorContainer.append(element);

        if (modalContributorSelectedItemsContainer.childElementCount == 0) {
            createEmptyRow();
        }

    }

    //move element to modalContributorSelectedItemsContainer and hide it!
    element.classList.add('d-none');
    modalContributorSelectedItemsContainer.appendChild(element);

    //add clone to modalContributorSelectedItemsContainer
    modalContributorSelectedItemsContainer.appendChild(clone);
}

function createEmptyRow() {
    const row = `<tr id="emptyRow"><td colspan="12" class="text-danger">You didn't select any contributor</td></tr>`;
    modalContributorSelectedItemsContainer.innerHTML = row;
}

function removeEmptyRow() {
    const row = document.getElementById('emptyRow');
    if (row) {
        modalContributorSelectedItemsContainer.removeChild(row);
    }
}

function addContributors() {
    const emptyRow = document.getElementById('emptyRow');
    if (emptyRow) {
        alert('Please select a contributor');
    } else {
        const selectedContributorsIds = [...document.querySelectorAll('[name="modalContributorRow"]')].map(element => element.dataset.id);

        var jsonRequestBody = {};
        jsonRequestBody[API_KEY_AUTHOR_ID] = getUser().id;
        jsonRequestBody[API_KEY_PROJECT_ID] = modalContributorInputProjectName.value;
        jsonRequestBody[API_KEY_CONTRIBUTORS] = selectedContributorsIds;

        fetchStoreContributors(jsonRequestBody);
    }
}

export function adapterProjectsList(projects) {
    projects.forEach((project) => {
        createOption(project);
    });
}

function createOption(project) {
    var option = document.createElement('option');
    option.value = project.id;
    option.text = project.project_name;
    if (project.id == selectedProjectId) {
        option.selected = true;
    }
    modalContributorInputProjectName.appendChild(option);
}

function getSelectedProjectId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('project_id') != null) {
        return urlParams.get('project_id');
    } else {
        return 0;
    }
}