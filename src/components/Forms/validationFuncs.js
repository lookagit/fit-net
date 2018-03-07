export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateStringNames(name) {
  const regex = /^([A-Za-z ]{2,30})?$/;
  return regex.test(name);
}

export function validatePassword(value) {
  const regex = /^([A-Za-z])+([0-9])+([A-Za-z. 0-9])*$/;
  return regex.test(value);
}

export function validatePhone(value) {
  const regex = /^([+]{1}[0-9]{2,15})$/;
  return regex.test(value);
}

export function validateBirthPlace(value) {
  const regex = /^([A-Za-z ]+)$/;
  return regex.test(value);
}

export function validateUrl(value) {
  const regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/
  return regex.test(value);
}

export function validateAbout(value) {
  const regex = /^([A-Za-z 0-9]+)$/;
  return regex.test(value);
}
export default {
  validateEmail,
  validateStringNames,
  validatePassword,
  validatePhone,
  validateBirthPlace,
  validateUrl,
  validateAbout,
};

