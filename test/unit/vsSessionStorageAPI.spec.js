describe("vsSessionStorageAPI", function() {
    var vsSessionStorageAPI,
	    $window;
	
	beforeEach(module('vsBrowserStorageAPI'));
	
	beforeEach(inject(function(_vsSessionStorageAPI_, _$window_) {
        vsSessionStorageAPI = _vsSessionStorageAPI_;
		$window = _$window_;
    }));
	
	afterEach(inject(function($sessionStorage) {
	    $sessionStorage.$reset();
    }));
	
	it('should be defined set function', function () {
        expect(vsSessionStorageAPI.set).toBeDefined();
        expect(typeof vsSessionStorageAPI.set).toBe('function');
	});
	it('should be defined get function', function () {
        expect(vsSessionStorageAPI.get).toBeDefined();
        expect(typeof vsSessionStorageAPI.get).toBe('function');
	});
	it('should set value to session storage', function () {
	    vsSessionStorageAPI.set('number', 7);
		expect(vsSessionStorageAPI.get('number')).toBe(7);
	});
	it('should get value from session storage', function () {
	    vsSessionStorageAPI.set('number', 10);
		expect(vsSessionStorageAPI.get('number')).toBe(10);
	});
});