import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lon, marker.lat ]));
    map.fitBounds(bounds, { padding: 100, maxZoom: 15, duration: 1000 });
  };

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    const markers = JSON.parse(mapElement.dataset.markers);


    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/julioeq29/cke0hskst1fl219pgipmurw8o'
    });

    markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

    const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '50px';
      element.style.height = '50px';

    new mapboxgl.Marker(element)
      .setLngLat([ marker.lon, marker.lat ])
      .setPopup(popup)
      .addTo(map);
    });

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                      mapboxgl: mapboxgl }));

    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };




