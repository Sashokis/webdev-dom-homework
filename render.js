import { comments, listElement, buttonElement, nameInputElement, textInputElement } from "./scriptHW9.js";
import { changeLikes } from "./changLike.js";
import { toggleButtonState} from "./basicsFunctions.js";


export const renderComments = () => {
  // блокировка кнопки 
  buttonElement.disabled = true;
  buttonElement.classList.add("button-error");
  nameInputElement .addEventListener("input", toggleButtonState);
  textInputElement.addEventListener("input", toggleButtonState);

  // новый элемент
  const commentHtml = comments
    .map((comment) => {

      const editText = comment.isEdit ? "Сохранить" : "Редактировать"; 
      const date = new Date(comment.date);
      const index = comments.indexOf(comment);
      const formattedDate = `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.
      ${date.getFullYear() % 100} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
      let  likeClass = comment.isLiked ? "-active-like" : "";

      const editCommentText = comment.isEdit ? `<textarea class="comment-text edited-textarea">${comment.text}</textarea>` :
       `<div class="comment-text">${comment.text}</div>`; 
      return `<li class="comment" data-id = ${comment.id}>
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${formattedDate}</div>
        </div>
        <div class="comment-body">
          ${editCommentText}
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" id="like-counter">${comment.likes}</span>
            <button class="like-button ${likeClass}" data-id = ${index}></button>
          </div>
        </div>
        <div>
          <p class="hidden"></p>
        </div>
        <div class="add-form-row">
          <button  class="add-form-button edit-button" data-id = ${comment.id}>${editText}</button>
        </div>
      </li>`;
    })
    .join("");


  listElement.innerHTML = commentHtml;
  changeLikes(); 
  // changeEdit();
  // answerComment();
}; 