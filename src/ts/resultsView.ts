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
            <i  class="fa-regular fa-heart result__icon-info"></i>
        </div>
        `;

		this.parentElement.insertAdjacentHTML('beforeend', markup);
	}
}

export const result = new Results();
