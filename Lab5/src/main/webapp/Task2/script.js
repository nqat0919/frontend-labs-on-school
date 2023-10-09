'use strict';
const hideButton = $('.eye-icon')[0];
const txtPassword = $('.txt-password')[0];
const txtAccount = $('.txt-account')[0];
const button = $('.btn-submit')[0];

function showError(regex = /./) {
    $(this).css('border', 'none').siblings().filter('.error').remove();
    let msg = null;
    const value = this.value;
    if (value === '') msg = 'This field is empty';
    else if (value.search(' ') >= 0) msg = 'Your input is containing space characters';
    else if (!value.match(regex)) msg = 'Your input is invalid';
    console.log(this, regex, msg, value)
    msg && $(this).after(`<p class="error">${msg}</p>`).css('border', '2px solid #e03131')
}

const validatePassword = showError.bind(txtPassword, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const validateAccount = showError.bind(txtAccount);

$(button).on('click', e =>  {
    e.preventDefault()
    validatePassword();
    validateAccount();
});
$(hideButton).on('click', function() {
    const show =  this.dataset.show;
    const hide = this.dataset.hide;
    const type = txtPassword.type;
    $(hideButton).toggleClass(show).toggleClass(hide);
    txtPassword.type = type === 'password' ? 'text' : 'password';
})
$(txtAccount).on('change', () => validateAccount());
$(txtPassword).on('change', () => validatePassword());