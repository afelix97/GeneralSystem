<nav class="navbar navbar-expand-sm  navbar-light bg-color-nav-top">
  <a class="navbar-brand imgTxtLogo">
    <img src="resources/img/sistema/LogoGS.png" width="auto" height="35" class="d-inline-block align-top margin-left-20px" alt="">
    <b>General System</b>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ContenedorMenuModulos" aria-controls="ContenedorMenuModulos" aria-expanded="false" aria-label="Toggle navigation" id="btnNavTop">
		<i id="" class="fas fa-sort-amount-down-alt"></i>
  </button> 
  <div class="collapse navbar-collapse" id="ContenedorMenuModulos">
	<ul class="navbar-nav mr-auto ml-4">
		<button class="btn btnFullScreen text-secondary font-size-22px ">
			<i class="fas fa-expand"></i>
		</button>
	</ul>
	<div id="menuNotifPopUp" class="navbar-nav margin-right-20px margin-left-10px"></div>
	<div class="navbar-nav text-secondary margin-left-15px margin-right-10px d-none d-sm-none d-md-block">
		<b class="font-size-20px">|</b>
	</div>
    <ul class="navbar-nav">
	    <button type="button" class="nav-item btn btn-light btn-sm bg-color-nav-top" id="btnCarCompra">
	    	<img src="resources/img/sistema/CarritoCompra/Shopping-cart.png" width="40" height="auto" class="d-inline-block align-top" alt="">
		  <span class="badge badge-dark" id="CountCarComp"></span>
		</button>
		<div class=" btn-group dropleft mx-auto" role="group">
			<button type="button" class="btn btn-light bg-color-nav-top border-0 btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false"> 
				<span class="sr-only"></span>
				<i class="fas fa-user-cog font-size-20px"></i>
			</button>
		    <div class="dropdown-menu ">
			    <a class="dropdown-item"><i class="far fa-id-card"></i> Perfil</a>
			    <button class="dropdown-item" id="btnAdminUsers"><i class="fas fa-users-cog"></i> Admin. Usuarios</button>
			    <a class="dropdown-item"><i class="fas fa-cog fa-spin"></i> Configuracion</a>
		    	<div class="dropdown-divider"></div>
				<button class="btn btn-outline-danger btn-block" id="btnCerrarSesion"><b><i class="fas fa-times"></i> Cerrar Sesion</b></button>
		    </div>
		</div>
	</ul>
  </div>
</nav>
