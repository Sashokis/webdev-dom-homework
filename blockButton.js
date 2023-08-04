// используем для уменьшения дублирования кода
export function blockButton( buttonElement, formInput, pointInputElement ) {
    buttonElement.disabled = false; // блокировка кнопки
    buttonElement.classList.remove("button-error");
    formInput.classList.remove("hidden"); // панель ввода + кнопка написать
    pointInputElement.classList.add("hidden"); // "  Комментарий добавляется..."
}