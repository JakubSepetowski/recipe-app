import '../sass/main.scss';
import { hanldeClick } from './nav';
import { getRecipes } from './model';
import { getRecipe } from './model';
import { Spinner } from './spiner';
import { recipeInfo } from './recipeView';
import { result } from './resultsView';
import { resultsState } from './model';
import { recipeState } from './model';
import { FORBIDDEN } from './config';
import { favRecipesInfo } from './recipeView';
import { nav } from './nav';

const form = document.querySelector('.hero__inputs') as HTMLFormElement;
const input = document.querySelector('.searching-input') as HTMLInputElement;
const resultsBox = document.querySelector('.results__box') as HTMLDivElement;
const resultError = document.querySelector('.results__error') as HTMLTitleElement;

const clearInput = () => {
	input.value = '';
};

const deleteRecepie = (Clickedresult: Element) => {
	const clikedId = (Clickedresult as HTMLDivElement).dataset.id;
	favRecipesInfo.forEach((fav) => {
		if (fav.id === clikedId) {
			const panel = document.querySelector(`[data-panelid='${fav.id}']`) as HTMLDivElement;
			let panelID;
			if (panel) panelID = panel.dataset.panelid;

			if (panelID && panelID === fav.id) {
				showRecipe(fav.id);
			}
			result.changeIcon(fav.id);
			recipeInfo.removeFav(fav);
			recipeInfo.showFav();
		}
	});
};

const getId = (e: MouseEvent, className: string, toDelate: boolean = false) => {
	const Clickedresult = (e.target as HTMLElement).closest(`.${className}`);
	if (Clickedresult && !toDelate) showRecipe((Clickedresult as HTMLDivElement).dataset.id);
	if (Clickedresult && toDelate) {
		deleteRecepie(Clickedresult);
	}
};

const getQuery = async () => {
	try {
		resultError.textContent = '';
		const spinner = new Spinner('results__box');
		spinner.renderSpinner();

		await getRecipes(input.value);
		result.clear();

		if (resultsState.length > 0) {
			resultsState.forEach((res) => {
				result.renderResults(res);
				favRecipesInfo.forEach((fav) => {
					if (res.id === fav.id) {
						result.changeIcon(fav.id);
					}
				});
			});
		} else {
			resultError.textContent = `No recipes found for ${input.value}`;
		}
	} catch (err) {
		if (typeof err === 'string') resultError.textContent = err;
		result.clear();
	}
	clearInput();
};

const showRecipe = async (id: string | undefined) => {
	try {
		let isFav = false;
		if (!id) return;

		recipeInfo.clear();

		const spiner = new Spinner('recipe-info');
		spiner.renderSpinner();

		recipeInfo.showPanel();
		await getRecipe(id);

		recipeInfo.clear();
		favRecipesInfo.forEach((fav) => {
			if (fav.id === id) isFav = true;
		});

		recipeInfo.renderResults(recipeState, isFav);
	} catch (err) {
		if (typeof err === 'string') resultError.textContent = err;
	}
};

hanldeClick();

form?.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value === '') {
		resultError.textContent = 'This field cannot be empty';
	} else {
		getQuery();
	}
});

input.addEventListener('input', () => {
	FORBIDDEN.forEach((el) => {
		if (el.toString() === input.value.at(-1)) {
			input.value = input.value.slice(0, -1);
		}
	});
});

resultsBox.addEventListener('click', (e) => {
	getId(e, 'result');
});

(nav as HTMLDivElement).addEventListener('click', (e) => {
	if ((e.target as HTMLElement).classList[0] === 'recipe__btn') {
		getId(e, 'recipe', true);
	} else {
		getId(e, 'recipe');
	}
});

recipeInfo.getFavRecepies();
