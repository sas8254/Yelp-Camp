mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: campground.geometry.coordinates,
  zoom: 11,
});
console.log(campground.geometry.coordinates);
new mapboxgl.Marker().setLngLat(campground.geometry.coordinates).addTo(map);
