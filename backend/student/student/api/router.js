const {
    studentRegistration,
    studentLogIn,
    profileView,
    profileUpdate,
    passwordUpdate,
    course_view_stu,
    course_enroll_create,
    course_enrolled_view,
    course_title_fetch_from_id
} = require('./controller')
const router = require('express').Router()
const { student_check_token } = require('../../authentication/valided')

router.post('/registration', studentRegistration)
router.post('/login', studentLogIn)
router.get('/profile/:userId', student_check_token, profileView)
router.patch('/profile-update', student_check_token, profileUpdate)
router.patch('/password-update', student_check_token, passwordUpdate)
router.get('/course-fetch', student_check_token, course_view_stu)
router.post('/course-enroll', student_check_token, course_enroll_create)
router.get('/enrolled-list/:studentId', student_check_token, course_enrolled_view)
router.get('/course-title-from-id/:courseId', student_check_token, course_title_fetch_from_id)

module.exports = router