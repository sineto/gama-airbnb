export class Element {
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

export class LinkElement extends Element {
	constructor(href) {
		super('a');
		this.element.href = href;
		this.element.target = '_blank';
	}

	static generate(href, text) {
		return new LinkElement(href, text);
	}
}
