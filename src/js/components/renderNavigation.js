import { createElement } from './helper';

const nav = document.querySelector('.nav');
// const burger = createBurgerMenu(nav);

export const renderNavigation = () => {
	nav.textContent = '';

	const buttonSignUp = createElement('button', {
		className: 'btn nav__btn',
		textContent: 'Зарегистрироваться',
	});

	buttonSignUp.addEventListener('click', () => {
		console.log('Clicked on button');
	});

	const buttonLogin = createElement('button', {
		className: 'btn nav__btn',
		textContent: 'Войти',
	});

	buttonLogin.addEventListener('click', () => {
		console.log('Clicked on button 1');
	});

	nav.append(buttonSignUp, buttonLogin);
};
