
function obtenerUrlMapa(pIframe){ //obtiene el iframe obtenido en google maps
  var res = pIframe.replace('<iframe ', '');
  res = res.replace('></iframe>', '');
  res = res.split(" ");
  res = res[0].replace('src="', '');
  res = res.split('"');

  return res[0];//devuelve la url necesaria para incrustarla en el iframe local
}

function cargarGoogleMap(sIframe){ //se carga la url a cargar en el iframe local
  var resulOper = false;
  var validarMaps = sIframe.substring(0, 7);
  if (validarMaps == "<iframe") 
  {
    var urlMaps = obtenerUrlMapa(sIframe);
     $('#frameGoogleMaps').attr({
       src: urlMaps,
       width: '100%',
       height: '500px',
       style: 'border:0;'
     }); // se agrega url al iframe
     resulOper = true;
  }
  else
  {
    resulOper = false;
  }
    return resulOper;
}
function verRutaDirecDestino(sUbicacionDestino){
  var prefMapRuta = "https://www.google.com/maps/dir/?api=1";
  var modoTrasladoRuta = "&travelmode=driving";
  var sOrigenRuta = "&origin=Torre Premier, Blvd. Pedro Infante 2931, Congreso del Estado, Culiacán Rosales, Sin.";
  //var sDestinoRuta = "&destination=Blvd. Rolando Arjona Amabilis 1608, San Antonio, Sin.";
  var sDestinoRuta = "&destination=" + sUbicacionDestino;
  
    var sRutaMaps = prefMapRuta + sOrigenRuta + sDestinoRuta + modoTrasladoRuta;
    $("#linkIrRuta").attr({
         href: sRutaMaps
    }); // se agrega prop
    return sRutaMaps;
}
function LoadEstadosMunicipios()
{
   // Cargamos los estados
    var estados = "<option value='' disabled selected>Selecciona el estado</option>";

    for (var key in municipios) {
        if (municipios.hasOwnProperty(key)) {
            estados = estados + "<option value='" + key + "'>" + key + "</option>";
        }
    }

    $('#slctEstUbicDest').html(estados);

    // Al detectar
    $( "#slctEstUbicDest" ).change(function() {
       $(".containbtnVerRuta").hide(1000); 
        var html = "<option value='' disabled selected>Selecciona el municipio</option>";
        $( "#slctEstUbicDest option:selected" ).each(function() {
            var estado = $(this).text();
            if(estado != "Selecciona el estado"){
                var municipio = municipios[estado];
                for (var i = 0; i < municipio.length; i++)
                {
                    html += "<option value='" + municipio[i] + "'>" + municipio[i] + "</option>";
                }
            }
        });
        $('#slctMuniUbicDest').html(html);
    }).trigger( "change" );
    
    $("#slctMuniUbicDest").change(function() 
    {
      $(".containbtnVerRuta").hide(1000); 
    }).trigger( "change" );
}
/*
  var map;
     function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 24.791507, lng: -107.439684},
          zoom: 13,
        });
        var marker = new google.maps.Marker({
          position: {lat: 24.791507, lng: -107.439684},
          map: map,
    title: 'Torre Premier'
        });
      }
       var latlng = new google.maps.LatLng(42.745334, 12.738430); 
       function addmarker(latilongi) 
       { 
	       	var marcador = new google.maps.Marker(
	       	{ 
	       		position: latilongi, title: 'new marker', draggable: true, map: map 
	       	}); 
	       	map.setCenter(marcador.getPosition());
       } 
       $('#btnaddmarker').on('click', function() {
	       	alert("a");
	        addmarker(latlng);
    	}) */