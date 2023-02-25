import { Recipe } from './types';
import { Fav } from './favView';
import { result } from './resultsView';

export const favRecipesInfo: Recipe[] = [];

class RecipeInfo {
	private parentElement;
	private Fav = false;

	constructor() {
		this.parentElement = document.querySelector('.recipe-info') as HTMLDivElement;
	}
	clear() {
		this.parentElement.innerHTML = '';
	}
	showPanel() {
		document.body.style.overflow = 'hidden';
		this.parentElement.style.display = 'block';
	}
	closePanel() {
		document.body.style.overflowY = 'auto';
		(document.querySelector('.recipe-info') as HTMLElement).style.display = 'none';
	}
	private generateList(recipe: Recipe) {
		const list = recipe.ingredients?.map((el) => {
			return `
            <li class="recipe-info__ingredient">
            <i class="fa-solid fa-check"></i>
            <div class="recipe-info__quantity">${!el.quantity ? '' : el.quantity}</div>
            <div class="recipe-info__description">
              <span class="recipe-info__unit">${el.unit}</span>
              ${el.description}
            </div>
            </li>
          `;
		});
		return list?.join('');
	}
	renderResults(recipe: Recipe, isFav = this.Fav) {
		const list = this.generateList(recipe);
		const markup = `
        <div data-panelid="${recipe.id}" class="recipe-info__top">
        <img class="recipe-info__img" src="${recipe.image_url}" alt="${recipe.title}">
        <div class="recipe-info__shadow">
        <button class="btn recipe-info__back"><i class="fa-solid fa-right-to-bracket"></i></button>
          <h2 class="recipe-info__title">${recipe.title}</h2>
        </div>
      </div>
      <div class="wrapper">
      
        <div class="recipe-info__details">
          <div class="recipe-info__details-left">
            <div class="recipe-info__time-box">
              <i class="fa-regular fa-clock"></i>
              <p class="recipe-info__time">${recipe.cooking_time} minutes</p>
            </div>
            <div class="recipe-info__servings-box">
              <i class="fa-solid fa-user-group"></i>
              <p class="recipe-info__servings">${recipe.servings} servings</p>
            </div>
          </div>
          <div class="recipe-info__details-right">
            <button class="recipe-info__btn btn btn--heart"><i class="${
							!isFav ? 'fa-regular' : 'fa-solid'
						} fa-heart"></i></button>
          </div>
        </div>
      </div>
      <div class="bgc-color  bgc-color--faded-white">
        <div class="wrapper">
          <h3 class="title title--blue recipe-info__body-title">Recipe ingredients</h3>
          <div class="recipe-info__ingredients-box">
            <ul class="recipe-info__ingredient-list">
                ${list}
            </ul>
          </div>
        </div>
      </div>
      <div class="recipe-info__bottom">
        <div class="wrapper">
          <h4 class="title title--blue recipe-info__body-title">How to cook it</h4>
          <p class="recipe-info__text">This recipe was carefully designed and tested by <span>${
						recipe.publisher
					}</span>. Please
            check out
            directions at their website.</p>
          <a class="recipe-info__go-to" target="_blank" href="${recipe.source_url}">Directions</a>
        </div>
      </div>
       `;

		this.parentElement.insertAdjacentHTML('beforeend', markup);
		const closeBtn = document.querySelector('.recipe-info__back') as HTMLButtonElement;
		closeBtn.addEventListener('click', this.closePanel);
		this.handleFav(recipe, isFav);
	}
	handleFav(recipe: Recipe, isFav: boolean) {
		const saveBtn = document.querySelector('.recipe-info__btn') as HTMLButtonElement;
		saveBtn.addEventListener('click', () => {
			result.changeIcon(recipe.id);
			isFav = this.mangeFavData(recipe, isFav);

			this.showFav();
		});
	}
	mangeFavData(recipe: Recipe, isFav: boolean) {
		if (!isFav) {
			this.chnageIcon(isFav);
			const rec: Recipe = {
				id: recipe.id,
				image_url: recipe.image_url,
				title: recipe.title,
				publisher: recipe.publisher,
				isFav: !isFav,
			};

			this.addToFav(rec);
			return true;
		} else {
			this.chnageIcon(isFav);
			this.removeFav(recipe);
			return false;
		}
	}
	chnageIcon(isFav: boolean) {
		const saveBtn = document.querySelector('.recipe-info__btn') as HTMLButtonElement;
		if (isFav) saveBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
		else saveBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
	}

	addToFav(recipe: Recipe) {
		favRecipesInfo.push(recipe);
		localStorage.setItem('FavRecipes', JSON.stringify(favRecipesInfo));
	}
	removeFav(recipe: Recipe) {
		favRecipesInfo.forEach((fav, i) => {
			if (fav.id === recipe.id) {
				favRecipesInfo.splice(i, 1);
			}
		});
		localStorage.setItem('FavRecipes', JSON.stringify(favRecipesInfo));
	}
	showFav() {
		new Fav().clear();
		if (favRecipesInfo.length === 0) {
			new Fav().textInfo();
		} else {
			favRecipesInfo.forEach((fav) => {
				new Fav().renderResults(fav);
			});
		}
	}
	getFavRecepies() {
		const data = JSON.parse(localStorage.getItem('FavRecipes')!);
		if (!data) return;

		data.forEach((recipe: Recipe) => {
			favRecipesInfo.push(recipe);
		});
		this.showFav()
	}
}

export const recipeInfo = new RecipeInfo();
