// ответ на комментарий 
export const answerComment = () => {
  const commentElements = document.querySelectorAll('.comment')

  for (const commentElement of commentElements) {
    const id = commentElement.dataset.id;
    if (comments[id].isEdit === false) {
      commentElement.addEventListener("click", () => {
        textInputElement.value =`> ${comments[id].text} \n ${comments[id].name} \n`;
        renderComments();
      }); 
    } 
  }
}

 // удаление комментария 
export const deletComment = () => {
    deleteButtonElement.addEventListener("click", () => {
        const commentsList = document.getElementsByClassName("comment");
        const lastCommentIndex = commentsList.length - 1;

        if (lastCommentIndex >= 0) {
            commentsList[lastCommentIndex].remove();
        }
    });
}

// редактировать текст
export const changeEdit = () => {
  const editButtons = document.querySelectorAll('.edit-button');
 
  for (const editButton of editButtons) {
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = editButton.dataset.id;
      if (comments[id].isEdit === false) {
        comments[id].isEdit = true;
      } else {
        comments[id].isEdit = false;
        const editedComment =document.querySelector('.edited-textarea').value;
        comments[id].text = editedComment;
      }
      renderComments();
    });
  }
}