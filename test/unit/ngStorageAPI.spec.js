describe("ngStorageAPI", function() {
    var BrowserStorageAPI,
	    $window;
	
	beforeEach(module('vsBrowserStorageAPI'));
	
	beforeEach(inject(function(ngStorageAPI, _$window_) {
        BrowserStorageAPI = ngStorageAPI;
		$window = _$window_;
    }));
	
	it('should be defined LOCAL_STORAGE_SERVICE', function () {
        expect(BrowserStorageAPI.LOCAL_STORAGE_SERVICE).toBeDefined();
	});
	it('should be defined SESSION_STORAGE_SERVICE', function () {
        expect(BrowserStorageAPI.SESSION_STORAGE_SERVICE).toBeDefined();
	});
	
	describe("localStorageAPI", function() {
	    var localStorageAPI;
		
		beforeEach(function() {
            localStorageAPI = new BrowserStorageAPI(BrowserStorageAPI.LOCAL_STORAGE_SERVICE);
        });
		
		afterEach(inject(function($localStorage) {
	        $localStorage.$reset();
        }));
		
		it('should set value to local storage ', function () {
	        localStorageAPI.set('number', 7);
		    expect(localStorageAPI.get('number')).toBe(7);
	    });
		it('should get value from local storage', function () {
	         localStorageAPI.set('number', 10);
	    	expect(localStorageAPI.get('number')).toBe(10);
	    });
	});
	
	describe("sessionStorageAPI", function() {
	    var sessionStorageAPI;
        
		beforeEach(function() {
		    sessionStorageAPI = new BrowserStorageAPI(BrowserStorageAPI.SESSION_STORAGE_SERVICE);
		});
		
		afterEach(inject(function($sessionStorage) {
	        $sessionStorage.$reset();
        }));
		
		it('should set value to session storage', function () {
	        sessionStorageAPI.set('number', 7);
	    	expect(sessionStorageAPI.get('number')).toBe(7);
	    });
		it('should get value from session storage', function () {
	        sessionStorageAPI.set('number', 10);
	    	expect(sessionStorageAPI.get('number')).toBe(10);
	    });
	});
});