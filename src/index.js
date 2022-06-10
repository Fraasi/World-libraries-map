import L from 'leaflet'
import libraryData from './assets/library-data-cleaned'
import countries from './assets/countries-geojson'

const bounds = new L.LatLngBounds(new L.LatLng(90, -180), new L.LatLng(-75, 210))
const map = L.map('map', {
	center: L.latLng(50, 0),
	zoom: 2,
	minZoom: 1,
	maxZoom: 5,
	maxBounds: bounds,
	maxBoundsViscosity: 1.0,
})

map.createPane('labels')
map.getPane('labels').style.zIndex = 650
map.getPane('labels').style.pointerEvents = 'none'

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'

// baseMap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
	attribution,
}).addTo(map)

// mapLabels
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
	attribution,
	pane: 'labels',
}).addTo(map);

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
	});
}

function getStyle(feature) {
	const country = libraryData.find(el => feature.properties.name === el.Name)
	return {
		color: 'black',
		fillColor: (country === undefined) ? getColor(0) : getColor(country.PerCapita),
		fillOpacity: 0.8,
	}
}

const geojson = L.geoJson(countries,
	{
		style: getStyle,
		onEachFeature,
	}).addTo(map)

geojson.eachLayer((layer) => {
	layer.bindPopup(`${layer.feature.properties.name}, ${layer.feature.id}`);
});

const info = L.control()

function highlightFeature(e) {
	const layer = e.target;
	layer.setStyle({
		weight: 2,
		color: 'lightgrey',
		dashArray: '',
	})

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront()
	}
	info.update(layer.feature.properties);
}
function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update()
}

info.onAdd = function () {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
	if (!props) {
		this._div.innerHTML = '<h4>World libraries by country</h4><b>Hover over a country</b>'
	} else {
		const countryData = libraryData.find(el => el.Name === props.name)
		if (countryData === undefined) {
			this._div.innerHTML = `<h4>World libraries by country</h4><b>${props.name}</b></br></br>No information`
		} else {
			const { Name, Expenditures, Librarians, Libraries, Users, Volumes, Museums, Publishers, Population, PerCapita } = countryData
			this._div.innerHTML = `<h4>World libraries by country</h4><b>${Name}</b></br></br>
			Libraries: ${Libraries === 0 ? 'N/A' : Libraries.toLocaleString()}</br>
			Librarians: ${Librarians === 0 ? 'N/A' : Librarians.toLocaleString()}</br>
			Users: ${Users === 0 ? 'N/A' : Users.toLocaleString()}</br>
			Volumes: ${Volumes === 0 ? 'N/A' : Volumes.toLocaleString()}</br>
			Expenditures: ${Expenditures === 0 ? 'N/A' : '$' + Expenditures.toLocaleString()}</br>
			Publishers: ${Publishers === 0 ? 'N/A' : Publishers.toLocaleString()}</br>
			Museums: ${Museums === 0 ? 'N/A' : Museums.toLocaleString()}</br>
			Population: ${Population.toLocaleString()}</br>
			Libraries per 100 000: ${PerCapita}`
		}
	}
}

info.addTo(map)

const legend = L.control({ position: 'bottomleft' })

legend.onAdd = function () {
	const div = L.DomUtil.create('div', 'info legend')
	const grades = [0, 15, 30, 50, 70, 80, 90, 100]
	div.innerHTML += '<span class="lib">#libraries per 100 000</span></br>'
	for (let i = 0; i < grades.length; i++) {
		div.innerHTML
			+= `<i style="background:${getColor(grades[i] + 1)}"></i> ${
			grades[i]}${grades[i + 1] ? `&ndash;${grades[i + 1]}<br>` : '+'}`
	}
	return div
}

legend.addTo(map)

function getColor(d) {
	return d > 100 ? '#800026'
		: d > 90 ? '#BD0026'
			: d > 80 ? '#E31A1C'
				: d > 70 ? '#FC4E2A'
					: d > 50 ? '#FD8D3C'
						: d > 30 ? '#FEB24C'
							: d > 15 ? '#FED976'
								: '#FFEDA0'
}
