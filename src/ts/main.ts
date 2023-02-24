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
import { fvaRecipesInfo } from './recipeView';
import { nav } from './nav';

const form = document.querySelector('.hero__inputs') as HTMLFormElement;
const input = document.querySelector('.searching-input') as HTMLInputElement;
const resultsBox = document.querySelector('.results__box') as HTMLDivElement;
const resultError = document.querySelector('.results__error') as HTMLTitleElement;

const clearInput = () => {
	input.value = '';
};

const getId = (e: MouseEvent, className: string) => {
	const result = (e.target as HTMLElement).closest(`.${className}`);
	if (result) showRecipe((result as HTMLDivElement).dataset.id);
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
			});
		} else {
			resultError.textContent = `No recipes found for ${input.value} :C`;
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
		console.log(fvaRecipesInfo);
		if (!id) return;
		recipeInfo.clear();
		const spiner = new Spinner('recipe-info');
		spiner.renderSpinner();
		recipeInfo.showPanel();
		await getRecipe(id);
		recipeInfo.clear();
		fvaRecipesInfo.forEach((fav) => {
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
	getQuery();
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
	getId(e, 'recipe');
});
