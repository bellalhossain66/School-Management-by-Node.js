const domain = window.location.origin

function page_url(sub_category) {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/preparation-exam-by-name/' + sub_category,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.name1').html(data.data.name1)
                $('.name2').html(data.data.name2)
                $('.name1').attr('category-id', data.data.id1)
                $('.name2').attr('sub-category-id', sub_category)
            }
        }
    })
}

function page_mcq(question_bank_sub) {
    $('.question-bank-mcq-list').html('')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/preparation-exam-mcq/' + question_bank_sub,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="short-full-screen-mcq col-lg-12 col-md-12 col-sm-12"><div class="card"><div class="card-body">'
                    html += '<span class="text-dark pre-mcq" style="font-size: 20px;">' + (i + 1) + '. ' + data.data[i].question_title + '</span>'
                    html += '<span class="float-right text-danger delete-from-mcq-bank ml-2" action-id="' + data.data[i].preparation_exam_mcq_id + '" question_bank_sub="' + question_bank_sub + '" style="cursor: pointer;"><i class="fas fa-trash"></i></span>'
                    html += '<i class="float-right text-success mcq-q-edit" action-id="' + data.data[i].preparation_exam_mcq_id + '" style="cursor: pointer;"><i class="fas fa-edit"></i></i> '
                    html += '<div class="q-option-mcq' + data.data[i].question_id + '">'
                    for (let j = 0; j < data.data[i].options.length; j++) {
                        if (data.data[i].options[j].correct == 0) {
                            html += '<div class="text-dark p-2">'
                        } else {
                            html += '<div class="text-dark p-2 boder-left" style="background: #CCDEC6;">'
                        }
                        if (j == 0) {
                            html += 'a. '
                        } else if (j == 1) {
                            html += 'b. '
                        } else if (j == 2) {
                            html += 'c. '
                        } else if (j == 3) {
                            html += 'd. '
                        } else if (j == 4) {
                            html += 'e. '
                        } else if (j == 5) {
                            html += 'f. '
                        } else {
                            html += 'g. '
                        }
                        html += '<span class="ml-1">' + data.data[i].options[j].option_title + '</span></div>'
                    }
                    html += '</div>'
                    html += '<p class="mt-2 text-justify"><span class="text-secondary">Note:</span> ' + data.data[i].description + '</p>'
                    html += '</div></div></div>'
                }
                $('.question-bank-mcq-list').html(html)
                $('.total-mcq').text(data.data.length)
            }
        }
    })
}

var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (window.location.href.includes("mcq-question") == true) {
    var url = window.location.href.split('mcq-question/')[1]
    page_mcq(url.substring(0, url.length - 1))
    page_url(url.substring(0, url.length - 1))
}

$('.view-mcq-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.short-full-screen-mcq .pre-mcq')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLocaleLowerCase().includes(search)) {
            item.parentElement.parentElement.parentElement.style.display = 'none'
        } else {
            item.parentElement.parentElement.parentElement.style.display = 'block'
        }
    })
})
$(document).on('click', '.add-mcq-question', function() {
    $('.view-question-bank-box').removeClass('col-lg-12')
    $('.view-question-bank-box').addClass('col-lg-6')
    $('.view-mcq-search').addClass('d-none')
    $(this).addClass('d-none')
    $('.full-screen').removeClass('d-none')
    $('.add-mcq-in-box').removeClass('d-none')
})
$(document).on('click', '.full-screen', function() {
    $('.view-question-bank-box').removeClass('col-lg-6')
    $('.view-question-bank-box').addClass('col-lg-12')
    $('.view-mcq-search').removeClass('d-none')
    $('.add-mcq-question').removeClass('d-none')
    $(this).addClass('d-none')
    $('.add-mcq-in-box').addClass('d-none')
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

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})

$(document).on('click', '.add-question-option-submit', function() {
    var category = $('.name1').attr('category-id')
    var sub_category = $('.name2').attr('sub-category-id')
    var question_title = $('.question-title').val()
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
        url: domain + '/api/admin/add-preparation-exam-mcq',
        dataType: 'json',
        data: {
            preparation_exam: category,
            preparation_exam_sub: sub_category,
            question_title: question_title,
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
                page_mcq(sub_category)
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
$(document).on('click', '.delete-from-mcq-bank', function() {
    var question_bank_sub = $(this).attr('question_bank_sub')
    $.ajax({
        method: 'DELETE',
        url: domain + '/api/admin/preparation-exam-mcq-delete',
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
                page_mcq(question_bank_sub)
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
    $('.view-question-bank-box').removeClass('col-lg-12')
    $('.view-question-bank-box').addClass('col-lg-6')
    $('.view-mcq-search').addClass('d-none')
    $('.add-mcq-question').addClass('d-none')
    $('.full-screen').removeClass('d-none')
    $('.add-mcq-in-box').removeClass('d-none')
    $('.edit-question-option-submit').removeClass('d-none')
    $('.add-question-option-submit').addClass('d-none')
    $('.edit-question-option-submit').attr('action-id', $(this).attr('action-id'))
    $(this).parent().parent().parent().find('div.card').removeClass('bg-secondary')
    $(this).parent().parent().addClass('bg-secondary')
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/preparation-exam-mcq-by-question/' + $(this).attr('action-id'),
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
    var category = $('.name1').attr('category-id')
    var sub_category = $('.name2').attr('sub-category-id')
    var question_title = $('.question-title').val()
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
        url: domain + '/api/admin/add-preparation-exam-mcq',
        dataType: 'json',
        data: {
            preparation_exam: category,
            preparation_exam_sub: sub_category,
            question_title: question_title,
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
                    url: domain + '/api/admin/preparation-exam-mcq-delete',
                    dataType: 'json',
                    data: {
                        action_id: question_id
                    },
                    success: function(dataa) {
                        page_mcq(sub_category)
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