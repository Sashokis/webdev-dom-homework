
import {loadingInputElement  } from "./scriptHW9.js";

// первый вывод комментов
export let checkFirstDownload = false; 
export const firstDownload = () =>{
  if (checkFirstDownload === false){
    loadingInputElement.classList.remove("hidden");
    checkFirstDownload = true;
  } else{
    loadingInputElement.classList.add("hidden");
  }
}