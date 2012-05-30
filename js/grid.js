define("OSVG/Grid", 

["Olives/OObject", "Olives/Model-plugin"], 

function (OObject, ModelPlugin) {
	
	return function (view, gridX, gridY) {
		
		var grid = new OObject;

		grid.plugins.addAll({
			"gridx": new ModelPlugin(gridX),
			"gridy": new ModelPlugin(gridY)
		});
		
		grid.alive(view);
		
		return grid;

		
	};
	
});