function view_profile() {
    var userId = $('.userid').text()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/profile/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.full-name').text(data.data.first_name + ' ' + data.data.last_name)
                $('.userid').text(data.data.userId)
                $('.email').text(data.data.email)
                if (data.data.action == 0) {
                    $('.ban').html('<span class="text-success">Verified</span>')
                } else {
                    $('.ban').html('<span class="text-danger">Ban</span>')
                }
            }
        }
    })
}

function view_profile_update() {
    var userId = $('.userid').val()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/profile/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.first-name').val(data.data.first_name)
                $('.last-name').val(data.data.last_name)
                $('.email').val(data.data.email)
            }
        }
    })
}

function view_class() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/class-names',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = '<select class="form-control stu-class">'
                html += '<option disabled="disabled" selected="true">Select class</option>'
                for (var i = 0; i < data.data.length; i++) {
                    html += '<option value="' + data.data[i].name + '">' + data.data[i].name + '</option>'
                }
                html += '</select>'
                $('.class-field').html(html)
            }
        }
    })
}

function view_course() {
    var userId = $('.userid').text()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/course/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var j = 0
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + ++j + '</td>'
                    html += '<td>' + data.data[i].title + '</td>'
                    html += '<td>' + data.data[i].class + '</td>'
                    html += '</tr>'
                }
                $('#course-list').html(html)
            }
        }
    })
}

function view_course_title() {
    var userId = $('.userid').val()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/course/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<option value="' + data.data[i].id + '">' + data.data[i].title + ' - ' + data.data[i].class + '</option>'
                }
                $('#course-title-fetch').append(html)
            }
        }
    })
}

function only_question_option_view(questionId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/only-question-option/' + questionId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var className = '.question-option-div' + questionId
                for (var i = 0; i < data.data.length; i++) {
                    html += '<span class="ml-2">'
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
                    } else if (i == 6) {
                        html += 'g. '
                    } else if (i == 7) {
                        html += 'h. '
                    } else if (i == 8) {
                        html += 'i. '
                    } else if (i == 9) {
                        html += 'j. '
                    }
                    if (data.data[i].correct == 1) {
                        html += '<span class="text-danger"><u>' + data.data[i].sub_title + '</u></span>'
                    } else {
                        html += data.data[i].sub_title
                    }
                    html += '</span>'
                }
                $(className).html(html)
            }
        }
    })
}

function only_question_view(courseId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/only-question/' + courseId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var j = 0
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="p-3">'
                    html += '<span>' + ++j + '. </span> '
                    html += '<span>' + data.data[i].title + ' </span>'
                    html += '<span class="btn btn-xs btn-success ml-2 add-new-question-option" questionId="' + data.data[i].id + '">Add option</span>'
                    html += '<div class="ml-1 mt-3 question-option-div' + data.data[i].id + '">'
                    html += '</div>'
                    html += '</div>'
                    only_question_option_view(data.data[i].id)
                }
                $('.mcq-list').html(html)
            }
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'profilee') {
    view_profile()
}
if (url == 'profile-updatee') {
    view_profile_update()
}
if (url == 'create-course') {
    view_class()
}
if (url == 'course') {
    view_course()
}
if (url == 'create-question') {
    view_course_title()
}
$(document).on('click', '#profile-update', function() {
    var first_name = $('.first-name').val()
    var last_name = $('.last-name').val()
    var userId = $('.userid').val()
    $('.notice').show()
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/teacher/profile-update',
        dataType: 'json',
        data: {
            first_name: first_name,
            last_name: last_name,
            userId: userId
        },
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                setTimeout(function() {
                    view_profile_update()
                }, 2000)
            } else {
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        },
        statusCode: {
            500: function() {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
            }
        }
    })

})
$(document).on('click', '#password-update', function() {
    var password = $('.new-password').val()
    var con_password = $('.re-password').val()
    var old_password = $('.old-password').val()
    var userId = $('.userid').val()
    $('.notice').show()
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/teacher/password-update',
        dataType: 'json',
        data: {
            password: password,
            con_password: con_password,
            old_password: old_password,
            userId: userId
        },
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                setTimeout(function() {
                    view_profile_update()
                }, 2000)
            } else {
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        },
        statusCode: {
            500: function() {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
            },
            404: function() {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">Data Not Found!</span>')
            }
        }
    })

})
$(document).on('click', '#create-course', function() {
    var title = $('.title').val()
    var classNo = $('.stu-class').val()
    var userId = $('.userid').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/api/teacher/create-course',
        dataType: 'json',
        data: {
            title: title,
            class: classNo,
            teacherId: userId
        },
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                setTimeout(function() {
                    view_profile_update()
                }, 2000)
            } else {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('')
            $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        },
        statusCode: {
            500: function() {
                $('.notice-text').html('')
                $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
            }
        }
    })

})
$("#course-title-fetch").change(function() {
    var courseId = "";
    $("select option:selected").each(function() {
        courseId = $(this).attr('value');
    })
    only_question_view(courseId)
})
$(document).on('click', '#create-question', function() {
    var title = $('.title').val()
    var courseId = $('.courseId').val()
    var userId = $('.userid').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/api/teacher/question-create',
        dataType: 'json',
        data: {
            title: title,
            courseId: courseId,
            teacherId: userId
        },
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html(' ')
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                only_question_view(courseId)
            } else {
                $('.notice-text').html(' ')
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html(' ')
            $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        },
        statusCode: {
            500: function() {
                $('.notice-text').html(' ')
                $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
            }
        }
    })

})
$(document).on('click', '.add-new-question-option', function() {
    var questionId = $(this).attr('questionId')
    var className = '.question-option-div' + questionId
    var html = '<div class="col-4 border p-3">'
    html += '<form action="javascript:void(0)">'
    html += '<div class="input-group p-2"><input type="text" class="form-control sub_title" placeholder="Enter Question Option"></div>'
    html += '<input type="hidden" class="form-control questionId-sub-title" value="' + questionId + '">'
    html += '<div class="input-group p-2">'
    html += '<select class="form-control correct"><option disabled="disabled" selected="true">Select type</option><option value="0">Wrong</option><option value="1">Correct</option></select>'
    html += '</div>'
    html += '<div class="row justify-content-center"><button type="submit" class="btn btn-success btn-block" id="add-new-question-option-submit">Add Option</button></div>'
    html += '<form>'
    html += '</div>'
    $(className).append(html)
})
var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
});
$(document).on('click', '#add-new-question-option-submit', function() {
    var sub_title = $('.sub_title').val()
    var questionId = $('.questionId-sub-title').val()
    var correct = $('.correct').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/api/teacher/que-option-create',
        dataType: 'json',
        data: {
            sub_title: sub_title,
            ques_Id: questionId,
            correct: correct
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    only_question_option_view(questionId)
                }, 1000)
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
                title: ' ' + err.status + ' ' + err.statusText
            })
        },
        statusCode: {
            500: function() {
                Toast.fire({
                    icon: 'error',
                    title: 'Database connection error!'
                })
            }
        }
    })

})