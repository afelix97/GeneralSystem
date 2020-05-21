<div class="animated zoomIn">
  <div class="row">
    <div class="col-md-12 card border-focus ">   
      <h2 class="text-center text-dark mt-2 mb-3">
        <b>Ubicación</b>
      </h2>
    </div>
  </div>
  <div class="accordion border-focus mt-4" id="AcordeonTipoBusqueda">
    <div class="card">
      <div class="card-header" id="OpcionUno">
        <h2 class="mb-0">
          <button class="btn btn-light btn-block collapsed text-left text-primary" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Agregar Por iframe(Google Maps)
          </button>
        </h2>
      </div>
      <div id="collapseOne" class="collapse" aria-labelledby="OpcionUno" data-parent="#AcordeonTipoBusqueda">
        <div class="card-body">
          <div class="row">
              <div class="col-1"></div>
              <button id="btnBuscarUbicIframe" class="btn btn-outline-primary">
                <i class="fas fa-search"></i>
              </button>
              <input type="text" class="form-control col-9" id="txtUbicacion" placeholder="Introduce tu Ubicacion.">
              <div>
                <span id="btnInfBuscIframe" class="btn btn-light font-weight-bold font-size-22px text-center text-info rounded-circle">
                  <i class="fas fa-info-circle"></i>
                </span>
              </div>
          </div>
          <div class="row">
            <div class="col-12">
              <iframe id="frameGoogleMaps" src="" frameborder="0"  allowfullscreen=""></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="OpcionDos">
        <h2 class="mb-0">
          <button class="btn btn-light btn-block collapsed text-left text-primary" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Agregar Por Direccion (Google Maps).
          </button>
        </h2>
      </div>
      <div id="collapseTwo" class="collapse" aria-labelledby="OpcionDos" data-parent="#AcordeonTipoBusqueda">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text text-info" for="slctEstUbicDest">Estado*</label>
                </div>
                <select class="custom-select" id="slctEstUbicDest" name="slctEstUbicDest"></select>
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text text-info" for="slctMuniUbicDest">Municipio*</label>
                </div>
                <select class="custom-select" id="slctMuniUbicDest" name="slctMuniUbicDest"></select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1"></div>
            <button id="btnBuscarUbicDirec" class="btn btn-outline-primary">
              <i class="fas fa-search"></i>
            </button>
              <input type="text" class="form-control col-9" id="txtUbicacionDestino" placeholder="Introduce Tu Direccion." >
            <div>
              <span id="btnInfBuscDirec" class="btn btn-light font-weight-bold font-size-26px text-center text-info rounded-circle">
                <i class="fas fa-info-circle"></i>
              </span>
            </div>
          </div>
          <br>
          <div class="row" id="containbtnVerRuta"></div>
        </div>
      </div>
    </div>
  </div>
</div>

