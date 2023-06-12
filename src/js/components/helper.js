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
