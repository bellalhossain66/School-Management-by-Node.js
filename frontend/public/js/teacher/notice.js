const domain = window.location.origin
$(function() {
    $('.notice').summernote({
        height: 200
    })
})

function notice() {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/notice-board',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html(data.data.notice)
            }
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'notice-board') {
    notice()
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
$(document).on('click', '.notice-board', function() {
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/add-notice-board',
        dataType: 'json',
        data: {
            notice: $('.notice').val()
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
            }
        }
    })
})