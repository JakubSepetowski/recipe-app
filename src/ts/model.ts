import { Data, Recipe } from './types';
import { URL } from './config';
import { ERROR1 } from './config';
import { ERROR2 } from './config';

export const resultsState: Recipe[] = [];
export let recipeState: Recipe;

export const getRecipes = async (query: string) => {
	try {
		resultsState.splice(0, resultsState.length);

		const res = await fetch(`${URL}?search=${query}`);
		const data: Data = await res.json();

		if (!res.ok) throw new Error(ERROR1);
		data.data.recipes?.forEach((recipe) => {
			resultsState.push(recipe);
		});
	} catch (err) {
		throw err;
	}
};
export const getRecipe = async (id: string) => {
	try {
		const res = await fetch(`${URL}/${id}`);
		const data: Data = await res.json();

		if (!res.ok) throw new Error(ERROR2);
		if (data.data.recipe) recipeState = data.data.recipe;
		
	} catch (err) {
		throw err;
	}
};
