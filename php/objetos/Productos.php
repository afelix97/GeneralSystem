<?php 
/**
 * 
 */
class Productos
{
	public  $id;
	public  $producto;
	public  $descripcion;
	public  $precio;
	public  $stock;
	public  $caducidad;
	public  $imagen;
	
	public function getId() 
	{
		return $this->id;
	}
	public function setId($id) 
	{
		$this->id = $id;
	}
	public function getProducto() 
	{
		return $this->producto;
	}
	public function setProducto($producto) 
	{
		$this->producto = $producto;
	}
	public function getDescripcion() 
	{
		return $this->descripcion;
	}
	public function setDescripcion($descripcion) 
	{
		$this->descripcion = $descripcion;
	}
	public function getPrecio() 
	{
		return $this->precio;
	}
	public function setPrecio($precio) 
	{
		$this->precio = $precio;
	}
	public function getStock() 
	{
		return $this->stock;
	}
	public function setStock($stock) 
	{
		$this->stock = $stock;
	}
	public function getCaducidad() 
	{
		return $this->caducidad;
	} 
	public function setCaducidad($caducidad) 
	{
		$this->caducidad = $caducidad;
	}
	public function getImagen() 
	{
		return $this->imagen;
	} 
	public function setImagen($imagen) 
	{
		$this->imagen = $imagen;
	}
	public function toString() 
	{
		return "Productos [id=" . $this->id . ", producto=" . $this->producto . ", descripcion=" . $this->descripcion . ", precio=" . $this->precio . ", stock=" . $this->stock . ", caducidad=" . $this->caducidad . ", imagen=" . $this->imagen ."]";
	}
}
 ?>