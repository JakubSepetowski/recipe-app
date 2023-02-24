export type Recipe = {
	id: string;
	title: string;
	image_url: string;
	publisher: string;
	cooking_time?: number;
	servings?: number;
	source_url?: string;
	ingredients?: Ingredient[];
	isFav?: boolean;
};

export type Data = {
	data: {
		recipes?: Recipe[];
		recipe?: Recipe;
	};
	results?: number;
	status: string;
};

type Ingredient = {
	quantity: number;
	unit: string;
	description: string;
};
