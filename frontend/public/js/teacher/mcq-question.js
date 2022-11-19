const domain = window.location.origin

function subject_side() {
    $('.subject_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-subject',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div>'
                    html += '<p class="subject" subject-name="' + data.data[i].title + '" subject="' + data.data[i].sub_jective_id + '"> ' + data.data[i].title + ' <i class="float-right fas fa-angle-left"></i></p>'
                    html += '<div class="category-side-box category-side-box' + data.data[i].sub_jective_id + ' ml-3 d-none border-left">'
                    html += '</div></div>'
                    category_side(data.data[i].sub_jective_id)
                }
                $('.subject-side-box').html(html)
            }
        }
    })
}

function category_side(subjectId) {
    $('.category-side-box').html('')
    $('.sub-category-side-box').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/subject-category/' + subjectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div>'
                    html += '<p class="category" category-name="' + data.data[i].title + '" subject="' + data.data[i].subject_id + '" category="' + data.data[i].sub_category_id + '"><i class="fas fa-circle fa-xs mr-1"></i> ' + data.data[i].title + ' <i class="float-right fas fa-angle-left"></i></p>'
                    html += '<div class="sub-category-side-box sub-category-side-box' + data.data[i].sub_category_id + ' ml-3 border-left d-none">'
                    html += '</div></div>'
                    sub_category_side(data.data[i].sub_category_id)
                }
                $('.category-side-box' + subjectId).html(html)
            }
        }
    })
}

function sub_category_side(categoryId) {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/subject-sub-category/' + categoryId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="sub-category" sub-category-name="' + data.data[i].title + '" subject="' + data.data[i].subject_id + '" category="' + data.data[i].sub_category_id + '" sub-category="' + data.data[i].sub_sub_cate_id + '">'
                    html += '<p><i class="far fa-circle fa-xs mr-1"></i> ' + data.data[i].title + '</p>'
                    html += '</div>'
                }
                $('.sub-category-side-box' + categoryId).html(html)
            }
        }
    })
}

function question_list(sub_category) {
    $('.mcq_list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-mcq-question/' + sub_category,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="card"><div class="card-body">'
                    html += '<span class="text-dark q-title-v" style="font-size: 20px;">' + (i + 1) + '. ' + data.data[i].question_title + '</span>'
                    html += '<i class="float-right text-danger ml-1 mcq-q-delete" action-id="' + data.data[i].question_id + '" sub-category="' + sub_category + '" style="cursor: pointer;"><i class="fas fa-trash"></i></i>'
                    html += '<i class="float-right text-success mcq-q-edit" action-id="' + data.data[i].question_id + '" style="cursor: pointer;"><i class="fas fa-edit"></i></i> '
                    html += '<div class="q-option q-option' + data.data[i].question_id + '"></div>'
                    html += '<p class="mt-2 text-justify"><span class="text-secondary">Note:</span> ' + data.data[i].description + '</p>'
                    html += '</div></div>'
                    question_option_list(data.data[i].question_id)
                }
                $('.mcq_list').html(html)
            }
        },
        statusCode: {
            404: function(err) {
                var html = ''
                html += '<div class="card subject"><div class="card-body text-center">'
                html += '<span class="text-dark" style="font-size: 20px;">Empty MCQ Question</span><br>'
                html += '<i class="text-dark fas fa-folder-open fa-lg"></i>'
                html += '</div></div>'
                $('.mcq_list').html(html)
            }
        }
    })
}

function question_option_list(question) {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/all-mcq-question-option/' + question,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].correct == 0) {
                        html += '<div class="text-dark p-2">'
                    } else {
                        html += '<div class="text-dark p-2 boder-left" style="background: #CCDEC6;">'
                    }
                    if (i == 0) {
                        html += 'a. '
                    } else if (i == 1) {
                        html += 'b. '
                    } else if (i == 2) {
                        html += 'c. '
                    } else if (i == 3) {
                        html += 'd. '
                    } else if (i == 4) {
                        html += 'e. '
                    } else if (i == 5) {
                        html += 'f. '
                    } else {
                        html += 'g. '
                    }
                    html += '<span class="ml-1">' + data.data[i].option_title + '</span></div>'
                }
                $('.q-option' + question).html(html)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'mcq-question') {
    subject_side()
}

