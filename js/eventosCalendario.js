$(document).ready(function()
{
});

function cargarCalendario()
{
	
	var date = new Date();
	var yyyy = date.getFullYear().toString();
	var mm   = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
	var dd   = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
	var calendarFull = $('#fullCalendario').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: yyyy+'-'+mm+'-'+dd,
        buttonIcons: true, // show the prev/next text
        weekNumbers: true,
        editable: true,
        eventLimit: true, // allow "more" link when too many events 
        height: 600,
        events: [
        ],
        dayClick: function (dateCalendar, jsEvent, view) 
        {
            $('#btnCancelar').show();
            $('#btnGuardar').show();
            $('#btnModalOK').hide();

            $('#formModalCalendario').show();
            $('#formModalCalendarioview').hide();
            var tiempoInicio = '07:00';
            var fechaSelect  = dateCalendar.format("YYYY/MM/DD");
            // controla si el dia del evento es la fecha actual solo seleccionara la hora a partir de la hora en la que esta
            if (fechaSelect == moment().format('YYYY/MM/DD')) 
            {
                tiempoInicio = moment().format('HH:mm');
            }

            $('#txtFechaHoraInicia').datetimepicker(
            {
                defaultDate: dateCalendar.format("YYYY/MM/DD"), // se carga con fecha del dia clic
                maxDate: dateCalendar.format("YYYY/MM/DD"),// no podra seleccionar otro dia
                minDate: dateCalendar.format("YYYY/MM/DD"),// no podra seleccionar otro diamin
                minTime: tiempoInicio,
                disabledDates : [
                    fechaSelect,// no se puede seleccionar la fecha actual ps se selecciona por defecto
                ],
            });

            resetValidacionFormCalendario();
            if ((dd + "-" + mm + "-" + yyyy) == dateCalendar.format("DD-MM-YYYY")) 
            {
                $('#TitleModalCalendario').html("<b>Creando evento</b> para hoy");
            }
            else
            {
                $('#TitleModalCalendario').html("<b>Creando Evento</b> para el " + formatoFecha(1,dateCalendar.format('DD-MM-YYYY')) );
            }

            $("#formModalCalendario")[0].reset();// vaciar formulario
            $('#modalCalendario').modal('show');
        }, 
        eventClick: function (calEvent, jsEvent, view)
        {
            var id                  = calEvent.id;
            var title               = calEvent.title;
            var descripcion         = calEvent.descripcion;
            var textColor           = calEvent.textColor;
            var color               = calEvent.color;
            var start               = calEvent.start;
            var end                 = calEvent.end;
            var id_usuario_emisor   = calEvent.id_usuario_emisor;
            var id_usuario_receptor = calEvent.id_usuario_receptor;
            var fechaalta           = calEvent.fechaalta;
           
            $('#lblDescAsunto').html(title);
            $('#lblDescAsigno').html();

            var nombreReceptor = getUsuario(id_usuario_receptor).infoResponse.nombre;
            var headEvento = `<b class="text-muted">Para: ` + nombreReceptor +`.</b>`;

            $('#headEvento').html(headEvento);
            var fechaEventIni = formatoFecha(1,moment(start._i).format("DD-MM-YYYY"));
            var fechaEventEnd = formatoFecha(1,moment(end._i).format("DD-MM-YYYY"));
            var descFechaEvento = ``;
            if (fechaEventIni == fechaEventEnd) 
            {
                descFechaEvento = fechaEventIni + `.`; 
            }
            else
            {
                descFechaEvento = fechaEventIni + ` al ` +  fechaEventEnd + `.`; 
            }

            var descHoraEvento = format24A12H(moment(start._i).format("HH"),moment(start._i).format("mm")) + 
                                  ` - ` + 
                                    format24A12H(moment(end._i).format("HH"),moment(end._i).format("mm")) +
                                  `.`; 

            $('#lblDescHoraEvento').html(descHoraEvento);
            $('#lblDescDescripcion').html(descripcion);

            var nombreEmisor = getUsuario(id_usuario_emisor).infoResponse.nombre;
            
            var footerEvento = `Asigando por ` + 
                                nombreEmisor + 
                                ` el dia ` + 
                                formatoFecha(1,moment(fechaalta).format("DD-MM-YYYY"))
                                + `.`;

            $('#footerEvento').html(footerEvento);

            $('#btnCancelar').hide();
            $('#btnGuardar').hide();
            $('#btnModalOK').show();

            $('#formModalCalendarioview').show();
            $('#formModalCalendario').hide();

            if ((dd + "-" + mm + "-" + yyyy) == moment(start._i).format("DD-MM-YYYY")) 
            {
                $('#TitleModalCalendario').html("<b>hoy</b>");
            }
            else
            {
                $('#TitleModalCalendario').html("<b>Fecha: " +descFechaEvento +"</b>");
            }

            $('#modalCalendario').modal('show');
            setTimeout(function(){ $("#btnModalOK").focus(); }, 1000);
        },  
	});     
}

