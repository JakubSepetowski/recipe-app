import '../sass/main.scss';
import { hanldeClick } from './nav';
import { getRecipes } from './model';
import { getRecipe } from './model';
import { Spinner } from './spiner';
import { recipeInfo } from './recipeView';

const form = document.querySelector('.hero__inputs') as HTMLFormElement;
const input = document.querySelector('.searching-input') as HTMLInputElement;
const resultsBox = document.querySelector('.results__box') as HTMLDivElement;

const forbidden = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const getQuery = () => {
	const spinner = new Spinner('results__box');
	spinner.renderSpinner();
	getRecipes(input.value);
};

const showRecipe = (id: string | undefined) => {
	if (!id) return;
	getRecipe(id);
	recipeInfo.clear();
	const spiner = new Spinner('recipe-info');
	spiner.renderSpinner();
	recipeInfo.showPanel();
};

form?.addEventListener('submit', (e) => {
	e.preventDefault();
	getQuery();
});

input.addEventListener('input', () => {
	forbidden.forEach((el) => {
		if (el.toString() === input.value.at(-1)) {
			input.value = input.value.slice(0, -1);
		}
	});
});

hanldeClick();

resultsBox.addEventListener('click', (e) => {
	const result = (e.target as HTMLElement).closest('.result');
	if (result) showRecipe((result as HTMLDivElement).dataset.id);
});
