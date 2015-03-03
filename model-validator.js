/*! model-validator - v0.0.1 - 2015-03-02 */
(function (window, document) {

	'use strict';
	
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
	
		// make sure the validations make sense
		this.$verifyValidations();
		
		// setup field validation rules
		this.$setupFieldValidationRules();
		
	};

  ModelValidator.prototype.validate = function (model) {

    this.errors = [];

    if (model === null || model === undefined) {
      throw "ModelValidator > model is undefined or null";
    }

		var keys = Object.keys(model);
		if (keys.length === 0) {
			console.warn("ModelValidator > the model has no properties");
		}

    if (typeof this.callback === 'function') {
      this.callback(this.errors);
    }

  };
	
	ModelValidator.prototype.$verifyValidations = function () {

    if (this.validations.length === 0) {
      throw "ModelValidator > no validations";
    }

		var i;
    for (i in this.validations) {
			var validation = this.validations[i];
      this.$verifyValidation(validation);
    }

	};
	
  ModelValidator.prototype.$verifyValidation = function (validation) {

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
	
	ModelValidator.prototype.$setupFieldValidationRules = function () {};
	
	window.ModelValidator = ModelValidator;

}(window, document));
