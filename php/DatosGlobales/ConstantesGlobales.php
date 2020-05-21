<?php
$xml = simplexml_load_file("../../configuraciones/config.xml");

//datos Postgresql BEGIN
$pg_ip=$xml->conexionPostsgres->pg_ip;
$pg_bd=$xml->conexionPostsgres->pg_bd;
$pg_user=$xml->conexionPostsgres->pg_user;
$pg_pass=$xml->conexionPostsgres->pg_pass;
//datos Postgresql END
////datos MySql BEGIN

$mysql_ip=$xml->conexionMysql->mysql_ip;
$mysql_port=$xml->conexionMysql->mysql_port;
$mysql_user=$xml->conexionMysql->mysql_user;
$mysql_pass=$xml->conexionMysql->mysql_pass;
//datos MySql END

define("RUTA_DESTINO", "c://");

//datos MySql BEGIN
define("POSTGRES_IP", $pg_ip);
define("POSTGRES_PORT", $pg_ip);
define("POSTGRES_USER", $pg_user);
define("POSTGRES_PASS", $pg_pass);
//datos MySql END
//
////datos MySql BEGIN
define("MYSQL_IP", $mysql_ip);
define("MYSQL_PORT", $mysql_port);
define("MYSQL_USER", $mysql_user);
define("MYSQL_PASS", $mysql_pass);
//datos MySql END
//Ruta destino fotos usuarios BEGIN
define("RUTA_DESTINO_FOTO_USU", "resources/img/usuarios/");
//Ruta destino fotos usuarios END
?>
