import { getTodos } from "./api.js";
import { renderComments } from "./render.js";


export const buttonElement = document.getElementById("add-button");
export const textInputElement = document.getElementById("text-input");
export const formInput = document.getElementById("add-form-id");

//превод из js -> html
let comments = [];

// функия ввода fetch
export const fetchAndRenderComments = (firstStart) => {
  // Список комментариев 
  const commentsElement = document.getElementById("list-comment");
  const loadingInputElement  = document.getElementById("add-form-loadingPoint");
  
  // Загрузка формы комментариев
  if (firstStart) {
    loadingInputElement.style.display = "block";
  }
  
  return getTodos()
    .then((responseData) => { 
      comments = responseData.comments;
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

      commentsElement.innerHTML = commentHtml;
      if (firstStart){
        const loginRow = document.querySelector(".login-row");
        loadingInputElement.style.display = "none";
        loginRow.style.display = "flex";
      }
    })
    .catch(() => {
      loadingInputElement.textContent = "У вас сломался интернет, попробуйте позже";
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      formInput.classList.add("hidden"); // панель ввода + кнопка написать
    })
}

// вывод нового элемента
renderComments(true);
// enter();
// fetchPromise(); // функция Get