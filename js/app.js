import * as data from './getData.js';
import { Element, LinkElement } from './classes.js';
import * as paginate from './paginate.js';

let cards = document.querySelector('.cards');

function buildItemCard(item) {
	let currency = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	});

	const cardEl = Element.generate('article').addClass('item-card')
		.appendChild(
			Element.generate('div').addClass('item-card-img')
			.appendChild(
				LinkElement.generate(item.photo)
				.appendChild(
					Element.generate('img').setAttribute('src', item.photo)
				)
			)
		)
		.appendChild(
			Element.generate('div').addClass('item-card-description')
			.appendChild(
				Element.generate('div').addClass('item-card-title')
				.appendChild(
					Element.generate('span').innerHtml(`${item.property_type} em ${item.city_name}`)
				)
				.appendChild(
					Element.generate('h2').appendChild(
						LinkElement.generate('#').innerHtml(item.name)
					)
				)
			)
			.appendChild(
				Element.generate('p')
				.addClass('item-card-price')
				.innerHtml(`${currency.format(item.price)}`)
			)
		);

	cards.appendChild(cardEl.element);
}

function buildCardsEl(data) {
	let items = paginate.loadObjs(data);

	cards.innerHTML = '';
	cards
		.appendChild(
			Element.generate('span').innerHtml(`${data.length} acomodações`).element
		)
		.appendChild(
			Element.generate('h1').innerHtml('Estadias longas em ...').element
		);

	items.map(buildItemCard);
}

// function initMap() {
// 	map = new google.maps.Map(document.querySelector('.map'), {
// 		center: new google.maps.LatLng()
// 	});
// }

async function App() {
	let previousPage = document.getElementById('previous');
	let nextPage = document.getElementById('next');

	let sheety = await data.get(data.sheetyUrl);
	let cities = await data.get(data.citiesUrl);
	let response = data.rebaseData(sheety, cities);

	previousPage.onclick = () => {
		paginate.prev(response);
		buildCardsEl(response);
	}

	nextPage.onclick = () => {
		paginate.next(response);
		buildCardsEl(response);
	};

	if (response[0]) {
		buildCardsEl(response);
	}
}

App();
