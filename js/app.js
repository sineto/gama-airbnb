import { Element, LinkElement } from './classes.js';
import * as paginate from './paginate.js';

const sheetyUrl = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
let sheetyData = [];
let cards = document.querySelector('.cards');

async function get(apiUrl) {
	let response = await fetch(apiUrl);
	return response.json();
}

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
					Element.generate('span').innerHtml(item.property_type)
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

async function App() {
	let previousPage = document.getElementById('previous');
	let nextPage = document.getElementById('next');

	sheetyData = await get(sheetyUrl);

	previousPage.onclick = () => {
		paginate.prev(sheetyData);
		buildCardsEl(sheetyData);
	}

	nextPage.onclick = () => {
		paginate.next(sheetyData);
		buildCardsEl(sheetyData);
	};

	if (sheetyData[0]) {
		buildCardsEl(sheetyData);
	}
}

App();
