import { result } from './resultsView';
import { recipeInfo } from './recipeView';
import { Data } from './types';
import { Spinner } from './spiner';

export const getRecipes = async (query: string) => {
	try {
		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
		const data: Data = await res.json();
		if (!res.ok) throw new Error(`blad`);
		result.clear();

		data.data.recipes?.forEach((recipe) => {
			result.renderResults(recipe);
		});
	} catch (err) {
		result.clear();
		console.log(err);
	}
};
export const getRecipe = async (id: string) => {
	try {
		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
		const data: Data = await res.json();
		if (!res.ok) throw new Error('blad2');
		recipeInfo.clear();
		if (data.data.recipe) recipeInfo.renderResults(data.data.recipe);
		
	} catch (err) {
		console.log(err);
	}
};
