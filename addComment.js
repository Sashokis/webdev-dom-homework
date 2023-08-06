import { pushTodo } from "./api.js";
import { blockButton } from "./blockButton.js";


export const addTodo = (myText, fetchAndRenderComments) => {
  const pointInputElement  = document.getElementById("add-form-point");
  const buttonElement = document.getElementById("add-button");
  const formInput = document.getElementById("add-form-id");
  
  buttonElement.addEventListener("click", () => {
    formInput.classList.add("hidden");
    pointInputElement.classList.remove("hidden");

    pushTodo( myText.value )
    .then(() => {
      return fetchAndRenderComments();
    })
    .then(() => {
      formInput.classList.remove("hidden");
      pointInputElement.classList.add("hidden");
      myText.value = "";
    })
    .catch((error) => {
      if (error.message === 'Сервер упал') {
        addTodo(myText);
      }else if (error.message === 'Сообщение меньше 3х символов'){
        blockButton( buttonElement, formInput, pointInputElement );
      } else{
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        console.log(error);
        blockButton( buttonElement, formInput, pointInputElement );
      }
      console.warn(error);
    });
    
  }); 
}