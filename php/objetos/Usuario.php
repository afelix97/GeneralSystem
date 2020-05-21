<?php 
/**
 * 
 */
class Usuario
{
	public  $id = 0;
	public  $nombre  = "";
	public  $apellido = "";
	public  $email = "";
	public  $password = "";
	public  $foto = "";
	public  $id_tipo_usuario = 0;
	
	public function getId() 
	{
		return $this->id;
	}
	public function setId($id) 
	{
		$this->id = $id;
	}
	public function getNombre() 
	{
		return $this->nombre;
	}
	public function setNombre($nombre) 
	{
		$this->nombre = $nombre;
	}
	public function getApellido() 
	{
		return $this->apellido;
	}
	public function setApellido($apellido) 
	{
		$this->apellido = $apellido;
	}
	public function getEmail() 
	{
		return $this->email;
	}
	public function setEmail($email) 
	{
		$this->email = $email;
	}
	public function getPassword() 
	{
		return $this->password;
	}
	public function setPassword($password) 
	{
		$this->password = $password;
	}
	public function getFoto() 
	{
		return $this->foto;
	}
	public function setFoto($foto) 
	{
		$this->foto = $foto;
	}
	public function getId_tipo_usuario() 
	{
		return $this->id_tipo_usuario;
	}
	public function setId_tipo_usuario($id_tipo_usuario) 
	{
		$this->id_tipo_usuario = $id_tipo_usuario;
	}
	public function toString() 
	{
		return "Usuario [id=" . $this->id . ", nombre=" . $this->nombre . ", apellido=" . $this->apellido. ", email=" . $this->email . ", password=" . $this->password . ", foto=" . $this->foto . ", id_tipo_usuario=" . $this->id_tipo_usuario . "]";
	}
}
 ?>