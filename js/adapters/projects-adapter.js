
const taskRowTemplate = document.querySelector('#taskRowTemplate');
const contentContainer = document.querySelector('#contentContainer');

export function adapter(projects) {
    projects.forEach(project => {
        console.log(project);
        //  createRow(projects);
    });
}

function createRow(task) {

    const clone = taskRowTemplate.content.cloneNode(true);

    const task_id = clone.querySelector('#task_id');
    const task_title = clone.querySelector('#task_title');
    const task_author_name = clone.querySelector('#task_author_name');
    const task_project_name = clone.querySelector('#task_project_name');
    const task_status = clone.querySelector('#task_status');
    const task_importance = clone.querySelector('#task_importance');
    const task_due_date = clone.querySelector('#task_due_date');
    const task_content = clone.querySelector('#task_content');

    task_id.innerText = task.id;
    task_title.innerText = task.title;
    task_author_name.innerText = task.author_name;
    task_project_name.innerText = task.project_name;
    task_status.innerText = task.status;
    task_importance.innerText = task.importance;
    task_due_date.innerText = task.due_date;
    task_content.innerText = task.content;

    contentContainer.appendChild(clone);

}