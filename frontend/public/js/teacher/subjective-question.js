const domain = window.location.origin

function page_url(sub_category) {
    $.ajax({
        method: 'GET',
        url: domain + '/api/admin/subjective-question-by-name/' + sub_category,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.name1').html(data.data.name1)
                if (data.data.name2 != undefined) {
                    $('.name2').html(data.data.name2)
                } else {
                    $('.name2').addClass('d-none')
                }
                if (data.data.name3 != undefined) {
                    $('.name3').html(data.data.name3)
                } else {
                    $('.name3').addClass('d-none')
                }
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
                    html += '<div class="col-lg-4 col-md-6 col-sm-12"><div class="card"><div class="card-body">'
                    html += '<span class="text-dark q-title-v" style="font-size: 20px;">' + (i + 1) + '. ' + data.data[i].question_title + '</span>'
                    html += '<i class="float-right text-danger mcq-q-delete" action-id="' + data.data[i].question_id + '" sub-category="' + sub_category + '" style="cursor: pointer;"><i class="fas fa-trash"></i></i>'
                    html += '<div class="q-option q-option' + data.data[i].question_id + '"></div>'
                    html += '<p class="mt-2 text-justify"><span class="text-secondary">Note:</span> ' + data.data[i].description + '</p>'
                    html += '</div></div></div>'
                    question_option_list(data.data[i].question_id)
                }
                $('.mcq_list').html(html)
                $('.total-mcq').text(data.data.length)
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
                $('.total-mcq').text('0')
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
if (window.location.href.includes("subjective") == true) {
    var url = window.location.href.split('mcq-question/')[1]
    question_list(url.substring(0, url.length - 1))
    page_url(url.substring(0, url.length - 1))
}

$('.view-mcq-search').keyup(function() {
    var search = $(this).val().toLowerCase()
    var item = document.querySelectorAll('.q-title-v')
    item.forEach((item, index) => {
        if (!item.innerHTML.toLocaleLowerCase().includes(search)) {
            item.parentElement.parentElement.parentElement.style.display = 'none'
        } else {
            item.parentElement.parentElement.parentElement.style.display = 'block'
        }
    })
})

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
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