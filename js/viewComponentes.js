var objModulos = {
					'1ini1' : 'ModuloInicio',
					'2cnt1' : 'ModuloContacto',
					'3lct1' : 'ModuloLocacion',				
					'4mnu1' : 'ModuloMenu',				
					'6cnes1': 'ModuloConEstServ',				
					'5acr1' : 'ModuloAcerca',				
					'7aus1' : 'ModuloAdminUsers',				
					'8cac1' : 'ModuloCarCompra'	,		
					'9cal1' : 'ModuloCalendario',			
					'10mns1' : 'ModuloChat'			
				 };

$(document).ready(function()
{
	loginAcces(false);
	viewFooter();
});
function loginAcces(inicioSesion)
{	
	if (inicioSesion == true){sessionStorage['inicioSesion'] = "active";}// linea que indica cuando el entra al sistema desde el login y aparesca el mensaje de bienvenida

	var usuarioSesion   = getUsuarioSesion().nombre;
	var usuarioSesionId = getUsuarioSesion().id;
	if (usuarioSesion !=  undefined) 
	{
		if (usuarioSesionId != undefined) 
		{
			eliminarArchivosTemporales(usuarioSesionId);
		}

		$('#cuerpo').removeClass('bgImageResponsive');
		$('#cuerpo').addClass('bg-color-fondo');
		$('#app').load("php/vistas/secciones/ContenidoBody.php", function() //se carga Componente
		{
			$('#modalsVerFotosFullScreen').load("php/vistas/modales/modalShowImagen.php", function() 
			{
				initViews();//se inician las variables booleanas en falso por ningun boton presionado 
			});
			
		});
	}
	else
	{
		history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php");

		$('#app').load("php/vistas/viewLogin.php", function() //se carga Componente
		{ //se crean los eventos una vez obtenida la vista
			$('#cuerpo').addClass('bgImageResponsive');
			animationInputLabel('#txtUsuario','#lblUsuario','white');
			animationInputLabel('#txtPassword','#lblPassword','white');
			$('#txtUsuario').focus();

			$('#chckbxHuella').click(function() 
			{
				if(this.checked) 
				{
			    	$("#grupoPassword").hide(250);
			    	$("#txtPassword").removeAttr('required');
		        }
		        else
		        { 
			    	$("#txtPassword").attr("required","");
			    	$("#grupoPassword").show(250);
		        }
			});

			$("#frmLogin").submit(function(event) 
			{
				event.preventDefault();
					
				var email     = $("#txtUsuario").val();
				var password  = $("#txtPassword").val();

				if ($("#chckbxHuella").is(':checked') && email != "")
				{
					$.ajax({
				        method: "GET",
				        url: "http://localhost:20542/api/huella",
				        data: ""
				    })
				    .done(function(respuesta) 
				    {
				    	if(respuesta.status == 0) 
				    	{
				    		validarDatosLogin(email,respuesta.template64,password);
				    	}
				    });
				}
				else if(email != "" && password != "") 
				{
					validarDatosLogin(email,"",password);
				}
	    	});
	    	
	    	$("#btnVerSitio").click(function( event ) { //Quitar el evento por defecto a todos los links o etiquetas <a>
				eliminarCookies();
		        crearCookiesUsuario(undefined,'invitado',undefined,undefined,undefined,undefined,undefined,undefined,false);
		        loginAcces(false);
			});

			$('#chckbxHuella').click();
		});
	}

}
function validarDatosLogin(usuario,huella,password) 
{
	var objParam = {
					'opcion': 1,
					'email' : usuario,
					'password' : password,
					'huella' : huella				
					};

    $.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {

            var usuario = {
			'id': response.respuesta['id'],
			'nombre' : response.respuesta['nombre'],
			'apellido' : response.respuesta['apellido'],
			'email' : response.respuesta['email'],
			'password' : response.respuesta['password'],
			'imagen' : response.respuesta['foto'],
			'id_tipo_usuario' : response.respuesta['id_tipo_usuario']			
			};
           
            if(response.resultOper == 1)
            {
            	eliminarCookies();
            	crearCookiesUsuario(usuario['id'],usuario['nombre'],usuario['apellido'],usuario['email'],usuario['passw'],usuario['imagen'],usuario['id_tipo_usuario'],true);
            	enableNotifyAlerta("Exito!",response.mensaje + " " + response.respuesta['nombre'],3);
            	loginAcces(true);
            }
            else
            {
               enableNotifyAlerta("Datos Invalidos!",response.mensaje,4);
            }
        },
		beforeSend: function()
		{
			loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4);
        }
    });
	
}
function eliminarArchivosTemporales(idUsuario)
{
	var objParam = {
					'opcion': 13,
					'descripcionOpc' : "Eliminar Temporales",
					'idUsuario' : idUsuario 			
					};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
            if(response.resultOper == 1)
            {
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
}
function initViews()
{	
	$('#BarraNavegacion').load("php/vistas/secciones/BarraNavegacion.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		$('#BarraNavLeft').load("php/vistas/secciones/barraNavegacionIzq.php", function() //se carga Componente
		{// se cargan eventos de la barra navegacion
			loadEventosBtnNavBar();
			loadEventosNavBarLeft();
			
			var imgUsuarioSesion = getUsuarioSesion().imagen;
			var idTipoUsuarioSesion = getUsuarioSesion().id_tipo_usuario;

			switch (idTipoUsuarioSesion) 
			{
			  case '1':
					$('#rolUser').html("Administrador");
			    break;
			  case '3':
					$('#rolUser').html("Cliente");
			    break;
			  default:
					$('#rolUser').html("invitado");
			    break;
			}

			if (imgUsuarioSesion != 'undefined' && imgUsuarioSesion != undefined && imgUsuarioSesion != 'null' && imgUsuarioSesion != '') 
			{
				$('#imgPerfilUsuario').attr("src","resources/img/usuarios/" + imgUsuarioSesion);
				$('#imgPerfilUsuario').attr("data-imgruta","resources/img/usuarios/" + imgUsuarioSesion);// para ver en pantalla completa
			}
			else
			{
				$('#imgPerfilUsuario').attr("src","resources/img/usuarios/user-perfil.jpg");
				$('#imgPerfilUsuario').attr("data-imgruta","resources/img/usuarios/user-perfil.jpg");// para ver en pantalla completa
			}
			loadEventosScreen();
			$('#menuNotifPopUp').load("php/vistas/componentes/MenuNotificacionPopUp.php", function() //se carga Componente
			{// se cargan eventos de la barra navegacion
				$('#modalNotificacionContainer').load("php/vistas/modales/modalNotificaciones.php", function() //se carga Componente
				{// se cargan eventos de la barra navegacion
					$.when(loadEventosMenuNotify())
	        		.then(function( data, textStatus, jqXHR ) 
	        		{
	        			getNotificaciones();
						$('#lblNotifNew').hide();
	        			$('#countNotificaciones').hide();

						$('#CountCarComp').html(getCantProductos() > 0 ? getCantProductos() : '');

						showModuloSelect();	
					});	

					$('.verPantallaCompleta').click(function(event) 
				 	{
						var rutaImagen = $(this).data('imgruta');
						verImgCompleta(rutaImagen);
					});	
				});
			});
		});
	});
}
function loadEventosScreen()
{
	var bPantallaCompleta = false;
	$(".btnFullScreen").click(function() 
	{ 
		if (bPantallaCompleta) 
		{
			$(".btnFullScreen").html('<i class="fas fa-expand"></i>');
			bPantallaCompleta = false;
			cancelFullScreen();
		}
		else
		{
			$(".btnFullScreen").html('<i class="fas fa-compress"></i>');
			bPantallaCompleta = true;
			launchFullScreen(document.documentElement);
		}
	});
	
}
function launchFullScreen(element) 
{
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}
// Lanza en pantalla completa en navegadores que lo soporten
function cancelFullScreen() {
     if(document.cancelFullScreen) {
         document.cancelFullScreen();
     } else if(document.mozCancelFullScreen) {
         document.mozCancelFullScreen();
     } else if(document.webkitCancelFullScreen) {
         document.webkitCancelFullScreen();
     }
}
function loadEventosNavBarLeft()
{
	$(".sidebar-dropdown > a").click(function() 
	{
	  $(".sidebar-submenu").slideUp(200);
	  if ($(this).parent().hasClass("active")) 
	  {
	    $(".sidebar-dropdown").removeClass("active");
	    $(this).parent().removeClass("active");	  
	  } 
	  else 
	  {
	    $(".sidebar-dropdown").removeClass("active");
	    $(this).next(".sidebar-submenu").slideDown(200);
	    $(this).parent().addClass("active");
	  }
	});
	
	$("#close-sidebar").click(function() {
	  $(".page-wrapper").removeClass("toggled");
	});
	$("#show-sidebar").click(function() {
	  $(".page-wrapper").addClass("toggled");
	});
}

