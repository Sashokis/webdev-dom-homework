
import { buttonElement, textInputElement } from "./scriptHW9.js";

// нажатие enter
export function enter () { 
    textInputElement.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buttonElement.click(); 
    }
    });
}

export function toggleButtonState() {
  if (textInputElement.value.trim() !== "") {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button-error");
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add("button-error");
  }
}