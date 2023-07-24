import { getTodos, pushTodo } from "./api.js";
import {answerComment, deletComment, changeEdit } from "./oldFuntion.js"; // неиспользуемые функции
import { blockButton } from "./blockButton.js";
import { renderComments } from "./render.js";
import { firstDownload } from "./firstComment.js";
import { enter } from "./basicsFunctions.js";

export const listElement = document.getElementById("list-comment");
export const buttonElement = document.getElementById("add-button");
export const nameInputElement = document.getElementById("name-input");
export const textInputElement = document.getElementById("text-input");
export const loadingInputElement  = document.getElementById("add-form-loadingPoint");
const formInput = document.getElementById("add-form-id");
const pointInputElement  = document.getElementById("add-form-point");

 // для удаление комментария 
const deleteButtonElement = document.getElementById("delete-comment-button"); 

//превод из js -> html
export let comments = [
];

// функия ввода fetch
const fetchPromise = () => {
  getTodos()
  .then((responseData) => { 
    comments = responseData.comments; 
    firstDownload();
    renderComments ();
   })
   .catch(() => {
    loadingInputElement.textContent = "У вас сломался интернет, попробуйте позже";
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    formInput.classList.add("hidden"); // панель ввода + кнопка написать
   })
}

const addTodo = (name, myText) => {
  pushTodo(nameInputElement.value, textInputElement.value )
    .then(() => {
      return fetchPromise();
    })
    .then(() => {
      formInput.classList.remove("hidden");
      pointInputElement.classList.add("hidden");
      nameInputElement.value = "";
      textInputElement.value = "";
    })
    .catch((error) => {
      if (error.message === 'Сервер упал') {
        addTodo(name, myText);
      }else if (error.message === 'Сообщение меньше 3х символов'){
        blockButton( buttonElement, formInput, pointInputElement );
      } else{
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        blockButton( buttonElement, formInput, pointInputElement );
      }
      console.warn(error);
    });
    
}

// =====================================================================================
// вывод нового элемента
enter();
firstDownload(); // проверка 
fetchPromise(); // функция Get
renderComments ();

// создание элемента 
buttonElement.addEventListener("click", () => {
  formInput.classList.add("hidden");
  pointInputElement.classList.remove("hidden");
    addTodo(nameInputElement.value,textInputElement.value);
    renderComments ();
});


