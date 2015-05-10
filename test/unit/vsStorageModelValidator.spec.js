describe("vsStorageModelValidator", function() {
    var vsStorageModelValidator;
 
	beforeEach(module('vsHandyStorage'));
    beforeEach(inject(function(_vsStorageModelValidator_){
        vsStorageModelValidator = _vsStorageModelValidator_;
    }));
	
	describe("isValid", function() {
        it("should be function", function() {
            expect(typeof vsStorageModelValidator.isValid).toBe('function');
        });
		it("value should be Object only", function() {
            expect(vsStorageModelValidator.isValid(undefined)).toBe(false);
	    	expect(vsStorageModelValidator.isValid(null)).toBe(false);
	    	expect(vsStorageModelValidator.isValid(true)).toBe(false);
	    	expect(vsStorageModelValidator.isValid(0)).toBe(false);
	    	expect(vsStorageModelValidator.isValid("")).toBe(false);
	    	expect(vsStorageModelValidator.isValid("string")).toBe(false);
	    	expect(vsStorageModelValidator.isValid(function() {})).toBe(false);
	    	expect(vsStorageModelValidator.isValid([])).toBe(false);
	    	expect(vsStorageModelValidator.isValid({})).toBe(true);
        });
	});
	
    describe("isValueValid", function() {
        it("should be function", function() {
            expect(typeof vsStorageModelValidator.isValueValid).toBe('function');
        });    
	    it("value should not be 'null' or 'empty string'", function() {
            expect(vsStorageModelValidator.isValueValid(null)).toBe(false);
	    	expect(vsStorageModelValidator.isValueValid("")).toBe(false);
	    	expect(vsStorageModelValidator.isValueValid("string")).toBe(true);
	    	expect(vsStorageModelValidator.isValueValid(0)).toBe(true);
        });
	});
});