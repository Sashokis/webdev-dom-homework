const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const formInput = document.getElementById("add-form-id");
const pointInputElement  = document.getElementById("add-form-point");
const loadingInputElement  = document.getElementById("add-form-loadingPoint");


//превод из js -> html
let comments = [
];

const fetchPromise = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/:sasha/comments", {
    method: "GET"
  }).then((response) => {
      return response.json();
  })
  .then((responseData) => { 
    comments = responseData.comments; 
    firstDownload();
    renderComments();
   });
}


// первый вывод комментов
let checkFirstDownload = false; 
const firstDownload = () =>{
  if (checkFirstDownload === false){
    loadingInputElement.classList.remove("hidden")
    checkFirstDownload = true;
  } else{
    loadingInputElement.classList.add("hidden");
  }
}

// // ответ на комментарий 
// const answerComment = () => {
//   const commentElements = document.querySelectorAll('.comment')

//   for (const commentElement of commentElements) {
//     const id = commentElement.dataset.id;
//     if (comments[id].isEdit === false) {
//       commentElement.addEventListener("click", () => {
//         textInputElement.value =`> ${comments[id].text} \n ${comments[id].name} \n`;
//         renderComments();
//       }); 
//     } 
//   }
// }


//  // удаление комментария 
// const deleteButtonElement = document.getElementById("delete-comment-button");

// deleteButtonElement.addEventListener("click", () => {
//   const commentsList = document.getElementsByClassName("comment");
//   const lastCommentIndex = commentsList.length - 1;

//   if (lastCommentIndex >= 0) {
//     commentsList[lastCommentIndex].remove();
//   }
// });

function toggleButtonState() {
  if (nameInputElement.value.trim() !== "" && textInputElement.value.trim() !== "") {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button-error");
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add("button-error");
  }
}

// изменение лайков
const changeLikes =  () => {
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
      renderComments();
    });
  }
}

// // редактировать текст
// const changeEdit = () => {
//   const editButtons = document.querySelectorAll('.edit-button');
 
//   for (const editButton of editButtons) {
//     editButton.addEventListener("click", (event) => {
//       event.stopPropagation();
//       const id = editButton.dataset.id;
//       if (comments[id].isEdit === false) {
//         comments[id].isEdit = true;
//       } else {
//         comments[id].isEdit = false;
//         const editedComment =document.querySelector('.edited-textarea').value;
//         comments[id].text = editedComment;
//       }
//       renderComments();
//     });
//   }
// }

// нажатие enter
textInputElement.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    buttonElement.click(); 
  }
});

const renderComments = () => {
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
      likeClass = comment.isLiked ? "-active-like" : "";

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

// =====================================================================================
// вывод нового элемента
firstDownload(); // проверка 
fetchPromise(); // функция Get
renderComments();

// создание элемента 
buttonElement.addEventListener("click", () => {
// firstDownload(); // проверка 
  formInput.classList.add("hidden");
  pointInputElement.classList.remove("hidden");
  fetch("https://wedev-api.sky.pro/api/v1/:sasha/comments", {
        method: "POST",
        body: JSON.stringify ({
          name: nameInputElement.value.
          replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        text: textInputElement.value.
          replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        isLiked: false,
        likes: 0,
        isEdit: false
        }),
    })
    .then(() => {
      return fetchPromise();
    })
    .then(() => {
      formInput.classList.remove("hidden");
      pointInputElement.classList.add("hidden");
    });
    
    renderComments();

  nameInputElement.value = "";
  textInputElement.value = "";
 
  buttonElement.disabled = true;
  buttonElement.classList.add("button-error");
});


