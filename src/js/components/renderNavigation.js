import { createElement } from './helper';
import { createBurgerMenu } from './createBurgerMenu';
import { API_URL, JWT_TOKEN_KEY } from './const';
import { renderModal } from './renderModal';
import { auth, router } from '../index.js';

const nav = document.querySelector('.nav');
createBurgerMenu(nav, 'nav_active', 'nav__btn');

export const renderNavigation = () => {
	nav.textContent = '';

	const buttonSignUp = createElement('button', {
		className: 'btn nav__btn',
		textContent: 'Зарегистрироваться',
	});

	buttonSignUp.addEventListener('click', () => {
		renderModal({
			title: 'Регистрация',
			description: 'Введите ваши данные для регистрации на сервисе Wishlist',
			btnSubmit: 'Зарегистрироваться',
			async submitHandler(e) {
				const formData = new FormData(e.target);

				const credentials = {
					login: formData.get('login'),
					password: formData.get('password'),
				};
				try {
					const response = await fetch(`${API_URL}/register`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(credentials),
					});
					if (response.ok) {
						const data = await response.json();
						localStorage.setItem(JWT_TOKEN_KEY, data.token);
						auth.login = data.login;
						router.setRoute(`/user/${data.login}`);

						return true;
					} else {
						const { message = 'Неизвестная ошибка' } = await response.json();
						console.log(await response.json());
						throw new Error(message);
					}
				} catch (error) {
					alert(error.message);
				}
			},
		});
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
