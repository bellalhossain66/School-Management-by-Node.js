const router = require('express').Router()
const {
    studentLogIn,
    profileView,
    question_bank,
    question_bank_option,
    question_bank_mcq,
    subjective,
    subjective_category,
    subjective_sub_category,
    subjective_mcq,
    examination,
    examination_option,
    examination_mcq,
    password_update,
    student_registration,
    profile_update,
    personal_practice_answer,
    personal_practice_answer_sheet,
    preparation_practice_answer,
    preparation_practice_answer_sheet,
    preparation_option_answer_sheet,
    user_packages_list
} = require('./controller')
const { student_check_token } = require('../../authentication/valided')

router.post('/login', studentLogIn)
router.post('/profile', profileView)
router.post('/question-bank', question_bank)
router.post('/question-bank-option', question_bank_option)
router.post('/question-bank-mcq', question_bank_mcq)
router.post('/subjective', subjective)
router.post('/subjective-category', subjective_category)
router.post('/subjective-sub-category', subjective_sub_category)
router.post('/subjective-mcq', subjective_mcq)
router.post('/examination', examination)
router.post('/examination-option', examination_option)
router.post('/examination-mcq', examination_mcq)
router.post('/update-password', password_update)
router.post('/signup', student_registration)
router.post('/profile-update', profile_update)
router.post('/personal-practice-answer-submit', personal_practice_answer)
router.post('/personal-practice-answer-sheet', personal_practice_answer_sheet)
router.post('/preparation-exam-answer-submit', preparation_practice_answer)
router.post('/preparation-exam-answer-sheet', preparation_practice_answer_sheet)
router.post('/preparation-option-answer-sheet', preparation_option_answer_sheet)
router.post('/packages', user_packages_list)

module.exports = router