const domain = window.location.origin
$(function() {
    $("#example").DataTable({
        "responsive": true,
        "autoWidth": false,
        "stateSave": true
    })
})

function packages_list() {
    $('.packages_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-packages',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div style="cursor: pointer;" class="card text-dark category" name="' + data.data[i].title + '" action-id="' + data.data[i].package_id + '">'
                    html += '<div class="card-body row">'
                    html += '<div class="col-lg-6 col-md-6 col-sm-6">'
                    html += '<span style="font-size: 20px;" class="category-tt">' + data.data[i].title + '</span><br>'
                    html += '<span class="date-cate">' + data.data[i].description + '</span>'
                    html += '</div>'
                    html += '<div class="col-lg-3 col-md-3 col-sm-3">'
                    if (data.data[i].type == 'free') {
                        html += '<span style="font-size: 20px;">Free</span><br>'
                    } else {
                        html += '<span style="font-size: 20px;">' + data.data[i].price + ' ৳</span><br>'
                        html += 'Duration: <span style="font-size: 20px;">' + data.data[i].duration + ' days</span><br>'
                    }
                    if (data.data[i].status == 0) {
                        html += 'Status: <span style="font-size: 20px;" class="text-success">Active</span>'
                    } else {
                        html += 'Status: <span style="font-size: 20px;" class="text-danger">Inactive</span>'
                    }
                    html += '</div>'
                    html += '<div class="col-lg-3 col-md-3 col-sm-3">'
                    html += '<span class="btn btn-sm btn-outline-dark float-right ml-1 package-edit" data-toggle="modal" data-target="#exampleModal_update" action-id="' + data.data[i].package_id + '" title="' + data.data[i].title + '" type="' + data.data[i].type + '" price="' + data.data[i].price + '" description="' + data.data[i].description + '" status="' + data.data[i].status + '" duration="' + data.data[i].duration + '">Setup</span>'
                    html += '<a href="/user-packages/subscriber/' + data.data[i].package_id + '"><span class="btn btn-sm btn-outline-dark float-right">Subscriber</span></a>'
                    html += '</div>'
                    html += '</div></div>'
                }
                $('.packages_list').html(html)
            }
        },
        statusCode: {
            404: function(err) {
                var html = ''
                html += '<div class="card subject"><div class="card-body text-center">'
                html += '<span class="text-dark" style="font-size: 20px;">No Data</span><br>'
                html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                html += '</div></div>'
                $('.packages_list').html(html)
            }
        }
    })
}

function page_url(category) {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/package-subscriber-by-name/' + category,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.name1').html(data.data.name1)
            }
        }
    })
}

function subscriber(category) {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/package-subscriber/' + category,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                let html = ''
                for (let i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].userId + '</td>'
                    html += '<td>' + data.data[i].end_date + '</td>'
                    if (data.data[i].active == 0) {
                        html += '<td class="text-success">Active</td>'
                    } else if (data.data[i].active == 1) {
                        html += '<td class="text-danger">Inactive</td>'
                    }
                    html += '<td>'
                    if (data.data[i].active == 0) {
                        html += '<span class="btn btn-xs btn-danger active-inactive" active="1" action-id="' + data.data[i].pack_subs_id + '" category="' + category + '">Inactive</span> '
                    } else {
                        html += '<span class="btn btn-xs btn-success active-inactive" active="0" action-id="' + data.data[i].pack_subs_id + '" category="' + category + '">Active</span> '
                    }
                    html += '</td>'
                    html += '</tr>'
                }
                $('#subscriber').html(html)
                $('.total-subscriber').text(data.data.length)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'user-packages') {
    packages_list()
} else if (window.location.href.includes("subscriber") == true) {
    var url = window.location.href.split('subscriber/')[1]
    page_url(url.substring(0, url.length - 1))
    subscriber(url.substring(0, url.length - 1))
}

$('.category-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.category .category-tt')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLowerCase().includes(search)) {
            item.parentElement.parentElement.parentElement.style.display = 'none'
        } else {
            item.parentElement.parentElement.parentElement.style.display = 'block'
        }
    })
})
$(document).on('click', '.package-edit', function() {
    $('.package-id').val($(this).attr('action-id'))
    $('.package-type2').val($(this).attr('type'))
    $('.package-price2').val($(this).attr('price'))
    $('.package-description2').val($(this).attr('description'))
    $('.package-status2').val($(this).attr('status'))
    $('.package-title2').val($(this).attr('title'))
    $('.package-duration2').val($(this).attr('duration'))
})

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
$(document).on('click', '.package-update-submit', function() {
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/update-package',
        dataType: 'json',
        data: {
            package_id: $('.package-id').val(),
            title: $('.package-title2').val(),
            description: $('.package-description2').val(),
            duration: $('.package-duration2').val(),
            type: $('.package-type2').val(),
            price: $('.package-price2').val(),
            status: $('.package-status2').val()
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('#exampleModal_update').modal('hide')
                packages_list()
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
                    title: 'Database connection error!'
                })
            },
            404: function() {
                Toast.fire({
                    icon: 'error',
                    title: 'UserId invalid!'
                })
            }
        }
    })
})
$(document).on('click', '.active-inactive', function() {
    let category = $(this).attr('category')
    $.ajax({
        method: 'PATCH',
        url: domain + '/api/admin/package-subscriber-active-inactive',
        dataType: 'json',
        data: {
            action_id: $(this).attr('action-id'),
            status: $(this).attr('active')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                subscriber(category)
            }
        }
    })
})
$(document).on('click', '.package-add-submit', function() {
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-new-package',
        dataType: 'json',
        data: {
            title: $('.package-title').val(),
            description: $('.package-description').val(),
            duration: $('.package-duration').val(),
            type: $('.package-type').val(),
            price: $('.package-price').val(),
            status: $('.package-status').val()
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('#exampleModal').modal('hide')
                packages_list()
            }
        }
    })
})