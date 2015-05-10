// returns exact value type ('object', 'array', 'function' etc.)
function typeofExact(value) {
    var toStringVal = Object.prototype.toString.call(value),
	    type = toStringVal.slice(8,-1);
	return type.toLowerCase();
}
