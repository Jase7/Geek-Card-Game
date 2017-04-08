$(document).ready(function() {

	renderPartial('Noticias');	
	
	$('.options a').on('click', function() {
		renderPartial($(this).text())
	})
})

function renderPartial(value) {

	var json = {
		'render': value
	}

	$.ajax({
		method: 'POST',
		url: '/api/render',
		data: json
	}).done(function(data) {

		$('title').html(value)
		$('.container').html(data)

		$('.new').on('click', function() {
			renderNew($(this).text())
		})

	}).fail(function(err) {
		console.log(err)
		console.log("failed")
	})
}

function renderNew(value) {

	var json = {
		'new': value
	}

	console.log(value)

	$.ajax({
		method: 'POST',
		url: '/api/render',
		data: json
	}).done(function(data) {

		$('title').html(value)
		$('.container').html(data)
		console.log("Succcess")

	}).fail(function(err) {
		console.log(err)
		console.log("failed")
	})
}