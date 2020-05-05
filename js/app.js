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

fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
	.then(response => {
		return response.json();
	})
	.then(data => {
		let main = document.getElementById('main');
		let cards = document.querySelector('.cards');
		// let nrooms = Object.keys(data).length;

		cards
			.appendChild(
				Element.generate('span').innerHtml(`${Object.keys(data).length} acomodações`).element
			)
			.appendChild(
				Element.generate('h1').innerHtml('Estadias longas em ...').element
			);

		main.appendChild(cards);

		data.forEach(room => {

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
						Element.generate('p').addClass('item-card-price').innerHtml(`R$ ${room.price}`)
					)
				);

			cards.appendChild(itemCard.element);
		});

	});
