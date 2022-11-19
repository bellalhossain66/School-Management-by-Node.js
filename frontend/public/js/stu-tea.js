const domain = window.location.origin

$(document).on('click', '#login', function() {
    var email = $('.email').val()
    var password = $('.password').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: domain + '/api/teacher/login',
        dataType: 'json',
        data: {
            email: email,
            password: password
        },
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                window.location.replace('/teacher')
            } else {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('')
            $('.notice-text').html('<span class="text-danger">' + err.statusText + '</span>')
        },
        statusCode: {
            404: function() {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">Invalid email or password</span>')
            },
            500: function() {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
            }
        }
    })
})