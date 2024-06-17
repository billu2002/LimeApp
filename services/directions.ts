const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';


type Coordinates = [number, number];

export async function getDirections(from: Coordinates, to: Coordinates) {
  const response = await fetch(
    `${BASE_URL}/walking/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const json = await response.json();
  //   console.log(json);
  //   console.log(JSON.stringify(json, null, 2));
  return json;
}
