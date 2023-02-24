import { Recipe } from './types';

class Results {
	private parentElement;
	constructor() {
		this.parentElement = document.querySelector('.results__box') as HTMLDivElement;
	}
	clear() {
		this.parentElement.innerHTML = '';
	}
	renderResults(recipe: Recipe) {
		const markup = `
        <div data-id="${recipe.id}" class="result">
            <div class="result__box-left">
              <img class="result__img" src='${recipe.image_url}' alt="${recipe.title}">
              <div class="result__box-text">
                <h3 class="result__title">${recipe.title}</h3>
                <p class="result__description">${recipe.publisher}</p>
              </div>
            </div>
            <div class="result__icon-box regular">
            <i  class="fa-regular fa-heart result__icon-info"></i>
            </div>
        </div>
        `;

		this.parentElement.insertAdjacentHTML('beforeend', markup);
	}
	changeIcon(id: string) {
		console.log(id);
		const result = document.querySelector(`[data-id='${id}']`)!;
		const iconBox = result.querySelector('.result__icon-box')!;
		if (iconBox?.classList.contains('regular')) {
			iconBox.innerHTML = ` <i  class="fa-solid fa-heart result__icon-info"></i>`;
      iconBox.classList.remove("regular")
		} else {
      console.log("a");
			iconBox.innerHTML = ` <i  class="fa-regular fa-heart result__icon-info"></i>`;
      iconBox.classList.add("regular")
		}
	}
}

export const result = new Results();