function getEtiquetasCalendar()
{
    var idUsuarioSesion = getUsuarioSesion().id;

    var result = false;
    var objParam = {
                    'opcion': 15,
                    'descripcionOpc' : "obtener etiquetas Calendario"
                    };

    $.ajax({
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) 
        {
            if(response.resultOper == 1)
            {
                
                result = true;
                var datosEtiquetas = response.infoResponse != undefined ? response.infoResponse : {};

                if (datosEtiquetas.length > 0) 
                {
                    cargarEtiquetasCalend('#fullCalendario',datosEtiquetas);
                }
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
            disableEfectoLoadInSection($('.reload'));      
        },
        beforeSend: function()
        {
            efectoLoadInSection($('.reload'));
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
            setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }
    });
    return result;
}
function cargarEtiquetasCalend(idFullCalendario,arrayEtiquetas)
{
    try 
    {
        if (arrayEtiquetas.length > 0) 
        {
            $(idFullCalendario).fullCalendar('removeEvents');
            $(idFullCalendario).fullCalendar('addEventSource',arrayEtiquetas);
            return true;
        }
    }
    catch(error) 
    {
      console.error(error);
      return false;
    }
}

function dinamismoModalCalendario()
{
    animationInputLabel('#txtAsuntoCalendario','#labelAsunto','primary');
    animationInputLabel('#txtFechaHoraInicia','#lblFechaHoraInicia','primary');
    animationInputLabel('#txtFechaHoraFin','#lblFechaHoraFin','primary');
    animationInputLabel('#slctlblAsignadoCalendario','#lblAsignadoCalendario','primary');

    $('#reqTxtAsuntoCalendario').hide();
    $('#reqTxtFechaHoraInicia').hide();
    $('#reqTxtFechaHoraFin').hide();
    $('#reqSlctlblAsignadoCalendario').hide();

    implementPluginDatePiker('#txtFechaHoraInicia');
    implementPluginDatePiker('#txtFechaHoraFin');
    
    $('#colorTextEtiqueta').change(function(event) 
    {
        var textColorEtiq = $('#colorTextEtiqueta').val();
        
        $('#vistaPreviaEtiqueta').css({
            'color': textColorEtiq
        });
    });

    $('#bgEtiqueta').change(function(event) 
    {
        var bgColorEtiq = $('#bgEtiqueta').val();

        $('#vistaPreviaEtiqueta').css({
            'background-color': bgColorEtiq
        });
    });
    
    $('#btnGuardar').click(function(event) 
    {
        var datosValid = validarInputsModalCal();
        if(datosValid.result)
        {
            guardarEtiqueta(datosValid);
        }
    }); 

    cargarUserSlctModal();
}

function getUsers()
{
    var objParam = {
                    'opcion': 2,
                    'descripcionOpc' : "obtener Usuarios para Select Calendario"              
                    };

    var datosUsuarios = {
                id: "",
                nombre: "",
                apellido: "",
                email: "",
                foto: "",
                id_tipo_usuario: 0,
                password: ""
            };

    $.ajax({
        async: false,
        cache: false,
        url: 'php/router/NombrePaginaRouter.php',
        type: 'POST',
        dataType: 'JSON',
        data: objParam,
        success: function(response) {

            if(response.resultOper == 1)
            {
                datosUsuarios = response.infoResponse != undefined ? response.infoResponse : {};
            }
            else
            {
                setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
            }
        },
        beforeSend: function()
        {
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
            setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
        }

    });
    return datosUsuarios;
}

