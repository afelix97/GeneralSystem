<div class="animated zoomIn ">
    <div class="row ">
        <div class="col-md-12 col-sm-12 card border-focus">
            <h2 class="text-center text-dark">
                <b>Bienvenido <label id="nomUserCarCompra"></label> A Tu Carrito De Compras</b>
            </h2>
        </div>
    </div>
     <div class="row margin-top-30px card border-focus">
        <a class="reload ml-auto mr-3 mt-2"><i class="fas fa-redo-alt"></i></a>
        <div class="row justify-content-end margin-top-10px" id="btnDeletSelec">
            <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
                <button class="btn btn-sm btn-outline-danger">Eliminar Seleccionados</button>
            </div>
        </div>
        <div class="col-md-12 col-sm-12" id="bodyCarritoCompra">
            <div id="sinDatosTabla">
                <h3 class="alert alert-danger text-center"> Tu Carrito De Compras Esta Vacio </h3>
            </div>
            <table id="tabla_car_comp" class="table table-responsive-md display">
                <thead>
                    <tr class="bg-green-7 text-white">
                        <th class="width-length-9px">#</th>
                        <th class="col-10">PRODUCTOS</th>
                        <th class="text-center col-2">PRECIO</th>
                        <th class="col-1">CANTIDAD</th>
                        <th class="text-center">TOTAL</th>
                    </tr>
                </thead>
                <tbody id="bodyCarComp">
                </tbody>
                <tfooter>
                    <tr class="bg-green-7 text-white">
                        <th class="width-length-9px" style="padding-top: 0px; padding-bottom: 3px;">
                            <small><b>#</b></small>
                        </th>
                        <th class="col-10" style="padding-top: 0px; padding-bottom: 3px;">
                            <small><b>PRODUCTOS</b></small>
                        </th>
                        <th class="text-center col-2" style="padding-top: 0px; padding-bottom: 3px;">
                            <small><b>PRECIO</b></small>
                        </th>
                        <th class="col-1" style="padding-top: 0px; padding-bottom: 3px;">
                            <small><b>CANTIDAD</b></small>
                        </th>
                        <th class="text-center" style="padding-top: 0px; padding-bottom: 3px;">
                            <small><b>TOTAL</b></small>
                        </th>
                    </tr>
                    <tr class="border-bottom ">
                        <th style="padding-top: 2px; padding-bottom: 3px;"></th>
                        <th style="padding-top: 2px; padding-bottom: 3px;">
                            <button class="btn btn-danger btn-sm" id="btnElimCarCompra">
                                Vaciar Carrito <i class="fas fa-window-close"></i>
                            </button>
                        </th>
                        <th style="padding-top: 2px; padding-bottom: 3px;"></th>
                        <th class="col-2 bg-green-8 text-white text-center" style="padding-top: 2px; padding-bottom: 3px;">TOTAL A PAGAR</th>
                        <td class="text-center" style="padding-top: 2px; padding-bottom: 3px;">
                            <b id="TotalAPagar"></b>
                        </td>
                    </tr>
                </tfooter>
            </table>
            
        </div>
         <div class="col-12 text-center">
            <small class="text-muted"><b>Nota:</b> El carrito solo se guarda en el dispositivo que se creo, si se intenta acceder a el, mediante otro dispositivo el carrito estara vacio.</small>
         </div>
    </div>
</div>