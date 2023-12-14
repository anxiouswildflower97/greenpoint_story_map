//----initial code for setting up map----
let storyMap;

storyMap = L.map('map');

L.tileLayer.provider('Thunderforest.Pioneer', {apikey: '82b8c209071f44649ece88f6663bd8bc'}, {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(storyMap);

storyMap.setView([40.73925721335738, -73.95260386247023], 15);

//----icon----
var stopIcon = L.icon({
    iconUrl: './stop-sign-illustrated.png',
    iconSize: [30,30],
    iconAnchor: [20, 20]

});

//----function to filter and add geoJSON by chapter----
function addGeographicalData(chapterNumber) {
    return L.geoJSON(greenpointData, {
            filter: function(feature, layer) {
                return feature.properties.tag == "chapter "+chapterNumber;
            },
            pointToLayer: function(feature, LatLng) {
                return L.marker(LatLng, {
                    icon: stopIcon
                });
            },
            style: function(feature) {
                return {
                    color: feature.properties.color,
                    weight: 3,
                    fillColor: feature.properties.color,
                    fillOpacity: 0.5
                };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>" + "<p>" + feature.properties.refImage + "</p>");
            }
        }).addTo(storyMap);
}

//----adding geoJSON chapter by chapter, so each chapter is it's own layer. tried to use for loop, see notes below in original code section----
var chap0 = addGeographicalData(0);
var chap1 = addGeographicalData(1);
var chap2 = addGeographicalData(2);
var chap3 = addGeographicalData(3);
var chap4 = addGeographicalData(4);
var chap5 = addGeographicalData(5);
var chap6 = addGeographicalData(6);
var chap7 = addGeographicalData(7);
var chap8 = addGeographicalData(8);
var chap9 = addGeographicalData(9);
var chap10 = addGeographicalData(10);
var chap11 = addGeographicalData(11);

//----code for setting up checkbox filter for selecting chapters----
var allLayers=[chap0, chap1, chap2, chap3, chap4, chap5, chap6, chap7, chap8, chap9, chap10, chap11];
var layerControl = L.control.layers().addTo(storyMap); //creates the checkbox structure. Nothing in layers, because then it creates a radio button for that layer, not a checkbox
for (i=0; i<=allLayers.length; i++) {
    if(allLayers[i]==chap0){
        layerControl.addOverlay(allLayers[i], "Prologue");
    }
    else {
        layerControl.addOverlay(allLayers[i], "Chapter "+i);
    }
}

//----toggling chapter content on website---
function openChapter(evt, chapterName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(chapterName).style.display = "block";
    evt.currentTarget.className += " active";
  }


//----ORIGINAL CODE, IT'S PURPOSE, WHAT IT WAS REPLACED WITH --------------------------------------------------------------------------------------------------------------------
//----original code for loading geoJSON data onto the map. however, wanted to add each chapter as it's own separate layer so can be added and removed at user's discretion----
/*L.geoJSON(greenpointData).addTo(storyMap);
L.geoJSON(greenpointData, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    }
}).addTo(storyMap);*/

//----original code for loading each chapters geoJSON separately. however, this was tedious, so I created a function to filter and add geoJSON by chapter----
/*var chap0 = L.geoJSON(greenpointData, {filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 0';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap1 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 1';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap2 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 2';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap3 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 3';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap4 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 4';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap5 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 5';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap6 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 6';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap7 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 7';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap8 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 8';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap9 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 9';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap10 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 10';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);

var chap11 = L.geoJSON(greenpointData, {
    filter: function(feature, layer) {
        return feature.properties.tag == 'chapter 11';
    },
    pointToLayer: function(feature, LatLng) {
        return L.marker(LatLng, {
            icon: stopIcon
        });
    },
    style: function(feature) {
        return {
            color: feature.properties.color,
            weight: 3,
            fillColor: feature.properties.color,
            fillOpacity: 0.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>" + "<h4>" + feature.properties.subtitle + "</h4> <hr> <p>" + feature.properties.description + "</p>");
    }
}).addTo(storyMap);*/

//----attempt to use for loop to add geoJSON for each chapter. it works, however, when trying to add the checkboxes using the layer control functions, we get into trouble since these aren't being saved to a declared variable. kind of tricky to create an array of variables with unassigned values that will be assigned through the for loop. something to hash out when have more time----
/*var chapters = [0,1,2,3,4,5,6,7,8,9,10,11];
for(i=0;i<=chapters.length;i++){
    addGeographicalData(chapters[i]);
}*/

//----original code for adding each chapter's geoJSON to checkbox list so can filter map by specific chapters, however, there are 46 chapters, so using for loop----
/*var layerControl = L.control.layers().addTo(storyMap); layerControl.addOverlay(prologue, "Prologue"); layerControl.addOverlay(chap1, "Chapter 1"); layerControl.addOverlay(chap2, "Chapter 2"); layerControl.addOverlay(chap3, "Chapter 3"); layerControl.addOverlay(chap4, "Chapter 4"); layerControl.addOverlay(chap5, "Chapter 5"); layerControl.addOverlay(chap6, "Chapter 6"); layerControl.addOverlay(chap7, "Chapter 7"); layerControl.addOverlay(chap8, "Chapter 8"); layerControl.addOverlay(chap9, "Chapter 9"); layerControl.addOverlay(chap10, "Chapter 10"); layerControl.addOverlay(chap11, "Chapter 11");*/

