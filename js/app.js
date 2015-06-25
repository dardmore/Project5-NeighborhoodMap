// Locations desired
var locations = [
    {
        "name": "Hornblower Niagara Cruises",
        "lat": 43.089020,
        "long": -79.072974,
    },
    {
        "name": "Movieland Wax Museum Niagara Falls",
        "lat": 43.090844,
        "long": -79.074019
    },
    {
        "name": "Skylon Tower",
        "lat": 43.085113,
        "long": -79.079567,
        "wiki": "Skylon Tower"
    },
    {
        "name": "My Cousin Vinny",
        "lat": 43.080680,
        "long": -79.083782,
    },
    {
        "name": "Cave of the Winds",
        "lat": 43.082309,
        "long": -79.071422
    }   
];

// Begin Code to add the map to the View
var map;

function initializeMap () {
    // Set the map's center lat / long
    var centerLatLng = new google.maps.LatLng(43.082088, -79.072232);
    
    // Set the map options
    var mapOptions = {
        disableDefaultUI: true,
        center: centerLatLng,
        zoom: 15,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var $mapElem = $('#map-canvas');
    
    // Create a test to make sure the map loads.
    var mapRequestTimeout = setTimeout(function() {
        $mapElem.text("Failed to retrieve Map");
    },10000);
    
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    if (map !== undefined) {
        clearTimeout(mapRequestTimeout);
    }
}

function viewModel() {
    var self = this;
    var infowindow;
    var mapMarkers = [];
    var contentArray = [];
    self.srchBar = ko.observable("");
    self.placeArray = ko.observableArray(locations);
    var numLocations = locations.length;
    
    // function to make ajax call to wikipedia to get articles
    function getWiki(i) {
        var $wikiElem = $('#wikipedia-links');
        var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + locations[i].name + '&format=json';
        var wikiRequestTimeout = setTimeout(function() {
            $wikiElem.text("Failed to Get Wikipedia Resources");
        },8000);
        
        $.ajax({
            url: wikiURL,
            dataType: "jsonp",
            cache: true,
            success: function(response) {
                var articleList = response[1];
                for (var j = 0; j < articleList.length; j++) {
                    articleStr = articleList[j];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    $wikiElem.append('<li><a href="' + url + '" target="_blank">' + articleStr + '</a></li>');
                }
                // Checks to see if there were any wikipedia articles found; if not display a message
                if (articleList.length === 0) {
                    $wikiElem.text("No Wikipedia links found.");
                }
                clearTimeout(wikiRequestTimeout);
            }
        });
    }

    // Create Map Marker and Marker Properties for each location
    function createMapMarker(i) {
        var myLatLng = new google.maps.LatLng(locations[i].lat, locations[i].long);
        // create marker settings
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title : locations[i].name,
            id : i
        });
        mapMarkers.push(marker);
        
        var contentString = '<div id="mapWindow">' +
            '<p style="font-weight: bold">' + locations[i].name + '</p>' +
            '<div>WikiPedia Links</div>' +
            '<ul id="wikipedia-links"></ul>' +
            '</div>';
        contentArray.push(contentString);
        
        // create infowindow settings   
        infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });
        
        // When marker clicked on, make marker bounce and open an infowindow
        google.maps.event.addListener(marker, 'click', function() {
            marker.setAnimation(google.maps.Animation.BOUNCE);  // Have the marker bounce
            setTimeout(function() {marker.setAnimation(null);}, 1500);
            infowindow.setContent(contentString);  // Set the infoWindow Content
            infowindow.open(map, marker);  // Open the infoWindow
            getWiki(i);
        });
        
        // Close the map infowindow if the map is clicked
        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();   
        });
    }

    // Loop through each location and create a marker
    for (var i = 0; i < numLocations; i++) {
        createMapMarker(i);
    }

    // Function for when text is entered into the search bar. Only show text that matches
    $("#srch").keyup(function () {
        if (self.srchBar()) {
            $(".list").find(":not(:contains(" + self.srchBar() + "))").parent().slideUp();
            $(".list").find(":contains(" + self.srchBar() + ")").parent().slideDown();
        }
        else {
            $(".list").slideDown();
        }
    });

    // Function to be run when one of the list items is clicked
    self.listClick = function(place) {
        var marker;
        for (j = 0; j < numLocations; j++) {
            if (place.name === locations[j].name) {
                marker = mapMarkers[j];
                marker.setAnimation(google.maps.Animation.BOUNCE);  // Have the marker bounce
                setTimeout(function() {marker.setAnimation(null);}, 1500);
                infowindow.setContent(contentArray[j]);
                infowindow.open(map, mapMarkers[j]);
                getWiki(j);
            }
        }
    };
}

//window.addEventListener('load', initializeMap);
initializeMap();
ko.applyBindings(new viewModel());

// On mouse hover of the location list, highlight the location and change the cursor
$('.highlight').hover(function() {
    $(this).css("background-color", "yellow");
    $(this).css("cursor", "pointer");
}, function() {
    $(this).css("background-color", "white");
});