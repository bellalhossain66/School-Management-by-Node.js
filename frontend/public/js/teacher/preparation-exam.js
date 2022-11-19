const domain = window.location.origin

function category_list() {
    $('.category_list').html('')
    $('.sub_category_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-preparation-category',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    if (i == 0) {
                        html += '<div style="cursor: pointer;" class="card bg-info category" name="' + data.data[i].title + '" action-id="' + data.data[i].preparation_exam_id + '"><div class="card-body row">'
                    } else {
                        html += '<div style="cursor: pointer;" class="card text-dark category" name="' + data.data[i].title + '" action-id="' + data.data[i].preparation_exam_id + '"><div class="card-body row">'
                    }
                    html += '<div class="col-lg-10 col-md-10 col-sm-10"><span style="font-size: 20px;" class="category-tt">' + data.data[i].title + '</span><br>'
                    html += '<span class="date-cate">' + data.data[i].start_date + ' - ' + data.data[i].end_date + '</span></div>'
                    html += '<div class="col-lg-2 col-md-2 col-sm-2"><i class="text-danger float-right category-delete" title="Delete" action-id="' + data.data[i].preparation_exam_id + '"><i class="fas fa-trash"></i></i></div>'
                    html += '</div></div>'
                }
                $('.category_list').html(html)
                $('.category-id').attr('category-id', data.data[0].preparation_exam_id)
                sub_category_list(data.data[0].preparation_exam_id)
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
        url: domain + '/api/admin/all-preparation-sub-category/' + categoryId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div style="cursor: pointer;" class="card sub-category" name="' + data.data[i].title + '" action-id="' + data.data[i].preparation_exam_sub_id + '"><div class="card-body row">'
                    html += '<div class="col-lg-8 col-md-8 col-sm-8">'
                    html += '<span class="text-dark" style="font-size: 20px;">' + data.data[i].title + '</span><br>'
                    html += '<span class="text-secondary"><span class="date-sub-cate">' + data.data[i].start_date + '</span> - <span class="ml-2">' + data.data[i].exam_time + ' minutes</span></span><br>'
                    html += '<span class="text-secondary">total MCQ: ' + data.data[i].total_mcq + '</span><br>'
                    html += '<span class="text-secondary">Cut MArk: ' + data.data[i].cut_mark + '</span>'
                    html += '</div>'
                    html += '<div  class="col-lg-4 col-md-4 col-sm-4"><span class="text-danger float-right sub-category-delete ml-2" title="Delete" action-id="' + data.data[i].preparation_exam_sub_id + '" category="' + categoryId + '"><i class="fas fa-trash"></i></span>'
                    html += '<a href="/preparation-exam/mcq-question/' + data.data[i].preparation_exam_sub_id + '"><span class="btn btn-sm btn-outline-dark float-right">MCQ Question</span></div></a>'
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
if (url == 'preparation-exam') {
    category_list()
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
$('.sub-category-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.sub-category .text-dark')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLowerCase().includes(search)) {
            item.parentElement.parentElement.parentElement.style.display = 'none'
        } else {
            item.parentElement.parentElement.parentElement.style.display = 'block'
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
    $('.sub-category-date').removeClass('btn-info')
    $('.sub-category-date').addClass('btn-outline-info')
    $('.sub-category-date:first').removeClass('btn-outline-info')
    $('.sub-category-date:first').addClass('btn-info')
})
$(document).on('click', '.add-category', function() {
    $('.add-category-box').removeClass('d-none')
})
$(document).on('click', '.add-sub-category', function() {
    $('.add-sub-category-box').removeClass('d-none')
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
$(document).on('click', '.sub-category-date', function() {
    $('.sub-category-date').removeClass('btn-info')
    $('.sub-category-date').addClass('btn-outline-info')
    $(this).removeClass('btn-outline-info')
    $(this).addClass('btn-info')
    var today = new Date()
        //today = today.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
    today = formatDate(today)
    var item = document.querySelectorAll('.sub-category .date-sub-cate')
    item.forEach((item, index) => {
        if ($(this).attr('date') == 'all') {
            item.parentElement.parentElement.parentElement.parentElement.style.display = 'block'
        } else if ($(this).attr('date') == 'running') {
            if (Date.parse(item.innerHTML) !== Date.parse(today)) {
                item.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
            } else {
                item.parentElement.parentElement.parentElement.parentElement.style.display = 'block'
            }
        } else if ($(this).attr('date') == 'upcoming') {
            if (Date.parse(item.innerHTML) > Date.parse(today)) {
                item.parentElement.parentElement.parentElement.parentElement.style.display = 'block'
            } else {
                item.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
            }
        } else if ($(this).attr('date') == 'archived') {
            if (Date.parse(item.innerHTML) < Date.parse(today)) {
                item.parentElement.parentElement.parentElement.parentElement.style.display = 'block'
            } else {
                item.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
            }
        }
    })
})
$(document).on('click', '.category-date', function() {
    $('.category-date').removeClass('btn-info')
    $('.category-date').addClass('btn-outline-info')
    $(this).removeClass('btn-outline-info')
    $(this).addClass('btn-info')
    var today = new Date()
    today = formatDate(today)
    var item = document.querySelectorAll('.category .date-cate')
    item.forEach((item, index) => {
        var date_start = item.innerHTML.split(' - ')[0]
        var date_end = item.innerHTML.split(' - ')[1]
        if ($(this).attr('date') == 'all') {
            item.parentElement.parentElement.parentElement.style.display = 'block'
        } else if ($(this).attr('date') == 'running') {
            if (Date.parse(date_start) <= Date.parse(today) && Date.parse(date_end) >= Date.parse(today)) {
                item.parentElement.parentElement.parentElement.style.display = 'block'
            } else {
                item.parentElement.parentElement.parentElement.style.display = 'none'
            }
        } else if ($(this).attr('date') == 'upcoming') {
            if (Date.parse(date_start) > Date.parse(today)) {
                item.parentElement.parentElement.parentElement.style.display = 'block'
            } else {
                item.parentElement.parentElement.parentElement.style.display = 'none'
            }
        } else if ($(this).attr('date') == 'archived') {
            if (Date.parse(date_end) < Date.parse(today)) {
                item.parentElement.parentElement.parentElement.style.display = 'block'
            } else {
                item.parentElement.parentElement.parentElement.style.display = 'none'
            }
        }
    })
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
        url: domain + '/api/admin/add-preparation-category',
        dataType: 'json',
        data: {
            title: $('.category-name').val(),
            start_date: $('.start-date').val(),
            end_date: $('.end-date').val()
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
        url: domain + '/api/admin/add-preparation-sub-category',
        dataType: 'json',
        data: {
            title: $('.sub-category-name').val(),
            preparation_exam_id: $('.category-id').attr('category-id'),
            cut_mark: $('.cut-mark').val(),
            start_date: $('.start-date-sub').val(),
            exam_time: $('.exam-time').val()
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
        url: domain + '/api/admin/preparation-sub-category-delete',
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
        url: domain + '/api/admin/preparation-category-delete',
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