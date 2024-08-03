import {API_URL_REGISTER} from "../constants/api-urls.js";

async function fetchData() {
    try {
        const response = await fetch(API_URL_REGISTER);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
