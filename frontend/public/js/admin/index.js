function get_Student_list() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/admin/all-student',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var j = 0
                for (var i = 0; i < data.data.length; i++) {
                    j++
                    html += '<tr>'
                    html += '<td>' + j + '</td>'
                    html += '<td>' + data.data[i].first_name + '</td>'
                    html += '<td>' + data.data[i].last_name + '</td>'
                    html += '<td>' + data.data[i].email + '</td>'
                    html += '<td>' + data.data[i].class + '</td>'
                    html += '<td>'
                    if (data.data[i].action == 1) {
                        html += '<span class="text-danger">Ban</span>'
                    } else {
                        html += '<span class="text-success">Permited</span>'
                    }
                    html += '<td>'
                    if (data.data[i].action == 1) {
                        html += '<span class="btn btn-sm btn-success permitStudent" stuId="' + data.data[i].id + '">Permit</span> '
                    } else {
                        html += '<span class="btn btn-sm btn-danger banStudent" stuId="' + data.data[i].id + '">Ban</span> '
                    }
                    html += '<span class="btn btn-sm btn-danger deleteStudent" stuId="' + data.data[i].id + '"><i class="fa fa-trash"></i></span>'
                    html += '</td>'
                    html += '</tr>'
                }
                $('#stu-list').html(html)
            } else {
                $('#stu-list').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('#stu-list').html('<span class="text-danger">' + err.statusText + '</span>')
        },
        statusCode: {
            404: function() {
                $('#stu-list').html('<span class="text-danger">Empty data</span>')
            },
            500: function() {
                $('#stu-list').html('<span class="text-danger">Database connection error!</span>')
            }
        }
    })
}

function get_Teacher_list() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/admin/all-teacher',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                var j = 0
                for (var i = 0; i < data.data.length; i++) {
                    j++
                    html += '<tr>'
                    html += '<td>' + j + '</td>'
                    html += '<td>' + data.data[i].first_name + '</td>'
                    html += '<td>' + data.data[i].last_name + '</td>'
                    html += '<td>' + data.data[i].email + '</td>'
                    html += '<td>'
                    if (data.data[i].action == 1) {
                        html += '<span class="text-danger">Ban</span>'
                    } else {
                        html += '<span class="text-success">Permited</span>'
                    }
                    html += '<td>'
                    if (data.data[i].action == 1) {
                        html += '<span class="btn btn-sm btn-success permitTeacher" stuId="' + data.data[i].id + '">Permit</span> '
                    } else {
                        html += '<span class="btn btn-sm btn-danger banTeacher" stuId="' + data.data[i].id + '">Ban</span> '
                    }
                    html += '<span class="btn btn-sm btn-danger deleteTeacher" stuId="' + data.data[i].id + '"><i class="fa fa-trash"></i></span>'
                    html += '</td>'
                    html += '</tr>'
                }
                $('#teacher-list').html(html)
            } else {
                $('#teacher-list').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('#teacher-list').html('<span class="text-danger">' + err.statusText + '</span>')
        },
        statusCode: {
            404: function() {
                $('#teacher-list').html('<span class="text-danger">Empty data</span>')
            },
            500: function() {
                $('#teacher-list').html('<span class="text-danger">Database connection error!</span>')
            }
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'all-student') {
    get_Student_list()
}
if (url == 'all-teacher') {
    get_Teacher_list()
}
var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
});
$(document).on('click', '.deleteStudent', function() {
    var id = $(this).attr('stuId')
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:5001/api/admin/student-delete',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#stu-list').html('')
                    get_Student_list()
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
        }
    })
})
$(document).on('click', '.banStudent', function() {
    var id = $(this).attr('stuId')
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/admin/ban-student',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#stu-list').html('')
                    get_Student_list()
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
        }
    })
})
$(document).on('click', '.permitStudent', function() {
    var id = $(this).attr('stuId')
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/admin/permit-student',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#stu-list').html('')
                    get_Student_list()
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
        }
    })
})
$(document).on('click', '.deleteTeacher', function() {
    var id = $(this).attr('stuId')
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:5001/api/admin/teacher-delete',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#stu-list').html('')
                    get_Teacher_list()
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
        }
    })
})
$(document).on('click', '.banTeacher', function() {
    var id = $(this).attr('stuId')
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/admin/ban-teacher',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#stu-list').html('')
                    get_Teacher_list()
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
        }
    })
})
$(document).on('click', '.permitTeacher', function() {
    var id = $(this).attr('stuId')
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5001/api/admin/permit-teacher',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#stu-list').html('')
                    get_Teacher_list()
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
        }
    })
})