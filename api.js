export function getTodos (){
    return fetch("https://wedev-api.sky.pro/api/v1/:sasha/comments", {
    method: "GET"
  }).then((response) => {
      return response.json();
  })
}

export function pushTodo (name, text) {
    return fetch("https://wedev-api.sky.pro/api/v1/:sasha/comments", {
        method: "POST",
        body: JSON.stringify ({
          name: name.
          replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        text: text.
          replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        isLiked: false,
        likes: 0,
        isEdit: false,
        forceError: true
        }),
    })
    .then((response) => {
        console.log(response);
        if (response.status === 201) {
            return response.json();
        }else if ((response.status === 400)) {
            alert ("Имя и комментарий должны быть не короче 3 символов");
            throw new Error("Сообщение меньше 3х символов");
        }else if ((response.status === 500)) {
            throw new Error("Сервер упал");
        }  
        else {
            throw new Error("Инет упал");
        }
    })
}