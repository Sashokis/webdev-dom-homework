import { renderComments } from "./render.js";
import { comments, buttonElement, nameInputElement, textInputElement } from "./scriptHW9.js";

// изменение лайков
export const changeLikes =  () => {
  const likeButtons = document.querySelectorAll('.like-button');
 
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {      
      const id = likeButton.dataset.id;

      if (comments[id].isLiked === false) {
        comments[id].isLiked = true;
        comments[id].likes++;
      } else {
        comments[id].isLiked = false;
        comments[id].likes--;
      }
      event.stopPropagation();
      renderComments (buttonElement, nameInputElement, textInputElement);    });
  }
}