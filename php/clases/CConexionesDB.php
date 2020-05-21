<?php 
include_once("../DatosGlobales/ConstantesGlobales.php");
class CConexionesDB
{	
	function cnxMySql($db)
	{
		$conexMySql=null;
		try 
		{
			if ((MYSQL_IP 	  != null && MYSQL_IP   != "") &&
				(MYSQL_PORT   != null && MYSQL_PORT != "") &&
				($db     	  != null && $db   	 	!= "") &&
				(MYSQL_USER   != null && MYSQL_USER != "")) 
			{
				$conexMySql =  new PDO("mysql:host=".MYSQL_IP.";port=".MYSQL_PORT.";dbname=".$db, MYSQL_USER, MYSQL_PASS!=null&&MYSQL_PASS!=""?MYSQL_PASS:"");
			}
			else
			{
				$conexMySql =  null;
				var_dump("Datos Incompletos MYSQL PDO("."MYSQL_IP:".MYSQL_IP.
						 ",MYSQL_PORT:". MYSQL_PORT.", MYSQL_BD:".$db.
						 ", MYSQL_USER:" .MYSQL_USER.",MYSQL_PASS:".MYSQL_PASS.");");
			}
		} 
		catch (Exception $e) 
		{
		    var_dump('Excepción en conexion MySql new PDO();: ',  $e->getMessage(), "\n");
		}

		return $conexMySql;		
	}
	function cnxPostgreSql($db)
	{
		$conexPosgres=null;
		try 
		{
			if ((POSTGRES_IP 	 != null && POSTGRES_IP   != "") &&
				(POSTGRES_PORT   != null && POSTGRES_PORT != "") &&
				($db     		 != null && $db   		  != "") &&
				(POSTGRES_USER   != null && POSTGRES_USER != "")) 
			{
				$conexPosgres =  new PDO("pgsql:host=".POSTGRES_IP.";port=".POSTGRES_PORT.";dbname=".$db, POSTGRES_USER, POSTGRES_PASS);
			}
			else
			{
				$conexPosgres =  null;
				var_dump("Datos Incompletos POSTGRES PDO("."POSTGRES_IP:".POSTGRES_IP.
						 ",POSTGRES_PORT:". POSTGRES_PORT.", POSTGRES_BD:".$db.
						 ", POSTGRES_USER:" .POSTGRES_USER.",POSTGRES_PASS:".POSTGRES_PASS.");");
			}
		} 
		catch (Exception $e) 
		{
		    var_dump('Excepción en conexion PostgreSql new PDO();: ',  $e->getMessage(), "\n");
		}

		return $conexPosgres;		
	}
}
 ?>