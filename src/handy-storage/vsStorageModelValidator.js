angular.module('vsHandyStorage')
	.factory('vsStorageModelValidator', function() {
	    function isObjectOnly(value) {
		    return Object.prototype.toString.call(value) === '[object Object]';
		}		
		function isValid(model) {
			return isObjectOnly(model);
		}
		function isValueValid(value) {
			var isNull = (value===null),
			    isEmpty = ((""+value).trim()==="");
			return !isNull && !isEmpty;
		}
		
		return {
		    isValid: isValid,
		    isValueValid: isValueValid
		};
	});
