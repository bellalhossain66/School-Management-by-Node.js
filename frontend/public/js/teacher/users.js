const domain = window.location.origin
$(function() {
    $("#expample").DataTable({
        "responsive": true,
        "autoWidth": false,
        "stateSave": true
    })
})

function user_list() {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/users',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                let html = ''
                for (let i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].name + '</td>'
                    html += '<td>' + data.data[i].userId + '</td>'
                    html += '<td>' + data.data[i].email + '</td>'
                    html += '<td>' + data.data[i].phone + '</td>'
                    if (data.data[i].active == 1) {
                        html += '<td class="text-success">Active</td>'
                    } else if (data.data[i].active == 0) {
                        html += '<td class="text-danger">Inactive</td>'
                    }
                    html += '<td>'
                    if (data.data[i].active == 1) {
                        html += '<span class="btn btn-xs btn-danger active-inactive" active="0" userId="' + data.data[i].userId + '">Inactive</span> '
                    } else {
                        html += '<span class="btn btn-xs btn-success active-inactive" active="1" userId="' + data.data[i].userId + '">Active</span> '
                    }
                    html += '<span class="btn btn-xs btn-outline-dark user-delete" title="Delete" userId="' + data.data[i].userId + '"><i class="text-danger fas fa-trash"></i></span>'
                    html += '</td>'
                    html += '</tr>'
                }
                $('#user_list').html(html)
                $('.total-user').text(data.data.length)
            }
        }
    })
}

function user_deleted_list() {
    $('#user_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/users-deleted',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                let html = ''
                for (let i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].name + '</td>'
                    html += '<td>' + data.data[i].userId + '</td>'
                    html += '<td>' + data.data[i].email + '</td>'
                    html += '<td>' + data.data[i].phone + '</td>'
                    if (data.data[i].active == 1) {
                        html += '<td class="text-success">Active</td>'
                    } else if (data.data[i].active == 0) {
                        html += '<td class="text-danger">Inactive</td>'
                    }
                    html += '<td>'
                    html += '<span class="btn btn-sm btn-outline-dark user-delete-per text-danger" userId="' + data.data[i].userId + '">Delete Forever</span> '
                    html += '<span class="btn btn-sm btn-outline-dark user-restore text-success" userId="' + data.data[i].userId + '">Restore</span>'
                    html += '</td>'
                    html += '</tr>'
                }
                $('#user_list').html(html)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'users') {
    user_list()
} else if (url == 'user-deleted') {
    user_deleted_list()
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
$(document).on('click', '.active-inactive', function() {
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/user-active-inactive',
        dataType: 'json',
        data: {
            userId: $(this).attr('userId'),
            status: $(this).attr('active')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                user_list()
            }
        }
    })
})
$(document).on('click', '.user-delete', function() {
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/user-delete',
        dataType: 'json',
        data: {
            userId: $(this).attr('userId')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                user_list()
            }
        }
    })
})
$(document).on('click', '.user-delete-per', function() {
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/user-delete-forever',
        dataType: 'json',
        data: {
            userId: $(this).attr('userId')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                user_deleted_list()
            }
        }
    })
})
$(document).on('click', '.user-restore', function() {
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/user-restore',
        dataType: 'json',
        data: {
            userId: $(this).attr('userId')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                user_deleted_list()
            }
        }
    })
})