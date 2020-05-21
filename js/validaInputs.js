$(document).ready(function(){
 //eventos 
});
function validaEmail(mail)
{
	var result = false;

	 var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(mail.trim())) {
        result = true;

    }

    return result;
}