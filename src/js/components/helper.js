export const createElement = (tagName, attribute) => {
	const elem = document.createElement(tagName);
	Object.assign(elem, attribute);
	return elem;
};

export const pluralizeYears = age => {
	let years = age % 100;

	if (years >= 11 && years <= 19) {
		return 'лет';
	} else {
		let lastDigit = years % 10;
		if (lastDigit === 1) {
			return 'год';
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			return 'года';
		} else {
			return 'лет';
		}
	}
};

export const handleImageFileSelection = (inputFile, image, inputHidden) => {
	const handleFileInputChange = e => {
		if (e.target.files.length > 0) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				image.src = reader.result;
				if (inputHidden) {
					inputHidden.value = reader.result;
				}
			});
			reader.readAsDataURL(file);
		}
	};
	inputFile.addEventListener('change', handleFileInputChange);
};

export const createSelectDate = (selectDay, selectMonth, selectYear, birthdate) => {
	for (let day = 0; day <= 31; day++) {
		const option = document.createElement('option', {
			value: day ? day : '',
			text: day ? day : '',
		});

		selectDay.append(option);
	}

	const months = [
		'',
		'Янв',
		'Февр',
		'Мар',
		'Апр',
		'Май',
		'Июн',
		'Июл',
		'Авг',
		'Сент',
		'Окт',
		'Ноя',
		'Дек',
	];

	for (let i = 0; i < months.length; i++) {
		const option = createElement('option', {
			value: 1,
			text: months[i],
		});

		selectMonth.append(option);
	}

	const currentYear = new Date().getFullYear();

	const optionYear = createElement('option', {
		value: '',
		text: '',
	});

	selectYear.append(optionYear);

	for (let year = currentYear; year >= currentYear - 100; year--) {
		const option = createElement('option', {
			value: year,
			text: year,
		});

		selectYear.append(option);
	}

	if (birthdate) {
		const [month, day, year] = birthdate.split('/');
		selectDay.value = day;
		selectMonth.value = month;
		selectYear.value = year;
	}

	[selectDay, selectMonth, selectYear].forEach(dataSelect => {
		dataSelect.addEventListener('change', ({ currentTarget }) => {
			currentTarget.blur();
		});
	});
};

export const createOptionsCurrency = select => {
	const currencies = ['RUB', 'USD', 'EUR', 'GBR'];

	for (let i = 0; i < currencies.length; i++) {
		const option = createElement('option', {
			value: currencies[i],
			text: currencies[i],
		});
		select.append(option);
	}
};
