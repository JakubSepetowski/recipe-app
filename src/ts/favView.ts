import { Recipe } from './types';

export class Fav {
	private parentElement;
	constructor() {
		this.parentElement = document.querySelector('.favorites__box') as HTMLDivElement;
	}
	clear() {
		this.parentElement.innerHTML = '';
	}
	textInfo() {
		const markup = `
        <p class="favorites__text">Nothing here yet </p>
        `;
		this.parentElement.insertAdjacentHTML('beforeend', markup);
	}
	renderResults(recipe: Recipe) {
		const markup = `
        <div data-id="${recipe.id}" class="recipe">
          <div class="recipe__box-left">
            <img class="recipe__img" src="${recipe.image_url}" alt="${recipe.title}">
            <div class="recipe__box-text">
              <h3 class="recipe__title">${recipe.title}</h3>
              <p class="recipe__description">${recipe.publisher}</p>
            </div>
          </div>
          <button class="recipe__btn btn btn--trash"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

		this.parentElement.insertAdjacentHTML('beforeend', markup);
	}
}