function loadEventosBtnNavBar()
{
	var NomUserSesion = getUsuarioSesion().nombre;
	
	/*
	 Cada que se agregue un nuevo boton que levante una nueva vista
	 se debe de agregar en la variable global objModulos, con su respectivo identificador y nombre
	 */
			
	$("#lblNomUser").html(NomUserSesion);

	$("a").click(function( event ) 
	{ //Quitar el evento por defecto a todos los links o etiquetas <a>
			event.preventDefault();
	}); 
	$(".imgTxtLogo").click(function( event ) 
	{ //Quitar el evento por defecto a todos los links o etiquetas <a>
			event.preventDefault();
			$("#btnInicio").click();
	});

	$("#btnInicio").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['1ini1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = objModulos['1ini1'];
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=1ini1");
		}
	});
	$("#btnNavTop").focusin(function(event) 
	{
		$("#btnNavTop").children().attr({id: ''});
		$("#btnNavTop").children().attr({id: 'rotar180'});
	});
	$("#btnNavTop").focusout(function(event) 
	{
		$("#btnNavTop").children().attr({id: ''});
		$("#btnNavTop").children().attr({id: 'regresar180'});
	});
	$("#btnContactar").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['2cnt1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloContacto";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=2cnt1");
		}
	});
	$("#btnLocacion").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['3lct1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloLocacion";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=3lct1");
		}
	});
	$("#btnMenu").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['4mnu1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloMenu";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=4mnu1");
		}
	});
	$("#btnConEstServ").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['6cnes1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloConEstServ";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=6cnes1");
		}
	});
	$("#btnAcerca").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['5acr1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect']="ModuloAcerca";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=5acr1");
		}
	});

	$("#btnAdminUsers").click(function()
	{
		
		if (sessionStorage.getItem('moduloSelect') != objModulos['7aus1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect']="ModuloAdminUsers";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=7aus1");
		}
	});
	$("#btnCarCompra").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['8cac1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloCarCompra";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=8cac1");
		}
	});
	$("#btnCalendario").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['9cal1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloCalendario";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=9cal1");
		}
	});
	$("#btnChat").click(function()
	{
		if (sessionStorage.getItem('moduloSelect') != objModulos['10mns1'])// redirige, solo si, no esta ya en ese modulo
		{
			sessionStorage['moduloSelect'] = "ModuloChat";
			showModuloSelect();
			history.pushState(null, "", "/GeneralSystem/indexNombreProyecto.php?mdlslc=10mns1");
		}
	});
	$("#btnCerrarSesion").click(function(){
		loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
		if(eliminarCookies())
		{
			disableNotifyAlerta();
			loginAcces(false);
		}
	});
}
function showModuloSelect(){
	//mostrar modulos BEGIN
	if (sessionStorage.getItem('moduloSelect') == objModulos['1ini1']) 
	{
		viewIndex(); 
		$("#btnCalendario").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnInicio").addClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') ==  objModulos['2cnt1']) 
	{
		viewContacto(); 
		$("#btnCalendario").removeClass('active');
		$("#btnContactar").addClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['3lct1']) 
	{
		viewLocacion(); 
		$("#btnCalendario").removeClass('active');
		$("#btnLocacion").addClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['4mnu1']) 
	{
		viewMenu();
		$("#btnMenu").addClass('active');
		$("#btnCalendario").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['5acr1']) 
	{
		viewAcerca();
		$("#btnCalendario").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnAcerca").addClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['6cnes1']) 
	{
		viewConsEstServ();
		$("#btnCalendario").removeClass('active');
		$("#btnConEstServ").addClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['7aus1']) 
	{
		viewAdminUsers();
		$("#btnAdminUsers").addClass('active');
		$("#btnCalendario").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['8cac1']) 
	{
		viewCarCompra(); 
		$("#btnCarCompra").addClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnCalendario").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['9cal1']) 
	{
		viewCalendario(); 
		$("#btnCalendario").addClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	else if (sessionStorage.getItem('moduloSelect') == objModulos['10mns1']) 
	{
		viewChat(); 
		$("#btnCalendario").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnInicio").removeClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnChat").addClass('active');
	}
	else 
	{
		viewIndex();  
		$("#btnCalendario").removeClass('active');
		$("#btnConEstServ").removeClass('active');
		$("#btnInicio").addClass('active');
		$("#btnContactar").removeClass('active');
		$("#btnLocacion").removeClass('active');
		$("#btnMenu").removeClass('active');
		$("#btnAcerca").removeClass('active');
		$("#btnCarCompra").removeClass('active');
		$("#btnAdminUsers").removeClass('active');
		$("#btnChat").removeClass('active');
	}
	//mostrar modulos END
}
function viewFooter()
{
	$('#contenidoFooter').load("php/vistas/secciones/footer.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
	});
}

function viewIndex()
{
	//sessionStorage.getItem('inicioSesion') != "active" -- esta validacion es para saber si acaba de iniciar sesion y le muestre el mesaje de bienvenida
	if (sessionStorage.getItem('inicioSesion') != "active") {loadingNotify("","Cargando");}// no activa el modal si va iniciando sesion	

	$('#ContenidoBody').load("php/vistas/viewIndex.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
  		
  		$("#notifPrimary").click(function(){enableNotifyAlerta('Aviso!','Es un ejemplo',1);});
		$("#notifSecondary").click(function(){enableNotifyAlerta('Aviso!','Es un ejemplo',2);});
		$("#notifSuccess").click(function(){enableNotifyAlerta('Exito!','Es un ejemplo',3);});
		$("#notifWarning").click(function(){enableNotifyAlerta('Advertencia!','Es un ejemplo',5);});
		$("#notifInfo").click(function(){enableNotifyAlerta('Informacion!','Es un ejemplo',6);});
		$("#notifLight").click(function(){enableNotifyAlerta('Aviso!','Es un ejemplo',7);});
		$("#notifDark").click(function(){enableNotifyAlerta('Aviso!','Es un ejemplo',8);});
		
		if (sessionStorage.getItem('inicioSesion') != "active") {disableNotifyAlerta();} // no desactiva el modal si va iniciando sesion	
		sessionStorage.removeItem('inicioSesion');
	});
}

function viewContacto()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewContacto.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
			
			disableNotifyAlerta();//al cargar todos los componentes y su eventos
	});
}
function viewLocacion()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewLocacion.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista


  			$("#btnBuscarUbicIframe").click(function(){
  				var sUbicacion = $("#txtUbicacion").val();
  					if (sUbicacion.length > 0) 
  					{
  						loadingNotify("","Cargando");
  						if (cargarGoogleMap(sUbicacion)) 
  						{
  							disableNotifyAlerta();
  						}
  						else
  						{
  							disableNotifyAlerta();
							setTimeout(function(){ enableNotifyAlerta("ERROR!","Ubicacion invalida, Vuelva a intentar.",4); }, 2000);
  						}
  					}
  			});
  			$("#txtUbicacion").keypress(function(e){

  				var keyX = (document.all) ? e.keyCode : e.which; // 2
  				if (keyX == 13)
  				{
  					$("#btnBuscarUbicIframe").click();
  				}
				//return soloNumeros(e, this, 2);
			});

	        // Cargamos los estados
	    	LoadEstadosMunicipios();

  			$("#btnBuscarUbicDirec").click(function()
  			{
  				var sEstado = $("#slctEstUbicDest").val() != null ? $("#slctEstUbicDest").val() : "";
  				if (sEstado == "") 
  				{
  					enableNotifyAlerta("Campos Obligatorios!","*Todos Los Campos Son Obligatorios.",5);
  				}
  				else
  				{
	  				var sMunicipio = $("#slctMuniUbicDest").val() != null ? $("#slctMuniUbicDest").val() : "";
	  				if (sMunicipio == "")
	  				{
	  					enableNotifyAlerta("Campos Obligatorios!","*Todos Los Campos Son Obligatorios.",5);
	  				}
	  				else
	  				{
		  				var sDireccion =  $("#txtUbicacionDestino").val() != null ? $("#txtUbicacionDestino").val() : "";
		  				if (sDireccion == "")
		  				{
		  					enableNotifyAlerta("Campos Obligatorios!","*Todos Los Campos Son Obligatorios.",5);
		  				}
		  				else
		  				{
		  					var sUbicacionDestino = sDireccion + ", " + sMunicipio + ", " + sEstado;
		  					if (sUbicacionDestino.length > 0) 
		  					{
		  						loadingNotify("","Cargando");

		  						$("#containbtnVerRuta").html('<div class="col-12">'+
		  							'<center>' +
										'<a id="linkIrRuta" target="_black" class="btn btn-primary"s>'+
									  		'Verificar Ruta <i class="fas fa-directions"></i>'+
										'</a>' + 
									'</center>' +
		  						'</div>');

		  						var sRutaFinalMaps = verRutaDirecDestino(sUbicacionDestino);

		  						$("#linkIrRuta").click(function(){
			  						 $("#containbtnVerRuta").html('<div class="col-12 containbtnVerRuta">' +
			  						 	'<center>' +
									    	'<a id="linkIrRuta" target="_black" href="'+ sRutaFinalMaps +'" class="btn btn-outline-primary " >Verificar Ruta'+
									    		' <i class="fas fa-directions"></i>'+
									    	'</a>' + 
									    '</center>' +
								    '</div>' +
								    '<div class="col-12 containbtnVerRuta"><br>' +
								    	'<div class="row alert alert-info">' +
									    	'<div class="col-md-1">' +
									    	'</div>' +
										    '<div class="col-md-1bg-primary">' +
										    	'<center>' + 
										    		'<span class="font-weight-bold font-size-30px text-center">' +
										    			'<i class="fas fa-info-circle"></i>' +
										    		'</span>' +
											    '</center>' +
											'</div>' +
											'<div class="col-md-10">' +
												    '<p id="infoGuardarRuta" class=" text-justify-left"> 1.- Si la ruta es correcta, favor de presionar en Guardar. <br>' +
												    '2.- Si la ruta es incorrecta, vuelva a introducir una direccion valida.</p>' +
											'</div>' +
										'</div>' +
								    '</div>' +
								    '<div class="col-12 containbtnVerRuta"><hr>' +
									    '<button id="btnValidarRuta" class="btn btn-success float-right">'+
									    'Guardar <i class="far fa-save"></i>'+
									    '</button>' +
								    '</div>');
								});
		  						

		  						disableNotifyAlerta();
		  					}
		  				}
	  				}
  				}
  			});

			$("#txtUbicacionDestino").keyup(function(e){
				var keyX = (document.all) ? e.keyCode : e.which; // 2
  				if (keyX == 13)
  				{
  					$("#btnBuscarUbicDirec").click();
  				}
  				else
  				{
					$(".containbtnVerRuta").hide(1000); 
					
  				}
			});
			$("#btnInfBuscDirec").click(function(){
				enableNotifyAlerta('Ayuda','Es necesario que introduzcas la direcion a la cual se te entregara el pedido!',6);
			});

			$("#btnInfBuscIframe").click(function(){
				enableNotifyAlerta('Ayuda','Es necesario que introduzcas la direcion a la cual se te entregara el pedido!',6);
			});
			disableNotifyAlerta();//al cargar todos los componentes y su eventos
	});
}
function viewMenu()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewMenu.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		tooltipText();

		getProductos();
        
        disableNotifyAlerta();
	});
}

