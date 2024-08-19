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

    commentCard.dataset.comment_id = comment.id;
    authorName.innerText = comment.author_name;
    commentElement.innerText = comment.comment;

    btnEditComment.onclick = function () {
        storeSelectedComment(comment);
        displayEditCommentModal();
    }

    commentsContainer.appendChild(clone);

}