describe("vsLocalStorageDirective", function() {
	var STORAGE_MODEL_NAME = "profile";

	var htmlMock = angular.element(
            '<form vs-local-storage="'+ STORAGE_MODEL_NAME +'">' +
            '</form>'
		);
		
	var element,
	    scope,
	    localStorage;
	
	beforeEach(module('vsHandyStorage'));
	
	beforeEach(inject(function($rootScope, $compile, $localStorage) {
		scope = $rootScope.$new();
		element = $compile(htmlMock)(scope);
		localStorage = $localStorage;
    }));
	
	afterEach(function() {
	    localStorage.$reset();
	});
	
	it('should create storage model', function () {
        expect(localStorage[STORAGE_MODEL_NAME]).toBeDefined();
	});
	
	describe("controller", function() {
	    var STORAGE_MODEL_KEY = 'name',
		    STORAGE_MODEL_VALUE = 'Somename';
		
		var controller;
		
		beforeEach(inject(function(vsStorageControllerProvider, vsLocalStorageAPI) {
			var attrs = {
			    vsLocalStorage: STORAGE_MODEL_NAME
			};

			var Controller = vsStorageControllerProvider.getController('vsLocalStorage', vsLocalStorageAPI);
	    	controller = new Controller(scope, element, attrs);
        }));
		
		it("should put value to storage model", function() {
			controller.put(STORAGE_MODEL_KEY, STORAGE_MODEL_VALUE);
			expect(localStorage[STORAGE_MODEL_NAME][STORAGE_MODEL_KEY]).toBe(STORAGE_MODEL_VALUE);
        });
        it("should get value from storage model", function() {
	    	localStorage[STORAGE_MODEL_NAME][STORAGE_MODEL_KEY] = STORAGE_MODEL_VALUE;
			expect(controller.get(STORAGE_MODEL_KEY)).toBe(STORAGE_MODEL_VALUE);
        });
	});
});