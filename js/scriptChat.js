$(document).ready(function()
{
	$('#action_menu_btn').click(function()
	{
		$('.action_menu').toggle('fast');
	});

	$('#action_menu_btn').focusout(function(event) 
	{
		if ($('.action_menu').css('display') == 'block') 
		{
			$('#action_menu_btn').click();
		}
	});
	
});


