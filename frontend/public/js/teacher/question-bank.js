const domain = window.location.origin

function category_list() {
    $('.category_list').html('')
    $('.sub_category_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-question-bank',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    if (i == 0) {
                        html += '<div style="cursor: pointer;" class="card bg-info category" name="' + data.data[i].title + '" action-id="' + data.data[i].question_bank_id + '"><div class="card-body">'
                    } else {
                        html += '<div style="cursor: pointer;" class="card text-dark category" name="' + data.data[i].title + '" action-id="' + data.data[i].question_bank_id + '"><div class="card-body">'
                    }
                    html += '<span style="font-size: 20px;">' + data.data[i].title + '</span>'
                    html += '<i class="text-danger float-right category-delete" action-id="' + data.data[i].question_bank_id + '" title="Delete"><i class="fas fa-trash"></i></i>'
                    html += '</div></div>'
                }
                $('.category_list').html(html)
                $('.category-id').attr('category-id', data.data[0].question_bank_id)
                sub_category_list(data.data[0].question_bank_id)
            }
        },
        statusCode: {
            404: function(err) {
                var html = ''
                html += '<div class="card subject"><div class="card-body text-center">'
                html += '<span class="text-dark" style="font-size: 20px;">No Data</span><br>'
                html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                html += '</div></div>'
                $('.category_list').html(html)
                $('.sub_category_list').html(html)
            }
        }
    })
}

function sub_category_list(categoryId) {
    $('.sub_category_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-question-bank-sub-category/' + categoryId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div style="cursor: pointer;" class="card sub-category" name="' + data.data[i].title + '" action-id="' + data.data[i].question_bank_sub_id + '"><div class="card-body">'
                    html += '<span class="text-dark" style="font-size: 20px;">' + data.data[i].title + '</span><br>'
                    html += '<span class="text-dark">Total MCQ: ' + data.data[i].total_mcq + '</span>'
                    html += '<span class="text-danger float-right sub-category-delete ml-2" title="Delete" action-id="' + data.data[i].question_bank_sub_id + '" category="' + categoryId + '"><i class="fas fa-trash"></i></span>'
                    html += '<a href="/question-bank/mcq-question/' + data.data[i].question_bank_sub_id + '"><span class="btn btn-sm btn-outline-dark float-right">MCQ Question</span></a>'
                    html += '</div></div>'
                }
                $('.sub_category_list').html(html)
            }
        },
        statusCode: {
            404: function(err) {
                var html = ''
                html += '<div class="card subject"><div class="card-body text-center">'
                html += '<span class="text-dark" style="font-size: 20px;">No Data</span><br>'
                html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                html += '</div></div>'
                $('.sub_category_list').html(html)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'question-bank') {
    category_list()
}

$('.category-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.category span')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLowerCase().includes(search)) {
            item.parentElement.style.display = 'none'
        } else {
            item.parentElement.style.display = 'block'
        }
    })
})
$('.sub-category-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.sub-category .text-dark')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLowerCase().includes(search)) {
            item.parentElement.style.display = 'none'
        } else {
            item.parentElement.style.display = 'block'
        }
    })
})
$(document).on('click', '.category', function() {
    $('.add-category-box').addClass('d-none')
    $('.add-sub-category-box').addClass('d-none')
    $('.category-id').attr('category-id', $(this).attr('action-id'))
    sub_category_list($(this).attr('action-id'))
    $('.category').addClass('text-dark')
    $('.category').removeClass('bg-info')
    $(this).removeClass('text-dark')
    $(this).addClass('bg-info')
})
$(document).on('click', '.add-category', function() {
    $('.add-category-box').removeClass('d-none')
})
$(document).on('click', '.add-sub-category', function() {
    $('.add-sub-category-box').removeClass('d-none')
})

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})

$(document).on('click', '#add-category-submit', function() {
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-question-bank',
        dataType: 'json',
        data: {
            title: $('.category-name').val()
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('.category-name').val('')
                $('.add-category-box').addClass('d-none')
                category_list()
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
$(document).on('click', '#add-sub-category-submit', function() {
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-question-bank-sub-category',
        dataType: 'json',
        data: {
            title: $('.sub-category-name').val(),
            question_bank_id: $('.category-id').attr('category-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('.sub-category-name').val('')
                $('.add-sub-category-box').addClass('d-none')
                sub_category_list($('.category-id').attr('category-id'))
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
$(document).on('click', '.sub-category-delete', function() {
    var category = $(this).attr('category')
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/question-bank-sub-category-delete',
        dataType: 'json',
        data: {
            sub_category_id: $(this).attr('action-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                sub_category_list(category)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})
$(document).on('click', '.category-delete', function() {
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/question-bank-category-delete',
        dataType: 'json',
        data: {
            category_id: $(this).attr('action-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                category_list()
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})