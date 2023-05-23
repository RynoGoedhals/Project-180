let latitude, longitude, destination;

$(document).ready(function(){
    alert("Please allow the device to know your location!")
    initGeolocation();
})

$(function(){
    $("#navigate-button").click(function(){
        window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`
    })
})

function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Sorry, your browser does not support geolocation services");
    }
}

function success(position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    mapboxgl.accessToken = "pk.eyJ1Ijoicnluby1nb2VkaGFscyIsImEiOiJjbGhqdHY4ZHYwbGhsM2NxdjRoNWMwa2kyIn0.qYm3ZfCRZuo7yHGNoDcEwA";

    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 4
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }).on("result", function(e){
            destination = e.result.center;
        })
    );
    
    var img1 = document.querySelector("#amber");
    var marker1 = new mapboxgl.Marker({
        element: img1
    })
    .setLngLat([75.85133, 26.98547])
    .addTo(map);
}