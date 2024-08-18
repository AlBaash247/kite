const commentCardTemplate = document.querySelector('#commentCardTemplate');
const commentsContainer = document.querySelector('#commentsContainer');

export function adapter(comments) {
    console.log(comments);
    

    comments.forEach((comment, index) => {
        createListItem(comment, index);
    });
}

function createListItem(comment, index) {
    const clone = commentCardTemplate.content.cloneNode(true);

    const commmentCard = clone.querySelector('#commmentCard');
    const authorName = clone.querySelector('#authorName');
    const commentElement = clone.querySelector('#comment');

    commmentCard.dataset.comment_id = comment.id;
    authorName.innerText = comment.author_name;
    commentElement.innerText = comment.comment;

    commentsContainer.appendChild(clone);

}