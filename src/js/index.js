import { renderNavigation } from './components/renderNavigation';
import { createHero } from './components/createHero';
import { JWT_TOKEN_KEY } from './components/const';
import { getLogin } from './components/getLogin';

export const router = Router();

const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};

console.log('auth: ', auth);

const app = document.querySelector('.app');

const handleHomePage = () => {
	app.textContent = '';
	renderNavigation();
	app.append(createHero());
};

const handleEditPageRoute = id => {};

const handleEditProfileRoute = login => {};

const handleUserRoute = login => {};

const init = () => {
	let isMainPage = true;

	router.on('/', handleHomePage);
	router.on('/editwish/newwish', handleEditPageRoute);
	router.on('/editwish/:id', handleEditPageRoute);
	router.on('/editprofile/:login', handleEditProfileRoute);
	router.on('/user/:login', handleUserRoute);

	router.init();

	if (isMainPage) {
		isMainPage = false;

		router.setRoute('/');
	}
};

init();
