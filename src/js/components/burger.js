const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

if (burger) {
	const disScroll = () => {
		let pagePosition = window.scrollY;
		document.body.classList.add('dis-scroll');
		document.body.dataset.position = pagePosition;
		document.body.style.top = -pagePosition + 'px';
	};

	const enScroll = () => {
		let pagePosition = parseInt(document.body.dataset.position, 10);
		document.body.style.top = 'auto';
		document.body.classList.remove('dis-scroll');
		window.scroll({
			top: pagePosition,
			left: 0,
		});
		document.body.removeAttribute('data-position');
	};

	burger.addEventListener('click', e => {
		burger.classList.toggle('burger--active');
		menu.classList.toggle('nav--active');
		overlay.classList.toggle('overlay--active');

		if (!burger.classList.contains('burger--active')) {
			enScroll();
		} else {
			disScroll();
		}
	});
}
