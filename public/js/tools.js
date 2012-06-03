define("OSVG/Tools", function () {
	
	return {
		pad: function pad(array, nb, dist) {
			var i=0;
			
			for (i; i<nb; i++) {
				array.push(i*dist);
			}
			
			return array;
		}
	};
	
});