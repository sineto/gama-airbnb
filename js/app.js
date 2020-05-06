import * as data from './getData.js';
import { Element, LinkElement } from './classes.js';
import * as paginate from './paginate.js';
import * as map from './map.js';

let cards = document.querySelector('.cards');
let checkin = document.getElementById('checkin-input');
let checkout = document.getElementById('checkout-input');
checkin.valueAsDate = new Date();
checkout.valueAsDate = new Date();
let daysPeriod = 0;

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
				Element.generate('div')
				.addClass('item-card-price')
				.appendChild(
					Element.generate('div')
					.addClass('item-price-unit')
					.appendChild(
						Element.generate('span').innerHtml(`${daysPeriod} diárias`)
					)
					.appendChild(
						Element.generate('p').innerHtml(`${currency.format(item.price)}`)
					)
				)
				.appendChild(
					Element.generate('p').addClass('item-price-total')
					.innerHtml(`/ ${currency.format(item.price * daysPeriod)}`)
				)
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

async function App() {
	let searchButton = document.getElementById('search-button')
	let previousPage = document.getElementById('previous');
	let nextPage = document.getElementById('next');

	let sheety = await data.get(data.sheetyUrl);
	let cities = await data.get(data.citiesUrl);
	let response = data.rebaseData(sheety, cities);

	map.addMarkers(response);

	searchButton.onclick = () => {
		let ckin = new Date(checkin.value);;
		let ckout = new Date(checkout.value);

		let timePeriod = ckout.getTime() - ckin.getTime();
		daysPeriod = timePeriod / (1000 * 3600 * 24);
		buildCardsEl(response);
	}

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
