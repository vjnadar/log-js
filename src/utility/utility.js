export const checkValidity = (value, validation) => {
    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
        const emailCheck = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = emailCheck.test(value) && isValid;
    }
    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
};
