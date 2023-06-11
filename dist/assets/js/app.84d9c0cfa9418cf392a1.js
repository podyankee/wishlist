(() => {
	'use strict';
	var n = function (n, e) {
			var t = document.createElement(n);
			return Object.assign(t, e), t;
		},
		e = document.querySelector('.nav');
	!(function (e, t) {
		var a = n('button', {
			className: 'header__burger burger',
			innerHTML: '<span class="burger__line"></span>',
		});
		a.addEventListener('click', function () {
			a.classList.toggle('burger_active'), e.classList.toggle('nav_active');
		}),
			e.before(a);
	})(e);
	var t = Router(),
		a = document.querySelector('.app');
	t.on('/', function () {
		(a.textContent = ''),
			(function () {
				e.textContent = '';
				var t = n('button', { className: 'btn nav__btn', textContent: 'Зарегистрироваться' });
				t.addEventListener('click', function () {
					console.log('Clicked on button');
				});
				var a = n('button', { className: 'btn nav__btn', textContent: 'Войти' });
				a.addEventListener('click', function () {
					console.log('Clicked on button 1');
				}),
					e.append(t, a);
			})();
		var t = (function () {
			var e = n('section', { className: 'hero' }),
				t = n('div', { className: 'container hero__container' });
			e.append(t);
			var a = n('h1', {
					className: 'hero__title',
					innerHTML: '<span>Wish</span><span>List</span>',
				}),
				s = n('p', {
					className: 'hero__description',
					innerHTML: 'Никогда не&nbsp;поздно поставить новую цель или обрести новую мечту...',
				}),
				o = n('ol', { className: 'hero__steps steps' });
			return (
				[
					'Создайте список желаний',
					'Поделитесь ссылкой с&nbsp;друзьями',
					'Получите желанный подарок',
				].forEach(function (e) {
					var t = n('li', { className: 'steps__item', innerHTML: e });
					o.append(t);
				}),
				t.append(a, s, o),
				e
			);
		})();
		a.append(t);
	}),
		t.init();
})();
