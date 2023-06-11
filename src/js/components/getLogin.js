import { API_URL } from './const';

export const getLogin = async token => {
	try {
		const response = await fetch(`${API_URL}/getLogin`, {
			method: 'GET',
			headers: {
				'Content-type': 'application-json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();
		console.log('data: ', data);

		return data;
	} catch (err) {
		console.error(err);
	}
};
