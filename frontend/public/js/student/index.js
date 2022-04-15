function view_profile() {
    var userId = $('.userid').text()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/student/profile/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.full-name').text(data.data.first_name + ' ' + data.data.last_name)
                $('.userid').text(data.data.userId)
                $('.email').text(data.data.email)
                $('.classNo').text(data.data.class)
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
        url: 'http://localhost:5001/api/student/profile/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.first-name').val(data.data.first_name)
                $('.last-name').val(data.data.last_name)
                $('.email').val(data.data.email)
            }
        }
    })
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

function course_title_fetch_fron_courseId(courseId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/student/course-title-from-id/' + courseId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var className = '.course_name_from_id' + courseId
                $(className).text(data.data.title + ' - ' + data.data.class)
            }
        }
    })
}

function view_course() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/student/course-fetch/',
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

function view_enroll_list() {
    var userId = $('.userid').val()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/student/enrolled-list/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var j = 0
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="p-3">'
                    html += '<span>' + ++j + '. </span> '
                    html += '<span class="course_name_from_id' + data.data[i].courseId + '">' + data.data[i].courseId + ' </span>'
                    html += '</div>'
                    html += '</div>'
                    course_title_fetch_fron_courseId(data.data[i].courseId)
                }
                $('.course-enroll-list').html(html)
            }
        }
    })
}

function view_enrolled_course() {
    var userId = $('.userid').val()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/student/enrolled-list/' + userId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var j = 0
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="p-3 btn btn-default btn-sm view-course-question" courseId="' + data.data[i].courseId + '">'
                    html += '<span class="course_name_from_id' + data.data[i].courseId + '">' + data.data[i].courseId + ' </span>'
                    html += '</div> '
                    course_title_fetch_fron_courseId(data.data[i].courseId)
                }
                $('.enrolled-course-fetch').html(html)
            }
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'profile') {
    view_profile()
}
if (url == 'profile-update') {
    view_profile_update()
}
if (url == 'course-enroll') {
    view_course()
    view_enroll_list()
}
if (url == 'mcq-question') {
    view_enrolled_course()
}
$(document).on('click', '#profile-update', function() {
    var first_name = $('.first-name').val()
    var last_name = $('.last-name').val()
    var stu_class = $('.stu-class').val()
    var userId = $('.userid').val()
    $('.notice').show()
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/student/profile-update',
        dataType: 'json',
        data: {
            first_name: first_name,
            last_name: last_name,
            class: stu_class,
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
        url: 'http://localhost:5001/api/student/password-update',
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
$(document).on('click', '#create-course-enroll', function() {
    var courseId = $('#course-title-fetch').val()
    var studentId = $('.userid').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/api/student/course-enroll',
        dataType: 'json',
        data: {
            courseId: courseId,
            studentId: studentId
        },
        success: function(data) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                view_enroll_list()
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

function only_question_option_view(questionId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/teacher/only-question-option/' + questionId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var className = '.question-option-div' + questionId
                var html = '<div>'
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="mb-1">'
                    html += '<span>'
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
                    html += data.data[i].sub_title
                    html += '</span>'
                    html += '<span class="ml-5 oopp">'
                    html += '<input type="checkbox" onclick="checkGroup(this)" value="' + data.data[i].correct + '" name="group' + questionId + '" questionId="' + questionId + '">'
                    html += '</span>'
                    html += '</div>'
                }
                html += '</div>'
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
                    html += '<div class="ml-1 mt-3 question-option-div' + data.data[i].id + '">'
                    html += '</div>'
                    html += '</div>'
                    only_question_option_view(data.data[i].id)
                }
                html += '<span class="btn btn-success show-mcq-result">Submit</span>'
                $('.mcq-list').html(html)
            }
        }
    })
}
var timing3

function exam_time(time) {
    var yourDateToGo = new Date();
    yourDateToGo.setMinutes(yourDateToGo.getMinutes() + time)

    timing3 = setInterval(function() {
        var currentDate = new Date().getTime()
        var timeLeft = yourDateToGo - currentDate;
        var minutes3 = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes3 < 10) minutes3 = "0" + minutes3;
        var seconds3 = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if (seconds3 < 10) seconds3 = "0" + seconds3;
        document.getElementById("exam-time").innerHTML = minutes3 + "m " + seconds3 + "s";
        if (timeLeft <= 0) {
            clearInterval(timing3)
            document.getElementById("exam-time").innerHTML = "<span class='text-danger'>Time Over 🙂</span>";
            $('.mcq-list').html('<span class="text-danger">Time Over 🙂</span>')
        }
    }, 1000);
}
var listArray

$(document).on('click', '.view-course-question', function() {
    $('.mcq-course-title').text($(this).children('span').text())
    only_question_view($(this).attr('courseId'))
    clearInterval(timing3)
    exam_time(1)
    listArray = new ListArray()
})

function checkGroup(box) {
    box = $(box)
    var questionId = box.attr('questionId')
    var option = box.attr('value')
    var answer = {
        questionId: questionId,
        option: option
    }
    if (box.is(":checked")) {
        var group = "input:checkbox[name='" + box.attr("name") + "']"
        $(group).prop("checked", false)
        box.prop("checked", true)
        listArray.push(answer)
    } else {
        box.prop("checked", false)
    }
}
$(document).on('click', '.show-mcq-result', function() {
    clearInterval(timing3)
    var one_questionId = listArray.array[0].value.questionId
    var count = 0
    var answer = 0
    var html = '<div class="col-6 p-3">'
    html += '<span class="h6">MCQ Result:</span>'
    var j = 1
    for (var i = 0; i < listArray.array.length; i++) {
        if (one_questionId != listArray.array[i].value.questionId || (one_questionId == listArray.array[i].value.questionId && one_questionId != listArray.array[i + 1].value.questionId) || i == (listArray.array.length - 1)) {
            html += '<div>'
            html += '<span>' + j++ + '.</span> '
            if (listArray.array[i].value.option == 1) {
                answer++
                html += '<span class="text-success">Right</span>'
            } else {
                html += '<span class="text-danger">Wrong</span>'
            }
            html += '</div>'
            count++
        }
        one_questionId = listArray.array[i].value.questionId
    }
    html += '<div>'
    $('.mcq-list').html(html)
})