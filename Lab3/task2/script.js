'use strict';
const form = document.querySelector('form');
const txt_fullName = document.querySelector('.field-fullname input');
const txt_email = document.querySelector('.field-email input');
const txt_phone = document.querySelector('.field-phone input');
const txt_services = document.querySelector('.txtService');
const upArrow = document.querySelector('.arrow-icon.fa-chevron-up');
const downArrow = document.querySelector('.arrow-icon.fa-chevron-down');
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
    const validate = validation.bind(this);
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
    const validate = validation.bind(this);
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
    const validate = validation.bind(this);
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
    const validate = validation.bind(this);
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
    const parent = target.closest('.field-wrapper');
    const element = document.getElementById(id);
    if (!element) {
        parent.insertAdjacentHTML('afterend', html);
        parent.style.borderColor = type === 'success' ? `#29a300` : `crimson`;
    } else {
        parent.insertAdjacentHTML('afterend', html);
        parent.style.borderColor = type === 'success' ? `#29a300` : `crimson`;
        element.remove();
    }
}

function start() {
    form.addEventListener('change', (e) => {
        const target = e.target;
        if (target) {
            if (target == txt_email) checkEmail.bind(target)();
            else if (target == txt_phone) checkPhone.bind(target)();
            else if (target == txt_fullName) checkName.bind(target)();
            else if (target == txt_services) checkServices.bind(target)();
        }
    })
    document.querySelector('.arrow').addEventListener('click', function(e) {
        const target = e.target;
        const {min, max} = txt_services;
        if (target) {
            let value = Number(txt_services.value.trim());
            if (!value) value = 0;
            if (target == upArrow) {
                if (value >= max)  return;
                txt_services.value = ++value;
            }
            else if (target == downArrow) {
                if (value <= min) return;
                txt_services.value = --value;
            }
            checkServices.bind(txt_services)();
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkName.bind(txt_fullName)() &&
            checkEmail.bind(txt_email)() &&
            checkPhone.bind(txt_phone)() &&
            checkServices.bind(txt_services)()
        ){            
            form.insertAdjacentHTML('afterend', `
            <p class="message">
            <i class="fa-solid fa-file-circle-check"></i>
                We got your information! Thank you.
            </p>
            `)
            form.remove();
        }
    })
}
start();