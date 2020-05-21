<div class="container animated zoomIn" >
    <div class="row border border-primary card border-focus">
        <div class="col-md-12 col-sm-12">
            <h2 class="font-weight-light text-primary-dark">
                Consulta de Solicitudes de Servicios
            </h2>
        </div>
        <div class="col-md-12 col-sm-12">
        <hr>
        </div>
        <div class="row">
                <div class="col-md-12 col-sm-12">
            <ul class="nav">
                <button type="button" id="btnInicio" class="nav-item btn btn-outline-light text-info text-center"><i class="fas fa-caret-left"></i> Salir</button>
                <h6 class="nav-item text-dark texto-centrado"> | </h6>
                <button type="button" id="btnMenu" class="nav-item btn btn-outline-light text-info text-center">Regresar</button>
            </ul>
                </div>
        </div>
        <div class="col-md-12 col-sm-12">
            <h5 class="font-personalizado text-primary-dark">
                <b>CONSULTA  EL  ESTATUS  DE  TU  SOLICITUD  DE SERVICIO</b>
            </h5>
        </div>
        <form class="form" id="formConsultaEstatus">
            <div class="col-md-12">
                <div class="row justify-content-center">
                    <div class="col-10 col-sm-8 col-md-7 col-lg-6">
                       <p id="tipoServicio" class="font-weight-light font-size-20px text-primary-dark"><b>Tipo Servicio</b></p>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div id="divColInfoInputs" class="col-10 col-sm-8 col-md-7 col-lg-6">
                        <small id="lblinfoInputs" class="form-text text-muted">Por favor ingresa el Folio de tu solicitud de servicio, y tu (NSS) Número de Seguridad Social o tu CURP (Clave Única de Registro de Población)</small>
                    </div>
                </div>
                <div id="divColTipoServ" class="row justify-content-center margin-top-40px">
                    <div  class="col-9 col-sm-9 col-md-7 col-lg-5">
                        <small id="lbltipoServicio" class="form-text font-size-16px ">Tipo Servicio</small>
                         <select class="custom-select border border-info" name="slctTipoServicio" id="slctTipoServicio" required="">
                             <option value=""></option>
                             <option value="a">Aclaracion</option>
                             <option value="c">Consulta</option>
                             <option value="r">Retiro</option>
                             <option value="s">Traspaso</option>
                         </select>
                    </div>
                    <div class="col-1">
                        <button type="button" id="btnInfoTipoServ" class="btn btn-light tooltip-viewport-top" data-toggle="tooltip" data-html="true" title="Seleccione Su Tipo de Servicio">
                            <i class="fas fa-info text-info "></i>
                        </button>
                    </div>
                </div>
                <div id="divColFolio" class="row justify-content-center margin-top-40px">
                    <div class="col-9 col-sm-9 col-md-7 col-lg-5">
                         <small id="lblFolio" class="form-text font-size-16px ">Folio</small>
                        <input type="text" class="form-control border border-info"  id="txtFolio" placeholder="" required="">
                    </div>
                    <div class="col-1">
                        <button type="button" id="btnInfoFolio" class="btn btn-light tooltip-viewport-top" data-toggle="tooltip" data-html="true" title="Son los 8 números de tu solicitud de servicio">
                            <i class="fas fa-info text-info "></i>
                        </button>
                    </div>
                </div>
                <div id="divColNss" class="row justify-content-center margin-top-40px">
                   <div class="col-9 col-sm-9 col-md-7 col-lg-5">
                         <small id="lblNss" class="form-text font-size-16px">NSS (Número de Seguridad Social)</small>
                        <input type="text" class="form-control border border-info"  id="txtNss" >
                    </div>
                    <div class="col-1 col-sm-1 col-md-1">
                        <button type="button" id="btnInfoNss" class="btn btn-light tooltip-viewport-top" data-toggle="tooltip" data-html="true" title="Son  los  11  números  que conforman  tu  Número  de  Seguridad  Social,  si  eres  Trabajador  afiliado  al ISSSTE o Independendiente, no es necesario ingresar este dato">
                            <i class="fas fa-info text-info "></i>
                        </button>
                    </div>
                </div>
                <div id="divColCurp" class="row justify-content-center margin-top-40px">
                   <div class="col-9 col-sm-9 col-md-7 col-lg-5">
                         <small id="lblCurp" class="texto-centrado  font-size-16px ">CURP  (Clave  Única  de  Registro  de  Población)</small>
                        <input type="text" class="form-control border border-info"  id="txtCurp">
                    </div>
                    <div class="col-1 col-sm-1 col-md-1">
                        <button type="button" id="btnInfoCurp" class="btn btn-light tooltip-viewport-top" data-toggle="tooltip" data-html="true" title="Es tu código único de de  indentidad    y  esta  conformado por  18  caracteres,  si  no  cuentas  con  el puedes consultarlo en: <a href='https://www.gob.mx/curp/' target='_black'>https://www.gob.mx/curp/</a>">
                            <i class="fas fa-info text-info "></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-5">
                        <br>
                        <button type="submit" id="btnConsultarEstatus" class="btn btn-warning text-primary-dark float-right"><b>Consultar</b></button>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="row justify-content-center">
                    <div class="col-12 text-muted margin-top-20px"><p><b>Nota:</b> Para garantizar la protección de tus datos, esta  consulta  sólo  muestra  el  estatus  de  tu  Solicitud  de  Servicio,  no  muestra  los datos peronales del solicitante </p></div>
                </div>
            </div>
        </form>
    </div>
</div>