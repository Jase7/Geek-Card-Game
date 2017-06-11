$(document).ready(function() {

	$($('.wisdomMenu ul li')[1]).trigger('click');
});

$('li').off('click').on('click', function() {

	let pressedButton = $(this).text().replace(/ /g, '');

	$('.textContainer').html($('.' + pressedButton.toLowerCase()).html());

});
