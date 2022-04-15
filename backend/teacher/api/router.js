const {
    teacherRegistration,
    teacherLogIn,
    profileView,
    profileUpdate,
    passwordUpdate,
    courseCreate,
    mcq_question_create,
    mcq_question_option_create,
    mcq_question_view,
    class_name_view,
    courseView,
    mcq_only_question_view,
    mcq_only_question_option_view
} = require('./controller')
const router = require('express').Router()
const { teacher_check_token } = require('../../authentication/valided')

router.post('/registration', teacherRegistration)
router.post('/login', teacherLogIn)
router.get('/profile/:userId', teacher_check_token, profileView)
router.patch('/profile-update', teacher_check_token, profileUpdate)
router.patch('/password-update', teacher_check_token, passwordUpdate)
router.post('/create-course', teacher_check_token, courseCreate)
router.get('/course/:teacherId', teacher_check_token, courseView)
router.post('/question-create', teacher_check_token, mcq_question_create)
router.post('/que-option-create', teacher_check_token, mcq_question_option_create)
router.get('/only-question/:courseId', mcq_only_question_view)
router.get('/only-question-option/:questionId', mcq_only_question_option_view)
router.get('/question-view', mcq_question_view)
router.get('/class-names', teacher_check_token, class_name_view)

module.exports = router