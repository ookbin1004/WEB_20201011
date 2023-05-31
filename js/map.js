var mapContainer = document.getElementById('map'),
	mapOption = {
		center : new kakao.maps.LatLng(37.38000734272847, 126.92892366805282),
		level : 3
	};

var map = new kakao.maps.Map(mapContainer, mapOption);

var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);