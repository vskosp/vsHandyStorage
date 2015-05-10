describe("vsSessionStorageDirective", function() {
	var STORAGE_MODEL_NAME = "profile";

	var htmlMock = angular.element(
            '<form vs-session-storage="'+ STORAGE_MODEL_NAME +'">' +
            '</form>'
		);
		
	var element,
	    scope,
	    sessionStorage;
	
	beforeEach(module('vsHandyStorage'));
	
	beforeEach(inject(function($rootScope, $compile, $sessionStorage) {
		scope = $rootScope.$new();
		element = $compile(htmlMock)(scope);
		sessionStorage = $sessionStorage;
    }));
	
	afterEach(function() {
	    sessionStorage.$reset();
	});
	
	it('should create storage model', function () {
        expect(sessionStorage[STORAGE_MODEL_NAME]).toBeDefined();
	});
	
	describe("controller", function() {
	    var STORAGE_MODEL_KEY = 'name',
		    STORAGE_MODEL_VALUE = 'Somename';
		
		var controller;
		
		beforeEach(inject(function(vsStorageControllerProvider, vsSessionStorageAPI) {
			var attrs = {
			    vsSessionStorage: STORAGE_MODEL_NAME
			};

			var Controller = vsStorageControllerProvider.getController('vsSessionStorage', vsSessionStorageAPI);
	    	controller = new Controller(scope, element, attrs);
        }));
		
		it("should put value to storage model", function() {
			controller.put(STORAGE_MODEL_KEY, STORAGE_MODEL_VALUE);
			expect(sessionStorage[STORAGE_MODEL_NAME][STORAGE_MODEL_KEY]).toBe(STORAGE_MODEL_VALUE);
        });
        it("should get value from storage model", function() {
	    	sessionStorage[STORAGE_MODEL_NAME][STORAGE_MODEL_KEY] = STORAGE_MODEL_VALUE;
			expect(controller.get(STORAGE_MODEL_KEY)).toBe(STORAGE_MODEL_VALUE);
        });
	});
});