function getProductos()
{
	var objParam = {
					'opcion': 4,
					'descripcionOpc' : "obtener Productos"				
					};

	$.ajax({
		async:true,
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {

           
            if(response.resultOper == 1)
            {
            	var datosProductos = response.infoResponse != undefined ? response.infoResponse : {};

            	if (datosProductos.length > 0) 
            	{
            		$.when($('#rowPoductos').append(crearEstructuraProductos(datosProductos)))
            		.then(function( data, textStatus, jqXHR ) 
            		{
            			$('.txtCantProd').on('input', function() {// obliga al input a ser numero enter dentro del rango
							var valInput = $(this).val(); 
							var fila     = $(this).data('fila');
							
							if(valInput > 0)
							{
								if (valInput > 100) 
								{
									$(this).val(100);
									valInput = 100; 
								}

							}
							else
							{
								$(this).val(1);
							}
					  	});

						$('.verPantallaCompleta').click(function(event) 
					 	{
							var rutaImagen = $(this).data('imgruta');
							verImgCompleta(rutaImagen);
						});	
						$('.btnAddCarrito').click(function(event) 
					 	{
							var classProducto = $(this).data('numproducto');// se obtiene la posicion del producto
							var cantidad      = $('.prod'+classProducto+">input.txtCantProd").val();// se obtiene la cantidad
							var datos         = $(this).data('datos');
							var dat           = datos.split("*");

							if (datos != undefined && datos != '') 
							{
								$.when(addItemCarrito(dat[0],dat[1],dat[2],dat[3],cantidad,dat[5]))
			            		.then(function( data, textStatus, jqXHR ) 
			            		{
									enableNotifyAlerta("Listo!","Producto Agregado.",3);
					 				$('.prod'+classProducto+">input.txtCantProd").val(1); // se reinicia una vez agregado al carrito
								});	

							}
							else
							{
								enableNotifyAlerta("Algo Salio Mal!","error al cargar los datos",4);
							}
						});	

					});
            	}
            	else
            	{
            		$('#rowPoductos').append('<p class="alert alert-info">Aun no se cuenta con productos</p>');
            	}
            	
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
}
function crearEstructuraProductos(datosProductos){
	 var html = '';

	 for (var i = 0; i < datosProductos.length; i++) 
	 {
	 	html += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3"> 
	                <div class="card text-center component-hover">
	                  <div class="card-header text-success">
	                    <b>$ ` + datosProductos[i].precio + `</b>
	                  </div>
	                  <div class="card-body prod`+i+`">
	                    <img class="verPantallaCompleta rounded zoomimg fondo-opaco" src="resources/img/productos/` + (datosProductos[i].imagen != undefined && datosProductos[i].imagen != '' ? datosProductos[i].imagen : 'noimagen.png' ) + `" 
	                    alt="img" height="150" data-imgruta="resources/img/productos/` + (datosProductos[i].imagen != undefined && datosProductos[i].imagen != '' ? datosProductos[i].imagen : 'noimagen.png' ) + `">
	                    <h5 class="card-title"><b>` + datosProductos[i].producto + `</b></h5>
	                    <p class="card-text text-muted"> ` + datosProductos[i].descripcion + `</p>
	                    <hr>
	                    <input class="form-control text-center col-6 mx-auto txtCantProd" data-fila="`+ (i+1) +`" type="number" value="1" min="1" max="100" > <br>
						<div class="btn-group" role="group">
		                    <button class="btn btn-light border-success btnAddCarrito" data-numproducto="`+i+`" data-datos="`+datosProductos[i].id+`*`+datosProductos[i].producto+`*`+datosProductos[i].descripcion+`*`+datosProductos[i].precio+`*`+1+`*`+(datosProductos[i].imagen != undefined && datosProductos[i].imagen != '' ? datosProductos[i].imagen : 'noimagen.png' )+`">
		                        <img src="resources/img/sistema/CarritoCompra/addCar.png" class="card-img" alt="img" style="height: 50px; width: auto;">
		                    </button>
		                    <button class="btn btn-outline-success ">
		                    	<i class="fas fa-money-check-alt font-size-20px"></i> 
		                    		<br>
		                    	<b>Comprar</b>
		                    </button>
						</div>
	                  </div>
	                  <div class="card-footer text-muted">
	                    <b>caducidad:</b> ` + datosProductos[i].caducidad + `
	                  </div>
	                </div>
	                <br>
	            </div>
				`;
	 }

	 return html;
}
function viewConsEstServ()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewConsultaEstatusServicio.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		tooltipText();
		
		animationInputLabel('#slctTipoServicio','#lbltipoServicio','primary');
		animationInputLabel('#txtFolio','#lblFolio','primary');
		animationInputLabel('#txtNss','#lblNss','primary');
		animationInputLabel('#txtCurp','#lblCurp','primary');

		$("#formConsultaEstatus").submit(function(event) 
		{
			event.preventDefault();

			var tipoServicio = $("#slctTipoServicio").val();
			var folio        = $("#txtFolio").val();
			var nss          = $("#txtNss").val();
			var curp         = $("#txtCurp").val();
			var origen         = 3;
			
			var objParam = {
					'opcion': 3,
					'tipoServicio' : tipoServicio,
					'folio' : folio,
					'nss' : nss,
					'curp' : curp,
					'origen' : origen				
					};

	        $.ajax({
	            cache: false,
	            url: 'php/router/NombrePaginaRouter.php',
	            type: 'POST',
	            dataType: 'JSON',
	            data: objParam,
	            success: function(datos) {
	                disableNotifyAlerta();
	                if(datos.resultOper == 1)
	                {
	                	mostrarResponse(datos);
	                }
	                else
	                {
	                    setTimeout(function(){ enableNotifyAlerta("Datos Invalidos!",datos.descOper,4); }, 2000);
	                }
	            },
				beforeSend: function()
				{
					loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
				},
	            error: function(xhr, status, error) {
	            	disableNotifyAlerta();
	              	console.log(xhr.responseText);
	              	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
	            }
	        });
	    });

		$("#btnConsultarEstatus").click(function(){

		});
		
		disableNotifyAlerta();//al cargar todos los componentes y su eventos
	});
}

function viewAdminUsers()
{
	var inicioSesion = getUsuarioSesion().login;
	var id_tipo_usuario = getUsuarioSesion().id_tipo_usuario;
	loadingNotify("","Cargando");
	if (inicioSesion == 'true' && id_tipo_usuario == '1') 
	{
		$('#ContenidoBody').load("php/vistas/viewAdminUsers.php", function() //se carga Componente
		{ //se crean los eventos una vez obtenida la vista
			tooltipText();
			$('#btnDeletSelec').addClass('animated fadeOut');
			$('#btnDeletSelec').click(function(event) {

			if (getCantidadChekbxSelect('.chkbxUsuario') > 0) 
			{
				var result = confirm("¿Seguro Que Desea Eliminar los Usuarios Seleccionados?");

				if (result == true) 
				{
					eliminarUsuariosSelect();
				} 
			}
			});

			$('#modalsAdmUsers').load("php/vistas/modales/modalAdmUsers.php", function() //se carga Componente
			{ //se crean los eventos una vez obtenida la vista
				var imagenCargada = ""; // se almacenara el nombre de la imagen
				var imagenActual = ""; // se almacenara el nombre de la imagen Que tiene registrada el usuario
				animationInputLabel('#txtNombreAdmUser','#lblNombre','primary');
				animationInputLabel('#txtApellidoAdmUser','#lblApellido','primary');
				animationInputLabel('#txtMailAdmUser','#lblMail','primary');
				animationInputLabel('#txtPassAdmUser','#lblPassword','primary');
				$('#reqTxtNombreAdmUser').hide();
				$('#reqTxtApellidoAdmUser').hide();
				$('#reqTxtMailAdmUser').hide();
				$('#reqTxtPassAdmUser').hide();

				$('#cargaImagenAdmUser').change(function(event) {
					if (imagenCargada != "") // elimina la imagen si ya hay una cargada 
					{
						eliminarImagen("resources/temp/" + $('#txtIdAdmUser').val() + "/" + imagenCargada);// se elimina de la temporal si ya esta cargada
						$('#ulImgGuardadas').html('');
					}
					
					imagenCargada = $('#txtIdAdmUser').val() + "_" +this.files[0].name;// la estructura del nombre de la imagen es idUsuario_nombreOriginal.extencion
					imagenActual = $('#txtIMGActual').val();// se obtiene la imagen registrada
				});
				$('#btnNewAdmUser').click(function(event) 
				{
					$('#TamModal').removeClass('modal-lg');

					$('#formAdmUsers').show();
					$('#btnGuardarUsuario').show();
					$('#btnCerrarModal').show();
					$('#TitleModalAdmUser').html("Crear Usuario");
					$('#btnGuardarFoto').hide(); // solo se muestra cuando se agrega imagen
					$('#btnCancGuardFoto').hide(); // solo se muestra cuando se agrega imagen
					$('#upload').hide();//oculta la carga de imagenes
					$('#formAddHuellaAdmUsers').hide();
					$('#btnCancGuardHuella').hide(); // solo se muestra cuando se agrega huella
					$('#btnGuardarHuella').hide();

					$('#modalAdmUser').modal('show');
				});

				$('#btnGuardarUsuario').click(function(event) 
				{
					var datosValid = validarInputsAdmUser();
					if(datosValid.result)
					{
						guardarUsuario(datosValid);
					}
				}); 

				$('#btnCancGuardFoto').click(function(event) 
				{
					var idUsuario = $('#txtIdAdmUser').val();
					$('#txtIdAdmUser').val(""); //se setea el input file

					if(imagenCargada != "")
					{
						eliminarImagen("resources/temp/" + idUsuario + "/" + imagenCargada);
						imagenCargada = "";// se setea la variable una vez eliminada la imagen
					}
					$('#ulImgGuardadas').html('');

				});

				$('#btnGuardarFoto').click(function(event) 
				{
					var idUsuarioCambioImagen = $('#txtIdAdmUser').val(); // se almacenara el id del usuario al que se le cambiara la imagen

					if(imagenCargada != "" && idUsuarioCambioImagen != "")
					{
						actualizarFotoUsuario(idUsuarioCambioImagen,imagenCargada,imagenActual); 
						imagenCargada = "";// se setea la variable una vez eliminada la imagen
						$('#txtIdAdmUser').val(""); //se setea el input file
					}
					else
					{
						$('#modalAdmUser').modal('toggle');
						enableNotifyYesOrCancel("Advertencia!","No se a seleccionado ninguna imagen, ¿Desea seleccionar una?",5);
						$("#btnModalYesOrCancel").click(function()
					 	{
							$.when(disableNotifyYesOrCancel())// funcion para cerrar el modal a continuacion ira las acciones a seguir
							.then(function( data, textStatus, jqXHR )
				    		{
								$('#modalAdmUser').modal('show');
				    		});
					 	});
					}
				});

				$('#btnGuardarHuella').click(function(event) 
				{
					var rbHuellaSelect = $("input[name='huellaDactilar']:checked").val(); 
					var idUsuarioHuella = $('#txtIdAdmUserHuella').val();
					if (rbHuellaSelect != undefined && idUsuarioHuella != "") 
					{
						$('#modalAdmUser').modal('toggle');
						obtenerHuellaUsuario(idUsuarioHuella,rbHuellaSelect);
					}
					else
					{
						alert("Seleccione la huella a registrar");
					}
				});

				// Reload Card
	        	$('.reload').on('click',function(){
		    		CargarUsuarios(true);// se obtienen etiquetas de bd
		        });

			});
			
			animationInputLabel('#filtrarUsuarios','#lblBuscar','primary');
			CargarUsuarios(true);//inicia en false porque aun no tiene aplicado el dataTable
			agregarFiltradoTabla("#tabla_de_usuarios","#bodyUsuarios","#filtrarUsuarios","#paginacionUsuarios");
			disableNotifyAlerta();
		});
	}
	else
	{
		$('#ContenidoBody').html(`
			<div class="animated zoomIn">
			    <div class="row">
			        <div class="card border-focus col-md-12 col-sm-12 alert alert-warning text-center text-primary-dark margin-top-20px">
				        <h1>
				        	<b class="font-size-100px"><i class="far fa-dizzy"></i> 403</b> <br>
							<b>¡Vaya! No se puede acceder a esta pagina</b>
				        </h1>
			        </div>
			    </div>
			</div>
		`);
		enableNotifyAlerta("Lo sentimos!","Es necesario tener permisos para esta opcion...",5);
	}
	
} 
function obtenerHuellaUsuario(idUsuario, numDedo)
{
	var huellas = new Array();
	huellas['huella1'] = "";
	huellas['huella2'] = "";
	huellas['huella3'] = "";
	
	loadingNotify("Cargando...","Cargando, Espere un momento por favor.");

	$.ajax({
        method: "GET",
        url: "http://localhost:20542/api/huella",
        data: ""
    })
    .done(function(respuesta1) 
    { 
    	if(respuesta1.status == 0) 
    	{
    		huellas['huella1'] = respuesta1.template64;

    		$.ajax({
		        method: "GET",
		        url: "http://localhost:20542/api/huella",
		        data: ""
		    })
		    .done(function(respuesta2) 
		    {
		    	if(respuesta2.status == 0) 
		    	{
    				huellas['huella2'] = respuesta2.template64;

		    		$.ajax({
				        method: "GET",
				        url: "http://localhost:20542/api/huella",
				        data: ""
				    })
				    .done(function(respuesta3) 
				    {
				    	if(respuesta3.status == 0) 
				    	{
    						huellas['huella3'] = respuesta3.template64;

				    		validar3Huellas(huellas,idUsuario,numDedo);
				    	}
				    	else
				    	{
				    		disableNotifyAlerta();
				    	}
				    });
		    	}
		    	else
		    	{
		    		disableNotifyAlerta();
		    	}
		    });
    	}
    	else
    	{
    		disableNotifyAlerta();
    	}
    });
}
function validar3Huellas(p_huellas,idUsuario,numDedo)
{
	var huella1 = p_huellas['huella1'];
	var huella2 = p_huellas['huella2'];
	var huella3 = p_huellas['huella3'];
	
	if (huella1 != "" && huella1.length > 0) 
	{
		if (huella2 != "" && huella2.length > 0) 
		{
			if (huella3 != "" && huella3.length > 0) 
			{
				var part1 = huella1.substr(0,35);
				var part2 = huella2.substr(0,35);
				var part3 = huella3.substr(0,35);
				console.log(part1);
				console.log(part2);
				console.log(part3);
				if (part1 == part2) 
				{
					registroHuella(idUsuario,huella1,numDedo);
				}
				else if (part2 == part3) 
				{
					registroHuella(idUsuario,huella2,numDedo);
				}
				else if (part3 == part1) 
				{
					registroHuella(idUsuario,huella3,numDedo);
				}
				else
				{
					disableNotifyAlerta();

		    		setTimeout(function()
		    		{ 
						enableNotifyYesOrCancel("¿?","Las huellas no fueron capturadas correctamente ¿Desea volver a capturarlas?",3);
						$("#btnModalYesOrCancel").click(function()
					 	{
							$.when(disableNotifyYesOrCancel())// funcion para cerrar el modal a continuacion ira las acciones a seguir
							.then(function( data, textStatus, jqXHR )
				    		{
				    			obtenerHuellaUsuario(idUsuario, numDedo);
				    		});
					 	});
		    		}, 2000);
				}
			}
		}
	}
}
function actualizarFotoUsuario(idUsuario,imagenNew,imgAnterior)
{
	var objParam = {
					'opcion': 12,
					'descripcionOpc' : "actualizar foto",
					'idUsuario' : idUsuario,
					'rutaImagen' :	imagenNew
					};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
        	$('#modalAdmUser').modal('toggle');
            if(response.resultOper == 1)
            {
            	if (imgAnterior != "") 
            	{
            		eliminarImagen("resources/img/usuarios/" + imgAnterior);// se elimina la foto del servidor si ya se cambio en bd
            	}
				$('#ulImgGuardadas').html('');

            	setTimeout(function(){ enableNotifyAlerta("Exito!",response.mensaje,3); }, 2000);
	            setTimeout(function(){ CargarUsuarios(false); }, 2000);
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
			loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
} 
function eliminarImagen(ruta) 
{
	var inicioSesion = getUsuarioSesion().login;
	if (inicioSesion == 'true') 
	{
		var objParam = {
						'opcion': 11,
						'rutaImagen' : ruta,
						'descripcionOpc' : "Eliminar Imagen"
						};
		$.ajax({
	        cache: false,
	        url: 'php/router/NombrePaginaRouter.php',
	        type: 'POST',
	        dataType: 'JSON',
	        data: objParam,
	        success: function(response) {
	        },
			beforeSend: function()
			{
			},
	        error: function(xhr, status, error) {
	          	console.log(xhr.responseText);
	          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
	        }

	    });
	}
	else
	{
		enableNotifyAlerta("Lo sentimos!","Es necesario tener permisos para esta Accion...",5);
	}
}
function validarInputsAdmUser() 
{
	var datos         = new Array();
	datos['nombre']   = "";
	datos['apellido'] = "";
	datos['mail']     = "";
	datos['password'] = "";
	datos['result']   = false;

	var nombreAdmUser   = $('#txtNombreAdmUser');
	var apellidoAdmUser = $('#txtApellidoAdmUser');
	var mailAdmUser     = $('#txtMailAdmUser');
	var passAdmUser     = $('#txtPassAdmUser');

	if (nombreAdmUser.val() != "") 
	{
		$('#reqTxtNombreAdmUser').hide();
		nombreAdmUser.removeClass('border-danger');
		nombreAdmUser.addClass('border-success');
		if (apellidoAdmUser.val() != "") 
		{
			$('#reqTxtApellidoAdmUser').hide();
			apellidoAdmUser.removeClass('border-danger');
			apellidoAdmUser.addClass('border-success');
			if (validaEmail(mailAdmUser.val())) 
			{
				$('#reqTxtMailAdmUser').hide();
				mailAdmUser.removeClass('border-danger');
				mailAdmUser.addClass('border-success');
				if (passAdmUser.val() != "") 
				{
					$('#reqTxtPassAdmUser').hide();
					nombreAdmUser.removeClass('border-success');
					apellidoAdmUser.removeClass('border-success');
					mailAdmUser.removeClass('border-success');
					passAdmUser.removeClass('border-danger');
					passAdmUser.removeClass('border-success');
					
					datos['nombre']   = nombreAdmUser.val();
					datos['apellido'] = apellidoAdmUser.val();
					datos['mail']     = mailAdmUser.val();
					datos['password'] = passAdmUser.val();
					
					datos['result']   = true;
					
					$("#formAdmUsers")[0].reset();// vaciar formulario
				}
				else
				{
					$('#reqTxtPassAdmUser').show();
					passAdmUser.addClass('border-danger');
					passAdmUser.focus();
				}
				
			}
			else
			{
				$('#reqTxtMailAdmUser').show();
				mailAdmUser.addClass('border-danger');
				mailAdmUser.focus();
			}
		}
		else
		{
			$('#reqTxtApellidoAdmUser').show();
			apellidoAdmUser.addClass('border-danger');
			apellidoAdmUser.focus();
		}
	}
	else
	{
		$('#reqTxtNombreAdmUser').show();
		nombreAdmUser.addClass('border-danger');
		nombreAdmUser.focus();
	}


	return datos;
}
function guardarUsuario(arrayUsuario)
{
	var inicioSesion         = getUsuarioSesion().login;
	var idUsuarioTransaccion = getUsuarioSesion().id;

	if (inicioSesion == 'true') 
	{
		var objParam = {
						'opcion': 6,
						'nombre' : arrayUsuario.nombre,
						'apellido' : arrayUsuario.apellido,
						'email' : arrayUsuario.mail,
						'password' : arrayUsuario.password,
						'idUsuarioTransaccion' : idUsuarioTransaccion		
						};
		$.ajax({
	        cache: false,
	        url: 'php/router/NombrePaginaRouter.php',
	        type: 'POST',
	        dataType: 'JSON',
	        data: objParam,
	        success: function(response) {

		        disableNotifyAlerta();
				$('#modalAdmUser').modal('toggle');

	            if(response.resultOper == 1)
	            {
	            	setTimeout(function(){ enableNotifyAlerta("Exito!",response.mensaje,3); }, 2000);
		            setTimeout(function(){ CargarUsuarios(false); }, 2000);
	            }
	            else if(response.resultOper == 2)
	            {
	            	setTimeout(function(){ enableNotifyAlerta("Advertencia!",response.mensaje,5); }, 2000);
	            }
	            else
	            {
	                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
	            }
	        },
			beforeSend: function()
			{
				loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
			},
	        error: function(xhr, status, error) {
	          	console.log(xhr.responseText);
	          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
	        }

	    });
	}
	else
	{
		enableNotifyAlerta("Lo sentimos!","Es necesario tener permisos para esta Accion...",5);
	}
}
function registroHuella(idUsuario,huella,NumDedo)
{
	if (idUsuario != 0 && idUsuario != undefined &&
		huella != "" && huella != undefined &&
		NumDedo != 0 && NumDedo != undefined) 
	{
		var inicioSesion = getUsuarioSesion().login;

		if (inicioSesion == 'true') 
		{
			var objParam = {
							'opcion': 14,
							'idUsuario' : idUsuario,
							'huella' : huella,
							'NumDedo' : NumDedo,
							'descripcionOpc' : 'Registro de huella'
							};
			$.ajax({
		        cache: false,
		        url: 'php/router/NombrePaginaRouter.php',
		        type: 'POST',
		        dataType: 'JSON',
		        data: objParam,
		        success: function(response) {

			        disableNotifyAlerta();
		           	console.log(response);
		            if(response.resultOper == 1)
		            {
		            	setTimeout(function(){ enableNotifyAlerta("Exito!",response.mensaje,3); }, 2000);
			            setTimeout(function(){ CargarUsuarios(false); }, 2000);
		            }
		            else if(response.resultOper == 2)
		            {
		            	setTimeout(function(){ enableNotifyAlerta("Advertencia!",response.mensaje,5); }, 2000);
		            }
		            else
		            {
		                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
		            }
		        },
				beforeSend: function()
				{
					loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
				},
		        error: function(xhr, status, error) {
		          	console.log(xhr.responseText);
		          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
		        }

		    });
		}
		else
		{
			enableNotifyAlerta("Lo sentimos!","Es necesario tener permisos para esta Accion...",5);
		}
	}

}
function agregarFiltradoTabla(idTabla,idBodyTable,idInputFiltro,idPaginacion)
{
	$(idInputFiltro).keyup(function(){
		    if( $(this).val() != '')
		    {
		    	$(idPaginacion).hide();
		        $(idBodyTable + ">tr").hide();
		        $(idTabla + ' td:contiene-palabra("' + $(this).val() + '")').parent('tr').show();
		    }
		    else
		    {
		    	$(idPaginacion).show();
		        $('#btnPagSelec').click();
		    }

		});
 
		$.extend($.expr[':'], 
		{
		    'contiene-palabra': function(elem, i, match, array) {
		        return (elem.textContent || elem.innerText || $(elem).text() || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
		    }
		});
}
function CargarUsuarios(bInicia){
	var objParam = {
					'opcion': 2,
					'descripcionOpc' : "obtener Usuarios"				
					};
	var datosUsuarios = {};

	$.ajax({
        //async: false,
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {
            if(response.resultOper == 1)
            {
            	datosUsuarios = response.infoResponse != undefined ? response.infoResponse : {};
            	llenarTablaUsuarios(datosUsuarios);
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
            disableEfectoLoadInSection($('.reload'));      
        },
		beforeSend: function()
		{
            efectoLoadInSection($('.reload'));
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }

    });
}
function getUsuario(idUsuario)
{
	var objParam = {
					'opcion': 17,
					'descripcionOpc' : "obtener Usuario",
					'idUsuario' : idUsuario				
					};
	var respuesta =new Array;

	$.ajax({
		async: false,
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {

           	respuesta = response;

            if(response.resultOper != 1)
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }

    });

    return respuesta;
}
function llenarTablaUsuarios(users)
{
	var cantUsers = users.length;
	
	$('#bodyUsuarios').html('');
	
	for (var i = 0; i < cantUsers; i++) 
	{
		$('#tabla_de_usuarios').append($(
			` <tr class="row`+(i+1)+`">`+ 
				`<td class="text-center animated zoomIn"><input type="checkbox" class="form-control chkbxUsuario" data-id="`+users[i].id+`" data-imagen="`+users[i].foto+`"></td>`+
				`<td class="text-center animated zoomIn">`+ (i+1) +`</td>`+
				`<td class="text-center animated zoomIn">`+ users[i].nombre +`</td>`+
				`<td class="text-center animated zoomIn">`+ users[i].apellido +`</td>`+
				`<td class="text-center animated zoomIn">`+ users[i].email + `</td>`+
				`<td class="text-center animated zoomIn">`+ `*****` + `</td>`+
				`<td class="text-center animated zoomIn"> 
					<button class="btn btn-sm btn-outline-success btnAddHuellaAdmUser" data-id="`+users[i].id+`" data-nombreusuario="`+users[i].nombre + " " + users[i].apellido +`"><i class="fas fa-fingerprint font-size-18px"></i></button>
					<button class="btn btn-sm btn-outline-primary btnAddFotoAdmUser" data-id="`+users[i].id+`" data-imagen="`+users[i].foto+`"><i class="fas fa-camera"></i>
					</button> <button class="btn btn-sm btn-outline-danger btnEliminar" data-id="`+users[i].id+`" data-imagen="`+users[i].foto+`"><i class="fas fa-user-times"></i></button> 
				</td>`+
			`</tr>`) 
		);
	}
	 

	$('.chkbxUsuario').click(function(event) {
		showBtnElimSelc('.chkbxUsuario');
	});
	$('#slctRowsTable').change(function(event) {
		llenarTablaUsuarios(users);
	});
	
	$('.btnAddFotoAdmUser').click(function(event) 
	{
		$('#TamModal').removeClass('modal-lg');

		$('#txtIdAdmUser').val(""); //se setea el input file
		$('#txtIMGActual').val("");
		
		var idUsuFotoPerfil = $(this).data('id'); 
		var imagenActual = $(this).data('imagen'); 
		$('#TitleModalAdmUser').html("Agregar/Cambiar Foto De Perfil");

		$('#txtIdAdmUser').hide();
		$('#btnCerrarModal').hide();
		$('#btnGuardarUsuario').hide();
		$('#txtIdAdmUser').val(idUsuFotoPerfil);
		$('#txtIMGActual').val(imagenActual);
		$('#txtIMGActual').hide();
		$('#btnGuardarFoto').show(); // solo se muestra cuando se agrega imagen
		$('#btnCancGuardFoto').show(); // solo se muestra cuando se agrega imagen 
		$('#formAdmUsers').hide();
		$('#formAddHuellaAdmUsers').hide();
		$('#btnGuardarHuella').hide();
		$('#btnCancGuardHuella').hide(); // solo se muestra cuando se agrega huella
		$('#upload').attr('action', 'php/router/NombrePaginaRouter.php?opcion=10&idUsuario='+idUsuFotoPerfil);
		$('#upload').show();//muestra la carga de imagenes
		$('#modalAdmUser').modal('show');
	});

	$('.btnAddHuellaAdmUser').click(function(event) 
	{
		$("input[name='huellaDactilar']:checked").prop('checked', false);// setea el radio seleccionado
		$('#txtIdAdmUserHuella').val('');
		var idUsuHuella = $(this).data('id'); 
		var usuarioHuella = $(this).data('nombreusuario'); 

		$('#TamModal').addClass('modal-lg');
		$('#formAddHuellaAdmUsers').show();
		$('#txtIdAdmUserHuella').hide();
		$('#txtIdAdmUserHuella').val(idUsuHuella);
		$('#btnGuardarHuella').show();
		$('#btnCancGuardHuella').show(); // solo se muestra cuando se agrega huella
		$('#formAdmUsers').hide();
		$('#btnGuardarUsuario').hide();
		$('#btnCerrarModal').hide();
		$('#TitleModalAdmUser').html("Agregando huella dactilar a: " + usuarioHuella);
		$('#btnGuardarFoto').hide(); // solo se muestra cuando se agrega imagen
		$('#btnCancGuardFoto').hide(); // solo se muestra cuando se agrega imagen

		$('#upload').hide();//oculta la carga de imagenes
		$('#modalAdmUser').modal('show');
	});

	$('.btnEliminar').click(function(event) {
		var idUsuario = $(this).data('id');
		var imagenUsuario = $(this).data('imagen');
		var result = confirm("¿Seguro Que Desea Eliminar Este Usuario?");
		var idUsuarioTransaccion = getUsuarioSesion().id;
		if (result == true) {
			eliminarUsuario(idUsuario,imagenUsuario,idUsuarioTransaccion);
		} 
	});
	showBtnElimSelc('.chkbxUsuario');

	paginacionTablaUsuarios('#paginacionUsuarios','#bodyUsuarios',1,'#slctRowsTable');

}
function showBtnElimSelc(classChkbox){
	if (getCantidadChekbxSelect(classChkbox) == 0) 
		{
			$('#btnDeletSelec').removeClass('animated zoomIn');
			$('#btnDeletSelec').addClass('animated fadeOut');
		}
		else
		{
			$('#btnDeletSelec').removeClass('animated fadeOut');
			$('#btnDeletSelec').addClass('animated zoomIn');
		}
}
function getCantidadChekbxSelect(classChkbox)
{
	var cont = 0;
	$(classChkbox+':checked').each(function() {
        cont++;
    });
    return cont;
}
function getCantidadChekbxSelect(classChkbox)
{
	var cont = 0;
	$(classChkbox+':checked').each(function() {
        cont++;
    });
    return cont;
}
function getChkBoxSelect(classChkbox)
{
	var prodSelect = [];

	$(classChkbox+':checked').each(function() 
	{
		var indexArreglo = $(this).data('indexarray');
        var newItemCarrito = {
			'indexArray':indexArreglo
		};

		prodSelect.push(newItemCarrito);
    });
    return prodSelect;
}
function eliminarUsuariosSelect()
{
	loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
	var idUsuarioTransaccion = getUsuarioSesion().id;
	$('.chkbxUsuario:checked').each(function() {
        var idUsuarioEliminar = $(this).data('id');
        var fotoPerfil = $(this).data('imagen');
        eliminarUsuarios(idUsuarioEliminar,fotoPerfil,idUsuarioTransaccion);
    });
        
		setTimeout(function()
		{ 
			disableNotifyAlerta(); 
    		setTimeout(function(){ CargarUsuarios(true); }, 2000);//se agrega en true porque ya no recarga pagina
		}, 2000);
}
function paginacionTablaUsuarios(idTBPaginacion,idTBodyTabla,paginaSelect,idSelctRowsShow){
	var cantRegistros = $(idTBodyTabla + ' > tr').length;
	$(idTBodyTabla +' > tr').hide();
	var filasShows = 1;
	var cantFilasMostrar = $(idSelctRowsShow).val();
	
	if (cantFilasMostrar == "all") 
	{
		cantFilasMostrar = cantRegistros;
	}
	else if (cantFilasMostrar > cantRegistros)
	{
		cantFilasMostrar = cantRegistros;
	}
	for (var i = 1; i < paginaSelect; i++) {
		filasShows = (filasShows + parseInt(cantFilasMostrar));
	}
	var idRows = 0;
	for (var i = 1; i <= cantFilasMostrar; i++) {
		idRows = (i-1)+filasShows;
		$('.row'+idRows).show();
	}

	var htmlPaginacion = ``;

	htmlPaginacion = `
	<ul class="pagination pagination-sm justify-content-end" >`;
	
	if (paginaSelect == 1) 
	{
		htmlPaginacion += `
		<li class="page-item disabled">
	      <button class="page-link" aria-label="Previous" id="pgPrevious">
	        <span aria-hidden="true">&laquo;</span>
	      </button>
	    </li>`;
	} 
	else 
	{
		htmlPaginacion += `
		<li class="page-item">
	      <button class="page-link"  aria-label="Previous" id="pgPrevious">
	        <span aria-hidden="true">&laquo;</span>
	      </button>
	    </li>`;
	}

	var paginas = (cantRegistros/cantFilasMostrar) > parseInt((cantRegistros/cantFilasMostrar), 10) ? 
				  (parseInt((cantRegistros/cantFilasMostrar))+1) : (cantRegistros/cantFilasMostrar);
	var cont = 5;
	for (var i = 1; i <= paginas; i++) 
	{
		
			if (i == paginaSelect) 
			{
				cont--;
				htmlPaginacion += `
		        <li class="page-item active btnPaginacion" id="btnPagSelec" data-id="`+i+`"><button class="page-link" disabled="">` + i + `</button></li>
				`;
			}
			else if (i == (paginas-1) && paginaSelect != (paginas-2) && paginaSelect != paginas) 
			{
				htmlPaginacion +=`<li class="page-item disabled"><button class="page-link" >...</button></li>`;
			}
			else if ((i == (paginaSelect+1) || i == (paginaSelect+2) || i == (paginaSelect-1) ) && cont > 0 || i == paginas || (i == paginas-2 && paginaSelect == paginas) || (i == paginas-3 && paginaSelect == paginas) || (i == paginas-3 && paginaSelect == (paginas-1) ))
			{
				cont--;
				htmlPaginacion += `
		        <li class="page-item btnPaginacion" data-id="`+i+`"><button class="page-link" >` + i + `</button></li>
				`;
			}
	}
	
	if (paginaSelect == paginas) 
	{
		htmlPaginacion += `
        <li class="page-item disabled">
	      <button class="page-link" aria-label="Next" id="pgNext">
	        <span aria-hidden="true">&raquo;</span>
	      </button>
	    </li>`;
	} 
	else 
	{
		htmlPaginacion += `
        <li class="page-item">
	      <button class="page-link" aria-label="Next" id="pgNext">
	        <span aria-hidden="true">&raquo;</span>
	      </button>
	    </li>`;
	}

	htmlPaginacion += `
	</ul>`;

	$(idTBPaginacion).html(htmlPaginacion);
	
	$('#pgPrevious').click(function(event) 
	{
		if (paginaSelect > 1) 
		{
			paginacionTablaUsuarios(idTBPaginacion,idTBodyTabla,(paginaSelect-1),idSelctRowsShow);
		} 
	});
	$('.btnPaginacion').click(function(event) 
	{
		var idPaginacion = $(this).data('id');
		paginacionTablaUsuarios(idTBPaginacion,idTBodyTabla,idPaginacion,idSelctRowsShow);
	});
	$('#pgNext').click(function(event) 
	{
		if (paginaSelect < paginas) 
		{
			paginacionTablaUsuarios(idTBPaginacion,idTBodyTabla,(paginaSelect+1),idSelctRowsShow);
		} 
	});
}
function agregarDiseñoDataTable(idTabla)
{
	tablaStyleDataTable = $('#'+ idTabla).DataTable({
		"language": {
			"emptyTable":			"No hay datos disponibles en la tabla.",
			"info":		   		"(_START_ - _END_) de _TOTAL_ ",
			"infoEmpty":			"Mostrando 0 registros de un total de 0.",
			"infoFiltered":			"(filtrados de un total de _MAX_ registros)",
			"infoPostFix":			"",
			"lengthMenu":			"Mostrar _MENU_ registros",
			"loadingRecords":		"Cargando...",
			"processing":			"Procesando...",
			"search":			"",
			"searchPlaceholder":		"Buscar",
			"zeroRecords":			"No se han encontrado coincidencias.",
			"paginate": {
				"first":			"Primera",
				"last":				"Última",
				"next":				"Siguiente",
				"previous":			"Anterior"
			},
			"aria": {
				"sortAscending":	"Ordenación ascendente",
				"sortDescending":	"Ordenación descendente"
			}
		},
		"lengthMenu":		[[5, 10, 20, 25, 50, -1], [5, 10, 20, 25, 50, "Todos"]],
		"iDisplayLength":	5,
		"bJQueryUI":		false,
		"columns" : [
			{"data": 0},
			{"data": 1},
			{"data": 2, 'orderable': false, 'searchable': false},
			{"data": 3},
			{"data": 4},
			{"data": 5}
		],
	});//se cambian propiedades del dataTable
	/*$('label').addClass('form-inline');*/
	$('input[type="search"]').addClass('form-control input-sm');//se agrega estilo a los componentes del dataTable
}
function eliminarUsuario(idUsuario,fotoUsuario,idUsuarioTransaccion)
{
	var idUsuarioTransaccion = getUsuarioSesion().id;
	var objParam = {
				'opcion': 5,
				'idUsuario' : idUsuario,
				'idUsuarioTransaccion' : idUsuarioTransaccion			
				};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {
           	disableNotifyAlerta();
            
            if(response.resultOper == 1)
            {
            	eliminarImagen("resources/img/usuarios/" + fotoUsuario);
            	setTimeout(function(){ enableNotifyAlerta("Resultado!",response.mensaje,3); }, 2000);
            	setTimeout(function(){ CargarUsuarios(false); }, 2000);//se agrega en true porque ya no recarga pagina
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
			loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
		},
        error: function(xhr, status, error) {
           	disableNotifyAlerta();
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }

    });
}

function eliminarUsuarios(idUsuario,fotoUsuario,idUsuarioTransaccion)
{
	var objParam = {
				'opcion': 5,
				'idUsuario' : idUsuario,
				'idUsuarioTransaccion' : idUsuarioTransaccion 			
				};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {
            
            if(response.resultOper == 1)
            {
            	eliminarImagen("resources/img/usuarios/" + fotoUsuario);
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }

    });
}
function mostrarResponse(datos){
	$("#tipoServicio").show(1000);
	$("#divColTipoServ").hide(1000);
	$("#divColFolio").hide(1000);
	$("#divColNss").hide(1000);
	$("#divColCurp").hide(1000);
	$("#btnConsultarEstatus").hide(1000);

	$("#tipoServicio").html(datos.response.servicioSolicitado);
	$("#divColInfoInputs").html(' <label class="animated zoomIn form-text font-size-16px "><b>Tipo Servicio:</b> '+ datos.response.tipoServicio+
		'</label> <label class="animated zoomIn form-text font-size-16px "><b>Folio Servicio:</b> '+ datos.response.folioServicio+
		'</label> <label class="animated zoomIn form-text font-size-16px "><b>Estatus:</b> '+ datos.response.estatus+
		'</label> <label class="animated zoomIn form-text font-size-16px "><b>Motivo Rechazo:</b> '+ datos.response.motivoRechazo+
		'</label> <label class="animated zoomIn form-text font-size-16px "><b>Motivo Rechazo:</b> '+ datos.response.pasosSeguir+
		'</label> <label class="animated zoomIn form-text font-size-16px "><button id="btnNuevo" class="btn btn-primary">nuevo</button></label>'); 
	$("#btnNuevo").click(function(event) {
		generaPeticion();
	});	
}
function generaPeticion(){
	$("#tipoServicio").hide(1000);
	$("#divColTipoServ").show(1000);
	$("#divColFolio").show(1000);
	$("#divColNss").show(1000);
	$("#divColCurp").show(1000);
	$("#btnConsultarEstatus").show(1000);
	$("#divColInfoInputs").html('<small id="lblinfoInputs" class="animated zoomIn form-text text-muted">Por favor ingresa el Folio de tu solicitud de servicio, y tu (NSS) Número de Seguridad Social o tu CURP (Clave Única de Registro de Población)</small>'); 
	
}
function viewAcerca()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewAcerca.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		disableNotifyAlerta();//al cargar todos los componentes y su eventos
	});
}
function loadEventosMenuNotify()
{
	$(".notification_li").click(function() 
    {
        $(".notificationContainer").fadeToggle(300);
        $(".notification_count").fadeOut("slow");

        return false;
    });

    //evento que oculta el menu PopUp 
    $(document).click(function() 
    {
         $(".notificationContainer").fadeOut("slow");
    });

    //evento que muestra el menu PopUp 
    $(".notificationContainer").click(function() 
    {
        return false;
    });
}
function getNotificaciones()
{
	var idUsuarioSesion = getUsuarioSesion().id;

	var result = false;
	var objParam = {
					'opcion': 7,
					'descripcionOpc' : "obtener notificaciones",
					'idUsuario' : idUsuarioSesion		
					};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
            if(response.resultOper == 1)
            {
            	result = true;
         	   	var datosNotifica = response.infoResponse != undefined ? response.infoResponse : {};

        		$.when($('#rowNotificiones').append(crearEstructuraNotificaciones(datosNotifica)))
        		.then(function( data, textStatus, jqXHR ) 
        		{
        			var bDeleteClick = false; // controla que no vea la notificacion si primero elimina
        			$('.btnDeleteNotify').click(function(event) 
        			{
        				bDeleteClick = true;// controla que no vea la notificacion si primero elimina
        				var iIdNotif = $(this).data('id');
        				enableNotifyYesOrCancel("¿?","¿Seguro Que Desea Eliminar Esta Notificacion?",3);
						$("#btnModalYesOrCancel").click(function()
					 	{
							$.when(disableNotifyYesOrCancel())// funcion para cerrar el modal a continuacion ira las acciones a seguir
							.then(function( data, textStatus, jqXHR )
				    		{
								eliminarNotify(iIdNotif);
				    		});
        					
					 	});
	                	
	                	setTimeout(function(){ bDeleteClick = false; }, 1000);
        			});

        			$('.notificacion').click(function(event) 
        			{
        				if (bDeleteClick != true) // controla que no vea la notificacion si primero elimina
        				{
							var iIdNotif        = $(this).data('id');
							var bVisto          = $(this).data('visto');
							var fechaalta       = $(this).data('fechaalta');
							var imgNotificacion = $(this).data('img');
							var titulo          = $(this).data('titulo');
							var descripcion     = $(this).data('descripcion');
							var fecha           = $(this).data('fecha');
							var hora            = $(this).data('hora');

	        				if (bVisto != 1) 
	        				{
	            				verNotificacion(iIdNotif,fechaalta);
	        				}
	        				$('#imgModalNotificacion').attr({
	        					src: imgNotificacion,
	        					'data-imgruta': imgNotificacion
	        				});

	        				$('#tituloNotificacion').html(titulo)
	        				$('#descripcionNotificacion').html(descripcion)
	        				$('#dateTimeNotificacion').html("<b>Fecha:</b> " + fecha + "<b><br>Hora:</b> " + hora)
	        				
	        				$('#modalVerNotificacion').modal('show');

	                		setTimeout(function(){ $('#btnModalNotificacion').focus(); }, 1000);
        				}
        			});

					$('.verPantallaCompleta').click(function(event) 
				 	{
						var rutaImagen = $(this).data('imgruta');
						verImgCompleta(rutaImagen);
					});	
				});
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
    return result;
}
function verNotificacion(idNotificacion,fechaalta)
{
	var objParam = {
					'opcion': 8,
					'descripcionOpc' : "ver notificacion",
					'idNotif' : idNotificacion,
					'fechaalta' : fechaalta		
					};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
            if(response.resultOper == 1)
            {
            	 getNotificaciones();
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
} 
function eliminarNotify(idNotificacion)
{
	var objParam = {
					'opcion': 9,
					'descripcionOpc' : "desabilitar notificacion",
					'idNotif' : idNotificacion 			
					};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
        	disableNotifyAlerta();
            if(response.resultOper == 1)
            {
            	 getNotificaciones();
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
			loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
}
function crearEstructuraNotificaciones(datos)
{
	$('#rowNotificiones').html('');
	var contNotifSinVer = 0;
	var html = ``;

	if (datos.length > 0) 
	{
		for (var i = 0; i < datos.length; i++) 
		{
			//ruta imagen
			var imagenNotificacion = datos[i].imagen != undefined && 
									 datos[i].imagen != "" && 
									 datos[i].imagen != null ?
									 "resources/img/" + datos[i].imagen : "resources/img/noimagen.png";  
			//ruta imagen

			//se extrae hora, minutos y segundos por separado
			var horaCompletaRegistro = datos[i].hora;
			var arrayHora = horaCompletaRegistro.split(":");
			var horaRegistro = arrayHora[0];
			var minutoRegistro = arrayHora[1];
			var segundoRegistro = arrayHora[2];

			//se extrae dia, mes y año por separado
			var fechaRegistro = datos[i].fechaRegistro;
			var arrayfecha = fechaRegistro.split("-");
			var añoRegistro = arrayfecha[0];//año registro
			var mesRegistro = arrayfecha[1];
			var diaRegistro = arrayfecha[2];

			//se extrae hora, minutos y segundos por separado
			var horaActual = datos[i].horaHoy;
			var minutoActual = datos[i].minutoHoy;
			var segundoActual = datos[i].segundoHoy;

			var fechaHoy = datos[i].fechaHoy;
			var arrayfechaHoy = fechaHoy.split("-");
			var añoActual = arrayfechaHoy[0]; //año actual
			var mesActual = arrayfechaHoy[1];
			var diaActual = arrayfechaHoy[2];

			var fechaAMostrar = fechaRegistro;
			var HoraAMostrar = format24A12H(horaRegistro,minutoRegistro,segundoRegistro);
			
			if (añoRegistro == añoActual) 
			{
				if (mesRegistro == mesActual) 
				{
					if (diaRegistro == diaActual) 
					{
						fechaAMostrar = "Hoy"

						if (horaRegistro == horaActual) 
						{
							HoraAMostrar = (minutoActual - minutoRegistro) == 0 ? 
											"Justo Ahora." : 
										   (minutoActual - minutoRegistro) + " min(s).";
						}
						else if((horaActual - horaRegistro) == 1)
						{
							var min=60-minutoRegistro;//obtener minutos de una hora atras
							
							HoraAMostrar = (min + parseInt(minutoActual)) <= 60 ? 
											(min + parseInt(minutoActual)) + " min(s)." : 
										   horaCompletaRegistro;
						}
					}
					else if(diaRegistro == (diaActual-1))
					{

						fechaAMostrar = "Ayer";
					}
					else if(diaRegistro == (diaActual-2) || diaRegistro == (diaActual-3) || diaRegistro == (diaActual-4) || diaRegistro == (diaActual-5) || diaRegistro == (diaActual-6))
					{
						  var date = new Date(fechaRegistro.replace(/-+/g, '/'));

						  var options = {
						    weekday: 'long'
						  };
						  fechaAMostrar = date.toLocaleDateString('es-MX', options);
					}
				} 
			} 
			

			html += `<div class="col-12 row-hover border notificacion" 
					data-id="` + datos[i].id + `" data-img="` + imagenNotificacion + `" data-visto="` + datos[i].visto + `" 
					data-fechaalta="` + fechaRegistro + " " + horaCompletaRegistro + `" data-titulo="` + datos[i].asunto + `" 
					data-descripcion="` + datos[i].descripcion + `" data-fecha="` + fechaAMostrar + `" 
					 data-hora="` + HoraAMostrar + `"> 

				    	<div class="row margin-top-10px margin-bottom-10px">
				    `;

			if (datos[i].visto == 1) 
			{
				html += `	<div class="col-2">
								<img src="` + imagenNotificacion + `" class="rounded mr-2"  width="40">
							</div>
							<div class="col-10">
								<div class="row">
									<div class="col-12">
										<p class="margin-bottom-0px text-dark">
											<button type="button" class="ml-1 close text-center margin-top--10px btn btnDeleteNotify"  data-id="` + datos[i].id + `" aria-label="Close">
										      <span aria-hidden="true" >&times;</span>
										    </button>
											<b id="nameUsuNotif">` + datos[i].asunto + `</b> 
											<small class="text-muted float-right">`+fechaAMostrar+`</small>
										</p> 
										<small class="text-muted float-right mr-2">`+HoraAMostrar+`</small>
										<p class="margin-bottom-0px text-secondary text-truncate" id="descNotificacion">`+datos[i].descripcion+`</p> 
						`;
			}
			else
			{
				contNotifSinVer++;
				html += `	<i class="fa fa-circle text-info margin-top-15px position-absolute margin-left-5px font-size-10px"></i>
							<div class="col-2">
								<img src="` + imagenNotificacion + `" class="rounded mr-2"  width="40">
							</div>
							<div class="col-10">
								<div class="row">
									<div class="col-12">
										<p class="margin-bottom-0px text-dark">
											<b id="nameUsuNotif">` + datos[i].asunto + `</b> 
											<small class="text-muted float-right font-weight-bold mr-2">`+fechaAMostrar+`</small>
										</p> 
										<small class="text-muted float-right font-weight-bold mr-2">`+HoraAMostrar+`</small>
										<p class="margin-bottom-0px text-secondary font-weight-bold text-truncate" id="descNotificacion">`+datos[i].descripcion+`</p> 
					`;
			}

			html += `				</div>
								</div>
							</div>
				    	</div>
				     </div>
				    `;
		 }
	}
	else
	{
		html += `<div class="col-12 row-hover border">
				 	<p class="text-muted text-center margin-top-10px"> Aun no tienes notificaciones</p>
				 </div>
				`;
	}

	if (contNotifSinVer > 0) 
	{
		$('#countNotificaciones').html(contNotifSinVer);
		$('#lblNotifNew').show();
		$('#countNotificaciones').show();
	}
	else
	{
		$('#countNotificaciones').hide();
		$('#lblNotifNew').hide();
	}

	return html;
}
function viewCarCompra()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	var usuarioSesion = getUsuarioSesion().nombre;

	$('#ContenidoBody').load("php/vistas/viewCarritoCompra.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		tooltipText();
		
		var prodCarComp = $.cookie('CARRITO_COMPRA') != undefined ? JSON.parse($.cookie('CARRITO_COMPRA')) : [];
		
		$('#sinDatosTabla').hide();
		$('#tabla_car_comp').hide();
		$('#nomUserCarCompra').html(usuarioSesion+",");
		
		$('#btnDeletSelec').addClass('animated fadeOut');
		$('#btnDeletSelec').click(function(event) 
		{
			if (getCantidadChekbxSelect('.chkbxProductos') > 0) 
			{
				var result = confirm("¿Seguro Que Desea Eliminar los Productos Seleccionados?");
				if (result == true) 
				{
					var productSelect = getChkBoxSelect('.chkbxProductos');
					$.when(setCookieCarritoCompra(elimElementsArray(prodCarComp,productSelect)))// se carga el nuevo carrito una vez eliminados
		    		.then(function( data, textStatus, jqXHR ) 
		    		{
		    			viewCarCompra();
		    		});
				} 
			}
		});

		if (prodCarComp.length > 0) 
		{
			cargarProductosSelect(prodCarComp);
			$('#btnElimCarCompra').show();
			$('#CountCarComp').html(prodCarComp.length);
		}
		else
		{
			$('#CountCarComp').html();
			$('#sinDatosTabla').show();
			$('#btnElimCarCompra').hide();
		}

		disableNotifyAlerta();//al cargar todos los componentes y su eventos
	});
}
function viewCalendario()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewCalendario.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		$('#modalsCalendario').load("php/vistas/modales/modalCalendario.php", function() //se carga Componente
		{ //se crean los eventos una vez obtenida la vista
			dinamismoModalCalendario()

			tooltipText();

			$.when(cargarCalendario())// se carga el calendario
			.done(function(respuesta1) 
			{
				$.when(cambiarEstilosBotonesCalendar())// se cargan  los estilos personalizados del calendario
				.done(function(respuesta1) 
				{
	    			getEtiquetasCalendar();// se obtienen etiquetas de bd

	    			// Reload Card
		        	$('.reload').on('click',function(){
			    		getEtiquetasCalendar();// se obtienen etiquetas de bd
			        });

    			});

			});
			 
			disableNotifyAlerta();//al cargar todos los componentes y su eventos
		});
	});
}
function cambiarEstilosBotonesCalendar()
{
	actividadGrupoBotones();

	//cambio de estilos a botones prev BEGIN
	$(".fc-prev-button").removeClass('fc-button fc-state-default fc-corner-left');
	$(".fc-prev-button").addClass('btn btn-outline-dark');
	//cambio de estilos a botones prev END

	//cambio de estilos a botones next BEGIN
	$(".fc-next-button").removeClass('fc-button fc-state-default fc-corner-right');
	$(".fc-next-button").addClass('btn btn-outline-dark');
	//cambio de estilos a botones next END

	//cambio de estilos a botones mes BEGIN
	$(".fc-month-button").click(function(event) 
	{
		$(".fc-agendaWeek-button").removeClass('active');
		$(".fc-agendaDay-button").removeClass('active');

		actividadGrupoBotones();
	});
	
	//cambio de estilos a botones mes END
	
	//cambio de estilos a botones semana BEGIN
	$(".fc-agendaWeek-button").click(function(event) 
	{
		$(".fc-month-button").removeClass('active');
		$(".fc-agendaDay-button").removeClass('active');
		
		actividadGrupoBotones();
	});
	//cambio de estilos a botones semana END
	
	//cambio de estilos a botones dia BEGIN
	$(".fc-agendaDay-button").click(function(event) 
	{
		$(".fc-month-button").removeClass('active');
		$(".fc-agendaWeek-button").removeClass('active');
		
		actividadGrupoBotones();
	});
	
	//cambio de estilos a botones dia END
}
function actividadGrupoBotones()
{
	$(".fc-agendaWeek-button").removeClass('fc-button fc-state-default fc-corner-left');
    
    if ($(".fc-agendaWeek-button").hasClass('fc-state-active'))
    {
		$(".fc-agendaWeek-button").removeClass('fc-state-active');
    	$(".fc-agendaWeek-button").addClass('btn btn-outline-dark active');
    }
    else
    {
        $(".fc-agendaWeek-button").addClass('btn btn-outline-dark');
    }
	
	$(".fc-month-button").removeClass('fc-button fc-state-default');

    if ($(".fc-month-button").hasClass('fc-state-active'))
    {
		$(".fc-month-button").removeClass('fc-state-active');
    	$(".fc-month-button").addClass('btn btn-outline-dark active');
    }
    else
    {
        $(".fc-month-button").addClass('btn btn-outline-dark');
    }

	$(".fc-agendaDay-button").removeClass('fc-button fc-state-default fc-corner-right');

	if ($(".fc-agendaDay-button").hasClass('fc-state-active'))
    {
		$(".fc-agendaDay-button").removeClass('fc-state-active');
    	$(".fc-agendaDay-button").addClass('btn btn-outline-dark active');
    }
    else
    {
        $(".fc-agendaDay-button").addClass('btn btn-outline-dark');
    }
}
function viewChat()
{
	var inicioSesion = getUsuarioSesion().login;
	loadingNotify("","Cargando");

	$('#ContenidoBody').load("php/vistas/viewChat.php", function() //se carga Componente
	{ //se crean los eventos una vez obtenida la vista
		$('#modalsChat').load("php/vistas/modales/modalChat.php", function() //se carga Componente
		{ //se crean los eventos una vez obtenida la vista
			tooltipText();
			loadUsuariosParaNewChat();

			$.when(cargarUsuariosChats())// se cargan los chats
			.done(function(respuesta1) 
			{
				 $('#txtMensaje').on("keydown", function(e) { 
				 	if (e.shiftKey && e.which === 13) {
		                e.preventDefault();
		                $('#btnEnviarMensaje').click();// al presionar shift+Enter se envia el mensaje
		            }
		        });
				$('#btnEnviarMensaje').click(function(event) 
				{
					var mensaje       = $('#txtMensaje').val();
					var idUsuReceptor = $('#btnEnviarMensaje').data('idusurecep');

					if(mensaje != "" && idUsuReceptor != "")
					{
						$.when(enviarMensaje(mensaje,idUsuReceptor))// se cargan los chats
						.done(function(respuesta1) 
						{
							$('#txtMensaje').val("");
							$('#txtMensaje').focus();
						});
					}
				});
				
				$('.msg_card_body').animate({scrollTop: $('.msg_card_body').scrollTop() + 1000 + "px"}); // baja el scroll 100 pixeles

			});
			 
			disableNotifyAlerta();//al cargar todos los componentes y su eventos
		});
	});
}
function enviarMensaje(mensaje, idUsuReceptor)
{
	var horaStamp = format24A12H(moment().format('HH'),moment().format('mm'));

	var htmlMnsj  = `
		<div class="d-flex justify-content-end mb-4">
			<div class="msg_cotainer_send font-weight-bolder">
				` + mensaje + `
				<span class="msg_time_send">
				` + horaStamp + `
				 , Hoy. <i class="fas fa-clock font-size-12px"></i></span>
			</div>
			<div class="img_cont_msg">
				<img src="resources/img/usuarios/29_Lighthouse.jpg" class="rounded-circle user_img_msg">
			</div>
		</div>
	`;
	$('.msg_card_body').append(htmlMnsj);

	$('.msg_card_body').animate({scrollTop: $('.msg_card_body').scrollTop() + 1000 + "px"}); // baja el scroll 100 pixeles
}
function loadUsuariosParaNewChat()
{
	var users           = getUsers();
    var idUsuarioSesion = getUsuarioSesion().id;

    if (users.length > 0) 
    {
	    for (var i = 0; i < users.length; i++) 
		{
			if (idUsuarioSesion != users[i].id) 
			{
				$('#usuariosNewChat').append($(
					`
						<div class="card  row-hover">
						  <div class="row no-gutters">
						    <div class="col-2 d-flex justify-content-center align-items-center">
						      <img src="resources/img/usuarios/`+ (users[i].foto != "" ? users[i].foto : 'user-perfil.jpg') + `" class="img-thumbnail rounded-circle" width="70" height="70">
						    </div>
						    <div class="col-10">
						      <div class="card-body">
						        <h5 class="card-title mb-1">`+ users[i].nombre + " " + users[i].apellido +`</h5>
						        <p class="card-text text-muted">`+ users[i].email + `</p>
						      </div>
						    </div>
						  </div>
						</div>
					`) 
				);
			}
		}
    }
    else
    {
    	$('#usuariosNewChat').append($(
					`  <div class="col-sm-12 p-0 text-center">`+ 
						`Aqui Se Mostraran Los Usuarios...`+
					`</div>`) 
				);
    }
}
function cargarUsuariosChats()
{
	
}
function getChat(idUsuReceptor)
{
	var idUsuarioSesion = getUsuarioSesion().id;

	var result = false;
	var objParam = {
					'opcion': 18,
					'descripcionOpc' : "obtener Chats",
					'idUsuario' : idUsuarioSesion,
					'idUsuReceptor' : idUsuReceptor
					};

	$.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
            if(response.resultOper == 1)
            {
            	result = true;
         	   	var datosChats = response.infoResponse != undefined ? response.infoResponse : {};

        		/*$.when($('#rowChats').append(cargarChats(datosChats)))
        		.then(function( data, textStatus, jqXHR ) 
        		{
					$('.verPantallaCompleta').click(function(event) 
				 	{
						var rutaImagen = $(this).data('imgruta');
						verImgCompleta(rutaImagen);
					});	
				});*/
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
		beforeSend: function()
		{
		},
        error: function(xhr, status, error) {
          	console.log(xhr.responseText);
          	setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
    return result;
}
function elimElementsArray(ArrayElementos,arrayElementsAElim)
{
	var cantElemAElim = arrayElementsAElim.length; 

	for (var i = cantElemAElim-1; i >= 0; i--) 
	{
		ArrayElementos.splice(arrayElementsAElim[i].indexArray, 1); //elimina 1 elemento a partir del indice
	}

	return ArrayElementos;
}
function elimElemArray(ArrayElementos,indice)
{
	ArrayElementos.splice(indice, 1); //elimina 1 elemento a partir del indice
	return ArrayElementos;
}
function remplazaCantElementArray(arrayElementos,objParam)
{
	var resultBusqueda = false;
	var cantElement = arrayElementos.length;

	for (var i = 0; i < cantElement; i++) 
	{
		if (arrayElementos[i].id == objParam.id) // si el producto existe en el carrito, modifica la cantidad
		{
			arrayElementos[i].cantidad = parseInt(arrayElementos[i].cantidad)+parseInt(objParam.cantidad);
			resultBusqueda = true;
			setCookieCarritoCompra(arrayElementos);//si encuentra el elemento le suma la cantidad
		} 
	}

	return resultBusqueda;
}
function cargarProductosSelect(prodCarCompra)
{
	var cantProdCarCompra = prodCarCompra.length;
	var TotalPagar = 0;
	if (cantProdCarCompra > 0) 
	{
		$('#tabla_car_comp').show();
		$('#bodyCarComp').html('');
		for (var i = 0; i < cantProdCarCompra; i++) 
		{ 
			$('#tabla_car_comp').append($(` <tr class="row`+(i+1)+` row-hover">`+ 
					`<td class="animated zoomIn"><label class="texto-centrado">`+ (i+1) +`</label></td>`+
					`<td class="animated zoomIn">
						<div class="row">
							<div class="col-1 texto-centrado">
								<input type="checkbox" class="form-control chkbxProductos" data-id="`+ prodCarCompra[i].id +`"  data-indexarray="`+ i +`">
								<img class="verPantallaCompleta zoomimg fondo-opaco" src="resources/img/productos/`+ prodCarCompra[i].imagen +`" alt="" height="50px" data-imgruta="resources/img/productos/`+ prodCarCompra[i].imagen +`"/>
							</div>
							<div class="col-11"><b>`
								+ prodCarCompra[i].nombre + `</b><br>
								<small class="text-muted">`
									+ prodCarCompra[i].descripcion +
								`</small>
							</div>
						</div>
					</td>`+
					`<td class="text-center animated zoomIn text-truncate">$ `+ prodCarCompra[i].precio +`</td>`+
					`<td class="text-center animated zoomIn"><input class="form-control text-center txtCantProd " type="number" value="`+ prodCarCompra[i].cantidad +`" data-precioprod="`+ prodCarCompra[i].precio +`" data-fila="`+ (i+1) +`" data-indice="`+ i +`" min="1" max="100" ></td>`+
					`<td class="text-center animated zoomIn text-truncate">
						<label class="colrow`+(i+1)+`"><b>$ `+ (prodCarCompra[i].precio*prodCarCompra[i].cantidad).toFixed(2) +`</b></label>
						<button class="btn btn-sm btn-outline-danger btnEliminarProdCar border-white font-size-22px" data-id="`+ prodCarCompra[i].id +`" data-indice="`+ i +`"><i class="fas fa-trash-alt"></i></button>
					</td>`+
				`</tr>`) 
			);

			TotalPagar += prodCarCompra[i].precio*prodCarCompra[i].cantidad;
		}
		
		$('#TotalAPagar').html("$ " + TotalPagar.toFixed(2));

		$('.chkbxProductos').click(function(event) 
		{
			showBtnElimSelc('.chkbxProductos');
		});

		$('.btnEliminarProdCar').click(function(event) 
		{
			var index = $(this).data('indice');

			enableNotifyYesOrCancel("¿?","¿Seguro Que Desea Quitar Este Producto Del Carrito?",3);
			$("#btnModalYesOrCancel").click(function()
		 	{
				$.when(disableNotifyYesOrCancel())// funcion para cerrar el modal a continuacion ira las acciones a seguir
				.then(function( data, textStatus, jqXHR )
	    		{
					
					$.when(setCookieCarritoCompra(elimElemArray(prodCarCompra,index)))// se carga el nuevo carrito una vez eliminado
		    		.then(function( data, textStatus, jqXHR )
		    		{
		    			setTimeout(function(){ viewCarCompra(); }, 500);
		    		});
	    		});
		 	});
			
		});


		showBtnElimSelc('.chkbxProductos');

		$('#btnElimCarCompra').click(function(event) 
		{
			enableNotifyYesOrCancel("¿?","¿Seguro Que Desea Vaciar El Carrito?",3);
			$("#btnModalYesOrCancel").click(function()
		 	{
				$.when(disableNotifyYesOrCancel())// funcion para cerrar el modal a continuacion ira las acciones a seguir
				.then(function( data, textStatus, jqXHR )
	    		{
					$.when(deleteCarrito())// se carga el nuevo carrito una vez eliminado
		    		.then(function( data, textStatus, jqXHR )
		    		{
		    			setTimeout(function(){ viewCarCompra(); }, 500);
		    		});
	    		});
		 	});
		});

		$('.txtCantProd').on('input', function() {
			var valInput = $(this).val(); 
			var fila = $(this).data('fila');
			var index = $(this).data('indice');
			var precioProd = $(this).data('precioprod');
			
			if(valInput > 0)
			{
				if (valInput > 100) 
				{
					$(this).val(100);
					valInput = 100; 
				}

    			prodCarCompra[index].cantidad = valInput;  // se actualiza en el arreglo la cantidad al indice correspondiente
    			setCookieCarritoCompra(prodCarCompra); // se setea cookie de carrito para reflejar la nueva cantidad

    			$('#TotalAPagar').html("$ " + sumarSubtutales(prodCarCompra).toFixed(2));// se suma el cambio de cantidad

				var subTotal = valInput*precioProd;
				$(".colrow"+fila).html('<b>$ ' + subTotal.toFixed(2) + '</b>');// cambia el valor del total que pertenece a la fila correspondiente
			}
			else
			{
				$(this).val(1);
				$(".colrow"+fila).html('<b>$ ' + (precioProd*1).toFixed(2) + '</b>');// cambia el valor del total que pertenece a la fila correspondiente
			}
	  	});

		$('.verPantallaCompleta').click(function(event) 
	 	{
			var rutaImagen = $(this).data('imgruta');
			verImgCompleta(rutaImagen);
		});	
	}
	else
	{
			$('#sinDatosTabla').hide();
	}
}
function sumarSubtutales(arrayCarrito)
{
	var totalCompra = 0;
	for (var i = 0; i < arrayCarrito.length; i++) 
	{
		totalCompra += arrayCarrito[i].precio*arrayCarrito[i].cantidad;
	}

	return totalCompra;
}
function animationInputLabel(input,label,textColor){
	$("<style type='text/css'> "+
		" .componente-bottom{position: relative;-webkit-animation-name: movBottom;  /* Safari 4.0 - 8.0 */ 	-webkit-animation-duration: 200ms;  /* Safari 4.0 - 8.0 */  	-webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */	animation-name: movBottom;	animation-duration: 200ms;  	animation-fill-mode: forwards;}.componente-top{	position: relative;	-webkit-animation-name: movTop;  "+
		"/* Safari 4.0 - 8.0 */	-webkit-animation-duration: 200ms;  /* Safari 4.0 - 8.0 */  	-webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */	animation-name: movTop;	animation-duration: 200ms;  	animation-fill-mode: forwards;}.label-en-input{	bottom: 7px;}/* Safari 4.0 - 8.0 */@-webkit-keyframes movTop {  from {bottom: 7px; font-size: 16px; margin-left: 13px;}  to {bottom: 40px; font-size: 14px; margin-left: 5px;}} " +
		"@keyframes movTop {  from {bottom: 7px; font-size: 16px; margin-left: 13px;}  to {bottom: 40px; font-size: 14px; margin-left: 5px;}  }/* Safari 4.0 - 8.0 */@-webkit-keyframes movBottom {  from {bottom: 40px; font-size: 14px; margin-left: 5px;}  to {bottom: 7px; font-size: 16px; margin-left: 13px;}}@keyframes movBottom {   from {bottom: 40px; font-size: 14px; margin-left: 5px;}  to {bottom: 7px; font-size: 16px; margin-left: 13px;}} "+
	  "</style>").appendTo("head");	

	$(label).addClass('position-absolute margin-left-13px label-en-input text-muted');

	$(label).click(function(){
			$(input).focus();
		});
	$(input).focusin(function(event) {
		$(label).addClass('text-'+textColor);
		if ($(input).val() == '')
		{
			$(label).removeClass('text-muted');
			$(label).addClass('componente-top');
		}
	});
	$(input).focusout(function(event) {
		$(label).removeClass('text-'+textColor);
		if ($(input).val() == '')
		{
			$(label).removeClass('componente-top text-muted');
			$(label).addClass('componente-bottom text-muted');
		}
	});
}

function verImgCompleta(rutaImagen)
{
	if (rutaImagen != undefined && rutaImagen != '') 
	{
		$('#imgModal').html('<center><img class="img-fluid" src="' + rutaImagen + '"></center>');
		$('#ModalVerFoto').modal('show');
	}
	else
	{
		enableNotifyAlerta("ERROR!","Ocurrio un Error Al Cargar La Imagen",4);
	}
	
}

function tooltipText()
{
	$('.tooltip-right').tooltip({
        placement: 'right',
        viewport: {
          selector: 'body',
          padding: 2
        }
      });
      $('.tooltip-bottom').tooltip({
        placement: 'bottom',
        viewport: {
          selector: 'body',
          padding: 2
        }
      });
       $('.tooltip-top').tooltip({
        placement: 'top',
        viewport: {
          selector: 'body',
          padding: 2
        }
      });
       $('.tooltip-left').tooltip({
        placement: 'left',
        viewport: {
          selector: 'body',
          padding: 2
        }
      });
      $('.tooltip-viewport-right').tooltip({
        placement: 'right',
        viewport: {
          selector: '.container-viewport',
          padding: 2
        }
      });
      $('.tooltip-viewport-bottom').tooltip({
        placement: 'bottom',
        viewport: {
          selector: '.container-viewport',
          padding: 2
        }
      });
       $('.tooltip-viewport-top').tooltip({
        placement: 'top',
        viewport: {
          selector: '.container-viewport',
          padding: 2
        }
      });
        $('.tooltip-viewport-left').tooltip({
        placement: 'left',
        viewport: {
          selector: '.container-viewport',
          padding: 2
        }
      });
}
