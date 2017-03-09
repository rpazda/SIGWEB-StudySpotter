$(document).ready(function() {
    initMap();

    $(".button-collapse").sideNav({
        menuWidth: 400,
        draggable: false
    });
    $(".modal").modal();
    $("select").material_select();

    //default states for "add spot" modal options
    $('#locationFind').hide();
    $('#buildingSelect').show();
    $('#coordinates').hide();

    //change modal information based on adding indoor or outdoor spot  
    $('#indoorOutdoor').click(function() {
        if ($(this).is(':checked')) {
            $('#buildingSelect').hide();
            $('#locationFind').show();
        } else {
            $('#locationFind').hide();
            $('#buildingSelect').show();
            $('#coordinates').hide();
        }
    });

    $('#locationBtnCurrent').click(function() {
        $('#coordinates').show();
    });


});

///Load all contents of map
function initMap() {

    var uniLocation = { lat: 28.602484, lng: -81.200306 }; //Select a location by coord
    var mapDiv = document.getElementById('map'); //Find div for map

    var map = new google.maps.Map(mapDiv, { //Create map in map div, pass in properties
        center: uniLocation, //change to center on uni latlong
        zoom: 16
    });

    marker = new google.maps.Marker({ position: uniLocation, map: map }); //Create new marker on the map

    //creat dummy markers for map
    m1 = new google.maps.Marker({ position: { lat: 28.602423, lng: -81.200343 }, map: map });
    m2 = new google.maps.Marker({ position: { lat: 28.602428, lng: -81.200347 }, map: map });
    m3 = new google.maps.Marker({ position: { lat: 28.602431, lng: -81.200339 }, map: map });
    m4 = new google.maps.Marker({ position: { lat: 28.602401, lng: -81.200400 }, map: map });
    m5 = new google.maps.Marker({ position: { lat: 28.603431, lng: -81.200639 }, map: map });
    m6 = new google.maps.Marker({ position: { lat: 28.604431, lng: -81.201339 }, map: map });
    m7 = new google.maps.Marker({ position: { lat: 28.601131, lng: -81.200539 }, map: map });
    m8 = new google.maps.Marker({ position: { lat: 28.604431, lng: -81.200009 }, map: map });
    m9 = new google.maps.Marker({ position: { lat: 28.600031, lng: -81.200339 }, map: map });
    m10 = new google.maps.Marker({ position: { lat: 28.606631, lng: -81.201139 }, map: map });
    m11 = new google.maps.Marker({ position: { lat: 28.600001, lng: -81.201339 }, map: map });
    m12 = new google.maps.Marker({ position: { lat: 28.602396, lng: -81.195901 }, map: map });
    m13 = new google.maps.Marker({ position: { lat: 28.603027, lng: -81.204527 }, map: map });

    //set details to display when marker clicked
    var spotDetails = "EXAMPLE TEXT"; //$('#info-window-content');

    //create info window to display when marker clicked, contains spotDetails
    var infoWindow = new google.maps.InfoWindow({
        //{map: map}
        content: spotDetails
    });

    //some stupid stuff to add info windows to all markers from above
    //not proud but it works
    //http://stackoverflow.com/questions/5613834/convert-string-to-variable-name-in-javascript
    for (i = 1; i < 14; i++) {
        let mid = "m" + i;
        window[mid].addListener('click', function() {
            //$('#add-spot-button').addClass("disabled");
            infoWindow.open(map, window[mid]);
        })
    }

    ///Creates a single marker at a time. New marker clears old marker
    /*  Selecting an outdoor spot on map being moved into menu
    google.maps.event.addListener(map, 'click', function(event) {	
        //Listen for event and perform function
        
        //some housekeeping
        infoWindow.close(); //close info window for existing marker, if open
        marker.setMap(null);		//clear previous marker, if exists

        //$('#add-spot-button').removeClass("disabled");  //enable create button
        marker = new google.maps.Marker({position: event.latLng, map: map});	//Add new marker at clicked position
        position = marker.getPosition().toString();	//Put position data of marker into var for use 

        //Create content for new marker info window
        let spotMessage = 'Click "Add Spot" button to add a new study spot at this location <br/>'+
                            '<center>or<center>'+
                            'Click marker to remove it';
        
        //Create info window for new marker
        let addSpotMessage = new google.maps.InfoWindow({
            content: spotMessage
        });

        //Show info window for new marker
        addSpotMessage.open(map, marker);

        //add listener for new marker. If clicked remove marker and disable "add spot" button
        google.maps.event.addListener(marker, 'click', function(event){
            marker.setMap(null);
            $('#add-spot-button').addClass("disabled");
        });

    });\
    */
}

function createSpot(location, map) {

}

//long and lat variables for the functions to pass about
var local;

//get user location on button click
function getLocation() {

    event.preventDefault();

    //set after to avoid erasing data
    local = document.getElementById('coordLoc');

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
    else
        local.innerHTML = "Location Services not Supported by Browser";
}

function showPosition(position) {

    local.innerHTML = "Longitude: &nbsp&nbsp" + position.coords.longitude + "<br>Latitude: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + position.coords.latitude;
}

//for picking a destination on the map on button click
function setLocation() {

    event.preventDefault();
}