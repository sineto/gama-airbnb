import * as data from './getData.js';
import { Element, LinkElement } from './classes.js';
import * as paginate from './paginate.js';

// map
let script = document.createElement('script');
let apiMapKey = 'AIzaSyCnqtwJKIoDl6ShU2rpk9Vai0rjIOd8Vqk';
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiMapKey}&callback=initMap`;
script.defer = true;
script.async = true;

document.head.appendChild(script);
window.initMap = () => {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(-10.3333333, -53.2),
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
}

// build card html structure
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

// let iconMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
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
