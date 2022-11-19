const router = require('express').Router()
const {
    add_subject,
    all_subject,
    add_category,
    all_category,
    add_sub_category,
    all_sub_category,
    sub_category_delete,
    category_delete,
    subject_delete,
    add_question_option,
    all_mcq_question,
    all_mcq_question_option,
    mcq_question_delete,
    mcq_by_question,
    add_question_bank_category,
    all_question_bank_category,
    add_question_bank_sub_category,
    all_question_bank_sub_category,
    question_bank_sub_category_delete,
    question_bank_category_delete,
    question_bank_by_name,
    add_question_bank_mcq,
    question_bank_mcq,
    delete_question_bank_mcq,
    subjective_question_by_name,
    add_preparation_category,
    all_preparation_category,
    add_preparation_sub_category,
    all_preparation_sub_category,
    preparation_sub_category_delete,
    preparation_category_delete,
    preparation_exam_by_name,
    preparation_eaxm_mcq,
    add_preparation_exam_mcq,
    delete_preparation_eaxm_mcq,
    all_user,
    user_active_inactive,
    user_delete,
    all_user_deleted,
    user_delete_forever,
    user_restore,
    notice_board,
    add_notice_board,
    package_info_update,
    package_subscriber_by_name,
    package_subscriber,
    package_subscriber_active_inactive,
    add_package_payment,
    all_package_payment,
    package_payment_active_inactive,
    package_payment_delete,
    question_bank_mcq_by_question,
    preparation_eaxm_mcq_by_question,
    create_new_package,
    package_all_list,
    old_package_update
} = require('./controller')

router.post('/add-subject', add_subject)
router.get('/all-subject', all_subject)
router.post('/add-subject-category', add_category)
router.get('/subject-category/:subject_id', all_category)
router.post('/add-subject-sub-category', add_sub_category)
router.get('/subject-sub-category/:category_id', all_sub_category)
router.delete('/subject-sub-category-delete', sub_category_delete)
router.delete('/subject-category-delete', category_delete)
router.delete('/subject-delete', subject_delete)
router.post('/add-mcq-question-option', add_question_option)
router.get('/all-mcq-question/:sub_category', all_mcq_question)
router.get('/all-mcq-question-option/:question', all_mcq_question_option)
router.delete('/mcq-question-delete', mcq_question_delete)
router.get('/mcq-by-question/:question', mcq_by_question)
router.post('/add-question-bank', add_question_bank_category)
router.get('/all-question-bank', all_question_bank_category)
router.post('/add-question-bank-sub-category', add_question_bank_sub_category)
router.get('/all-question-bank-sub-category/:action_id', all_question_bank_sub_category)
router.delete('/question-bank-sub-category-delete', question_bank_sub_category_delete)
router.delete('/question-bank-category-delete', question_bank_category_delete)
router.get('/question-bank-by-name/:action_id', question_bank_by_name)
router.post('/add-question-bank-mcq', add_question_bank_mcq)
router.get('/question-bank-mcq/:action_id', question_bank_mcq)
router.delete('/question-bank-mcq-delete', delete_question_bank_mcq)
router.get('/question-bank-mcq-by-question/:question', question_bank_mcq_by_question)
router.get('/subjective-question-by-name/:action_id', subjective_question_by_name)
router.post('/add-preparation-category', add_preparation_category)
router.get('/all-preparation-category', all_preparation_category)
router.post('/add-preparation-sub-category', add_preparation_sub_category)
router.get('/all-preparation-sub-category/:action_id', all_preparation_sub_category)
router.delete('/preparation-sub-category-delete', preparation_sub_category_delete)
router.delete('/preparation-category-delete', preparation_category_delete)
router.get('/preparation-exam-by-name/:action_id', preparation_exam_by_name)
router.get('/preparation-exam-mcq/:action_id', preparation_eaxm_mcq)
router.post('/add-preparation-exam-mcq', add_preparation_exam_mcq)
router.delete('/preparation-exam-mcq-delete', delete_preparation_eaxm_mcq)
router.get('/preparation-exam-mcq-by-question/:question', preparation_eaxm_mcq_by_question)
router.get('/users', all_user)
router.patch('/user-active-inactive', user_active_inactive)
router.patch('/user-delete', user_delete)
router.get('/users-deleted', all_user_deleted)
router.delete('/user-delete-forever', user_delete_forever)
router.patch('/user-restore', user_restore)
router.get('/notice-board', notice_board)
router.patch('/add-notice-board', add_notice_board)
router.patch('/package-update', package_info_update)
router.get('/package-subscriber-by-name/:action_id', package_subscriber_by_name)
router.get('/package-subscriber/:action_id', package_subscriber)
router.patch('/package-subscriber-active-inactive', package_subscriber_active_inactive)
router.post('/add-package-payment', add_package_payment)
router.get('/all-package-payment', all_package_payment)
router.patch('/package-payment-active-inactive', package_payment_active_inactive)
router.delete('/package-payment-delete', package_payment_delete)
router.post('/add-new-package', create_new_package)
router.get('/all-packages', package_all_list)
router.patch('/update-package', old_package_update)

module.exports = router