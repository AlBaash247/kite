import { HTTP_METHOD_POST_NO_CACHE, API_RESULT_IS_OK, API_RESULT_MESSAGE } from "../constants/api.js";

let loadingIndicator = document.getElementById('loading-indicator');

export async function mainFetch(API_URL, jsonRequestBody) {
    console.log(API_URL);
    console.log(jsonRequestBody);

    appendLoadingIndicator();

    let result = {};
    try {
        const response = await fetch(API_URL, HTTP_METHOD_POST_NO_CACHE(jsonRequestBody));
        if (!response.ok) {

            if (response.status == 422) {
                const responseObject = await response.json();
                result = responseObject;
            }
            else {
                result[API_RESULT_IS_OK] = false;
                result[API_RESULT_MESSAGE] = `HTTP error! status: ${response.status}`;
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            hideLoadingIndicator();
            return result;
        }
        const responseObject = await response.json();
        hideLoadingIndicator();
        return responseObject;

    } catch (error) {
        result[API_RESULT_IS_OK] = false;
        result[API_RESULT_MESSAGE] = 'Error fetching data: ' + error;
        hideLoadingIndicator();
        return result;
    }
}


function appendLoadingIndicator() {

    if (loadingIndicator != null) {
        showLoadingIndicator();
    } else {
        loadingIndicator = document.createElement('div');
        loadingIndicator.id = "loading-indicator";
        // loadingIndicator.style = "display: none;";

        const img = document.createElement('img');
        img.id = "loading-indicator-gif";
        img.src = '../../imgs/loading-indicator.gif';
        img.alt = 'Loading...';
        loadingIndicator.appendChild(img);

        document.body.appendChild(loadingIndicator);
    }
}

// Function to show the loading indicator
function showLoadingIndicator() {
    loadingIndicator.style.display = 'flex';
}

// Function to hide the loading indicator
function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
}