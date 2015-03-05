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

});