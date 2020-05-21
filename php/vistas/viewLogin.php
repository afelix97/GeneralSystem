<div class="container">
  <div class="row">
    <div class="col-md-12"> 
            <br><br><br><br><br><br><br><br>
      <center>
        <div id="Login" class="animated zoomInLeft" style="width:280px;">
          <form id="frmLogin" class="form-signin"style="background: rgba(0,0,0,0.7); border-radius:10px;" >
              <img  class="profile-img-card animated bounceInLeft" src="resources/img/sistema/LogoGS.png" style="height: 100px;" alt="Nombre Pagina">
              <h4 class="text-light">
                <small><b>Inicia Sesion</small>
              </h4>
              <div class="form-signin">
                <div class="col-12 margin-top-30px">
                    <small id="lblUsuario" class="form-text font-size-16px ">Usuario / Usuario@Correo.com</small>
                    <input type="text" id="txtUsuario" name="txtUsuario" class="form-control" placeholder="" required  autocomplete="off">
                </div>
                <div class="col-12 margin-top-25px" id="grupoPassword">
                  <small id="lblPassword" class="form-text font-size-16px ">Password</small>
                  <input  type="password" id="txtPassword" name="txtPassword" class="form-control" placeholder="" required  autocomplete="off">
                </div> 
                <div class="col-12 margin-top-10px">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="chckbxHuella">
                    <label class="custom-control-label text-white float-left" for="chckbxHuella">Usar Huella Dactilar</label>
                  </div>        
                </div>      
              </div>
              <div class="col-12 margin-top-20px">
                <button class="btn btn-lg btn-primary btn-block" type="submit">Iniciar Sesion</button>
                <button type="button" class="btn btn-lg btn-block btn-success" id="btnVerSitio">Ver Sitio</button>
                 <center>
                  <img src="resources/img/qr_administrador.png" class="mt-3" width="75" height="75">
                </center>
                <p class=" text-muted">&copy; SCyGAAL 2019</p>
              </div>
            </form>
        </div>
      </center>
    </div>
  </div>
</div>