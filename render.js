import { fetchAndRenderComments} from "./scriptHW9.js";
import { addTodo } from "./addComment.js";
import { renderLogin } from "./login.js";

let name;
// преобразование переменной 
export const setName = (newName) => {
    name = newName;
}

export const renderComments = (start) => {
 const appElement = document.getElementById('app');
  const appHtml = 
  `
    <div class="container">
      <div>
        <p class="hidden" id = "add-form-loadingPoint">
          Пожалуйста подождите, загружаю комментарии... 
        </p>
      </div>
      <ul id="list-comment" class="comments">
        
      </ul>
      <div class="add-form" id = "add-form-id">
        <input
          readonly 
          id="name-input"
          type="text"
          class="add-form-name"
          value = ${name}
        />
        <textarea 
          id="text-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button ">Написать</button>
          <button class="add-form-button" id ="delete-comment-button">
          Удалить последний комментарий
        </button>
        </div>
      </div>
      <div>
        <p class="hidden" id = "add-form-point"> Комментарий добавляется... </p>
      </div>
      <div class="login-row">
        <p> Чтобы добавить комментарий, <a  id = "login-link" href = "#">  авторизуйтесь </a> </p>
      </div>
    </div>
  `;

  appElement.innerHTML = appHtml;
  fetchAndRenderComments(start);

  const loginLink = document.getElementById(`login-link`);
  loginLink.addEventListener("click", () => {
    renderLogin();
  });

  // Добавление комментов
  const textInputElement = document.getElementById("text-input");
  addTodo(textInputElement, fetchAndRenderComments);


  // changeLikes(); 
  // changeEdit();
  // answerComment();
}; 
