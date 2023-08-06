import { login, setToken} from "./api.js";
import {setName, renderComments} from "./render.js";
import {renderRegist} from "./registration.js";


export const renderLogin = () => {
    const appElement = document.getElementById("app");
    
    const loginHtml = `
    <div class="container">
        <div class="add-form-login">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
                <input type="text" 
                id="login-input" 
                class="input add-form-name" 
                placeholder="Логин" />
                <br />
                <br />
                <input type="text" 
                id="password-input" 
                class="input add-form-name" 
                placeholder="Пароль" />
            </div>
            <br />
            <div>
                <button class="button add-form-button " id="login-button">Войти</button>
                <button class="button add-form-button" id = "registr-button" >Зарегистрироваться</button>

            </div>
        </div>
    </div>`;

    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const buttonElementRegistr = document.getElementById("registr-button");

    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
        
    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
        .then((responseData) => {
            setToken(responseData.user.token);
            setName(responseData.user.name);
        })
        .then(() => {
            const loginForm = document.querySelector(".add-form-login");
            loginForm.style.display = "none";
            renderComments(false);
            const addForm = document.querySelector(".add-form");
            addForm.style.display = "flex";
        })
        .catch(() => {
            buttonElement.textContent = "Попробуйте снова";
            loginInputElement.value = "";
            passwordInputElement.value = "";
            
        })
    });

    buttonElementRegistr.addEventListener("click", () => {
        renderRegist();
    })
};