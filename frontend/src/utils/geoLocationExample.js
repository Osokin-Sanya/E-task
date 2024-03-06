export function getGeoLocation(callback) {
  if (!navigator?.geolocation) {
    const error = new Error("Геолокация не поддерживается в данном браузере.");
    return callback(error);
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    callback(null, { latitude, longitude });
  }, callback);

  return;
}
