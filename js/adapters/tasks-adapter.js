import {
    API_KEY_STATUS_TODO, API_KEY_STATUS_IN_PROGRESS, API_KEY_STATUS_DONE,
    API_KEY_IMPORTANCE_IMPORTANT, API_KEY_IMPORTANCE_LOW_PRIORITY, API_KEY_IMPORTANCE_NORMAL, API_KEY_IMPORTANCE_URGENT
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

    const task_id = clone.querySelector('#task_id');
    const task_title = clone.querySelector('#task_title');
    const task_author_name = clone.querySelector('#task_author_name');
    const task_status = clone.querySelector('#task_status');
    const task_importance = clone.querySelector('#task_importance');
    const task_due_date = clone.querySelector('#task_due_date');
    const task_content = clone.querySelector('#task_content');

    task_id.innerText = task.id;
    task_title.innerText = task.title;
    task_author_name.innerText = task.author_name;
    task_status.innerText = task.status;
    task_importance.innerText = task.importance;
    task_due_date.innerText = task.due_date;
    task_content.innerText = task.content;

    switch (task.status) {
        case API_KEY_STATUS_TODO: task_status.classList.add("text-bg-secondary"); break;
        case API_KEY_STATUS_IN_PROGRESS: task_status.classList.add("text-bg-warning"); break;
        case API_KEY_STATUS_DONE: task_status.classList.add("text-bg-success"); break;
    }

    switch (task.importance) {
        case API_KEY_IMPORTANCE_IMPORTANT: task_importance.classList.add("text-bg-primary"); break;
        case API_KEY_IMPORTANCE_LOW_PRIORITY: task_importance.classList.add("text-bg-light"); break;
        case API_KEY_IMPORTANCE_NORMAL: task_importance.classList.add("text-bg-info"); break;
        case API_KEY_IMPORTANCE_URGENT: task_importance.classList.add("text-bg-danger"); break;
    }

    contentContainer.appendChild(clone);

}