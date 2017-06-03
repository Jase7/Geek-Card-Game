$('li').off('click').on('click', function() {

	let pressedButton = $(this).text().replace(/ /g, '');

	$('.textContainer').html($('.' + pressedButton.toLowerCase()).html());

});
