<!-- Modal -->
<div class="modal fade animated zoomIn" id="modalCalendario" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div id="TamModal" class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white" id="TitleModalCalendario"></h5>
        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formModalCalendario" method="post" enctype="multipart/form-data">
          <div id="" class="row justify-content-end">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
              <div class="row">
                <div class="col-12">
                    <small id="labelAsunto" class="form-text font-size-16px ">Asunto</small>
                    <input type="text" class="form-control" id="txtAsuntoCalendario" placeholder="" >
                </div>
                <div id="reqTxtAsuntoCalendario" class="col-12 text-right">
                  <small class="text-danger">Campo Requerido</small>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4">
              <div id="" class="row">
                  <div class="col-12">
                      <small id="lblAsignadoCalendario" class="form-text font-size-16px ">Asignado A:</small>
                      <select class="custom-select " name="slctlblAsignadoCalendario" id="slctlblAsignadoCalendario" required=""></select>
                  </div>
                  <div id="reqSlctlblAsignadoCalendario" class="col-12 text-right">
                    <small class="text-danger">Campo Requerido</small>
                  </div>
              </div>
            </div>
          </div>
          
          <div id="" class="row margin-top-20px border mr-1 ml-1">
            <div class="col-6">
              <label for="color" class="form-text font-size-16px text-muted"> 
                Color Del Texto Etiqueta
                <input type="color" step="any" class="form-control" id="colorTextEtiqueta" name="colorTextEtiqueta" required=""  value="#fbfcfc">
              </label>
            </div>
            <div class="col-6">
              <label for="color" class="form-text font-size-16px text-muted"> 
                Color Fondo Etiqueta
                <input type="color" step="any" class="form-control" id="bgEtiqueta" name="bgEtiqueta" required=""  value="#3498db">
              </label>
            </div>
            <div id="" class="col-12 " id="sectionVistaPrevia">
            <hr>
              <div class="row">
                <div class="col-5 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                  <label class="form-text font-size-16px text-muted text-center"> 
                    Vista Previa: 
                  </label>
                </div>
                <div class="col-7 col-sm-8 col-md-8 col-lg-9 col-xl-10">
                  <label id="vistaPreviaEtiqueta" class="form-text font-size-16px text-center rounded"> 
                    <b>Ejemplo Etiqueta</b>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div id="grupoFechas" class="row text-center border mr-1 ml-1">
              <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-30px">
                  <small id="lblFechaHoraInicia" class="form-text font-size-16px">Fecha/Hora en que inicia</small>
                  <input type="text" class="form-control text-center input-sm" id="txtFechaHoraInicia" placeholder="" >
              </div>
              <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-30px">
                  <small id="lblFechaHoraFin" class="form-text font-size-16px text-muted">Fecha/Hora en que finaliza</small>
                  <input type="text" class="form-control text-center input-sm" id="txtFechaHoraFin" placeholder="" >
              </div>
              <div class="col-12 col-sm-12 col-md-12 margin-top-10px">
              </div>
          </div>
          <div id="" class="row text-center mr-1 ml-1">
              <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div id="reqTxtFechaHoraInicia" class="text-right">
                  <small class="text-danger">Campo Requerido</small>
                </div>
              </div>
              <div class="col-12 col-sm-12 col-md-12 margin-top-10px">
                <div id="reqTxtFechaHoraFin" class="text-right">
                  <small class="text-danger">Campo Requerido</small>
                </div>
              </div>
          </div>
          <div id="" class="row justify-content-end">
              <div class="col-12">
                  <small id="lblDescripEtiqueta" class="form-text font-size-16px text-muted">Descripcion:</small>
                  <textarea class="form-control" id="txtDescripEtiqueta" name="txtDescripEtiqueta"></textarea>
              </div>
          </div>

        </form>
        <form id="formModalCalendarioview" method="post" enctype="multipart/form-data">
          <div class="card text-center">
            <div class="card-header">
              <label id="headEvento"></label>
            </div>
            <div class="card-body">
              <h5 class="card-title">
                <h3 id="lblDescAsunto" class="font-weight-bolder text-uppercase"></h3>
              </h5>
              <hr>
              <p class="card-text">
                <p id="lblDescDescripcion" class="text-muted"></p>
              </p>
              <div class="row font-size-16px">
                <div class="col-12"> 
                  <label class="text-center">
                    <b>Horario: </b>
                  </label>
                  <label id="lblDescHoraEvento"></label>
                </div>
              </div>
            </div>
            <div class="card-footer text-muted">
              <p id="footerEvento"></p>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary mx-auto" data-dismiss="modal" id="btnCancelar">
          <span class="fa-stack fa-1x">
            <i class="far fa-save font-size-30px fa-stack-1x"></i>
            <i class="fas fa-slash fa-stack-1x text-danger font-size-30px"></i>
          </span>
        </button>
        <button type="button" class="btn btn-outline-success mx-auto" id="btnGuardar">
            <i class="far fa-save font-size-30px"></i>
        </button>
        <button type="button" data-dismiss="modal" id="btnModalOK" class="btn btn-success mx-auto">   <i class="far fa-check-circle font-size-30px"></i>   </button>
      </div>
    </div>
  </div>
</div>