
var markers_adress = "images/map-icon/";
var center = [-87.84039513263747,42.87337743669951];
var zoom = 14;
let main_logo_size = [141, 141];
if ($(window).width() < 1200) {
    main_logo_size = [70, 70];
    center = [-87.84992233905818,42.8735789187075];
}
if ($(window).width() < 575) {
    main_logo_size = [49, 49];
}
var geojson = {
    'type': 'FeatureCollection',
    'features': [
        // {
        //     'type': 'Feature',
        //     'properties': {
        //         'iconBoolean': true,
        //         'iconSize': [114, 40],
        //         'iconName': 'logo-icon.svg',
        //         'iconClass': 'main-logo'
        //     },
        //     'geometry': {
        //         'type': 'Point',
        //         'coordinates': center
        //     }
        // },
        {
            'type': 'Feature',
            'properties': {
                'iconBoolean': true,
                'description':
                    '9324 S Breakwater Blvd\n' +
                    'Oak Creek, WI 53154',
                'iconSize': main_logo_size,
                'iconInsideName': 'map-logo.svg',
                'popupIs': true,
                'iconClass': 'main-logo',
                'popupName': 'for-point-1-js',
                // 'iconCat': 'cat-2-js'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-87.84992233905818,42.8735789187075],
            }
        }
    ]
};
mapboxgl.accessToken = 'pk.eyJ1IjoiZGltYXA4MzQyMDk4NTI5MzgiLCJhIjoiY2ttaHUwMHF3MGF3cTJvcXZzOHJ2aGtieCJ9.6PDcbp5DTvpdo0N-WIFp1A';
var map = null;
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dimap834209852938/cl2us19s3002j15lt7ufb7syg',
    center: center,
    cooperativeGestures: true,
    zoom: zoom,
});
geojson.features.forEach(function (marker, index, array) {
    if (marker.properties.iconBoolean) {
        var el = document.createElement('div');
        if (marker.properties.iconName) {
            el.style.backgroundImage =
                'url('+markers_adress +
                marker.properties.iconName +
                ')';
            el.style.backgroundSize = 'contain';
            el.style.backgroundRepeat = 'no-repeat';
        }
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';
        if (marker.properties.popupName) {
            el.setAttribute('data-popup-js', `.${marker.properties.popupName}`);
            el.className = `marker marker-js`;
        }
        if(marker.properties.iconClass) {
            // el.className = marker.properties.iconClass;
            $(el).addClass(marker.properties.iconClass)
        }
        let elToInside_wrap = document.createElement('div');
        elToInside_wrap.setAttribute('class', 'zoomMarker');
        //----------
        if (marker.properties.iconInsideName) {
            let elToInside = document.createElement('img');
            elToInside_wrap.append(elToInside);
            $(elToInside).attr('src', markers_adress + marker.properties.iconInsideName);
            el.append(elToInside_wrap);
        }
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }
    if (marker.properties.popupIs) {
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            closeOnMove: false,
            anchor: 'bottom',
            className: `mapboxgl-popup ${marker.properties.popupName}`
        })
            .setLngLat(marker.geometry.coordinates)
            .setHTML(marker.properties.description)
            .setMaxWidth('300px')
            .addTo(map);
    }
    if (marker.properties.state) {
        el.classList.add(marker.properties.state);
    }
});
map.on('load', function () {
    let popup = null;

    $('.marker-js').on('mouseenter', function () {
        console.log('active')
        popup = $(this).data('popup-js');
        $('.mapboxgl-popup').not($(popup)).removeClass('active');
        $(popup).addClass('active');
    });
    $('.marker-js').on('mouseleave', function () {
        $(popup).removeClass('active');
    });
    let inclusives = [];
    $('.filter-item-js').on('click', function () {
        inclusives = [];
        $(this).toggleClass('active');
        $('.marker-js').addClass('hide');
        $('.filter-item-js').each(function (i, elem) {
            if ($(elem).hasClass('active')) {
                let cat_new = $(this).data('cat');
                inclusives.push(cat_new);
                $(cat_new).removeClass('hide');
            }
        });
        if (inclusives.length === 0) {
            $('.marker-js').removeClass('hide');
        }
    });
    map.resize();
});
//-------------helper---------------------------------------------------------------------------------------------------------

map.on('zoom', () => {
    let scale = 1 + (map.getZoom() - zoom) * 0.5;
    if (scale > 1) {
        scale = 1
    }
    if (scale < .8) {
        scale = .8;
    }
    $('.zoomMarker').attr('style', 'transform: scale(' + scale + '); transform-origin: center');
});

// map.on('click', function (e) { console.log(JSON.stringify(e.point) + '<br />' + JSON.stringify(e.lngLat.wrap()));
// console.log(map.getZoom()); });

