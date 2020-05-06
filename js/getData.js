export const sheetyUrl = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
export const citiesUrl = 'https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/master/json/municipios.json'; // municípios brasileiros

export async function get(apiUrl) {
	let response = await fetch(apiUrl);
	return response.json();
}

export function rebaseData(sheety, cities) {
	let data = [];
	sheety.forEach(item => {
		let position = Math.floor(Math.random() * cities.length);
		let city = cities[position];

		item['city_name'] = city.nome;
		item['lat'] = city.latitude;
		item['lng'] = city.longitude;

		data.push(item);
	});

	return data;
}
