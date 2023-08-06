import {renderLogin} from "./login.js";

export const renderRegist = () => {
    
    const appElement = document.getElementById("app");
    const registrHtml = `
    <div class="container">
        <div class="add-form-login">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
                <input type="text" id="name-input" class="input add-form-name" placeholder="Имя" />
                <br /> <br />
                <input type="text" id="login-input" class="input add-form-name" placeholder="Логин" />
                <br /> <br />
                <input type="text" id="password-input" class="input add-form-name" placeholder="Пароль" />
                
            </div>
            <br />
            <div>
            <button class="button add-form-button" id = "registr-button" >Зарегистрироваться</button>
            <button class="button add-form-button " id="login-button">Войти</button>
            </div>
        </div>
    </div>`;

    appElement.innerHTML = registrHtml;

    const buttonElement = document.getElementById("login-button");
    const buttonElementRegistr = document.getElementById("registr-button");
        
    buttonElementRegistr.addEventListener("click", () => {
        // 
    });

    buttonElement.addEventListener("click", () => {
        renderLogin();
    })
    
};