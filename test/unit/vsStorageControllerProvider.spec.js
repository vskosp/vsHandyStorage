describe("vsStorageControllerProvider getController()", function() {
	var	vsStorageControllerProvider;
		
	var directiveNameMock = "directiveName",
		browserStorageAPIMock = {
		    browserStorageMock: {},
		    set: function(key, value) {
			    this.browserStorageMock[key] = value;
			},
			get: function(key) {
			    return this.browserStorageMock[key];
			},
			reset: function() {
			    this.browserStorageMock = {};
			}
		};

	
	beforeEach(module('vsHandyStorage'));
	
    beforeEach(inject(function(_vsStorageControllerProvider_) {
        vsStorageControllerProvider = _vsStorageControllerProvider_;
    }));
	
	it("should be function", function() {
	   	expect(typeofExact(vsStorageControllerProvider.getController)).toBe('function');
    });	
	it("should return function", function() {
	   	expect(typeofExact(vsStorageControllerProvider.getController(directiveNameMock, browserStorageAPIMock))).toBe('function');
    });
	it("should throw exception if browserAPI not have settor and getter", function() {
	    var exceptionMessage = "browserStorageAPI should have setter and getter";
		function runGetController() { vsStorageControllerProvider.getController(directiveNameMock, {}); }
		expect(runGetController).toThrowError(exceptionMessage);
    });
	
	
	describe("controller instance", function() {
		var STORAGE_MODEL_NAME = "storageModelName",
			STORAGE_MODEL_KEY = 'number',
			STORAGE_MODEL_VALUE = 7,
			controller;
		
		beforeEach(inject(function($rootScope) {
		    var scope = $rootScope,
			    element = null,
				attrs = {}; 
			
            var Controller = vsStorageControllerProvider.getController(directiveNameMock, browserStorageAPIMock);			
			attrs[directiveNameMock] = STORAGE_MODEL_NAME;
			controller = new Controller(scope, element, attrs);
        }));
		
		afterEach(function() {
		    browserStorageAPIMock.reset();
		});
		
        it("should create storage model", function() {
	    	expect(browserStorageAPIMock.get(STORAGE_MODEL_NAME)).toBeDefined();
        });
        it("should put value to storage model", function() {
			controller.put(STORAGE_MODEL_KEY, STORAGE_MODEL_VALUE);
			expect(browserStorageAPIMock.get(STORAGE_MODEL_NAME)[STORAGE_MODEL_KEY]).toBe(STORAGE_MODEL_VALUE);
        });
        it("should get value from storage model", function() {
	    	browserStorageAPIMock.get(STORAGE_MODEL_NAME)[STORAGE_MODEL_KEY] = STORAGE_MODEL_VALUE;
			expect(controller.get(STORAGE_MODEL_KEY)).toBe(STORAGE_MODEL_VALUE);
        });					
	});	
});