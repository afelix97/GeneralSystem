<!-- Modal -->
<div class="modal fade animated zoomIn" id="modalVerNotificacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white text-center" id="tituloModalNotificacion"><i class="fas fa-bell"></i></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body p-0">
        <div class="card">
          <div class="row no-gutters">
            <div class="col-md-4  text-center">
              <img id="imgModalNotificacion" src="" class="card-img verPantallaCompleta" alt="imagen Notificacion">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h6 class="card-title text-dark font-weight-bold" id="tituloNotificacion"></h6>
                <p class="card-text text-justify text-dark" id="descripcionNotificacion"></p>
                <p class="card-text"><small class="text-muted" id="dateTimeNotificacion"></small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer justify-content-center p-0">
        <button type="button" class="btn btn-primary btn-sm width-length-max"  data-dismiss="modal" id="btnModalNotificacion">
          <i class="far fa-check-circle font-size-26px"></i>
        </button>
      </div>
    </div>
  </div>
</div>