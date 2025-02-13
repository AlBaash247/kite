import { getUser, storeSelectedTask } from '../constants/my-store.js';
import {
    API_KEY_STATUS_TODO, API_KEY_STATUS_IN_PROGRESS, API_KEY_STATUS_DONE,
    API_KEY_IMPORTANCE_IMPORTANT, API_KEY_IMPORTANCE_LOW_PRIORITY, API_KEY_IMPORTANCE_NORMAL,
    API_KEY_IMPORTANCE_URGENT, API_KEY_TITLE, API_KEY_AUTHOR_NAME, API_KEY_STATUS, API_KEY_IMPORTANCE,
    API_KEY_DUE_DATE, API_KEY_ID, API_KEY_AUTHOR_ID
} from "../constants/api.js";

const taskRowTemplate = document.querySelector('#taskRowTemplate');
const contentContainer = document.querySelector('#contentContainer');

export function adapter(tasks) {
    contentContainer.innerHTML = "";

    if (tasks.length == 0) {
        createEmptyRow();
    } else {
        tasks.forEach(task => {
            createRow(task);
        });
    }

}

function createEmptyRow() {
    const emptyRow = `<tr> <td colspan="12"> <h3 class="text-danger"> No TasksFound </h3> </td> </tr>`;
    contentContainer.innerHTML = emptyRow;
}

function createRow(task) {

    const clone = taskRowTemplate.content.cloneNode(true);

    const taskRow = clone.querySelector('#taskRow');
    const taskId = clone.querySelector('#taskId');
    const taskTitle = clone.querySelector('#taskTitle');
    const taskAuthorName = clone.querySelector('#taskAuthorName');
    const taskStatus = clone.querySelector('#taskStatus');
    const taskImportance = clone.querySelector('#taskImportance');
    const taskDueDate = clone.querySelector('#taskDueDate');
    const btnViewTask = clone.querySelector('#btnViewTask');
    const btnEditTask = clone.querySelector('#btnEditTask');
    // const taskContent = clone.querySelector('#taskContent');

    taskId.innerText = task[API_KEY_ID];
    taskTitle.innerText = task[API_KEY_TITLE];
    taskAuthorName.innerText = task[API_KEY_AUTHOR_NAME];
    taskStatus.innerText = task[API_KEY_STATUS];
    taskImportance.innerText = task[API_KEY_IMPORTANCE];
    taskDueDate.innerText = task[API_KEY_DUE_DATE];
    // taskContent.innerText = task.content;

    switch (task[API_KEY_STATUS]) {
        case API_KEY_STATUS_TODO: taskStatus.classList.add("text-bg-secondary"); break;
        case API_KEY_STATUS_IN_PROGRESS: taskStatus.classList.add("text-bg-warning"); break;
        case API_KEY_STATUS_DONE: taskStatus.classList.add("text-bg-success"); break;
    }

    switch (task[API_KEY_IMPORTANCE]) {
        case API_KEY_IMPORTANCE_IMPORTANT: taskImportance.classList.add("text-bg-primary"); break;
        case API_KEY_IMPORTANCE_LOW_PRIORITY: taskImportance.classList.add("text-bg-light"); break;
        case API_KEY_IMPORTANCE_NORMAL: taskImportance.classList.add("text-bg-info"); break;
        case API_KEY_IMPORTANCE_URGENT: taskImportance.classList.add("text-bg-danger"); break;
    }

    if (task[API_KEY_AUTHOR_ID] != getUser().id) {
        taskRow.classList.add('table-warning');
    }

    btnViewTask.onclick = function () {
        storeSelectedTask(task);
        window.location.href = './pages/view-task.html';
    }

    btnEditTask.onclick = function () {
        storeSelectedTask(task);
        window.location.href = './pages/edit-task.html';
    }

    contentContainer.appendChild(clone);

}