function cargarUserSlctModal()
{
    var users           = getUsers();
    var idUsuarioSesion = getUsuarioSesion().id;

    var html            = `<option value=""></option>`;

    for (var i = 0; i < users.length; i++) 
    {
       html += `<option value="` + users[i].id + `">` + users[i].nombre + ` ` + users[i].apellido + `</option>`;
    }

    $('#slctlblAsignadoCalendario').html(html);
}
function guardarEtiqueta(datosEtiqueta)
{
    var inicioSesion         = getUsuarioSesion().login;
    var idUsuarioTransaccion = getUsuarioSesion().id;
    if (inicioSesion == 'true') 
    {
        var objParam = {
                        'opcion': 16,
                        'titulo': datosEtiqueta.titulo,
                        'text_color': datosEtiqueta.text_color,
                        'bg_color': datosEtiqueta.bg_color,
                        'inicio': datosEtiqueta.inicio,
                        'fin': datosEtiqueta.fin,
                        'id_usuario_emisor': idUsuarioTransaccion,
                        'id_usuario_receptor': datosEtiqueta.id_usuario_receptor,
                        'descripcion' : datosEtiqueta.descripcion
                        };
        $.ajax({
            cache: false,
            url: 'php/router/NombrePaginaRouter.php',
            type: 'POST',
            dataType: 'JSON',
            data: objParam,
            success: function(response) {

                disableNotifyAlerta();
                $('#modalCalendario').modal('toggle');

                if(response.resultOper == 1)
                {
                    setTimeout(function(){ enableNotifyAlerta("Exito!",response.mensaje,3); }, 2000);
                    setTimeout(function(){ getEtiquetasCalendar() }, 2000);
                }
                else if(response.resultOper == 2)
                {
                    setTimeout(function(){ enableNotifyAlerta("Advertencia!",response.mensaje,5); }, 2000);
                }
                else
                {
                    setTimeout(function(){ enableNotifyAlerta("Algo Salio Mal!",response.mensaje,4); }, 2000);
                }
            },
            beforeSend: function()
            {
                loadingNotify("Cargando...","Cargando, Espere un momento por favor.");
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                setTimeout(function(){ enableNotifyAlerta("ERROR!","Error En Ajax " + xhr + " " + status + " " + error + ".",4); }, 2000);
            }

        });
    }
    else
    {
        enableNotifyAlerta("Lo sentimos!","Es necesario tener permisos para esta Accion...",5);
    }
}
function implementPluginDatePiker(idInput)
{
    var date = new Date();
    var yyyy = date.getFullYear().toString();
    var mm   = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
    var dd   = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();

    $(idInput).datetimepicker(
    {
        inline:false,
        rtl:false,
        step: 30,
        weeks:true,
        timepicker:true,
        minTime:'07:00',
        maxTime:'17:00',
        //initTime:'15:00',
        touchMovedThreshold: 5,
        todayButton:true,
        defaultSelect:false,
        minDateTime: moment.utc().format('YYYY-MM-DD'),// propio de moment js ==> moment.utc().format('YYYY-MM-DD HH:mm:ss')
        maxDateTime:false,
        disabledWeekDays: [0,6],//desactivar algunos dias
        /*allowTimes: [
           '8:00', '8:30', '9:00', '9:30', '10:00', 
           '10:30', '11:00', '11:30', '12:00', '12:30', 
           '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
        ],*/ // en caso de ocupar horario personalizados
        onSelectDate:function () 
        {
        },
        onSelectTime:function () 
        {

        },
        onChangeMonth:function () 
        {

        },
        onGetWeekOfYear:function () 
        {

        },
        onChangeYear:function () 
        {

        },
        onChangeDateTime:function () 
        {
           validFechaIniFechaFin();
        },
        onShow:function () 
        {

        },
        onClose:function () 
        {

        },
        onGenerate:function () 
        {
        },
    });
    $.datetimepicker.setLocale('es');
}
function validFechaIniFechaFin()
{
    if ($('#txtFechaHoraInicia').val() != "") 
    {
        var fechaInicio = $('#txtFechaHoraInicia').val();

        if (moment(fechaInicio) < moment()) 
        {
            $('#txtFechaHoraInicia').val(moment().format('YYYY/MM/DD HH:mm'));
        }
    }

    if ($('#txtFechaHoraInicia').val() != "" && $('#txtFechaHoraFin').val() != "") 
    {
        var fechaInicio = $('#txtFechaHoraInicia').val();
        var fechaFin    = $('#txtFechaHoraFin').val();

        if (moment(fechaFin) < moment(fechaInicio)) 
        {
            $('#txtFechaHoraFin').val(fechaInicio);
            alert("La fecha fin debe ser mayor A la fecha inicio");
        }
    }
}
function validarInputsModalCal() 
{
    var datos                    = new Array();
    datos['titulo']              = "";
    datos['inicio']              = "";
    datos['fin']                 = "";
    datos['id_usuario_receptor'] = "";
    datos['text_color']          = "";
    datos['bg_color']            = "";
    datos['descripcion']         = "";
    datos['result']              = false;

    var asuntoCalendario  = $('#txtAsuntoCalendario');
    var fechaHoraInicia   = $('#txtFechaHoraInicia');
    var fechaHoraFin      = $('#txtFechaHoraFin');
    var idUsuAsignado     = $('#slctlblAsignadoCalendario');
    var colorTextEtiqueta = $('#colorTextEtiqueta');
    var bgEtiqueta        = $('#bgEtiqueta');
    var descripcion        = $('#txtDescripEtiqueta');


    if (asuntoCalendario.val() != "") 
    {
        $('#reqTxtAsuntoCalendario').hide(500);
        asuntoCalendario.removeClass('border-danger');
        asuntoCalendario.addClass('border-success');
        if (fechaHoraInicia.val() != "") 
        {
            $('#reqTxtFechaHoraInicia').hide(500);
            fechaHoraInicia.removeClass('border-danger');
            $('#grupoFechas').removeClass('border-danger');
            $('#grupoFechas').addClass('border-success');
            fechaHoraInicia.addClass('border-success');
            if (fechaHoraFin.val() != "") 
            {
                $('#grupoFechas').removeClass('border-danger');
                $('#grupoFechas').addClass('border-success');
                
                $('#reqTxtFechaHoraFin').hide(500);
                fechaHoraFin.removeClass('border-danger');
                fechaHoraFin.addClass('border-success');
                if (idUsuAsignado.val() != "") 
                {
                    $('#reqSlctlblAsignadoCalendario').hide(500);
                    resetValidacionFormCalendario();

                    datos['titulo']              = asuntoCalendario.val();
                    datos['inicio']              = fechaHoraInicia.val();
                    datos['fin']                 = fechaHoraFin.val();
                    datos['id_usuario_receptor'] = idUsuAsignado.val();
                    datos['text_color']          = colorTextEtiqueta.val();
                    datos['bg_color']            = bgEtiqueta.val();
                    datos['descripcion']         = descripcion.val();
                    
                    datos['result']              = true;
                    
                    $("#formModalCalendario")[0].reset();// vaciar formulario
                }
                else
                {
                    $('#reqSlctlblAsignadoCalendario').show(500);
                    idUsuAsignado.addClass('border-danger');
                    idUsuAsignado.focus();
                }
            }
            else
            {
                $('#reqTxtFechaHoraFin').show(500);
                fechaHoraFin.addClass('border-danger');
                $('#grupoFechas').addClass('border-danger');
                fechaHoraFin.focus();
            }
        }
        else
        {
            $('#reqTxtFechaHoraInicia').show(500);
            fechaHoraInicia.addClass('border-danger');
            $('#grupoFechas').addClass('border-danger');
            fechaHoraInicia.focus();
        }
    }
    else
    {
        $('#reqTxtAsuntoCalendario').show(500);
        asuntoCalendario.addClass('border-danger');
        asuntoCalendario.focus();
    }


    return datos;
}
function resetValidacionFormCalendario()
{
    var asuntoCalendario = $('#txtAsuntoCalendario');
    var fechaHoraInicia  = $('#txtFechaHoraInicia');
    var fechaHoraFin     = $('#txtFechaHoraFin');
    var idUsuAsignado    = $('#slctlblAsignadoCalendario');

    asuntoCalendario.removeClass('border-success');
    asuntoCalendario.removeClass('border-danger');
    fechaHoraInicia.removeClass('border-success');
    fechaHoraInicia.removeClass('border-danger');
    fechaHoraFin.removeClass('border-success');
    fechaHoraFin.removeClass('border-danger');
    idUsuAsignado.removeClass('border-danger');
    idUsuAsignado.removeClass('border-success');

    $('#grupoFechas').removeClass('border-danger')
    $('#grupoFechas').removeClass('border-success');

    $('#reqTxtAsuntoCalendario').hide(500);
    $('#reqTxtFechaHoraInicia').hide(500);
    $('#reqTxtFechaHoraFin').hide(500);
    $('#reqSlctlblAsignadoCalendario').hide(500);

    $('#vistaPreviaEtiqueta').css({
        'color': '#fbfcfc',
        'background-color': '#3498db'
    });
}
function formatoFecha(opcion, p_fecha)
{
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio",
                           "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

    var fecha = p_fecha != undefined && 
                p_fecha != "" && 
                p_fecha != 0 && 
                (p_fecha.split('/').length == 3 || p_fecha.split('-').length == 3) ?
                p_fecha : "";

    if (fecha != "") 
    {
        switch (opcion) 
        {
          case 1://formato con nombre del mes
                if (fecha.split('/').length == 3) 
                {
                    fecha = fecha.split('/')[0] +"/"+ meses[parseInt(fecha.split('/')[1])-1] +"/"+ fecha.split('/')[2];
                }
                else if (fecha.split('-').length == 3) 
                {
                    fecha = fecha.split('-')[0] +"-"+ meses[parseInt(fecha.split('-')[1])-1] +"-"+ fecha.split('-')[2];
                }
            break;
        
          default:
                alert("fecha invalida o indefinida");
            break;
        }
    }
    else
    {
        alert("no comple con el formato de fecha de entrada valido");
    }

    return fecha;
}