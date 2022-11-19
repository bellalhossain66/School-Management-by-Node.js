const domain = window.location.origin

function subject_list() {
    $('.subject_list').html('')
    $('.category_list').html('')
    $('.sub_category_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-subject',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    if (i == 0) {
                        html += '<div style="cursor: pointer;" class="card bg-info subject '
                        if (data.data[i].status == 'mcq') {
                            html += 'its-mcq'
                        }
                        html += '" name="' + data.data[i].title + '" action-id="' + data.data[i].sub_jective_id + '"><div class="card-body">'
                    } else {
                        html += '<div style="cursor: pointer;" class="card text-dark subject '
                        if (data.data[i].status == 'mcq') {
                            html += 'its-mcq'
                        }
                        html += '" name="' + data.data[i].title + '" action-id="' + data.data[i].sub_jective_id + '"><div class="card-body">'
                    }
                    html += '<span style="font-size: 20px;">' + data.data[i].title + '</span>'
                    if (data.data[i].status == 'mcq') {
                        html += '<br><span class="text-dark">total mcq: ' + data.data[i].total_mcq + '</span>'
                    }
                    html += '<i class="text-danger float-right subject-delete ml-2" action-id="' + data.data[i].sub_jective_id + '" title="Delete"><i class="fas fa-trash"></i></i>'
                    if (data.data[i].status == 'mcq') {
                        html += '<a href="/subjective/mcq-question/' + data.data[i].sub_jective_id + '" target="_blank"><span class="btn btn-xs btn-outline-dark float-right">MCQ Question</span></a>'
                    }
                    html += '</div></div>'
                }
                $('.subject_list').html(html)
                $('.subject-id').attr('subject-id', data.data[0].sub_jective_id)
                if (data.data[0].status == 'option') {
                    category_list(data.data[0].sub_jective_id)
                } else {
                    var html = ''
                    html += '<div class="card subject"><div class="card-body text-center">'
                    html += '<span class="text-dark" style="font-size: 20px;">MCQ found here.</span><br>'
                    html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                    html += '</div></div>'
                    $('.category_list').html(html)
                    $('.sub_category_list').html(html)
                    $('.add-category').addClass('d-none')
                    $('.add-sub-category').addClass('d-none')
                }
            }
        },
        statusCode: {
            404: function(err) {
                var html = ''
                html += '<div class="card subject"><div class="card-body text-center">'
                html += '<span class="text-dark" style="font-size: 20px;">No Data</span><br>'
                html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                html += '</div></div>'
                $('.subject_list').html(html)
            }
        }
    })
}

function category_list(subjectId) {
    $('.category_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/subject-category/' + subjectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    if (i == 0) {
                        html += '<div style="cursor: pointer;" class="card bg-info category '
                        if (data.data[i].status == 'mcq') {
                            html += 'its-mcq'
                        }
                        html += '" name="' + data.data[i].title + '" action-id="' + data.data[i].sub_category_id + '"><div class="card-body">'
                    } else {
                        html += '<div style="cursor: pointer;" class="card text-dark category '
                        if (data.data[i].status == 'mcq') {
                            html += 'its-mcq'
                        }
                        html += '" name="' + data.data[i].title + '" action-id="' + data.data[i].sub_category_id + '"><div class="card-body">'
                    }
                    html += '<span style="font-size: 20px;">' + data.data[i].title + '</span>'
                    if (data.data[i].status == 'mcq') {
                        html += '<br><span class="text-dark">total mcq: ' + data.data[i].total_mcq + '</span>'
                    }
                    html += '<i class="text-danger float-right subject-category-delete ml-2" title="Delete" action-id="' + data.data[i].sub_category_id + '" subject="' + subjectId + '"><i class="fas fa-trash"></i></i>'
                    if (data.data[i].status == 'mcq') {
                        html += '<a href="/subjective/mcq-question/' + data.data[i].sub_category_id + '" target="_blank"><span class="btn btn-xs btn-outline-dark float-right">MCQ Question</span></a>'
                    }
                    html += '</div></div>'
                }
                $('.category_list').html(html)
                $('.category-id').attr('category-id', data.data[0].sub_category_id)
                if (data.data[0].status == 'option') {
                    sub_category_list(data.data[0].sub_category_id)
                } else {
                    var html = ''
                    html += '<div class="card subject"><div class="card-body text-center">'
                    html += '<span class="text-dark" style="font-size: 20px;">MCQ found here.</span><br>'
                    html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                    html += '</div></div>'
                    $('.sub_category_list').html(html)
                    $('.add-sub-category').addClass('d-none')
                }
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
    $('.add-sub-category').removeClass('d-none')
    $('.sub_category_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/subject-sub-category/' + categoryId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div style="cursor: pointer;" class="card sub-category" name="' + data.data[i].title + '" action-id="' + data.data[i].sub_sub_cate_id + '"><div class="card-body">'
                    html += '<span class="text-dark" style="font-size: 20px;">' + data.data[i].title + '</span><br>'
                    html += '<span class="text-dark">total mcq: ' + data.data[i].total_mcq + '</span>'
                    html += '<i class="text-danger float-right ml-2 subject-sub-category-delete" title="Delete" action-id="' + data.data[i].sub_sub_cate_id + '" category="' + categoryId + '"><i class="fas fa-trash"></i></i>'
                    html += '<a href="/subjective/mcq-question/' + data.data[i].sub_sub_cate_id + '" target="_blank"><span class="btn btn-xs btn-outline-dark float-right">MCQ Question</span></a>'
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
if (url == 'subjective') {
    subject_list()
}

$('.subject-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.subject span')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLowerCase().includes(search)) {
            item.parentElement.style.display = 'none'
        } else {
            item.parentElement.style.display = 'block'
        }
    })
})
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
    var item = document.querySelectorAll('.sub-category span')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLowerCase().includes(search)) {
            item.parentElement.style.display = 'none'
        } else {
            item.parentElement.style.display = 'block'
        }
    })
})

