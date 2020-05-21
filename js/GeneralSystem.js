$(document).ready(function()
{
	eventoBotonesNavegador();
	dispositivoConsume()
 	//setInterval(function(){getNotificaciones();}, 10000);
});
function dispositivoConsume()
{
	$(document).on("click",function(e) 
	{
		var barraNavIzquierda = $("#BarraNavLeft");
		var barraNavTop = $("#ContenedorMenuModulos");
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
		{
		    if (!barraNavIzquierda.is(e.target) && barraNavIzquierda.has(e.target).length === 0) 
		    {//Se ha pulsado en cualquier lado fuera de los elementos contenidos en la variable barraNavIzquierda
		    	$("#close-sidebar").click();
		    }
		}

		if (barraNavTop.hasClass('show')) 
		{//Se ha pulsado en cualquier lado fuera de los elementos contenidos en la variable barraNavTop
			$("#btnNavTop").click();
		}
	});
}
/*
	var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

 */
function setCookieCarritoCompra(arrayCarritoCompra)
{
	$.cookie('CARRITO_COMPRA', JSON.stringify(arrayCarritoCompra));
}
// Funciones
function addItemCarrito(idProd,nombrePRod,descripProd,precioProd,cantProd,urlImagenProd)
{
	var idProducto = idProd != undefined ? idProd : 0;
	var nombre     = nombrePRod != undefined ? nombrePRod : 0;
	var descrip    = descripProd != undefined ? descripProd : 0;
	var precio     = precioProd != undefined ? precioProd : 0;
	var cantidad   = cantProd != undefined ? cantProd : 0;
	var urlImagen  = urlImagenProd != undefined ? urlImagenProd : 0;

	var newItemCarrito = {
		'id':idProducto, 
		'nombre':nombre, 
		'descripcion':descrip, 
		'precio':precio, 
		'cantidad':cantidad, 
		"imagen":urlImagen
	};
	
	var carritoCompra = $.cookie('CARRITO_COMPRA') != undefined ? JSON.parse($.cookie('CARRITO_COMPRA')) : [];

	if(remplazaCantElementArray(carritoCompra,newItemCarrito) == false)// si el producto no esta agregado lo agrega
	{
		carritoCompra.push(newItemCarrito);
		setCookieCarritoCompra(carritoCompra);
	}

	$('#CountCarComp').html(carritoCompra.length);
}
function deleteCarrito()
{
	var result = false;

	try 
	{
		$.removeCookie('CARRITO_COMPRA');
		result = true;
	}
	catch(error) 
	{
	  console.error(error);
	  result = false;
	}
	return result;
}
function getCantProductos()
{
	var countProdCar = $.cookie('CARRITO_COMPRA') != undefined ? 
					   JSON.parse($.cookie('CARRITO_COMPRA')) : [];

	return countProdCar.length;
}
function crearCookiesUsuario(id,nombre,apellido,email,passw,imagen,id_tipo_usuario,login)
{
	$.cookie('SESSION_LOGIN', login, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_ID', id, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_NOMBRE', nombre, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_APELLIDO', apellido, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_EMAIL', email, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_PASSWORD', passw, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_IMAGEN', imagen, { expires: 1 });//cookie que caduca a 1 días creacion
	$.cookie('SESSION_IDTIPO_USUARIO', id_tipo_usuario, { expires: 1 });//cookie que caduca a 1 días creacion
}
function getUsuarioSesion()
{
	var Usuario = {
		login 	 		: $.cookie('SESSION_LOGIN'),
		id 		 		: $.cookie('SESSION_ID'),
		nombre 	 		: $.cookie('SESSION_NOMBRE'),
		apellido 		: $.cookie('SESSION_APELLIDO'),
		email 	 		: $.cookie('SESSION_EMAIL'),
		password 		: $.cookie('SESSION_PASSWORD'),
		imagen 	 		: $.cookie('SESSION_IMAGEN'),
		id_tipo_usuario : $.cookie('SESSION_IDTIPO_USUARIO')
	}

	return Usuario;
}
function eliminarCookies()
{
	var result = false;

	try 
	{
		sessionStorage.removeItem('moduloSelect');
		$.removeCookie('SESSION_LOGIN');
		$.removeCookie('SESSION_ID');
		$.removeCookie('SESSION_NOMBRE');
		$.removeCookie('SESSION_APELLIDO');
		$.removeCookie('SESSION_EMAIL');
		$.removeCookie('SESSION_PASSWORD');
		$.removeCookie('SESSION_IMAGEN');
		$.removeCookie('SESSION_IDTIPO_USUARIO');
		result = true;
	}
	catch(error) 
	{
	  console.error(error);
	  result = false;
	}
	return result;
}
function format24A12H(hora,minutos,segundos) {
  var hh = hora;
  var m = minutos;
  var s = segundos;
  var dd = "AM";
  var h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = "PM";
  }
  if (h == 0) {
    h = 12;
  }

  m = m < 10 ? "0" + parseInt(m) : m;

  s = s < 10 ? "0" + parseInt(s) : s;

  var replacement = h + ":" + m;

  replacement += " " + dd;

  return replacement;
}

function eventoBotonesNavegador()
{
	window.onpopstate  = function(event) 
	{ 
		var result = false;

		var urlToCambiar  = document.location;// se obtiene la url a la que se desea cambiar
		var parametrosGET = String(urlToCambiar).split("?");// se parte en dos, para obtener las variables GET
		var datosGet      = String(parametrosGET[1]).split("=");// se parte en dos, para obtener las variables GET
		var ModuloToGo    = datosGet[1];// se obtiene el modulo a ir

		if(ModuloToGo != null && ModuloToGo != undefined)
		{
			if (objModulos[ModuloToGo] != undefined) //si el modulo existe se cambia el modulo seleccionado
			{
				result = true;
				sessionStorage['moduloSelect'] = objModulos[ModuloToGo]; // se reemplaza la variable de session
				showModuloSelect();
			}
		}

		return result;
	} 
}
function efectoLoadInSection(sectionAfectada)
{
	$(sectionAfectada).parent().append('<div class="opacarContenido texto-centrado fadeIn"><i class="fas fa-sync-alt fa-spin h2" ></i></div>');
	
	$('.reload').attr('id', 'reload');
	setTimeout(function(){ $('.reload').attr('id', ''); }, 2000);
}
function disableEfectoLoadInSection(sectionAfectada)
{
	$(sectionAfectada).parent().find('.opacarContenido').remove();
}