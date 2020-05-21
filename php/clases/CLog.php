<?php
/// Contiene metodos para crear y manejar el archivo log del Menu AFORE
class CLog
{
	/*Funcion que devuelve la fecha actual de servidor*/
	public static function getfechaactualddmmaaaaLog()
	{
		date_default_timezone_set('America/Mazatlan');
		setlocale(LC_TIME, 'spanish');
		return strftime("%d-%m-%Y");
	}

	/**
	* devuelve la ruta y el nombre del Log del programa
	* @return string $sArchivo
	*/
	public static function obtenerNombreLog()
	{
		#region Variables de uso local
		$sArchivo = "";
		$sFecha = CLog::getfechaactualddmmaaaaLog();
		// Obtener la ruta del archivo y nombre base
		$sArchivo = "../../Log/GeneralSystem-".$sFecha.".txt";//Produccion
		//Obtiene la longitud de la ruta del archivo.
		$longitud =strlen($sArchivo);
		//Devuelve parte de la cadena   C:\sys\offline\logPruebas
		$sArchivo = substr($sArchivo, 0,$longitud - 4);
		return $sArchivo; // Valor de retorno
	}

	/**
	* guarda el log en un ruta definida en el metodo obtenerNombreLog con el mensaje del parametro
	 @param string $mensaje
	*/
	public static function escribirLog($mensaje)
	{
		$ip = $_SERVER['REMOTE_ADDR'];
		$rutaLog =  CLog::obtenerNombreLog(). ".log"; 
		$cad = date("Y-m-d|H:i:s|-") . getmypid() . "|" . $ip . "| " . " ::NombrePagina:: " . $mensaje;
		$filelog = fopen($rutaLog, "a");
		if( $filelog )
		{
			fwrite($filelog, $cad.PHP_EOL);
		}
		fclose($filelog);
	}
}		
?>