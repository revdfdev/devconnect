const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistration(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be 2 to 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is a required field";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is a required field";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password should be 6 to 30 characters long";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is a required field";
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = "Confirm password is a required field";
  }

  if (!Validator.equals(data.confirm_password, data.password)) {
    errors.confirm_password = "Confirm password and password should match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
