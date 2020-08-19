import mapboxgl from 'mapbox-gl';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lon, marker.lat ]));
    map.fitBounds(bounds, { padding: 100, maxZoom: 15, duration: 10_000 });
  };

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    const markers = JSON.parse(mapElement.dataset.markers);

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([ marker.lon, marker.lat ])
      .addTo(map);
    });
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
