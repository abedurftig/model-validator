describe('ModuleValidator', function () {

	beforeEach(function () {

		var firstNameDef = {
			name: "firstName",
			rules: [
				{
					name: "required"
        		}
      		]
		};

		this.validator = new ModelValidator([firstNameDef]);

	});

	describe('should', function () {

		it('be defined', function () {
			expect(this.validator).toBeDefined();
		});

	});

	describe('validate should', function () {

		it('exist', function () {
			expect(this.validator.validate).toBeDefined();
		});

		it('be of type function', function () {
			expect(typeof this.validator.validate === 'function').toBe(true);
		});

		it('throw exception for null', function () {

			var exception;
			try {
				this.validator.validate(null);
			} catch (e) {
				exception = e;
			}

			expect(exception).toBe("ModelValidator > model is undefined or null");

		});

		it('throw exception for undefined', function () {

			var exception;
			try {
				this.validator.validate(undefined);
			} catch (e) {
				exception = e;
			}

			expect(exception).toBe("ModelValidator > model is undefined or null");

		});

	});

	describe('model validation, rule: required', function () {

		it('should fail when value undefined', function () {

			var model = {},
				errors = this.validator.validate(model);
			expect(errors.firstName).not.toBe(undefined);
			expect(this.validator.isValid()).toBe(false);

		});

		it('should fail when value empty', function () {

			var model = {
					firstName: ''
				},
				errors = this.validator.validate(model);
			expect(errors.firstName).not.toBe(undefined);
			expect(this.validator.isValid()).toBe(false);

		});

		it('should fail when value null', function () {

			var model = {
					firstName: null
				},
				errors = this.validator.validate(model);
			expect(errors.firstName).not.toBe(undefined);
			expect(this.validator.isValid()).toBe(false);

		});

		it('should pass when value specified', function () {

			var model = {
					firstName: "Peter"
				},
				errors = this.validator.validate(model);
			expect(errors.firstName).toBe(undefined);
			expect(this.validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: min_length', function () {

		var firstNameDef = {
			name: "firstName",
			rules: [
				{
					name: "min_length",
					param: 5
        		}
      		]
		};

		var validator = new ModelValidator([firstNameDef]);

		it('should fail when value length < 5', function () {

			var model = {
					firstName: 'John'
				},
				errors = validator.validate(model);
			expect(errors.firstName).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when value length >= 5', function () {

			var model = {
					firstName: 'Peter'
				},
				errors = validator.validate(model);
			expect(errors.firstName).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: max_length', function () {

		var firstNameDef = {
			name: "firstName",
			rules: [
				{
					name: "max_length",
					param: 5
        		}
      		]
		};

		var validator = new ModelValidator([firstNameDef]);

		it('should fail when value length > 5', function () {

			var model = {
					firstName: 'Papa John'
				},
				errors = validator.validate(model);
			expect(errors.firstName).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when value length <= 5', function () {

			var model = {
					firstName: 'Peter'
				},
				errors = validator.validate(model);
			expect(errors.firstName).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: exact_length', function () {

		var tencharactersDef = {
			name: "tencharacters",
			rules: [
				{
					name: "exact_length",
					param: 10
        		}
      		]
		};

		var validator = new ModelValidator([tencharactersDef]);

		it('should fail when value length > 10', function () {

			var model = {
					tencharacters: 'elevenchars'
				},
				errors = validator.validate(model);
			expect(errors.tencharacters).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value length < 10', function () {

			var model = {
					tencharacters: 'ninechars'
				},
				errors = validator.validate(model);
			expect(errors.tencharacters).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when value length = 10', function () {

			var model = {
					tencharacters: 'tenexactly'
				},
				errors = validator.validate(model);
			expect(errors.tencharacters).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: valid_email', function () {

		var emailDef = {
			name: "email",
			rules: [
				{
					name: "valid_email"
        		}
      		]
		};

		var validator = new ModelValidator([emailDef]);

		it('should fail when value is "email@com"', function () {

			var model = {
					email: 'email@com'
				},
				errors = validator.validate(model);
			expect(errors.email).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value is "email.com"', function () {

			var model = {
					email: 'email.com'
				},
				errors = validator.validate(model);
			expect(errors.email).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value is "@email.com"', function () {

			var model = {
					email: '@email.com'
				},
				errors = validator.validate(model);
			expect(errors.email).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value is "test email@email.com"', function () {

			var model = {
					email: 'test email@email.com'
				},
				errors = validator.validate(model);
			expect(errors.email).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when value is "email@valid.com"', function () {

			var model = {
					email: 'email@valid.com'
				},
				errors = validator.validate(model);
			expect(errors.email).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: valid_url', function () {

		var urlDef = {
			name: "url",
			rules: [
				{
					name: "valid_url"
        		}
      		]
		};

		var validator = new ModelValidator([urlDef]);

		it('should fail when value is "homepage.com"', function () {

			var model = {
					url: 'homepage.com'
				},
				errors = validator.validate(model);
			expect(errors.url).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value is "www@homepage.com"', function () {

			var model = {
					url: 'www@homepage.com'
				},
				errors = validator.validate(model);
			expect(errors.url).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value is "http:/homepage.com"', function () {

			var model = {
					url: 'http:/homepage.com'
				},
				errors = validator.validate(model);
			expect(errors.url).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when value is "http://homepagecom"', function () {

			var model = {
					url: 'http://homepagecom'
				},
				errors = validator.validate(model);
			expect(errors.url).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when value is "http://homepage.com"', function () {

			var model = {
					url: 'http://homepage.com'
				},
				errors = validator.validate(model);
			expect(errors.url).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

		it('should pass when value is "http://homepage.co.uk"', function () {

			var model = {
					url: 'http://homepage.co.uk'
				},
				errors = validator.validate(model);
			expect(errors.url).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

		it('should pass when value is "http://www.homepage.co.uk"', function () {

			var model = {
					url: 'http://www.homepage.co.uk'
				},
				errors = validator.validate(model);
			expect(errors.url).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

		it('should pass when value is "https://www.homepage.co.uk"', function () {

			var model = {
					url: 'https://www.homepage.co.uk'
				},
				errors = validator.validate(model);
			expect(errors.url).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: matches', function () {

		var passwordRepeatDef = {
			name: "password_repeat",
			rules: [
				{
					name: "matches",
					param: "password"
				}
			]
		};

		var validator = new ModelValidator([passwordRepeatDef]);

		it('should fail when values do not match', function () {

			var model = {
					password: 'password',
					password_repeat: 'password_repeat'
				},
				errors = validator.validate(model);
			expect(errors.password_repeat).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when match value is undefined', function () {

			var model = {
					password_repeat: 'password_repeat'
				},
				errors = validator.validate(model);
			expect(errors.password_repeat).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when values match', function () {

			var model = {
					password: 'password',
					password_repeat: 'password'
				},
				errors = validator.validate(model);
			expect(errors.password_repeat).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

	describe('model validation, rule: array_min_length', function () {

		var arrayDef = {
			name: "items",
			rules: [
				{
					name: "array_min_length",
					param: 1
        		}
      		]
		};

		var validator = new ModelValidator([arrayDef]);

		it('should fail when value is not of type object', function () {

			var model = {
					items: 'Papa John'
				},
				errors = validator.validate(model);
			expect(errors.items).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should fail when array is empty', function () {

			var model = {
					items: []
				},
				errors = validator.validate(model);
			expect(errors.items).not.toBe(undefined);
			expect(validator.isValid()).toBe(false);

		});

		it('should pass when array is not empty', function () {

			var model = {
					items: [{
						name: 'itemA'
					}]
				},
				errors = validator.validate(model);
			expect(errors.items).toBe(undefined);
			expect(validator.isValid()).toBe(true);

		});

	});

});