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
    $('input[name=user]').keyup(function(event) {

        if ($(this).val().length >= 4) {

            $.ajax({
            url: '/checkUser',
            type: 'POST',
            data: $('form').serialize(),
            })
            .done(function(data) {

                if(data === 'valid') {
                    $('.isUserValid').html('<i class="icon-valid" aria-hidden="true"></i>');
                }

                else if(data === 'invalid') {
                    $('.isUserValid').html('<i class="icon-invalid" aria-hidden="true"></i>');
                }
                
            })
            .fail(function(err) {
                console.log(err);
            });

        }

        
        
    });    
})