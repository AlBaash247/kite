import { API_URL_TASKS } from "../constants/api.js";
import { adapter } from "../adapters/tasks-adapter.js";

async function fetchTasks() {
    try {
        const response = await fetch(API_URL_TASKS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        adapter(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchTasks();
