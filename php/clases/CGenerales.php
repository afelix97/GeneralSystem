<?php 
include_once("../../librerias/php/JSON.php");
include_once("../objetos/Usuario.php");
include_once("../objetos/Productos.php");
include_once("../objetos/etiquetaCalendario.php");
include_once("../clases/CLog.php");
include_once("../clases/encryption.php");
include_once("../DatosGlobales/ConstantesGlobales.php");

class CGenerales
{	
	function iniciarSesion($conexMySql,$pEmail,$pPassword,$huellaUsuario)
	{
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."] :: param([$pEmail],[$pPassword]); ::");

		$datos               = array();
		$datos['mensaje']    = "";
		$datos['respuesta']  = 0;
		$datos['resultOper'] = 0;
		$pPassword           = Password::hash($pPassword);
		if (($pEmail != "" && $pPassword != "") || ($pEmail != "" && $huellaUsuario != "") ) 
		{

			if ($huellaUsuario == "") // si no viene la huella busca por usuario y contraseña
			{
				$cSql = "SELECT id,nombre,apellido,email,password,id_tipo_usuario FROM  usuarios where email LIKE '$pEmail%' AND password = '$pPassword' LIMIT 1;";
			}
			else
			{
				$cSql = "SELECT id,nombre,apellido,email,password,id_tipo_usuario FROM  usuarios where email LIKE '$pEmail%' LIMIT 1;";
			}
			
			try 
			{
				

				$Usuario = new Usuario;
				$huellaRegistrada = "";
				
					CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."] :: cSql => " . $cSql);
				foreach ($conexMySql->query($cSql) as $Resultado) 
				{
					
					$Usuario->setId($Resultado['id']);
					$Usuario->setNombre($Resultado['nombre']);
					$Usuario->setApellido($Resultado['apellido']);
					$Usuario->setEmail($Resultado['email']);
					$Usuario->setPassword($Resultado['password']);
					$Usuario->setId_tipo_usuario($Resultado['id_tipo_usuario']);
					
					$sqlIMG="SELECT imagen FROM usuario_imagen where idusuario = ". $Usuario->getId() ." LIMIT 1;";
					CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."] :: sqlIMG => " . $sqlIMG);
					foreach ($conexMySql->query($sqlIMG) as $respIMG) 
					{
						$Usuario->setFoto($respIMG['imagen']);
					}
					//obteniendo huella del usuario
					if ($huellaUsuario != "") 
					{
						$sqlGetHuella = "SELECT huella FROM  usuario_huellas where idusuario = " . $Usuario->getId() . " LIMIT 1;";
						CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."] :: sqlGetHuella => " . $sqlGetHuella);
						foreach ($conexMySql->query($sqlGetHuella) as $respHuella) 
						{
							$huellaRegistrada = $respHuella['huella'];
						}
					}
				}

				if ($Usuario->getId() != 0 && $Usuario->getId() != null) 
				{
					if ($huellaUsuario == "") 
					{
						$datos['mensaje'] = "Bienvenido!.";
						$datos['respuesta'] = $Usuario;
						$datos['resultOper'] = 1;
					}
					else if(CGenerales::validarHuellas($huellaUsuario,$huellaRegistrada) && $huellaUsuario != "")
					{
						$datos['mensaje'] = "Bienvenido!.";
						$datos['respuesta'] = $Usuario;
						$datos['resultOper'] = 1;
					}
					else
					{
						$datos['respuesta'] = $Usuario;
						$datos['mensaje'] = "La Huella No Coincide!.";
						$datos['resultOper'] = 2;
					}
				}
				else
				{
					$datos['respuesta'] = $Usuario;
					$datos['mensaje'] = "Datos Incorrectos!.";
					$datos['resultOper'] = 2;
				}
			} catch (Exception $e) {
				$datos['mensaje'] = $e;
				$datos['resultOper'] = -1;
			}
		}
		return $datos;		

	}
	function validarHuellas($huellaSession,$huellaRegistrada)
	{
		$result = false;
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."] :: INICIA ::");
		
		$huellaSession    = substr($huellaSession, 0, 34);
		$huellaRegistrada = substr($huellaRegistrada, 0, 34);

		if ($huellaSession == $huellaRegistrada) 
		{
			$result =  true;
		}
		else
		{
		}

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."] :: FIN ::");
		return $result;
	}
	function obtenerUsuarios($conexMySql)
	{
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();
		
		try 
		{
			$cSql="SELECT * FROM  usuarios;";
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$Usuario = new Usuario;
				$Usuario->setId($Resultado['id']);
				$Usuario->setNombre($Resultado['nombre']);
				$Usuario->setApellido($Resultado['apellido']);
				$Usuario->setEmail($Resultado['email']);
				$Usuario->setPassword($Resultado['password']);

				//obteniendo imagen
				$sqlGetImage="SELECT imagen FROM  usuario_imagen WHERE idusuario = " . $Usuario->getId() . " LIMIT 1;";
				foreach ($conexMySql->query($sqlGetImage) as $resImage) 
				{
					$Usuario->setFoto($resImage['imagen']);
				}

				
				$datos['infoResponse'][]=$Usuario;
			}
			$datos['mensaje'] = "Informacion obtenida con exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}
		
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Fin");

		return $datos;		
	}
	function obtenerUsuario($conexMySql, $idUser)
	{
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();
		
		try 
		{
			$cSql="SELECT * FROM  usuarios WHERE id = $idUser;";
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$Usuario = new Usuario;
				$Usuario->setId($Resultado['id']);
				$Usuario->setNombre($Resultado['nombre']);
				$Usuario->setApellido($Resultado['apellido']);
				$Usuario->setEmail($Resultado['email']);
				$Usuario->setPassword($Resultado['password']);

				//obteniendo imagen
				$sqlGetImage="SELECT imagen FROM  usuario_imagen WHERE idusuario = " . $Usuario->getId() . " LIMIT 1;";
				foreach ($conexMySql->query($sqlGetImage) as $resImage) 
				{
					$Usuario->setFoto($resImage['imagen']);
				}

				$datos['infoResponse'] = $Usuario;
			}
			$datos['mensaje'] = "Informacion obtenida con exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}
		
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Fin");

		return $datos;		
	}
	function eliminarUsuario($conexMySql,$idUsuario, $idUsuarioTransaction)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		$idUsuario           = addslashes($idUsuario);
		$cSql="DELETE FROM usuarios WHERE id = ". $idUsuario .";";
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Sql= " . $cSql);
		try 
		{
			$conexMySql->query($cSql);

			CGenerales::crearNotificacion($conexMySql,'General System','Eliminaste un usuario','sistema/LogoMinGS.png',$idUsuarioTransaction);

			CGenerales::eliminarTempUsuario($idUsuario);

			$sqlElimImage="DELETE FROM usuario_imagen WHERE idusuario = ". $idUsuario .";";
			$conexMySql->query($sqlElimImage);

			$datos['mensaje'] = "Usuario Eliminado Con Exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}
		

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;		
	}
	function guardarUsuario($conexMySql,$pUsuario,$idUsuarioTransaccion)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		$passEncrip = Password::hash($pUsuario->getPassword());
		
		$cSql="INSERT INTO usuarios (nombre,apellido,email,password) VALUES('" . $pUsuario->getNombre() . "','" . $pUsuario->getApellido() . "','" . $pUsuario->getEmail() . "','" . $passEncrip . "');";

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Sql= " . $cSql);
		try 
		{
			$exist = CGenerales::validarExistUsuario($conexMySql,$pUsuario->getEmail());
			if ($exist == 1) 
			{
				$datos['mensaje'] = "La Direccion De Correo Ya Existe!";
				$datos['resultOper'] = 2;

			}
			else
			{
				$conexMySql->query($cSql);
				CGenerales::crearNotificacion($conexMySql,'General System','Has añadido a '. $pUsuario->getNombre() . " ". $pUsuario->getApellido() . ' al Sistema.','sistema/LogoMinGS.png',$idUsuarioTransaccion);

				$cSqlBuscarIdUsuario="SELECT id FROM  usuarios WHERE email = '" . $pUsuario->getEmail() . "'"; 
				foreach ($conexMySql->query($cSqlBuscarIdUsuario) as $Resultado) 
				{
					$Usuario = new Usuario;
					$Usuario->setId($Resultado['id']);

				}

				$cSqlInsertUsuarioSinIMG="INSERT INTO usuario_imagen (idusuario) VALUES (" . $Usuario->getId() .");"; 
				$conexMySql->query($cSqlInsertUsuarioSinIMG);

				$datos['mensaje'] = "Usuario Guardado Con Exito!";
				$datos['resultOper'] = 1;
			}
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}
		

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;		
	}
	function validarExistUsuario($conexMySql,$mailUsuario)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia Datos=" . $mailUsuario);
		
		$exist = 0;
		$cSql  = "SELECT EXISTS(SELECT id FROM usuarios WHERE email ='" . $mailUsuario . "');";
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: SQL=" . $cSql);
		try 
		{
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$exist = $Resultado[0];
			}
		} 
		catch (Exception $e) 
		{
			$exist  = $e;
		}
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin RETURN = " . $exist);

		return $exist;		
	}
	function registrarHuellaUsuario($conexMySql,$idUsuario,$huellaUsuario,$numDedo)
	{
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		try 
		{
			$sql = "INSERT INTO usuario_huellas (huella, idusuario, numdedo) VALUES('" . $huellaUsuario . "','" . $idUsuario . "',". $numDedo .");";

			CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: sql ==" . $sql);

			$conexMySql->query($sql);

			$datos['mensaje']    = "Huella de Usuario Registrada Con Exito!";
			$datos['resultOper'] = 1;

			CGenerales::crearNotificacion($conexMySql,'General System','Tu Huella a sido registrada en el Sistema, Vive la Experiencia Cuanto Antes!.','sistema/LogoMinGS.png',$idUsuario);
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = "No fue posible Guardar la huella! error => " . $e;
			$datos['resultOper'] = 2;
		}

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: END ::");

		return $datos;
	}
	function obtenerChats($conexMySql, $idUser)
	{
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();
		
		try 
		{
			/*$cSql="SELECT id, mensaje, usuario_emis, usuario_recep, fechaalta FROM  chats WHERE usuario_emis = $idUser AND usuario_recep =  $idUser ;";
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$datosChats   = array();
				$datosChats['id'] = $Resultado['id'];
				$datosChats['mensaje'] = $Resultado['mensaje'];           
				$datosChats['usuario_emis'] = $Resultado['usuario_emis'];      
				$datosChats['usuario_recep'] = $Resultado['usuario_recep'];     
				$datosChats['fechaalta'] = $Resultado['fechaalta'];     
				

				//obteniendo imagen
				$sqlGetImage="SELECT imagen FROM  usuario_imagen WHERE idusuario = " . $Usuario->getId() . " LIMIT 1;";
				foreach ($conexMySql->query($sqlGetImage) as $resImage) 
				{
					$datosChats['foto'] = $resImage['imagen'];
				}

				$datos['infoResponse'] = $datosChats;
			}*/
			$datos['mensaje'] = "Informacion obtenida con exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}
		
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Fin");

		return $datos;		
	}
	function clientConsultEstServSOAP($p_tipoServicio,$p_folio,$p_nss,$p_curp,$p_origenConsumo)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: inicia consumo");

		$datos = array();
		$datos['resultOper'] = "";
		$datos['descOper'] = "";
		$datos['response'] = "";

		$client = null;	
		//URL de webservice	
		$soapUrl ='http://10.44.172.69:8185/cxf/wsconsultaestatusservicio?wsdl';


		if ($p_tipoServicio != "" && $p_folio != "" && ($p_nss != "" || $p_curp != "")) {
			# code...
		
			$param = array('tipoServicio' => $p_tipoServicio,
						   'folioServicio' => $p_folio,
						   'curp' => $p_curp,
						   'nss' => $p_nss);

			$xml_post_string = '<?xml version="1.0" encoding="utf-8"?>
                            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://wwww.aforecoppel.com.mx/Consultas/ConsultaEstatusServicio/consultarEstatusServicio/">
							   <soapenv:Header/>
							   <soapenv:Body>
							      <con:consultarEstatusRequest>
							         <cuerpo>
							            <tipoServicio>'. $p_tipoServicio .'</tipoServicio>
							            <folioServicio>'. $p_folio .'</folioServicio>
							            <!--Optional:-->
							            <curp>'. $p_curp .'</curp>
							            <!--Optional:-->
							            <nss>'. $p_nss .'</nss>
						            	<origen>'. $p_origenConsumo .'</origen>
							         </cuerpo>
							      </con:consultarEstatusRequest>
							   </soapenv:Body>
							</soapenv:Envelope>';   // data from the form, e.g. some ID number

           $headers = array(
                        "Content-type: text/xml;charset=\"utf-8\"",
                        "Accept: text/xml",
                        "Cache-Control: no-cache",
                        "Pragma: no-cache",
                        "SOAPAction: ", 
                        "Content-length: ".strlen($xml_post_string),
                    ); //SOAPAction: your op URL

			$ch = curl_init();
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
            curl_setopt($ch, CURLOPT_URL, $soapUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_post_string); // the SOAP request
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $response = curl_exec($ch); 
            curl_close($ch);
          
 			$removSuperior = str_replace('<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns2:consultarEstatusServicioRespuesta xmlns:ns2="http://wwww.aforecoppel.com.mx/Consultas/ConsultaEstatusServicio/consultarEstatusServicio/">','',$response);
            $removInferior = str_replace('</ns2:consultarEstatusServicioRespuesta></soap:Body></soap:Envelope>','',$removSuperior);

            $objetoRespuesta = simplexml_load_string($removInferior);
			
			$datos['resultOper'] = 1;
			$datos['response'] = $objetoRespuesta;
			$datos['descOper'] = "EXITO";
		}
		else
		{
			$datos['resultOper'] = 2;
			$datos['descOper'] = "Campos Obligatorios Faltantes";
		}

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Finaliza Consumo");

		return $datos;
	}

	function getProductos($conexMySql)
	{
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");

		$cSql = "SELECT id,producto,descripcion,precio,stock,caducidad,imagen FROM productos";
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: $cSql");

		try 
		{
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$productos = new Productos;
				$productos->setId($Resultado['id']);
				$productos->setProducto($Resultado['producto']);
				$productos->setDescripcion($Resultado['descripcion']);
				$productos->setPrecio($Resultado['precio']);
				$productos->setStock($Resultado['stock']);
				$productos->setCaducidad($Resultado['caducidad']);
				$productos->setImagen($Resultado['imagen']);
				
				array_push($datos['infoResponse'], $productos);
			}
			$datos['mensaje']    = "Informacion obtenida con exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: END getProductos(conexMySql); ::");

		return $datos;
	}
	function crearNotificacion($conexMySql,$Usuario,$descripcion,$imagenNotif, $idusuario_recep)
	{
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");

		$sql = "INSERT INTO notificaciones (asunto, descripcion, visto, estado, idusuario_recep,imagen) VALUES('" . $Usuario . "','" . $descripcion . "',0,1,". $idusuario_recep .",'". $imagenNotif ."');";
		$conexMySql->query($sql);
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: sql ==" . $sql);

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: END ::");
	}
	function getNotificaciones($conexMySql, $idUsuarioSesion)
	{
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();
		 
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");

		set_time_limit(0);//establece el numero de segundos que se permite la ejecucion de un script

		date_default_timezone_set("America/Mazatlan");
		$time         = time();
		$fechaHoy     = date("Y-m-d", $time);
		$horaHoy      = date("H", $time);
		$minutoHoy    = date("i", $time);
		$segundoHoy   = date("s", $time);		

		$cSql = "SELECT id,asunto,descripcion,imagen, cast(fecha AS time) AS hora, cast(fecha AS date) AS fechaRegistro, visto,fecha FROM notificaciones WHERE estado = 1 AND idusuario_recep = " . $idUsuarioSesion . " ORDER BY fecha DESC";
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: $cSql");

		try 
		{
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$notificacion = array();
				$notificacion['id'] = $Resultado['id'];
				$notificacion['asunto'] = $Resultado['asunto'];
				$notificacion['descripcion'] = $Resultado['descripcion'];
				$notificacion['imagen'] = $Resultado['imagen'];
				$notificacion['hora'] = $Resultado['hora'];
				$notificacion['fechaRegistro'] = $Resultado['fechaRegistro'];
				$notificacion['horaHoy'] = $horaHoy;
				$notificacion['minutoHoy'] = $minutoHoy;
				$notificacion['segundoHoy'] = $segundoHoy;
				$notificacion['fechaHoy'] = $fechaHoy;
				$notificacion['visto'] = $Resultado['visto'];
				
				array_push($datos['infoResponse'], $notificacion);
			}
			$datos['mensaje']    = "Informacion obtenida con exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: FIN");

		return $datos;
	}

	function verNotificacion($conexMySql,$idNotificacion,$fechaalta)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		$cSql="UPDATE notificaciones set visto = 1, fecha = '" . $fechaalta . "' WHERE id = ". $idNotificacion .";";
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Sql= " . $cSql);
		if ($idNotificacion != 0) 
		{
			try 
			{
				$conexMySql->query($cSql);
				$datos['mensaje'] = "Notificacion marcada como vista!";
				$datos['resultOper'] = 1;
			} 
			catch (Exception $e) 
			{
				$datos['mensaje']    = $e;
				$datos['resultOper'] = -1;
			}
		}
		else
		{
			$datos['mensaje'] = "notificacion no encontrada!";
			$datos['resultOper'] = 2;
		}
		

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;		
	} 
	function notificacionDisabled($conexMySql,$idNotificacion)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		$cSql="UPDATE notificaciones set estado = 0  WHERE id = ". $idNotificacion .";";
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Sql= " . $cSql);
		if ($idNotificacion != 0) 
		{
			try 
			{
				$conexMySql->query($cSql);
				$datos['mensaje'] = "Notificacion disabled!";
				$datos['resultOper'] = 1;
			} 
			catch (Exception $e) 
			{
				$datos['mensaje']    = $e;
				$datos['resultOper'] = -1;
			}
		}
		else
		{
			$datos['mensaje'] = "notificacion no encontrada!";
			$datos['resultOper'] = 2;
		}
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;		
	}
	function eliminarImagen($ruta)
	{
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		if ($ruta != "") 
		{
			if (CGenerales::validaExistImagen($ruta)) // elimina el archivo solo si existe
			{
				try 
				{
					
					if (unlink("../../".$ruta)) {
						$datos['mensaje'] = "Imagen Eliminada!";
						$datos['resultOper'] = 1;
					}
					else
					{
						$datos['mensaje'] = "No es posible eliminar la imagen!";
						$datos['resultOper'] = 2;
					}
				} 
				catch (Exception $e) 
				{
					$datos['mensaje']    = $e;
					$datos['resultOper'] = -1;
				}
			}
			else
			{
				$datos['mensaje'] = "Imagen no encontrada!";
				$datos['resultOper'] = 3;
			}
		}
		else
		{
			$datos['mensaje'] = "Datos vacios!";
			$datos['resultOper'] = 4;
		}
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;	
	}
	function validaExistImagen($rutaImagen)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia Buscando Archivo=" . $rutaImagen);
		$result = false;
		
		$arrayRuta=explode('/',$rutaImagen);
		$tamañoArray =count($arrayRuta);
		$nombreArchivo = $arrayRuta[$tamañoArray-1];

		if ($nombreArchivo != "" && $nombreArchivo != null) 
		{ // valida que en la ruta se especifique el nombre del archivo
			if (file_exists("../../".$rutaImagen)) 
			{
				$result = true;
			}
			else
			{
				//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: imagen no encontrada en el servidor");
			}
		}
		else
		{
			//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Ruta Archivo no valida");
		}


		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin result = " . $result);
		return $result; 
	}
	function actualizarFotoUsuario($conexMySql,$idUsuario,$rutaImagen)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		$cSql="UPDATE usuario_imagen set imagen = '". $rutaImagen ."'  WHERE idusuario = ". $idUsuario .";";
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Sql= " . $cSql);
		
			try 
			{
				$conexMySql->query($cSql);
				$datos['mensaje'] = "imagen Actualizada!";
				$datos['resultOper'] = 1;
				//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: imagen Actualizada!");

				CGenerales::moverDeTemporalAlServidor("../../resources/temp/" . $idUsuario . "/" .$rutaImagen, "../../resources/img/usuarios/".$rutaImagen);//Moviendo imagen a carpeta de tiempo indefinida
			} 
			catch (Exception $e) 
			{
				$datos['mensaje']    = $e;
				$datos['resultOper'] = -1;
			}
		

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;		
	} 
	function moverDeTemporalAlServidor($rutaArchivoOrigen,$rutaDestinoArchivo)
	{
		$result = false;
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");

		//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: origen = " . $rutaArchivoOrigen);
		//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: destino = " . $rutaDestinoArchivo);

		if(rename($rutaArchivoOrigen, $rutaDestinoArchivo))
		{
			$result = true;
		}
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin resultado = " . $result);

		return $result;
	}
	function eliminarTempUsuario($idUsuario)
	{
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;

		$carpeta = "../../resources/temp/".$idUsuario;
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		if (is_dir($carpeta)) 
		{
			$elimTemporal = CGenerales::eliminarCarpetaYContenido($carpeta);
			if ($elimTemporal['resultOper'] == true) 
			{
				$datos['resultOper'] = 1;
				$datos['mensaje']    = "Carpeta Temporal Eliminada";
			}
			else
			{
				$datos['resultOper'] = 2;
				$datos['mensaje']    = "No fue posible eliminar la carpeta temporal";
			}
		}
		else
		{
			$datos['mensaje'] = "No existe la carpeta => " . $carpeta;
			//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: No existe la carpeta => " . $carpeta);
		}
		
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin resultado = " . json_encode($datos));
		return $datos;
	}
	function eliminarCarpetaYContenido($carpeta)// elimina carpeta y contenido dentro de una ruta
    {
    	$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = false;
    	try 
		{
			foreach(glob($carpeta . "/*") as $archivos_carpeta)
			{             
				if (is_dir($archivos_carpeta))
				{
					CGenerales::eliminarCarpetaYContenido($archivos_carpeta);
				} 
				else 
				{
					unlink($archivos_carpeta);
				}
			}
	     	rmdir($carpeta);
			$datos['mensaje']    = "Carpeta y contenido eliminado con Exito!";
			$datos['resultOper'] = true;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = false;
		}

    	 return $datos;
     }
     function subirArchivoAlServidor($archivo,$idUsuario)
     {
     	$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = false;

     	$allowed = array('png', 'jpg', 'gif','zip');
     	if(isset($archivo) && $archivo['error'] == 0)
     	{
				$extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
				if(!in_array(strtolower($extension), $allowed))
				{
					$datos['resultOper'] = -1;
					$datos['mensaje'] = "ocurrio un problema al subir la imagen";
					//CLog::escribirLog("[CGenerales::CASE 10][".__LINE__."]:: No se Guardo La Imagen");
				}

				$renameImagen = $idUsuario."_".$archivo['name'];

				//se crea carpeta temporal del usuario
				$carpeta = '../../resources/temp/'.$idUsuario."/";
				if (!file_exists($carpeta)) 
				{
				    mkdir($carpeta, 0777, true);
				}
				CGenerales::eliminarImagen("resources/temp/".$idUsuario."/".$renameImagen); //elimino la imagen si ya existe

				if(move_uploaded_file($_FILES['upl']['tmp_name'], $carpeta.$renameImagen))
				{
				//if(move_uploaded_file($_FILES['upl']['tmp_name'], "../../resources/img/usuarios/".$renameImagen)){
					//CLog::escribirLog("[CGenerales::CASE 10][".__LINE__."]:: Imagen Guardada -> " . $renameImagen);
					$datos['resultOper'] = 1;
					$datos['mensaje'] = "archivo Subido con exito";
				}
			}
			return $datos;
    }

    function getEtiquetasCalendar($conexMySql)
	{
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();
		 
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");

		$cSql = "SELECT id, titulo, descripcion, text_color, bg_color, inicio, fin, id_usuario_emisor, id_usuario_receptor, fechaalta FROM calendario;";
		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: $cSql");
		try 
		{
			foreach ($conexMySql->query($cSql) as $Resultado) 
			{
				$etiqueta                        = array();
				$etiqueta['id']                  = $Resultado['id'];
				$etiqueta['title']               = $Resultado['titulo'];
				$etiqueta['descripcion']         = $Resultado['descripcion'];
				$etiqueta['textColor']           = $Resultado['text_color'];
				$etiqueta['color']               = $Resultado['bg_color'];
				$etiqueta['start']               = $Resultado['inicio'];
				$etiqueta['end']                 = $Resultado['fin'];
				$etiqueta['id_usuario_emisor']   = $Resultado['id_usuario_emisor'];
				$etiqueta['id_usuario_receptor'] = $Resultado['id_usuario_receptor'];
				$etiqueta['fechaalta']           = $Resultado['fechaalta'];
				
				array_push($datos['infoResponse'], $etiqueta);
			}
			$datos['mensaje']    = "Informacion obtenida con exito!";
			$datos['resultOper'] = 1;
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
		}

		CLog::escribirLog(":: CGenerales.".__METHOD__."[".__LINE__."]:: END ::");

		return $datos;
	}
	function guardarEtiqueta($conexMySql,$pObjEtiqueta)
	{
		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Inicia");
		$datos                 = array();
		$datos['mensaje']      = null;
		$datos['resultOper']   = 0;
		$datos['infoResponse'] = array();

		$cSql="INSERT INTO calendario(titulo, text_color, bg_color, inicio, fin, id_usuario_emisor, id_usuario_receptor,descripcion) VALUES ('" . $pObjEtiqueta->getTitulo() . "','" . $pObjEtiqueta->getText_color() . "','" . $pObjEtiqueta->getBg_color() . "','" . $pObjEtiqueta->getInicio() . "','" . $pObjEtiqueta->getFin() . "'," . $pObjEtiqueta->getId_usuario_emisor() . "," . $pObjEtiqueta->getId_usuario_receptor() . ",'" . $pObjEtiqueta->getDescripcion() . "');";

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Sql= " . $cSql);
		try 
		{
			
			$conexMySql->query($cSql);

			CGenerales::crearNotificacion($conexMySql,'General System','Nuevo evento en calendario','sistema/LogoMinGS.png',$pObjEtiqueta->getId_usuario_receptor());

			$datos['mensaje'] = "Evento Guardado Con Exito!";
			$datos['resultOper'] = 1;
			//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Evento Guardado Con Exito!");
		} 
		catch (Exception $e) 
		{
			$datos['mensaje']    = $e;
			$datos['resultOper'] = -1;
			//CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: error= " . $e);
		}
		

		CLog::escribirLog("::CGenerales.".__METHOD__."[".__LINE__."]:: Fin");
		return $datos;		
	}

}
 ?>