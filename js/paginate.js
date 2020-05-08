let currentPage = 1;
let numberOfPages = 0
let numberObjPerPage = 5;

function paginateEvent() {
	document.getElementById('next').disabled = currentPage === numberOfPages ? true : false;
	document.getElementById('previous').disabled = currentPage === 1 ? true : false;
}

function getNumberOfPages(data) {
	numberOfPages = Math.ceil(data.length / numberObjPerPage);
}

export function loadObjs(data) {
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

export function next(data) {
	currentPage += 1;
	getNumberOfPages(data);
};

export function prev(data) {
	currentPage -= 1;
	getNumberOfPages(data);
};
