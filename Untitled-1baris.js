//utility

module.exports = {
	
	/**
	* Checks if the given object is null or not.
	* @param {object} obj - Given object.
	* @return {boolean}
	*/
	isNull : function (obj) {
	   return (typeof obj === 'null'?true:false);
	}
	
}