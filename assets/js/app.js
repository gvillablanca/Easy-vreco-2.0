//  Creamos la función que llama al script del mapa
const encuentrame = document.getElementById('encuentrame');
function initMap() {
  var mainMap = { 
    lat: -33.431919, 
    lng: -70.647897 };
  var map = new google.maps.Map(document.getElementById('map'), {
    //  Indicamos el zoom que queremos aplicar en el mapa
    zoom: 17,
    //  Indicamos que el mapa con las coordenadas aparesca centrado
    center: mainMap
  });
  var iconBike = 'http://www.museosmalaga.net/wp-content/uploads/2015/07/icono-bicicleta.png';
  // Colocamos el marcador en el mapa
  var markadorMainMap = new google.maps.Marker({
    //  El marcador recibe la latitud y longitud de mainMap
    position: mainMap,
    icon: iconBike,
    // Se indica que el marcador aparesca en el mapa llamado map
    map: map 
  });
    // Creamos la función que buscará la localización del usuario


encuentrame.addEventListener('click',()=>{
   var infoWindow = new google.maps.InfoWindow({map: map});
   if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Aqui estas tu!');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
}

//  Llamamos a los inputs que queremos que tengan el autocompletado
  var inputPartida = document.getElementById('partida');
  var inputDestino = document.getElementById('destino');
  //  Por medio de la clase autocomplete indicamos que este input va a tener autocompletado
  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
  //  Declaramos las variables para realizar la ruta
  //  Con DirectionsService calculamos las indicaciones
  var directionsService = new google.maps.DirectionsService;
  //  Con DirectionsRenderer representamos estos resultados
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //  Ahora calculamos y mostramos la ruta
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    // DirectionsServices.route devuelve un DirectionsRequest
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'WALKING'
    }, function(response, status) {
      //  Si el status es OK, entonces se trazará la ruta. Si no, se envía un alert
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('no encontramos una ruta');
      }
    });
  }

//  Indicamos al mapa que trace la ruta
directionsDisplay.setMap(map);  
 
var trazarRuta = function() {
  //  Declaramos la función "trazarRuta" que tendrá la función calculateAndDisplayRoute 
  calculateAndDisplayRoute(directionsService, directionsDisplay);
};  
//  Al botón Trazar ruta le asignamos el evento click para que ejecute la función trazarRuta
document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);
}