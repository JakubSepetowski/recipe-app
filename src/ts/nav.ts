const burgerBtn = document.querySelector('.nav__btn')!;
export const nav = document.querySelector('.favorites');

export function hanldeClick() {
	burgerBtn?.addEventListener('click', () => {
		burgerBtn?.classList.toggle('active');
		burgerBtn?.classList.toggle('not-active');
		nav?.classList.toggle('favorites--active');
	});
}
