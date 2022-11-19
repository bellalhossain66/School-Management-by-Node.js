const domain = window.location.origin

function payment_list() {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-package-payment',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                let html = ''
                for (let i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td><img src="/img/payment/' + data.data[i].title + '.png" width="30"> ' + data.data[i].title + '</td>'
                    html += '<td>' + data.data[i].account_no + '</td>'
                    html += '<td>' + data.data[i].type + '</td>'
                    if (data.data[i].active == 1) {
                        html += '<td class="text-success">Active</td>'
                    } else if (data.data[i].active == 0) {
                        html += '<td class="text-danger">Inactive</td>'
                    }
                    html += '<td>'
                    if (data.data[i].active == 0) {
                        html += '<span class="btn btn-xs btn-success active-inactive" value="1" action-id="' + data.data[i].pay_method_id + '">Active</span> '
                    } else if (data.data[i].active == 1) {
                        html += '<span class="btn btn-xs btn-danger active-inactive" value="0" action-id="' + data.data[i].pay_method_id + '">Inactive</span> '
                    }
                    html += '<span class="payment-delete text-danger" title="Delete" style="cursor: pointer;" action-id="' + data.data[i].pay_method_id + '"><i class="fas fa-trash"></i></span>'
                    html += '</td>'
                    html += '</tr>'
                }
                $('#payment_list').html(html)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'package-payment') {
    payment_list()
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
$(document).on('click', '.add-payment', function() {
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-package-payment',
        dataType: 'json',
        data: {
            title: $('.title').val(),
            type: $('.type').val(),
            account: $('.account').val(),
            status: $('.status').val()
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                payment_list()
            } else if (data.success == 0) {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})
$(document).on('click', '.active-inactive', function() {
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/package-payment-active-inactive',
        dataType: 'json',
        data: {
            action_id: $(this).attr('action-id'),
            status: $(this).attr('value')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                payment_list()
            }
        }
    })
})
$(document).on('click', '.payment-delete', function() {
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/package-payment-delete',
        dataType: 'json',
        data: {
            action_id: $(this).attr('action-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                payment_list()
            }
        }
    })
})