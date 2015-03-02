describe('ModuleOne', function () {
	
  beforeEach(function () {
		
		var firstNameDef = {
      name: "firstName",
      rules: [
        {
          name : "required"
        }
      ]
    };
		
		this.validator = new ModelValidator([ firstNameDef ], function () {});
		
  });

  describe('should', function () {

    it('be defined', function () {
      expect(this.validator).toBeDefined();
    });

  });
	
  describe('validate should', function() {

    it('exist', function() {
      expect(this.validator.validate).toBeDefined();
    });

    it('of type function', function() {
      expect(typeof this.validator.validate === 'function').toBe(true);
    });

    it('throw exception for null', function() {

			var exception = undefined;
			try {
				this.validator.validate(null);
			} catch (e) {
				exception = e;
			}

			expect(exception).toBe("ModelValidator > model is undefined or null");

    });

		it('throw exception for undefined', function() {

			var exception = undefined;
			try {
				this.validator.validate(undefined);
			} catch (e) {
				exception = e;
			}

			expect(exception).toBe("ModelValidator > model is undefined or null");

    });

  });	
	
});