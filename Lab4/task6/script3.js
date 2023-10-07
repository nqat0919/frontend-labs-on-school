'use strict';
const btnsGender = $('#gender-section .btn');
const btnsPayment = $('#payment-section .btn');
const form = $('#form-payment');

$(btnsGender).on('click', () => $(btnsGender).toggleClass('active'));
$(btnsPayment).on('click', () => $(btnsPayment).toggleClass('active'));

function validateName(target) {
    const pattern = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const {value} = target;
    let msg = null;
    if (value == '') msg = 'Name field cannot be empty.';
    else if (value.match(/[0-9]/g)) msg = 'Your name cannot contain numbers.';
    else if (!value.match(pattern)) msg = 'Your full name is not a reality name'
    return {error: true, message: msg}
}

function validatePass(target) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {value} = target;
    let msg = null;
    if (value == '') msg = 'Password field cannot be empty.';
    else if (value.search(' ') >= 0) msg = 'Password field cannot have space characters.';
    else if (!value.match(pattern)) msg = 'Pasword must have at least 8 length and is a combine of at least one normal, upper, number and special characters.'
    return {error: true, message: msg}
}

function validateEmail(target) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const {value} = target;
    let msg = null;
    if (value == '') msg = 'Email field cannot be empty.';
    else if (value.search(' ') >= 0) msg = 'Email field cannot have space characters.';
    else if (!value.match(pattern)) msg = 'Your input is not an valid email.'
    return {error: true, message: msg}
}

function showError(validate) {
    const ancestor = $(this).parents().filter('.row').first();
    $(ancestor).find('.icon-field').removeAttr('style');
    $(ancestor).find('.error').remove();
    let {message} = validate(this);
    message && $(ancestor).append(`<p class="error">${message}</p>`).find('.icon-field').css('border', '2px solid #e03131')
}

$(form).on({
    change: function(e) {
        const target = e.target;
        const id = target?.id;
        switch (id) {
            case 'txt-fullname':
                showError.call(target, validateName);
                break;
            case 'txt-email':
                showError.call(target, validateEmail);
                break;
            case 'txt-password':
                showError.call(target, validatePass);
            default:
                return;
        }
    },
    keypress: function(e) {
        const target = e.target;
        const id = target?.id;
        switch (id) {
            case 'txt-day':
            case 'txt-month':
            case 'txt-year':
            case 'txt-card-number':
            case 'txt-card-cvc':
                return !!Number(e.key)
            default:
                return;
        }
    }   
})