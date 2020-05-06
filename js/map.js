const apiMapKey = 'AIzaSyCnqtwJKIoDl6ShU2rpk9Vai0rjIOd8Vqk';
var map;

// map
let script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiMapKey}&callback=initMap`;
script.defer = true;
script.async = true;

document.head.appendChild(script);
window.initMap = () => {
		map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(-10.3333333, -53.2),
		zoom: 5.2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
}

export function addMarkers(data) {
	for(let i = 0; i < data.length; i++) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i].lat, data[i].lng),
			icon: 'images/map-marker.png',
			map: map
		});
	}
}
