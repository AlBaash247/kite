import { API_KEY_ID, API_KEY_AUTHOR_NAME, API_KEY_COMMENT } from "../constants/api.js";
import { storeSelectedComment } from "../constants/my-store.js";
import { displayEditCommentModal } from "../scripts/view-task.js";

const commentCardTemplate = document.querySelector('#commentCardTemplate');
const commentsContainer = document.querySelector('#commentsContainer');

export function adapter(comments) {
    comments.forEach((comment, index) => {
        createListItem(comment, index);
    });
}

function createListItem(comment, index) {
    const clone = commentCardTemplate.content.cloneNode(true);

    const commentCard = clone.querySelector('#commentCard');
    const authorName = clone.querySelector('#authorName');
    const commentElement = clone.querySelector('#comment');
    const btnEditComment = clone.querySelector('#btnEditComment');
    btnEditComment.id = "btnEditComment_" + comment.id;

    commentCard.dataset.comment_id = comment[API_KEY_ID];
    authorName.innerText = comment[API_KEY_AUTHOR_NAME];
    commentElement.innerText = comment[API_KEY_COMMENT];

    btnEditComment.onclick = function () {
        storeSelectedComment(comment);
        displayEditCommentModal();
    }

    commentsContainer.appendChild(clone);

}