function mcq_check_option() {
    var html = ''
    html += '<div class="card subject"><div class="card-body text-center">'
    html += '<span class="text-dark" style="font-size: 20px;">MCQ found here.</span><br>'
    html += '<i class="text-dark fas fa-question fa-lg"></i>'
    html += '</div></div>'
    $('.category_list').html(html)
    $('.sub_category_list').html(html)
    $('.add-category').addClass('d-none')
    $('.add-sub-category').addClass('d-none')
}

function mcq_check_option_two() {
    var html = ''
    html += '<div class="card subject"><div class="card-body text-center">'
    html += '<span class="text-dark" style="font-size: 20px;">MCQ found here.</span><br>'
    html += '<i class="text-dark fas fa-question fa-lg"></i>'
    html += '</div></div>'
    $('.sub_category_list').html(html)
    $('.add-sub-category').addClass('d-none')
}
$(document).on('click', '.subject', function() {
    $('.add-subject-box').addClass('d-none')
    $('.add-category-box').addClass('d-none')
    $('.add-sub-category-box').addClass('d-none')
    $('.subject-id').attr('subject-id', $(this).attr('action-id'))
    if ($(this).hasClass('its-mcq')) {
        mcq_check_option()
    } else {
        $('.add-category').removeClass('d-none')
        category_list($(this).attr('action-id'))
    }
    $('.subject').addClass('text-dark')
    $('.subject').removeClass('bg-info')
    $(this).removeClass('text-dark')
    $(this).addClass('bg-info')
})
$(document).on('click', '.category', function() {
    $('.add-category-box').addClass('d-none')
    $('.add-sub-category-box').addClass('d-none')
    $('.category-id').attr('category-id', $(this).attr('action-id'))
    if ($(this).hasClass('its-mcq')) {
        mcq_check_option_two()
    } else {
        $('.add-sub-category').removeClass('d-none')
        sub_category_list($(this).attr('action-id'))
    }
    $('.category').addClass('text-dark')
    $('.category').removeClass('bg-info')
    $(this).removeClass('text-dark')
    $(this).addClass('bg-info')
})
$(document).on('click', '.add-subject', function() {
    $('.add-subject-box').removeClass('d-none')
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
$(document).on('click', '#add-subject-submit', function() {
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-subject',
        dataType: 'json',
        data: {
            title: $('.subject-name').val()
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('.subject-name').val('')
                $('.add-subject-box').addClass('d-none')
                subject_list()
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
$(document).on('click', '#add-category-submit', function() {
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-subject-category',
        dataType: 'json',
        data: {
            title: $('.category-name').val(),
            subject_id: $('.subject-id').attr('subject-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('.category-name').val('')
                $('.add-category-box').addClass('d-none')
                category_list($('.subject-id').attr('subject-id'))
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
        url: domain + '/api/admin/add-subject-sub-category',
        dataType: 'json',
        data: {
            title: $('.sub-category-name').val(),
            subject_id: $('.subject-id').attr('subject-id'),
            category_id: $('.category-id').attr('category-id')
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
$(document).on('click', '.subject-sub-category-delete', function() {
    var category = $(this).attr('category')
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/subject-sub-category-delete',
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
$(document).on('click', '.subject-category-delete', function() {
    var category = $(this).attr('subject')
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/subject-category-delete',
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
                category_list(category)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})
$(document).on('click', '.subject-delete', function() {
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/subject-delete',
        dataType: 'json',
        data: {
            subject_id: $(this).attr('action-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                subject_list()
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})