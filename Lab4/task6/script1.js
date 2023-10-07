'use strict';
const form = document.querySelector('form');
const txt_fullName = document.querySelector('.field-fullname input');
const txt_email = document.querySelector('.field-email input');
const txt_phone = document.querySelector('.field-phone input');
const txt_services = document.querySelector('.txtService');
let check = false;

function checkName() {
    const pattern = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const fObj = {
        id: 'fullname-check',
        icon: 'fa-solid fa-triangle-exclamation',
        type:  'error',
        msg: 'Your name is not valid. Please try again!'
    }
    const sObj =  {
        id: 'fullname-check',
        icon : 'fa-solid fa-user-check',
        type : 'success',
        msg : 'Your name is valid.'
    }
    const validate = validation.bind(txt_fullName);
    return validate(f => {
        if (f.value.trim().match(/[0-9]/g) ) fObj.msg = 'Your full name cannot contain numbers. Please try again!';
        else if (f.value.trim().length < 4) fObj.msg = 'Your name cannot be less than 4 characters. Please try again!';
        return f.value.trim().match(pattern);
    }, sObj, fObj);
}

function checkEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const fObj = {
        id: 'email-check',
        icon: 'fa-solid fa-triangle-exclamation',
        type:  'error',
        msg: 'Your email is invalid! Please try again.'
    }
    const sObj =  {
        id: 'email-check',
        icon : 'fa-solid fa-envelope-circle-check',
        type : 'success',
        msg : 'Your email is valid.'
    }
    const validate = validation.bind(txt_email);
    return validate(f => f.value.match(pattern), sObj, fObj);
}

function checkPhone() {
    const pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const fObj = {
        id: 'phone-check',
        icon: 'fa-solid fa-triangle-exclamation',
        type:  'error',
        msg: 'Your phone number is invalid! Please try again.'
    }

    const sObj =  {
        id: 'phone-check',
        icon : 'fa-solid fa-phone-volume',
        type : 'success',
        msg : 'Your phone number is valid.'
    }
    const validate = validation.bind(txt_phone);
    return validate(f => {
        if (f.value.trim().match(/[a-zA-Z]/g)) fObj.msg = `Your phone number cannot contain characters. Please try again.`
        else if (f.value.trim().length < 10) fObj.msg = `Your phone number cannot be less than 10 numbers. Please try again.`
        return f.value.match(pattern)
    }, sObj, fObj);
}

function checkServices() {
    const fObj = {
        id: 'services-check',
        icon: 'fa-solid fa-triangle-exclamation',
        type:  'error',
    }

    const sObj =  {
        id: 'services-check',
        icon : 'fa-solid fa-layer-group',
        type : 'success',
        msg : 'Your services numbers is valid.'
    }
    const validate = validation.bind(txt_services);
    return validate(f => {
        const {min, max, value} = f;
        if (Number(value) < min) fObj.msg = `Number of services cannot be lower than ${min}`;
        else if (Number(value) > max) fObj.msg = `Number of services cannot be higher than ${max}`;
        return Number(value) >= min && Number(value) <= max;
    }, sObj, fObj);
}

function validation(check, sObj, fObj) {
    if (check(this)) {
        addMessage(this, sObj);
        return true;
    }
    else
    {
        addMessage(this, fObj);
        return false;
    }
}

function addMessage(target, obj) {
    const {id, type, icon, msg} = obj;
    const html = `
    <div class="${type}" id="${id}">
        <i class="${icon}"></i>
        <span>${msg}</span>
    </div>
    `;
    const wrapper = $(target).parentsUntil('.input').filter('.field-wrapper')[0];
    let message = $(`#${id}`)[0];
    message?.remove();
    message = $(html)[0];
    $(wrapper).after(message).next().show();
}

function start() {
    $(form).on({
        change: (e) => {
            const target = e.target;
            if (target == txt_email) checkEmail();
            else if (target == txt_phone) checkPhone();
            else if (target == txt_fullName) checkName();
            else if (target == txt_services) checkServices();
        },
        submit: (e) => {
            e.preventDefault();
            if (checkName() && checkEmail() && checkPhone() && checkServices()) {            
                const $e = $(`
                <p class="message">
                <i class="fa-solid fa-file-circle-check"></i>
                    We got your information! Thank you.
                </p>`)
                //'this' keyword at here is actually form itself because it is binded to and called for this function
                $(form).after($e[0]).hide().next().fadeIn('slow', () => $(this).remove());
            }
        }
    });
    $('.arrow').on('click', function(e) {
        const target = e.target;
        const {min, max} = txt_services;
        if (target) {
            let value = Number(txt_services.value.trim()) || 0;
            if (target === $('.fa-chevron-up', this)[0]) value++;
            else if (target === $('.fa-chevron-down', this)[0]) value--;
            if (value <= max && value >= min) txt_services.value = value;
            checkServices();
        }
    })
}

start.bind(form)();