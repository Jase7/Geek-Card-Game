$(document).ready(function() {

	//Cargamos el primer elemento para no dejar el div vacío
	$($('.wisdomMenu ul li')[0]).trigger('click');
});

//Cuando pinchemos en un elemento del menú cargamos su contenido
$('li').off('click').on('click', function() {

	let pressedButton = $(this).text().replace(/ /g, '');

	$('.textContainer').html($('.' + pressedButton.toLowerCase()).html());

});
