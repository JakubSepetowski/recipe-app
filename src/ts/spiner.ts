export class Spinner{
    private parentElement;
	constructor(element:string) {
		this.parentElement = document.querySelector(`.${element}`) as HTMLDivElement;
	}

   
    renderSpinner(){
        const markup =`
        <div class="spinner-box">
        <div class="spinner">
          <i class="fa-solid fa-spinner"></i>
        </div>
        </div>
        `
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    }

}

