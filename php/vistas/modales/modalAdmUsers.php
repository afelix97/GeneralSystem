<!-- Modal -->
<div class="modal fade animated zoomIn" id="modalAdmUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div id="TamModal" class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white" id="TitleModalAdmUser"><b>Crear Usuario</b></h5>
        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formAdmUsers" method="post" enctype="multipart/form-data">
          <div id="" class="row margin-top-10px  justify-content-end">
              <div class="col-12">
                  <small id="lblNombre" class="form-text font-size-16px ">Nombre</small>
                  <input type="text" class="form-control"  id="txtNombreAdmUser" placeholder="" >
              </div>
              <div id="reqTxtNombreAdmUser" class="col-12 text-right">
                <small class="text-danger">Campo Requerido</small>
              </div>
          </div>
          <div id="" class="row margin-top-30px  justify-content-end">
              <div class="col-12">
                  <small id="lblApellido" class="form-text font-size-16px ">Apellido</small>
                  <input type="text" class="form-control"  id="txtApellidoAdmUser" placeholder="" >
              </div>
              <div id="reqTxtApellidoAdmUser" class="col-12 text-right">
                <small class="text-danger">Campo Requerido</small>
              </div>
          </div>
          <div id="" class="row margin-top-30px  justify-content-end">
              <div class="col-12">
                  <small id="lblMail" class="form-text font-size-16px ">E-Mail</small>
                  <input type="text" class="form-control"  id="txtMailAdmUser" placeholder="" >
              </div>
              <div id="reqTxtMailAdmUser" class="col-12 text-right">
                <small class="text-danger">Ingresa Una Direccion De Correo Valida</small>
              </div>
          </div>
          <div id="" class="row margin-top-30px  justify-content-end">
              <div class="col-12">
                  <small id="lblPassword" class="form-text font-size-16px ">Password</small>
                  <input type="password" class="form-control"  id="txtPassAdmUser" placeholder="" >
              </div>
              <div id="reqTxtPassAdmUser" class="col-12 text-right">
                <small class="text-danger">Campo Requerido</small>
              </div>
          </div>
          <div id="" class="row margin-top-30px  justify-content-end">
            <div class="col-12">
            </div>
          </div>
        </form>

        <form id="upload" method="post" action="" enctype="multipart/form-data">
                <input type="text" class="form-control"  id="txtIdAdmUser" placeholder="" >
                <input type="text" class="form-control"  id="txtIMGActual" placeholder="" >
                <div id="drop">
                  Arrastra imagen Aqui...
                  <a>Seleccionar imagen</a>
                  <input type="file" name="upl" id="cargaImagenAdmUser" multiple />
                </div>
                <ul id="ulImgGuardadas">
                  <!-- The file uploads will be shown here -->
                </ul>
        </form>
        <form id="formAddHuellaAdmUsers" method="post" enctype="multipart/form-data">
          <input type="text" class="form-control"  id="txtIdAdmUserHuella" placeholder="" >
          <div id="" class="row justify-content-center ">
            <div class="col-11">
              <h6>Seleccione la huella a registrar:</h6>
            </div>
              <div class="col-2 row-hover border">
                 <div class="custom-control custom-radio">
                    <input type="radio" id="dedo1" name="huellaDactilar" value="1" class="custom-control-input">
                    <label class="custom-control-label" for="dedo1"><img src="resources/img/huellasDactilares/huella1.png" alt="Dedo 1" height="50px" width="auto"></label>
                  </div>
              </div>
              <div class="col-2 row-hover border">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="dedo2" name="huellaDactilar" value="2" class="custom-control-input">
                    <label class="custom-control-label" for="dedo2"><img src="resources/img/huellasDactilares/huella2.png" alt="Dedo 2" height="50px" width="auto"></label>
                  </div>
              </div>
              <div class="col-2 row-hover border">
                 <div class="custom-control custom-radio">
                    <input type="radio" id="dedo3" name="huellaDactilar" value="3" class="custom-control-input">
                    <label class="custom-control-label" for="dedo3"><img src="resources/img/huellasDactilares/huella3.png" alt="Dedo 3" height="50px" width="auto"></label>
                  </div>
              </div>
              <div class="col-2 row-hover border">
                 <div class="custom-control custom-radio">
                    <input type="radio" id="dedo4" name="huellaDactilar" value="4" class="custom-control-input">
                    <label class="custom-control-label" for="dedo4"><img src="resources/img/huellasDactilares/huella4.png" alt="Dedo 4" height="50px" width="auto"></label>
                  </div>
              </div>
              <div class="col-2 row-hover border">
                 <div class="custom-control custom-radio">
                    <input type="radio" id="dedo5" name="huellaDactilar" value="5" class="custom-control-input">
                    <label class="custom-control-label" for="dedo5"><img src="resources/img/huellasDactilares/huella5.png" alt="Dedo 5" height="50px" width="auto"></label>
                  </div>
              </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" id="btnCerrarModal">Cerrar</button>
        <button type="button" class="btn btn-outline-success" id="btnGuardarUsuario">Guardar</button>
        <button type="button" class="btn btn-outline-secondary mx-auto" data-dismiss="modal" id="btnCancGuardFoto">
          <span class="fa-stack fa-1x">
            <i class="far fa-save font-size-30px fa-stack-1x"></i>
            <i class="fas fa-slash fa-stack-1x text-danger font-size-30px"></i>
          </span>
        </button>
        <button type="button" class="btn btn-outline-success mx-auto" id="btnGuardarFoto">
            <i class="far fa-save font-size-30px"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary mx-auto" data-dismiss="modal" id="btnCancGuardHuella">
          <span class="fa-stack fa-1x">
            <i class="far fa-save font-size-30px fa-stack-1x"></i>
            <i class="fas fa-slash fa-stack-1x text-danger font-size-30px"></i>
          </span>
        </button>
        <button type="button" class="btn btn-outline-success mx-auto" id="btnGuardarHuella">
            <i class="far fa-save font-size-30px"></i>
        </button>
      </div>
    </div>
  </div>
</div>

<script src="librerias/uploadFile/js/jquery.knob.js"></script>
<!-- jQuery File Upload Dependencies -->
<script src="librerias/uploadFile/js/jquery.ui.widget.js"></script>
<script src="librerias/uploadFile/js/jquery.iframe-transport.js"></script>
<script src="librerias/uploadFile/js/jquery.fileupload.js"></script>
<!-- Our main JS file -->
<script src="librerias/uploadFile/js/script.js"></script>