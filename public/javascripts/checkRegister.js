$(document).ready(function() {

    /* Check if passwords match */
    $('input[name=repeat_pass]').keyup(function () {

        if ($('input[name=pass]').val() == $(this).val()) {
            $(this)[0].setCustomValidity('');

        } 

        else {
            $(this)[0].setCustomValidity('Las contraseñas deben coincidir');
        }
    });

    /* Let's check if user and email are available */
    $.$.ajax({
        url: '/path/to/file',
        type: 'default GET (Other values: POST)',
        dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {param1: 'value1'},
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    

})