$(document).on('click', '.subject', function() {
    $('.subject').find('i').addClass('fa-angle-left')
    $('.subject').find('i').removeClass('fa-angle-down')
    $(this).find('i').removeClass('fa-angle-left')
    $(this).find('i').addClass('fa-angle-down')
    $('.category-side-box').addClass('d-none')
    $(this).parent().find('.category-side-box').removeClass('d-none')
    $('.subject-name').text($(this).attr('subject-name') + ' / ')
    $('.subject-name').attr('subject-id', $(this).attr('subject'))
    $('.category-name').attr('category-id', 0)
    $('.sub-category-name').attr('sub-category-id', 0)
    $('.category-name').text('')
    $('.sub-category-name').text('')
    $('.question-option-submit-box').addClass('d-none')
    $('.mcq_list').html('')
    if (($('.category-side-box' + $(this).attr('subject')).text().length) == 0) {
        $('.question-option-submit-box').removeClass('d-none')
        question_list($(this).attr('subject'))
    }
})
$(document).on('click', '.category', function() {
    $('.category').find('i:nth-child(2)').addClass('fa-angle-left')
    $('.category').find('i:nth-child(2)').removeClass('fa-angle-down')
    $(this).find('i:nth-child(2)').removeClass('fa-angle-left')
    $(this).find('i:nth-child(2)').addClass('fa-angle-down')
    $('.sub-category-side-box').addClass('d-none')
    $(this).parent().find('.sub-category-side-box').removeClass('d-none')
    $('.category-name').text($(this).attr('category-name') + ' / ')
    $('.subject-name').attr('subject-id', $(this).attr('subject'))
    $('.category-name').attr('category-id', $(this).attr('category'))
    $('.sub-category-name').attr('sub-category-id', 0)
    $('.sub-category-name').text('')
    $('.mcq_list').html('')
    $('.question-option-submit-box').addClass('d-none')
    if (($('.sub-category-side-box' + $(this).attr('category')).text().length) == 0) {
        $('.question-option-submit-box').removeClass('d-none')
        question_list($(this).attr('category'))
    }
})
$(document).on('click', '.sub-category', function() {
    $('.sub-category-name').text($(this).attr('sub-category-name') + ' / ')
    $('.subject-name').attr('subject-id', $(this).attr('subject'))
    $('.category-name').attr('category-id', $(this).attr('category'))
    $('.sub-category-name').attr('sub-category-id', $(this).attr('sub-category'))
    $('.question-option-submit-box').removeClass('d-none')
    question_list($(this).attr('sub-category'))
})
$(document).on('click', '.add-question-option', function() {
    var option = parseInt($(this).attr('option'))
    var html = '<div class="input-group mt-3">'
    html += '<div class="input-group-prepend"><span class="input-group-text bg-transparent border-0"><input type="radio" class="question-option-status" value="0"></span></div>'
    html += '<input type="text" class="form-control form-control-border question-option-title" placeholder="Option ' + (option + 1) + '">'
    html += '<div class="input-group-prepend question-option-delete"><span class=" input-group-text bg-transparent border-0">X</span></div>'
    html += '</div>'
    $('.question-box').append(html)
    $(this).attr('option', ++option)
})
$(document).on('click', '.question-option-status', function() {
    if ($(this).attr('value') == '0') {
        $(this).attr('value', '1')
        $(this).prop('checked', true)
    } else {
        $(this).attr('value', '0')
        $(this).prop('checked', false)
    }
})
$(document).on('click', '.question-option-delete', function() {
    $(this).parent().removeClass('mt-3')
    $(this).parent().addClass('d-none')
    $(this).parent().html('')
})
$(document).on('click', '.add-description', function() {
    $('.add-description-box').toggleClass('d-none')
})
$('.mcq-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.q-title-v')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLocaleLowerCase().includes(search)) {
            item.parentElement.parentElement.style.display = 'none'
        } else {
            item.parentElement.parentElement.style.display = 'block'
        }
    })
})
var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})

