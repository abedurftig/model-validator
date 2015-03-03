# model-validator 

[![Build Status](https://travis-ci.org/dasnervtdoch/model-validator.svg)](https://travis-ci.org/dasnervtdoch/model-validator)

A validator for a JavaScript model. For a really quick demo check: http://dasnervtdoch.github.io/model-validator/

##### Get started

```js
// setup a validation rules
var firstNameValidation = {
	name: "firstName",
	rules: [
		{
			name : "required"
		}
	]
};

var lastNameValidation = {
	name: "lastName",
	rules: [
		{
			name : "required"
		}
	]
};

// create validator specifying the validations to be applied
var validator = new ModelValidator([ 
	firstNameValidation,
	lastNameValidation
]);

// model
var person = {
  firstName: "Peter",
  lastName: "Parker"
}

// run validation, the errors object has a property
// which matches the name if the validation if the validation failed
var errors = validator.validate(person);
```
