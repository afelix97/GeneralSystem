<?php 
/**
 * 
 */
class Etiqueta
{
	public $id;
	public $titulo;
	public $descripcion;
	public $text_color;
	public $bg_color;
	public $inicio;
	public $fin;
	public $id_usuario_emisor;
	public $id_usuario_receptor;
	public $fechaalta;
	
	public function getId() 
	{
		return $this->id;
	}
	public function setId($id) 
	{
		$this->id = $id;
	}
	public function getTitulo() 
	{
		return $this->titulo;
	}
	public function setTitulo($titulo) 
	{
		$this->titulo = $titulo;
	}
	public function getDescripcion() 
	{
		return $this->descripcion;
	}
	public function setDescripcion($descripcion) 
	{
		$this->descripcion = $descripcion;
	}
	public function getText_color() 
	{
		return $this->text_color;
	}
	public function setText_color($text_color) 
	{
		$this->text_color = $text_color;
	}
	public function getBg_color() 
	{
		return $this->bg_color;
	}
	public function setBg_color($bg_color) 
	{
		$this->bg_color = $bg_color;
	}
	public function getInicio() 
	{
		return $this->inicio;
	}
	public function setInicio($inicio) 
	{
		$this->inicio = $inicio;
	}
	public function getFin() 
	{
		return $this->fin;
	}
	public function setFin($fin) 
	{
		$this->fin = $fin;
	}
	public function getId_usuario_emisor() 
	{
		return $this->id_usuario_emisor;
	}
	public function setId_usuario_emisor($id_usuario_emisor) 
	{
		$this->id_usuario_emisor = $id_usuario_emisor;
	}
	public function getId_usuario_receptor() 
	{
		return $this->id_usuario_receptor;
	}
	public function setId_usuario_receptor($id_usuario_receptor) 
	{
		$this->id_usuario_receptor = $id_usuario_receptor;
	}
	public function getFechaalta() 
	{
		return $this->fechaalta;
	}
	public function setFechaalta($fechaalta) 
	{
		$this->fechaalta = $fechaalta;
	}
	public function toString() 
	{
		return "Etiqueta [id=" . $this->id . ", titulo=" . $this->titulo . ", descripcion=" . $this->descripcion. ", text_color=" . $this->text_color . ", bg_color=" . $this->bg_color . ", inicio=" . $this->inicio . ", fin=" . $this->fin . ", id_usuario_emisor=" . $this->id_usuario_emisor . ", id_usuario_receptor=" . $this->id_usuario_receptor . ", fechaalta=" . $this->fechaalta . "]";
	}
}
 ?>