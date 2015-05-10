describe("vsLinkStorage", function() {
    // constants
	var STORAGE_NAME = "profile",
	    FORM_NAME_ATTR = "profile",
		INPUT_NAME_ATTR = "name",
	    NG_MODEL_ATTR = "name";
	

	beforeEach(module('vsHandyStorage'));
	
	// using local strage
	runTest('local');

	// using session strage
	runTest('session');
	
	// general test function
	function runTest(storageType) {
	
	    // (vs-'+storageType+'-storage) = vs-local-storage || vs-session-storage
        var htmlTpl = angular.element(
                '<form name="'+ FORM_NAME_ATTR +'" vs-'+ storageType +'-storage="'+ STORAGE_NAME +'">' +
			        '<input ng-model="'+ NG_MODEL_ATTR +'" type="text" name="'+ INPUT_NAME_ATTR +'" vs-link-storage>' +
                '</form>'
		    );    
			
		var browserStorageAPIName = (storageType === 'local') ? 'vsLocalStorageAPI' : 'vsSessionStorageAPI';
		
		// will be vsLocalStorageAPI or vsSessionStorageAPI
		var browserStorageAPI;
		
		// will be local model or session model
		var storageModel;
		
		var scope,
	        form;
	
        describe('vs-link-storage', function() {	
	        beforeEach(inject(function($rootScope, $compile, $injector) {
	        	scope = $rootScope.$new();
	        	form = $compile(htmlTpl)(scope);
		    	browserStorageAPI = $injector.get(browserStorageAPIName);
	        	storageModel = browserStorageAPI.get(STORAGE_NAME);
            }));
		    
		    afterEach(inject(function($localStorage, $sessionStorage) {
	            $localStorage.$reset();
		    	$sessionStorage.$reset();
            }));	
		    
		    it('should init ' + storageType + ' storage model', function () {
		        expect(storageModel).toBeDefined();
		        expect(storageModel).not.toBe(null);
		        expect(typeofExact(storageModel)).toBe('object');
	        });
		    
		    it('should store value to ' + storageType + ' storage model if field is dirty', function () {
	        	var ngModelController = scope[FORM_NAME_ATTR][INPUT_NAME_ATTR],
	        	    testValue = 'YourName';
	        	
	        	// set input value
	        	ngModelController.$setViewValue(testValue);
	        	scope.$digest();
	        	
	        	// check storage model
	        	expect(ngModelController.$dirty).toBe(true);
	        	expect(storageModel[INPUT_NAME_ATTR]).toBe(testValue);
	        });
	        
		    it('should init field from ' + storageType + ' storage model', function () {
	            var newForm,
	        	    ngModelController,
	        	    testValue = 'YourInitName';
	        	
	        	// set value to storage model
	        	storageModel[INPUT_NAME_ATTR] = testValue;
            
	        	// recompile html
	        	inject(function($compile) {
	        	    var scopeChild = scope.$new();
	            	newForm = $compile(htmlTpl)(scopeChild);
	        		ngModelController = scopeChild[FORM_NAME_ATTR][INPUT_NAME_ATTR];
                });
	        	
	        	// check input value
	        	expect(ngModelController.$viewValue).toBe(testValue);
	        });
		});
	}
	
});