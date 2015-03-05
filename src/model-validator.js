(function (window, document) {

	'use strict';

	// http://rickharrison.github.com/validate.js
	var ruleRegex = /^(.+?)\[(.+)\]$/,
		numericRegex = /^[0-9]+$/,
		integerRegex = /^\-?[0-9]+$/,
		decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
		emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		alphaRegex = /^[a-z]+$/i,
		alphaNumericRegex = /^[a-z0-9]+$/i,
		alphaDashRegex = /^[a-z0-9_\-]+$/i,
		naturalRegex = /^[0-9]+$/i,
		naturalNoZeroRegex = /^[1-9][0-9]*$/i,
		ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
		base64Regex = /[^a-zA-Z0-9\/\+=]/i,
		numericDashRegex = /^[\d\-\s]+$/,
		urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

	// http://rickharrison.github.com/validate.js
	var defaults = {
		messages: {
			required: 'The %s field is required.',
			matches: 'The %s field does not match the %s field.',
			valid_email: 'The %s field must contain a valid email address.',
			valid_emails: 'The %s field must contain all valid email addresses.',
			min_length: 'The %s field must be at least %s characters in length.',
			max_length: 'The %s field must not exceed %s characters in length.',
			exact_length: 'The %s field must be exactly %s characters in length.',
			greater_than: 'The %s field must contain a number greater than %s.',
			less_than: 'The %s field must contain a number less than %s.',
			alpha: 'The %s field must only contain alphabetical characters.',
			alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
			alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
			numeric: 'The %s field must contain only numbers.',
			integer: 'The %s field must contain an integer.',
			decimal: 'The %s field must contain a decimal number.',
			is_natural: 'The %s field must contain only positive numbers.',
			is_natural_no_zero: 'The %s field must contain a number greater than zero.',
			valid_ip: 'The %s field must contain a valid IP.',
			valid_base64: 'The %s field must contain a base64 string.',
			valid_credit_card: 'The %s field must contain a valid credit card number.',
			is_file_type: 'The %s field must contain only %s files.',
			valid_url: 'The %s field must contain a valid URL.'
		}
	};

	var ModelValidator = function (validations, callback) {

		this.validations = validations;
		this.callback = callback;
		this.fieldValidations = [];
		this.isModelValid = false;
		this.model = {};

		// make sure the validations make sense
		this._verifyValidations();

		// setup field validation
		this._setupFieldValidations();

	};

	ModelValidator.prototype.isValid = function () {
		return this.isModelValid;
	};

	ModelValidator.prototype.validate = function (model) {

		this.isModelValid = true;
		this.model = model;

		var errors = {
			messages: []
		};

		// validate model object

		if (model === null || model === undefined) {
			throw "ModelValidator > model is undefined or null";
		}

		var keys = Object.keys(model);
		if (keys.length === 0) {
			//console.warn("ModelValidator > the model has no properties");
		}

		// validate fields

		var i, j, fieldValidation, fieldValue,
			rule, param, hook, valid, message, display,
			isEmpty, isRequired;
		for (i in this.fieldValidations) {

			fieldValidation = this.fieldValidations[i];
			fieldValue = model[fieldValidation.name];
			valid = true;
			isEmpty = (!fieldValue || fieldValue === '' || fieldValue === undefined);
			isRequired = fieldValidation.rules.filter(function (rule) {
				return rule.name === 'required'
			})[0];

			for (j in fieldValidation.rules) {

				rule = fieldValidation.rules[j];
				param = rule.param;
				hook = this._hooks[rule.name];

				if (!isRequired && isEmpty) {
					continue;
				}

				// only testing the first rule per validation
				if (hook !== undefined && valid) {

					valid = hook.apply(this, [fieldValue, param]);

					if (!valid) {

						display = fieldValidation.displayName || fieldValidation.name
						message = defaults.messages[rule.name].replace('%s', display).replace('%s', param);
						errors[fieldValidation.name] = message;
						errors.messages.push(message);

						this.isModelValid = false;

					}

				}

			}

		}

		if (typeof this.callback === 'function') {
			this.callback(errors);
		} else {
			return errors;
		}

	};

	ModelValidator.prototype._verifyValidations = function () {

		if (this.validations.length === 0) {
			throw "ModelValidator > no validations";
		}

		var i, validation;
		for (i in this.validations) {
			validation = this.validations[i];
			this._verifyValidation(validation);
		}

	};

	ModelValidator.prototype._verifyValidation = function (validation) {

		if (!validation.hasOwnProperty("name")) {
			throw "ModelValidator > validation has no 'name' property";
		}

		if (!validation.hasOwnProperty("rules") ||
			typeof validation.rules !== 'object' ||
			validation.rules.length === 0) {

			var name = validation.name;
			throw "ModelValidator > validation with name '" + name + "' has no rules defined";

		}

	};

	ModelValidator.prototype._setupFieldValidations = function () {

		var i;
		for (i in this.validations) {
			var validation = this.validations[i];
			this._setupFieldValidation(validation);
		}

	};

	ModelValidator.prototype._setupFieldValidation = function (validation) {

		this.fieldValidations[validation.name] = {
			name: validation.name,
			displayName: validation.displayName,
			rules: validation.rules
		};

	};

	ModelValidator.prototype._hooks = {

		required: function (value) {
			return (value !== null && value !== '' && value !== undefined);
		},

		min_length: function (value, length) {

			if (!numericRegex.test(length)) {
				return false;
			}

			return (value !== null && value !== undefined && value.length >= length);

		},

		max_length: function (value, length) {

			if (!numericRegex.test(length)) {
				return false;
			}

			return (value !== null && value !== undefined && value.length <= length);

		},

		exact_length: function (value, length) {

			if (!numericRegex.test(length)) {
				return false;
			}

			return (value.length === length);

		},

		valid_email: function (value) {
			return emailRegex.test(value);
		},

		valid_url: function (value) {
			return (urlRegex.test(value));
		},

		matches: function (value, other) {

			var otherValue = this.model[other];

			if (otherValue) {
				return value === otherValue;
			}

			return false;

		}

	};

	window.ModelValidator = ModelValidator;

}(window, document));

/*
 * Export as a CommonJS module
 */
if (typeof module !== 'undefined' && module.exports) {
	module.exports = ModelValidator;
}