$(".regi-type").change(function() {
    var type = "";
    $("select option:selected").each(function() {
        type = $(this).attr('value');
    });
    if (type == 'student') {
        $('.class-field').show()
        $.ajax({
            method: 'GET',
            url: 'http://localhost:5001/api/teacher/class-names',
            dataType: 'json',
            success: function(data) {
                if (data.success == 1) {
                    var html = '<select class="form-control stu-class">'
                    html += '<option disabled="disabled" selected="true">Select class</option>'
                    for (var i = 0; i < data.data.length; i++) {
                        html += '<option value="' + data.data[i].name + '">' + data.data[i].name + '</option>'
                    }
                    html += '</select>'
                    $('.class-field').html(html)
                }
            }
        })
    } else {
        $('.class-field').html('')
        $('.class-field').hide()
    }
})
$(document).on('click', '#registration', function() {
    var first_name = $('.first-name').val()
    var last_name = $('.last-name').val()
    var email = $('.email').val()
    var password = $('.password').val()
    var type = $('.regi-type').val()
    $('.notice').show()
    if (type == 'student') {
        var stu_class = $('.stu-class').val()
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5001/api/student/registration',
            dataType: 'json',
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                class: stu_class
            },
            success: function(data) {
                if (data.success == 1) {
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                } else {
                    $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
                }
            },
            error: function(err) {
                $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
            },
            statusCode: {
                500: function() {
                    $('.notice-text').html('')
                    $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
                }
            }
        })
    } else if (type == 'teacher') {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5001/api/teacher/registration',
            dataType: 'json',
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            },
            success: function(data) {
                if (data.success == 1) {
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                } else {
                    $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
                }
            },
            error: function(err) {
                $('.notice-text').html('<span class="text-danger">' + err.statusText + '</span>')
            },
            statusCode: {
                500: function() {
                    $('.notice-text').html('')
                    $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
                }
            }
        })
    } else {
        $('.notice-text').html('')
        $('.notice-text').html('<span class="text-danger">Fields are required</span>')
    }
})
$(document).on('click', '#login', function() {
    var email = $('.email').val()
    var password = $('.password').val()
    var type = $('.login-type').val()
    $('.notice').show()
    if (type == 'admin') {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5001/api/admin/login',
            dataType: 'json',
            data: {
                email: email,
                password: password
            },
            success: function(data) {
                if (data.success == 1) {
                    $('.notice-text').html('')
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                    setTimeout(function() {
                        window.location.replace('/admin')
                    }, 2000)
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
    } else if (type == 'teacher') {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5001/api/teacher/login',
            dataType: 'json',
            data: {
                email: email,
                password: password
            },
            success: function(data, status) {
                if (data.success == 1) {
                    $('.notice-text').html('')
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                    setTimeout(function() {
                        window.location.replace('/teacher')
                    }, 2000)
                } else {
                    $('.notice-text').html('')
                    $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
                }
            },
            error: function(err, status) {
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
    } else if (type == 'student') {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5001/api/student/login',
            dataType: 'json',
            data: {
                email: email,
                password: password
            },
            success: function(data) {
                if (data.success == 1) {
                    $('.notice-text').html('')
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                    setTimeout(function() {
                        window.location.replace('/student')
                    }, 2000)
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
    } else {
        $('.notice-text').html('')
        $('.notice-text').html('<span class="text-danger">Fields are required</span>')
    }
})