const domain = window.location.origin
$(function() {
    $("#example1").DataTable({
        "responsive": true,
        "autoWidth": false,
        "stateSave": true
    })
})

function view_profile() {
    var userId = $('.userid').text()
    $.ajax({
        method: 'GET',
        url: domain + '/api/teacher/profile/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.full-name').text(data.data.first_name + ' ' + data.data.last_name)
                $('.userid').text(data.data.userId)
                $('.email').text(data.data.email)
                if (data.data.action == 0) {
                    $('.ban').html('<span class="text-success">Verified</span>')
                } else {
                    $('.ban').html('<span class="text-danger">Ban</span>')
                }
            }
        }
    })
}

function view_profile_update() {
    var userId = $('.userid').val()
    $.ajax({
        method: 'GET',
        url: domain + '/api/teacher/profile/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.first-name').val(data.data.first_name)
                $('.last-name').val(data.data.last_name)
                $('.email').val(data.data.email)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'profilee') {
    view_profile()
}
if (url == 'profile-updatee') {
    view_profile_update()
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})

$(document).on('click', '#profile-update', function() {
    var first_name = $('.first-name').val()
    var last_name = $('.last-name').val()
    var userId = $('.userid').val()
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/teacher/profile-update',
        dataType: 'json',
        data: {
            first_name: first_name,
            last_name: last_name,
            userId: userId
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                view_profile_update()
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        },
        error: function(err) {
            Toast.fire({
                icon: 'error',
                title: err.status + ' ' + err.statusText
            })
        },
        statusCode: {
            500: function() {
                Toast.fire({
                    icon: 'error',
                    title: '<span class="text-danger">Database connection error!</span>'
                })
            }
        }
    })

})
$(document).on('click', '#password-update', function() {
    var password = $('.new-password').val()
    var con_password = $('.re-password').val()
    var old_password = $('.old-password').val()
    var userId = $('.userid').val()
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/teacher/password-update',
        dataType: 'json',
        data: {
            password: password,
            con_password: con_password,
            old_password: old_password,
            userId: userId
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        },
        error: function(err) {
            Toast.fire({
                icon: 'success',
                title: err.status + ' ' + err.statusText
            })
        },
        statusCode: {
            500: function() {
                Toast.fire({
                    icon: 'error',
                    title: '<span class="text-danger">Database connection error!</span>'
                })
            },
            404: function() {
                Toast.fire({
                    icon: 'error',
                    title: '<span class="text-danger">Data Not Found!</span>'
                })
            }
        }
    })

})