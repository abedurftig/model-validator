# model-validator

[![Build Status](https://travis-ci.org/abedurftig/model-validator.svg?branch=master)](https://travis-ci.org/abedurftig/model-validator)

A validator for a JavaScript model. The difference to libraries like `validate.js` is that is that this library validates a JavaScript object rather than a HTML form, which makes the more flexible to use.
<br/><br/>
For a really quick demo check: http://abedurftig.github.io/model-validator

##### Installation

You have two options. 

- For the latest code download the source
- Use bower: `bower install model-validator`

Make sure to include the `model-validator.js` file in your HTML.

##### Get started

```js
// setup a validation rules
var firstNameValidation = {
	name: "firstName",
	rules: [
		{
			name: "required"
		}
	]
};

var lastNameValidation = {
	name: "lastName",
	rules: [
		{
			name: "required"
		},
		{
			name: "min_length",
			param: 32
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
};

// run validation, the errors object has a property
// which matches the name if the validation if the validation failed
var errors = validator.validate(person);
```

##### Rules

Currently the following rules have been implemented:

- `required`
- `min_length`
- `max_length`

##### Credits

To Rick Harrison and the contributors of the validate.js repository (https://github.com/rickharrison/validate.js)
