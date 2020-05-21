<div id="modalsAdmUsers"></div>
<div class="animated zoomIn " >
    <div class="row ">
        <div class="col-md-12 col-sm-12 card border-focus">
            <div class="col-md-12">
                <h2 class="text-center text-dark">
                    <b>Administracion De Usuarios</b>
                </h2>
            </div>
        </div>
    </div>
    <div class="card border-focus margin-top-20px">
        <a class="reload ml-auto mr-3 mt-2"><i class="fas fa-redo-alt"></i></a>
        <div class="row mt-2">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                <div class="row">
                    <div class="col-4 text-right justify-content-end">
                        <label class="mt-2">Mostar</label>
                    </div>
                    <div class="col-5 col-sm-6 col-md-6">
                    <select name="slctRowsTable" id="slctRowsTable" class="custom-select text-center">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="80">80</option>
                        <option value="all">Todo</option>
                    </select>
                    </div>
                    <div class="col-2 col-sm-2 col-md-2">
                        <label class="mt-2">Filas</label>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 padding-right-5por padding-left-5por mt-2">
                <div class="row justify-content-end">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-5">
                        <small id="lblBuscar" class="form-text font-size-16px ">Buscar</small>
                        <input type="text" class="form-control border border-dark"  id="filtrarUsuarios" placeholder="" >
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-end" id="btnDeletSelec">
            <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
                <button class="btn btn-sm btn-outline-danger">Eliminar Seleccionados</button>
            </div>
        </div>
        <div class="row margin-top-5px">
            <div class="col-sm-12 padding-right-5por padding-left-5por">
                <table id="tabla_de_usuarios" class="table table-responsive-md display table-striped table-bordered table-hover">
                    <thead>
                        <tr class="bg-dark text-white">
                            <th></th>
                            <th>#</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>EMAIL</th>
                            <th>PASSWORD</th>
                            <th>ACCIONES
                                <div class="btn-group">
                                  <button type="button" class="btn btn-sm btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  </button>
                                  <div class="dropdown-menu">
                                    <button class="dropdown-item btn-sm" id="btnNewAdmUser" >Crear Nuevo +</button>
                                  </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="bodyUsuarios">
                    </tbody>
                    <tfooter>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>EMAIL</th>
                            <th>PASSWORD</th>
                            <th>ACCIONES</th>
                        </tr>
                    </tfooter>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 padding-right-5por padding-left-5por">
                <nav aria-label="Page navigation example" id="paginacionUsuarios">
                 
                </nav>
            </div>
        </div>
    </div>
</div>