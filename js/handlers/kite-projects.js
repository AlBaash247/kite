import { API_URL_PROJECTS } from "../constants/api.js";
import { adapter } from "../adapters/projects-adapter.js";

export async function fetchProjects() {
    try {
        const response = await fetch(API_URL_PROJECTS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        adapter(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}







