const app = document.querySelector('.app');
import { renderNavigation } from './components/renderNavigation';
import { createHero } from './components/createHero';

const handleHomepage = () => {
	app.textContent = '';
	renderNavigation();
	const section = createHero();
	app.append(section);
};

const init = () => {
	handleHomepage();
};

init();
