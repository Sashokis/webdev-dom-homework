const host = "https://wedev-api.sky.pro/api/v2/sasa/comments";
const userHost = "https://wedev-api.sky.pro/api/user/login";

let token;
// преобразование переменной 
export const setToken = (newToken) => {
    token = newToken;
}

// авторизация 
export function login({login, password}) {
    return fetch(userHost, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
    .then((response) => {
        return response.json();
    });   
}

// регистрация 
export function registr({name, login, password}) {
    return fetch(userHost, {
        method: "POST",
        body: JSON.stringify({
            name,
            login,
            password,
        }),
    })
    .then((response) => {
        return response.json();
    });   
}

// загрузка списка из api
export function getTodos (){
    return fetch(host, {
    method: "GET",
    headers:{
            Authorization:  `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json();
    })
}

export function pushTodo (text) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify ({
        text: text.
          replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        isLiked: false,
        likes: 0,
        }),
        headers:{
            Authorization:  `Bearer ${token}`,
        },
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