class Element {
	constructor(element) {
		this.element = document.createElement(element);
	}

	innerHtml(text) {
		this.element.innerHTML = text;
		return this;
	}

	setAttribute(attr, str) {
		this.element.setAttribute(attr, str);
		return this;
	}

	addClass(className) {
		this.element.className = className;
		return this;
	}

	appendChild(child) {
		this.element.appendChild(child.element);
		return this;
	}

	static generate(element) {
		return new Element(element);
	}
}

class LinkElement extends Element {
	constructor(href) {
		super('a');
		this.element.href = href;
		this.element.target = '_blank';
	}

	static generate(href, text) {
		return new LinkElement(href, text);
	}
}

var currentPage = 1;
var numberOfPages = 0
var numberObjPerPage = 5;

function paginateEvent() {
	document.getElementById('next').disabled = currentPage === numberOfPages ? true : false;
	document.getElementById('previous').disabled = currentPage === 1 ? true : false;
	console.log(currentPage, numberOfPages);
}

function loadObjs(data) {
	let ini = ((currentPage - 1) * numberObjPerPage);
	let end = ini + numberObjPerPage;
	let datas = Object.keys(data)
		.slice(ini, end)
		.reduce((result, key) => {
			result.push(data[key]);
			return result;
		}, []);

	paginateEvent();
	return datas;
};

function buildCardsEl(data) {
	let cards = document.querySelector('.cards');
	let currency = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	});

	cards.innerHTML = '';

	cards
		.appendChild(
			Element.generate('span').innerHtml(`${data.length} acomodações`).element
		)
		.appendChild(
			Element.generate('h1').innerHtml('Estadias longas em ...').element
		);

	console.log(loadObjs(data));

	loadObjs(data).forEach(room => {
		let itemCard = Element.generate('article').addClass('item-card')
			.appendChild(
				Element.generate('div').addClass('item-card-img')
				.appendChild(
					LinkElement.generate(room.photo)
					.appendChild(
						Element.generate('img').setAttribute('src', room.photo)
					)
				)
			)
			.appendChild(
				Element.generate('div').addClass('item-card-description')
				.appendChild(
					Element.generate('div').addClass('item-card-title')
					.appendChild(
						Element.generate('span').innerHtml(room.property_type)
					)
					.appendChild(
						Element.generate('h2').appendChild(
							LinkElement.generate('#').innerHtml(room.name)
						)
					)
				)
				.appendChild(
					Element.generate('p')
					.addClass('item-card-price')
					.innerHtml(`${currency.format(room.price)}`)
				)
			);

		cards.appendChild(itemCard.element);
	});
};

function getNumberOfPages(data) {
	numberOfPages = Math.ceil(data.length / numberObjPerPage);
}

function next(data) {
	currentPage += 1;
	buildCardsEl(data);
	getNumberOfPages(data);
};

function prev(data) {
	currentPage -= 1;
	buildCardsEl(data);
	getNumberOfPages(data);
};

var previousPage = document.getElementById('previous');
var nextPage = document.getElementById('next');

fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
	.then(response => {
		return response.json();
	})
	.then(data => {
		previousPage.onclick = () => prev(data);
		nextPage.onclick = () => next(data);
		window.onload = buildCardsEl(data);
	});
