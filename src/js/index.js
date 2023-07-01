import { renderNavigation } from './components/renderNavigation';
import { createHero } from './components/createHero';
import { JWT_TOKEN_KEY } from './components/const';
import { getLogin } from './components/serviceAPI';
import { createWishlist } from './components/createWishlist';
import { createEditProfile } from './components/createEditProfile';
import { createEditWish } from './components/createEditWish';

export const router = Router();

const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};

let isMainPage = true;

console.log('auth: ', auth);

const app = document.querySelector('.app');

const handleHomePage = () => {
	isMainPage = false;
	app.textContent = '';
	renderNavigation();
	app.append(createHero());
};

const handleEditPageRoute = async id => {
	isMainPage = false;
	app.textContent = '';
	const { sectionEditWish, formWish } = await createEditWish(id);
	renderNavigation('profile', formWish);
	app.append(sectionEditWish);
};

const handleEditProfileRoute = async login => {
	isMainPage = false;
	app.textContent = '';
	const { sectionEditProfile, formProfile } = await createEditProfile(login);
	renderNavigation('profile', formProfile);
	app.append(sectionEditProfile);
};

const handleUserRoute = async login => {
	isMainPage = false;
	app.textContent = '';
	renderNavigation();
	app.append(await createWishlist(login));
};

const init = () => {
	router.on('/', handleHomePage);
	router.on('/editwish/:id', handleEditPageRoute);
	router.on('/editprofile/:login', handleEditProfileRoute);
	router.on('/user/:login', handleUserRoute);

	router.init();

	if (isMainPage) {
		if (auth.login) {
			router.setRoute(`/user/${auth.login}`);
		} else {
			router.setRoute('/');
		}
	}
};

init();