$(document).on('click', '.add-question-option-submit', function() {
    var subject = $('.subject-name').attr('subject-id')
    var category = $('.category-name').attr('category-id')
    var sub_category = $('.sub-category-name').attr('sub-category-id')
    var question = $('.question-title').val()
    var option = []
    $('.question-option-title').each(function() {
        var item = {
            option_title: $(this).val(),
            option_status: $(this).parent().find('.question-option-status').val()
        }
        option.push(item)
    })
    var description = $('.question-description').val()
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-mcq-question-option',
        dataType: 'json',
        data: {
            subject: subject,
            category: category,
            sub_category: sub_category,
            question: question,
            option: option,
            description: description
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('.question-title').val('')
                $('.question-description').val('')
                $('.add-description-box').addClass('d-none')
                $('.question-option-title').each(function() {
                    $(this).val('')
                    $(this).parent().find('.question-option-status').val('0')
                    $(this).parent().find('.question-option-status').prop('checked', false)
                })
                if (subject != '0' && category == 0 && sub_category == 0) {
                    question_list(subject)
                } else if (subject != '0' && category != '0' && sub_category == 0) {
                    question_list(category)
                } else {
                    question_list(sub_category)
                }
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
$(document).on('click', '.mcq-q-delete', function() {
    var sub_category = $(this).attr('sub-category')
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/mcq-question-delete',
        dataType: 'json',
        data: {
            question: $(this).attr('action-id')
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                question_list(sub_category)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})
$(document).on('click', '.mcq-q-edit', function() {
    $('.edit-question-option-submit').removeClass('d-none')
    $('.add-question-option-submit').addClass('d-none')
    $('.edit-question-option-submit').attr('action-id', $(this).attr('action-id'))
    $(this).parent().parent().parent().find('div.card').removeClass('bg-secondary')
    $(this).parent().parent().addClass('bg-secondary')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/mcq-by-question/' + $(this).attr('action-id'),
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.question-title').val(data.data.question_title)
                $('.add-description-box').removeClass('d-none')
                $('.question-description').val(data.data.description)
                $('.question-option-title').each(function() {
                    $(this).parent().removeClass('mt-3')
                    $(this).parent().addClass('d-none')
                    $(this).parent().html('')
                })
                for (var i = 0; i < data.data.option.length; i++) {
                    var html = '<div class="input-group mt-3">'
                    if (data.data.option[i].correct == 0) {
                        html += '<div class="input-group-prepend"><span class="input-group-text bg-transparent border-0"><input type="radio" class="question-option-status" value="0"></span></div>'
                    } else {
                        html += '<div class="input-group-prepend"><span class="input-group-text bg-transparent border-0"><input type="radio" class="question-option-status" value="1" checked></span></div>'
                    }
                    html += '<input type="text" class="form-control form-control-border question-option-title" value="' + data.data.option[i].option_title + '" placeholder="Option ' + (i + 1) + '">'
                    html += '<div class="input-group-prepend question-option-delete"><span class=" input-group-text bg-transparent border-0">X</span></div>'
                    html += '</div>'
                    $('.question-box').append(html)
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        }
    })
})
$(document).on('click', '.edit-question-option-submit', function() {
    var question_id = $(this).attr('action-id')
    var subject = $('.subject-name').attr('subject-id')
    var category = $('.category-name').attr('category-id')
    var sub_category = $('.sub-category-name').attr('sub-category-id')
    var question = $('.question-title').val()
    var option = []
    $('.question-option-title').each(function() {
        var item = {
            option_title: $(this).val(),
            option_status: $(this).parent().find('.question-option-status').val()
        }
        option.push(item)
    })
    var description = $('.question-description').val()
    $.ajax({
        method: 'POST',
        url: domain + '/api/admin/add-mcq-question-option',
        dataType: 'json',
        data: {
            subject: subject,
            category: category,
            sub_category: sub_category,
            question: question,
            option: option,
            description: description
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                $('.edit-question-option-submit').addClass('d-none')
                $('.add-question-option-submit').removeClass('d-none')
                $('.question-title').val('')
                $('.question-description').val('')
                $('.add-description-box').addClass('d-none')
                $('.question-option-title').each(function() {
                    $(this).val('')
                    $(this).parent().find('.question-option-status').val('0')
                    $(this).parent().find('.question-option-status').prop('checked', false)
                })
                $(this).attr('action-id', '')
                $.ajax({
                    method: 'DELETE',
                    url: domain + '/api/admin/mcq-question-delete',
                    dataType: 'json',
                    data: {
                        question: question_id
                    },
                    success: function(dataa) {
                        if (subject != '0' && category == 0 && sub_category == 0) {
                            question_list(subject)
                        } else if (subject != '0' && category != '0' && sub_category == 0) {
                            question_list(category)
                        } else {
                            question_list(sub_category)
                        }
                    }
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