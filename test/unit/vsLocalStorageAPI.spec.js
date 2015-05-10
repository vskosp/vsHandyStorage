describe("vsLocalStorageAPI", function() {
    var vsLocalStorageAPI,
	    $window;
	
	beforeEach(module('vsBrowserStorageAPI'));
	
	beforeEach(inject(function(_vsLocalStorageAPI_, _$window_) {
        vsLocalStorageAPI = _vsLocalStorageAPI_;
		$window = _$window_;
    }));
	
	afterEach(inject(function($localStorage) {
	    $localStorage.$reset();
    }));
	
	it('should be defined set function', function () {
        expect(vsLocalStorageAPI.set).toBeDefined();
        expect(typeof vsLocalStorageAPI.set).toBe('function');
	});
	it('should be defined get function', function () {
        expect(vsLocalStorageAPI.get).toBeDefined();
        expect(typeof vsLocalStorageAPI.get).toBe('function');
	});
	it('should set value to local storage', function () {
	    vsLocalStorageAPI.set('number', 7);
		expect(vsLocalStorageAPI.get('number')).toBe(7);
	});
	it('should get value from local storage', function () {
	    vsLocalStorageAPI.set('number', 10);
		expect(vsLocalStorageAPI.get('number')).toBe(10);
	});
});