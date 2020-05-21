function disableNotifyAlerta()
{
	if ($('.modal-backdrop').is(':visible')) 
	{
 		setTimeout(function(){ $("#btnModal").click(); }, 1000);
	};
}
function enableNotifyAlerta(asunto,mensaje,idAlerta)
{
	if ($('.modal-backdrop').is(':visible')) 
	{
		$('body').removeClass('modal-open'); 
		$('.modal-backdrop').remove(); 
	};
	//Arreglos Notificacion Inicio
	var tipoAlert = {
			1:'alert-primary',
			2:'alert-secondary',
			3:'alert-success',
			4:'alert-danger',
			5:'alert-warning',
			6:'alert-info',
			7:'alert-light',
			8:'alert-dark'
			};

	var tipoAnimacion = {
			1:'animated heartBeat',
			2:'animated jackInTheBox',
			3:'animated jackInTheBox',
			4:'animated shake',
			5:'animated tada',
			6:'animated bounceIn',
			7:'animated flash',
			8:'animated swing'
			};
	var tipoIcono = {
			1:'fas fa-user-shield',
			2:'fas fa-award',
			3:'fas fa-check-circle',
			4:'fas fa-skull-crossbones',
			5:'fas',
			6:'fas',
			7:'fas fa-award',
			8:'fas fa-award'
			};
	$("#modalNotifyContainer").html('<div class="modal fade '+  tipoAnimacion[idAlerta] +'" id="modalNotify" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
      '<div class="modal-dialog modal-dialog-centered modal-sm" role="document">'+
        '<div class="modal-content">'+
          '<div class="modal-header bg-primary-dark">'+
            '<h5 class="modal-title" id="h6TituloModal"><i class=" '+ tipoIcono[idAlerta] +'"></i> '+ asunto +'</h5>'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
              '<span aria-hidden="true">&times;</span>'+
            '</button>'+
          '</div>'+
          '<div class="modal-body  '+ tipoAlert[idAlerta] +' text-justify" id="mensajeNotifyBody">'+
          '<h5>' + mensaje +'</h5>'+
          '</div>'+
            '<div class="modal-footer"  id="footerModalNotify">'+
                '<button type="button" id="btnModal" class="btn btn-success mx-auto"  style="width: 25%;">   <i class="far fa-check-circle font-size-30px"></i>   </button>'+
            	'<div id="iconModalLoading" class="mx-auto text-success"></div>'+
            '</div>'+
        '</div>'+
      '</div>'+
    '</div>');
    $("#iconModalLoading").hide();

	$("#btnModal").click(function()
 	{
		$("#modalNotify").removeClass();
 		$("#modalNotify").addClass("modal fade animated zoomOut ");
 		$("#modalNotify").modal("toggle");
 	});
	$("#modalNotify").modal("show");
	setTimeout(function(){ $("#btnModal").focus(); }, 1000);
}
function enableNotifyYesOrCancel(asunto,mensaje,idAlerta)
{
	//Arreglos Notificacion Inicio
var tipoAlert = {
		1:'alert-primary',
		2:'alert-secondary',
		3:'alert-success',
		4:'alert-danger',
		5:'alert-warning',
		6:'alert-info',
		7:'alert-light',
		8:'alert-dark'
		};

var tipoAnimacion = {
		1:'animated heartBeat',
		2:'animated jackInTheBox',
		3:'animated jackInTheBox',
		4:'animated shake',
		5:'animated tada',
		6:'animated bounceIn',
		7:'animated flash',
		8:'animated swing'
		};
var tipoIcono = {
		1:'fas fa-user-shield',
		2:'fas fa-award',
		3:'fas fa-check-circle',
		4:'fas fa-skull-crossbones',
		5:'fas',
		6:'fas',
		7:'fas fa-award',
		8:'fas fa-award'
		};
	$("#modalNotifyContainer").html('<div class="modal fade '+  tipoAnimacion[idAlerta] +'" id="modalNotify" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
      '<div class="modal-dialog modal-dialog-centered modal-sm" role="document">'+
        '<div class="modal-content">'+
          '<div class="modal-header bg-primary-dark">'+
            '<h5 class="modal-title" id="h6TituloModal"><i class=" '+ tipoIcono[idAlerta] +'"></i> '+ asunto +'</h5>'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
              '<span aria-hidden="true">&times;</span>'+
            '</button>'+
          '</div>'+
          '<div class="modal-body  '+ tipoAlert[idAlerta] +' text-justify" id="mensajeNotifyBody">'+
          '<h5>' + mensaje +'</h5>'+
          '</div>'+
            '<div class="modal-footer"  id="footerModalNotify">'+
                '<button type="button" id="btnModalYesOrCancel" class="btn btn-success mx-auto"  style="width: 25%;">   <i class="far fa-check-circle font-size-30px"></i>   </button>'+
                '<button type="button" class="btn btn-danger mx-auto" data-dismiss="modal">   <i class="far fa-times-circle font-size-30px"></i>   </button>'+
            	'<div id="iconModalLoading" class="mx-auto text-success"></div>'+
            '</div>'+
        '</div>'+
      '</div>'+
    '</div>');
    $("#iconModalLoading").hide();
	$("#modalNotify").modal("show");
}
function disableNotifyYesOrCancel()
{
 	$("#modalNotify").removeClass();
	$("#modalNotify").addClass("modal fade animated zoomOut ");
	$("#modalNotify").modal("toggle");
}
function loadingNotify(asunto,mensaje){
	enableNotifyAlerta(asunto,mensaje,6);
	$("#btnModal").hide();
	$("#iconModalLoading").show();
	$("#iconModalLoading").html('<i class="fas fa-sync-alt fa-spin fa-3x" ></i>');
}
