angular.module('vsHandyStorage')
	.factory('vsStorageControllerProvider', ['vsStorageModelValidator', function(vsStorageModelValidator) {
		function isBrowserStorageAPIValid(api) {
		    return angular.isDefined(api.set) && angular.isDefined(api.get);
		}
		function getController(directiveName, browserStorageAPI) {
			if(!isBrowserStorageAPIValid(browserStorageAPI))
                throw new Error("browserStorageAPI should have setter and getter");
			
			function storageController($scope, $element, $attrs) {
				var storageName = $attrs[directiveName],
				    storageModel = browserStorageAPI.get(storageName);
				if(!storageName)
                    throw new Error("Bad storage name");
				if(!vsStorageModelValidator.isValid(storageModel)) {
				    var storageDefaultModel = {};
					browserStorageAPI.set(storageName, storageDefaultModel);
					storageModel = browserStorageAPI.get(storageName);
				}
						    
				this.put = function (key, value) {
				    storageModel[key] = vsStorageModelValidator.isValueValid(value) ? value : undefined;
				};
				this.get = function (key) {
				    return storageModel[key];
				};
            }
			
			return storageController;
		}
		
		return {
		    getController: getController
		};
    }]);