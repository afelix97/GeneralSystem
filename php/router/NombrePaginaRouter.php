<?php 
	include_once('../clases/CGenerales.php');
	include_once("../../librerias/php/JSON.php");
	include_once("../clases/CConexionesDB.php");
	include_once("../DatosGlobales/ConstantesGlobales.php");
	include_once("../clases/CLog.php");
	include_once("../objetos/Usuario.php");
	include_once("../objetos/etiquetaCalendario.php");
	$datosRespuesta = array();
	$Usuario        = new Usuario();
	$Etiqueta       = new Etiqueta();

	//obtencion de peticiones
	$opcion         = isset($_POST['opcion']) ? $_POST['opcion'] : 0;
	$opcion         = $opcion != 0 ? $opcion : (isset($_GET['opcion']) ? $_GET['opcion'] : 0);
	$descripcionOpc = isset($_POST['descripcionOpc']) ? $_POST['descripcionOpc'] : 0;
	$descripcionOpc = $descripcionOpc != 0 ? $descripcionOpc : (isset($_GET['descripcionOpc']) ? $_GET['descripcionOpc'] : 0);




	$userId          = isset($_POST['idUsuario']) ? $_POST['idUsuario'] : 0;
	$userId 		 = $userId != 0 ? $userId : (isset($_GET['idUsuario']) ? $_GET['idUsuario'] : 0);
	$userNombre      = isset($_POST['nombre']) ? $_POST['nombre'] : "";
	$userApellido    = isset($_POST['apellido']) ? $_POST['apellido'] : "";
	$rutaImagen      = isset($_POST['rutaImagen']) ? $_POST['rutaImagen'] : "";

	/*datos Login INICIO*/
	isset($_POST['email']) ? $Usuario->setEmail($_POST['email']) : $Usuario->setEmail("");
	isset($_POST['password']) ? $Usuario->setPassword($_POST['password']) : $Usuario->setPassword("");
	/*datos Login fin*/
	
	$Usuario->setId($userId);
	$Usuario->setNombre($userNombre);
	$Usuario->setApellido($userApellido);
	$Usuario->setFoto($rutaImagen);

	/*datos usuario que realiza la transaccion INICIO*/
	$idUsuarioTransaccion = isset($_POST['idUsuarioTransaccion']) ? $_POST['idUsuarioTransaccion'] : 0;
	$idUsuarioTransaccion = $idUsuarioTransaccion != 0 ? $idUsuarioTransaccion : (isset($_GET['idUsuarioTransaccion']) ? $_GET['idUsuarioTransaccion'] : 0);
	/*datos usuario que realiza la transaccion fin*/

	/*datos Para el registro de huellas INICIO*/
	$huellaUsuario = isset($_POST['huella']) ? $_POST['huella'] : "";
	$numDedo       =  isset($_POST['NumDedo']) ? $_POST['NumDedo'] : 0;
	/*datos Para el registro de huellas FIN*/


	/*datos consumo servicio INICIO*/
	$tipoServicioConsumo = isset($_POST['tipoServicio']) ? $_POST['tipoServicio'] : "";
	$folioConsumo        = isset($_POST['folio']) ? $_POST['folio'] : "";
	$nssConsumo          = isset($_POST['nss']) ? $_POST['nss'] : "";
	$curpConsumo         = isset($_POST['curp']) ? $_POST['curp'] : "";
	$origenConsumo       = isset($_POST['origen']) ? $_POST['origen'] : "";
	/*datos consumo servicio FIN*/

	/*datos Notificaciones INICIO*/
	$idNotificacion = isset($_POST['idNotif']) ? $_POST['idNotif'] : 0;
	$fechaalta      = isset($_POST['fechaalta']) ? $_POST['fechaalta'] : 0;
	/*datos Notificaciones FIN*/

	/*datos Etiquetas FullCalendar INICIO*/
	isset($_POST['id']) 		         ? 
		  $Etiqueta->setId($_POST['id']) : 
		  $Etiqueta->setId(0);

	isset($_POST['titulo']) ? $Etiqueta->setTitulo($_POST['titulo']) : $Etiqueta->setTitulo("");

	isset($_POST['descripcion'])         ? 
		  $Etiqueta->setDescripcion($_POST['descripcion']) : 
		  $Etiqueta->setDescripcion("");

	isset($_POST['text_color'])          ? 
		  $Etiqueta->setText_color($_POST['text_color']) : 
		  $Etiqueta->setText_color("#fbfcfc");

	isset($_POST['bg_color']) 	         ? 
		  $Etiqueta->setBg_color($_POST['bg_color']) : 
		  $Etiqueta->setBg_color("#3498db");

	isset($_POST['inicio'])              ? 
		  $Etiqueta->setInicio($_POST['inicio']) : 
		  $Etiqueta->setInicio("");

	isset($_POST['fin'])                 ? 
		  $Etiqueta->setFin($_POST['fin']) : 
		  $Etiqueta->setFin("");

	isset($_POST['id_usuario_emisor'])   ? 
		  $Etiqueta->setId_usuario_emisor($_POST['id_usuario_emisor']) : 
		  $Etiqueta->setId_usuario_emisor(0);

	isset($_POST['id_usuario_receptor']) ? 
		  $Etiqueta->setId_usuario_receptor($_POST['id_usuario_receptor']) : 
		  $Etiqueta->setId_usuario_receptor(0);
		  
	isset($_POST['fechaalta'])           ? 
		  $Etiqueta->setFechaalta($_POST['fechaalta']) : 
		  $Etiqueta->setFechaalta("");
	/*datos Etiquetas FullCalendar FIN*/

	ini_set('memory_limit', '-1');
	set_time_limit(0);	
	//ESTAS DOS LINEAS ES PARA RESOLVER EL PROBLEMA DE LAS Ñ
	setlocale(LC_ALL,'es_ES'); 
	define("CHARSET", "iso-8859-1");

	//ABRIR CONEXION POSTGRESQL
	/**/
	
	//ABRIR CONEXION MYSQL
	$conexMySql = CConexionesDB::cnxMySql("prueba");

	CLog::escribirLog(":: NombrePaginaRouter[".__LINE__."]:: Opcion = " . $opcion);
	CLog::escribirLog(":: NombrePaginaRouter[".__LINE__."]:: Descripcion = " . $opcion);
	switch($opcion) 
	{
		case 1:
			CLog::escribirLog(":: NombrePaginaRouter[".__LINE__."]:: Sesion = " . $Usuario->toString());
			$datosRespuesta = CGenerales::iniciarSesion($conexMySql,$Usuario->getEmail(),$Usuario->getPassword(),$huellaUsuario);
			CLog::escribirLog("NombrePaginaRouter[".__LINE__."]:: finaliza inicio de sesion");
			echo json_encode($datosRespuesta);
			break;
		case 2:
			$datosRespuesta = CGenerales::obtenerUsuarios($conexMySql);
			echo json_encode($datosRespuesta);
			break;
		case 3:
			$datosRespuesta = CGenerales::clientConsultEstServSOAP($tipoServicioConsumo,$folioConsumo,$nssConsumo,$curpConsumo,$origenConsumo);
			echo json_encode($datosRespuesta);
			break;
		case 4:
			$datosRespuesta = CGenerales::getProductos($conexMySql);
			echo json_encode($datosRespuesta);
			break;
		case 5:
			$datosRespuesta = CGenerales::eliminarUsuario($conexMySql,$Usuario->getId(),$idUsuarioTransaccion);
			echo json_encode($datosRespuesta);
			break;
		case 6:
			CLog::escribirLog("[CGenerales::CASE 6][".__LINE__."]:: DATA = " . $Usuario->toString());
			$datosRespuesta = CGenerales::guardarUsuario($conexMySql,$Usuario,$idUsuarioTransaccion);
			echo json_encode($datosRespuesta);
			break;
		case 7:
			$datosRespuesta = CGenerales::getNotificaciones($conexMySql, $Usuario->getId());
			echo json_encode($datosRespuesta);
			break;
		case 8:
			$datosRespuesta = CGenerales::verNotificacion($conexMySql,$idNotificacion, $fechaalta);
			echo json_encode($datosRespuesta);
			break;
		case 9:
			$datosRespuesta = CGenerales::notificacionDisabled($conexMySql,$idNotificacion);
			echo json_encode($datosRespuesta);
			break;
		case 10:
			CGenerales::subirArchivoAlServidor($_FILES['upl'],$Usuario->getId());
			break;
		case 11:
			$datosRespuesta = CGenerales::eliminarImagen($rutaImagen);
			echo json_encode($datosRespuesta);
			break;
		case 12:
			$datosRespuesta = CGenerales::actualizarFotoUsuario($conexMySql,$Usuario->getId(),$Usuario->getFoto());
			echo json_encode($datosRespuesta);
			break;
		case 13:
			$datosRespuesta = CGenerales::eliminarTempUsuario($Usuario->getId());
			echo json_encode($datosRespuesta);
			break;
		case 14:
			$datosRespuesta = CGenerales::registrarHuellaUsuario($conexMySql,$Usuario->getId(),$huellaUsuario,$numDedo);
			echo json_encode($datosRespuesta);
			break;
		case 15:
			$datosRespuesta = CGenerales::getEtiquetasCalendar($conexMySql);
			echo json_encode($datosRespuesta);
			break;
		case 16:
			CLog::escribirLog("[CGenerales::CASE 16][".__LINE__."]:: DATA = " . $Etiqueta->toString());
			$datosRespuesta = CGenerales::guardarEtiqueta($conexMySql,$Etiqueta);
			echo json_encode($datosRespuesta);
			break;
		case 17:
			$datosRespuesta = CGenerales::obtenerUsuario($conexMySql, $Usuario->getId());
			echo json_encode($datosRespuesta);
			break;
		case 18:
			$datosRespuesta = CGenerales::obtenerChats($conexMySql, $Usuario->getId());
			echo json_encode($datosRespuesta);
			break;
		case 0:
			echo "Opcion Invalida: " . $opcion;
			break;
	}
 ?>